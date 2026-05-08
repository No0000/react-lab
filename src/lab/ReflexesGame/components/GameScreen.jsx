import { useEffect, useRef, useState } from "react";
import "./GameScreen.css";
import gameBgm from "../assets/sound/bgm/gameBGM.mp3";
import readyVoice from "../assets/sound/voice/今ですわ.mp3";
import gameImage from "../assets/images/gameImage.PNG";

const ROUND_COMMENTS = [
  "準備はいいかしら？よければ画面を押しなさい。",
  "調子はどうかしら？次も華麗に決めてくださいまし。",
  "まだまだいけますわよね？気を抜いてはだめですわ。",
  "あなたならもっと上を目指せるはずですわ！",
  "最後まで優雅に決めますわよ！",
];

export default function GameScreen({ onStart, volume }) {
  const [status, setStatus] = useState("idle");
  const [comment, setComment] = useState(ROUND_COMMENTS[0]);
  const [roundCount, setRoundCount] = useState(1);
  const [reactionTime, setReactionTime] = useState(null);
  const [resultLabel, setResultLabel] = useState("");
  const readyAtRef = useRef(null);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);
  const bgmAudioRef = useRef(null);
  const voiceAudioRef = useRef(null);
  const volumeRef = useRef(volume);
  const currentCharacterImage = gameImage;

  useEffect(() => {
    const bgmAudio = new Audio(gameBgm);
    const voiceAudio = new Audio(readyVoice);

    bgmAudio.loop = true;
    bgmAudio.preload = "auto";
    bgmAudio.volume = volumeRef.current;
    bgmAudio.muted = volumeRef.current === 0;

    voiceAudio.preload = "auto";
    voiceAudio.volume = volumeRef.current;
    voiceAudio.muted = volumeRef.current === 0;

    bgmAudioRef.current = bgmAudio;
    voiceAudioRef.current = voiceAudio;

    bgmAudio.play().catch(() => {
      // Ignore playback rejection if the browser still requires another gesture.
    });

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
      bgmAudio.pause();
      bgmAudio.currentTime = 0;
      voiceAudio.pause();
      voiceAudio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    volumeRef.current = volume;

    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = volume;
      bgmAudioRef.current.muted = volume === 0;
    }

    if (voiceAudioRef.current) {
      voiceAudioRef.current.volume = volume;
      voiceAudioRef.current.muted = volume === 0;
    }
  }, [volume]);

  function playReadyVoice() {
    if (!voiceAudioRef.current || volumeRef.current === 0) {
      return;
    }

    voiceAudioRef.current.currentTime = 0;
    voiceAudioRef.current.play().catch(() => {
      // Ignore playback rejection if the browser still requires another gesture.
    });
  }

  function scheduleReady() {
    const waitTime = Math.floor(Math.random() * 1500) + 3000;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus("ready");
      setComment("今ですわ！");
      playReadyVoice();

      // Record the start time after the ready UI has actually painted.
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = requestAnimationFrame(() => {
          readyAtRef.current = performance.now();
        });
      });
    }, waitTime);
  }

  function startRound() {
    setStatus("waiting");
    setComment("まだですわ");
    setReactionTime(null);
    setResultLabel("");
    readyAtRef.current = null;
    scheduleReady();
  }

  function handleTooEarly() {
    clearTimeout(timeoutRef.current);
    cancelAnimationFrame(frameRef.current);
    setStatus("miss");
    setReactionTime(null);
    setResultLabel("");
    readyAtRef.current = null;
    setComment("お手つきですわ...落ち着いてもう一度どうぞ。");
  }

  function handleSuccess() {
    if (readyAtRef.current === null) {
      return;
    }

    const clickedAt = performance.now();
    const elapsed = clickedAt - readyAtRef.current;
    const elapsedSeconds = (elapsed / 1000).toFixed(3);

    clearTimeout(timeoutRef.current);
    cancelAnimationFrame(frameRef.current);
    setStatus("result");
    setReactionTime(elapsed);
    setResultLabel(`${elapsedSeconds}秒後にタッチできましたわ！`);
    setComment("なかなかの反応速度ですわね！");
  }

  function goToNextRound() {
    if (roundCount >= 5) {
      onStart();
      return;
    }

    const nextRound = roundCount + 1;
    setRoundCount(nextRound);
    setStatus("idle");
    setReactionTime(null);
    setResultLabel("");
    readyAtRef.current = null;
    setComment(
      ROUND_COMMENTS[nextRound - 1] ??
        "画面を押せば次の計測が始まりますわ。"
    );
  }

  function handlePanelPress() {
    if (status === "idle" || status === "miss") {
      startRound();
      return;
    }

    if (status === "waiting") {
      handleTooEarly();
      return;
    }

    if (status === "ready") {
      handleSuccess();
      return;
    }

    if (status === "result") {
      goToNextRound();
    }
  }

  function handleResult() {
    onStart();
  }

  return (
    <div className="gameStage">
      <div className="gameScreenShell">
        <div className="gameMainColumn">
          <div className="gameTitleBlock">
            <p className="gameEyebrow">お嬢様と一緒に</p>
            <h1 className="gameTitle">反射神経ゲーム</h1>
          </div>

          <div
            className={`gamePanel gamePanel-${status}`}
            onPointerDown={handlePanelPress}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handlePanelPress();
              }
            }}
          >
            {status === "ready" && <div className="gameFlash" aria-hidden="true" />}

            <div className="gamePanelInner">
              <p className="gameStatusTag">
                {status === "result"
                  ? "Result"
                  : status === "ready"
                    ? "Tap Now"
                    : status === "waiting"
                      ? "Standby"
                      : status === "miss"
                        ? "Oops"
                        : "Start"}
              </p>
              <p className="gameStatus">{comment}</p>
              {status === "result" && <p className="gameResult">{resultLabel}</p>}
              <p className="gameHint">
                {status === "result"
                  ? "もう一度押すと次のラウンドへ進みますわ。"
                  : "このエリアを押して進めてくださいまし。Enterキーでも操作できますわ。"}
              </p>
            </div>
          </div>

          <button className="gameExitButton" onClick={handleResult}>
            やめる
          </button>
        </div>

        <div className="gameSideColumn">
          <div className="gameInfoPanel">
            <div className="gameRoundBadge">{roundCount} / 5 Round</div>
            <p className="gameSubcopy">
              合図が出るまで指先をおとなしく待機。出た瞬間に優雅に押してくださいまし。
            </p>
          </div>

          <div className="gameCharacterArea" aria-hidden="true">
            <img
              className="gameCharacterImage"
              src={currentCharacterImage}
              alt="ゲーム画面の立ち絵"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
