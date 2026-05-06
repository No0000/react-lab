import { useEffect, useRef, useState } from "react";
import "./GameScreen.css";

const ROUND_COMMENTS = [
  "準備はいいかしら？よければ画面をクリックしなさい。",
  "調子はどうかしら？画面をクリックすれば次の計測が始まりますわ。",
  "まだまだいけますわよね？画面をクリックしなさい。",
  "あなたならもっと上を目指せるはずですわ！",
  "限界を越えるのです！",
];

export default function GameScreen({ onStart }) {
  const [status, setStatus] = useState("idle");
  const [comment, setComment] = useState(ROUND_COMMENTS[0]);
  const [roundCount, setRoundCount] = useState(1);
  const [reactionTime, setReactionTime] = useState(null);
  const [resultLabel, setResultLabel] = useState("");
  const readyAtRef = useRef(null);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function scheduleReady() {
    const waitTime = Math.floor(Math.random() * 1500) + 3000;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus("ready");
      setComment("今ですわ！");

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
    setComment("お手つきですわ...もう一度画面をクリックしなさい！");
  }

  function handleSuccess() {
    if (readyAtRef.current === null) {
      return;
    }

    const clickedAt = performance.now();
    const elapsed = clickedAt - readyAtRef.current; // 経過時間
    const elapsedSeconds = (elapsed / 1000).toFixed(3); // わかりやすい時間にまとめる

    clearTimeout(timeoutRef.current);
    cancelAnimationFrame(frameRef.current);
    setStatus("result");
    setReactionTime(elapsed);
    setResultLabel(`${elapsedSeconds}秒後にクリックしましたわ！`);
    setComment("なかなかの反応速度ですわね！");
  }

  // 5回計測したらリザルト画面へ
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
        "画面をクリックすれば次の計測が始まりますわ。"
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
    <div className="gameScreen">
      <div className="gameHeader">
        <p className="gameRound">{roundCount}回目</p>
        <button className="gameExitButton" onClick={handleResult}>
          やめる
        </button>
      </div>

      <div
        className={`gamePanel gamePanel-${status}`}
        onPointerDown={handlePanelPress}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Enterキーを押した際に画面がしたにスクロールする標準機能をキャンセルする
            handlePanelPress();
          }
        }}
      >
        {status === "ready" && <div className="gameFlash" aria-hidden="true" />}
        <p className="gameStatus">{comment}</p>
        {status === "result" && (
          <p className="gameResult">{resultLabel}</p>
        )}
        {reactionTime !== null && (
          <p className="gameMs">{Math.round(reactionTime)} ms</p>
        )}
        <p className="gameHint">
          {status === "result"
            ? "もう一度クリックすると次へ進みますわ。"
            : "このパネルをクリックして進めてくださいまし。Enterキーでも動きますわ。"}
        </p>
      </div>
    </div>
  );
}
