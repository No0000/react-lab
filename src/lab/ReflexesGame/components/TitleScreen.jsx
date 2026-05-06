import { useEffect, useRef, useState } from "react";
import "./TitleScreen.css";
import bgm from "../assets/sound/bgm/titleBGM.mp3";
import hoverSE from "../assets/sound/se/buttonCursor.mp3";
import titleImg from "../assets/images/title.PNG";

export default function TitleScreen({ onStart }) {
  const bgmAudioRef = useRef(null);
  const hoverAudioRef = useRef(null);
  const volumeRef = useRef(0.3);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audio = new Audio(bgm);
    const hoverAudio = new Audio(hoverSE);

    audio.loop = true;
    audio.volume = volume;
    audio.muted = volume === 0;
    hoverAudio.volume = volume;
    hoverAudio.muted = volume === 0;
    hoverAudio.preload = "auto";

    bgmAudioRef.current = audio;
    hoverAudioRef.current = hoverAudio;

    // 自動再生対策：クリックで再生
    const startAudio = () => {
      audio.volume = volumeRef.current;
      audio.muted = volumeRef.current === 0;
      audio.play();
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      audio.pause();
      audio.currentTime = 0;
      hoverAudio.pause();
      hoverAudio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    volumeRef.current = volume;

    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = volume;
      bgmAudioRef.current.muted = volume === 0;
    }

    if (hoverAudioRef.current) {
      hoverAudioRef.current.volume = volume;
      hoverAudioRef.current.muted = volume === 0;
    }
  }, [volume]);

  function handleVolume(e) {
    setVolume(Number(e.target.value));
  }

  function playHoverSound() {
    if (!hoverAudioRef.current || volumeRef.current === 0) {
      return;
    }

    hoverAudioRef.current.currentTime = 0;
    hoverAudioRef.current.play().catch(() => {
      // Ignore autoplay-policy rejections until the user interacts.
    });
  }

  return (
    <div className="titleScreen">
      <div>
        <div className="titleScreenPanel">
          <h2>お嬢様と一緒に</h2>
          <h1 className="titleText">反射神経ゲーム</h1>
          <button onClick={onStart} onMouseEnter={playHoverSound}>スタート</button>
          <button onMouseEnter={playHoverSound}>ルール</button>
          <button onMouseEnter={playHoverSound}>クレジット</button>
        </div>
        <div className="volumePanel">
          <p className="volume">音量：{Math.floor(volume * 100)}</p>
          <input
            className="inputRange"
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onInput={handleVolume}
            onChange={handleVolume}
          />
        </div>

      </div>
      <div className="titleScreenImageArea">
        <img className="titleImg" src={titleImg} alt="タイトルイメージ" />
      </div>
    </div>
  );
}
