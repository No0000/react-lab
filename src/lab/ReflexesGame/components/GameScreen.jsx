import { useState, useEffect, useRef } from "react";

// ゲーム画面
export default function GameScreen({ onStart }) {
  const [status, setStatus] = useState("start");
  const [buttonStatus, setButtonStatus] = useState("start");
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [randTime, setRandTime] = useState(() => Math.floor(Math.random() * 7000 + 3000));
  const [roundCount, setRoundCount] = useState(1);
  const [resultTime, setResultTime] = useState(0);

  const [allTime, setAllTime] = useState([]);
  const timeRecode = [];
  

  function handleNextRound() {

  }

  function handleStart() {
    setStatus("waiting");
    setReactionTime(null);
    setButtonStatus("stop");

    setTimeout(() => {
      setStatus("ready");
      setStartTime(Date.now());
    }, randTime);
  }

  // ストップボタン
  function handleStop() {
    const endTime = Date.now();
    const result = Math.floor(endTime - startTime);
    setReactionTime(result);
    setResultTime(result - randTime);
    setAllTime([...allTime, resultTime]);
    setStatus("result");
    setButtonStatus("next");
  }

  // もう一回ボタン
  function handleReset() {
    setStatus("start");
    setRandTime(Math.floor(Math.random() * 7000 + 3000));
    setTime(0);
    setRoundCount(prev => prev + 1);
    setButtonStatus("start");
  }

  function handleResult() {

  }

  const startButton = <button onClick={handleStart}>スタート</button>;
  const stopButton = <button onClick={handleStop}>ストップ</button>;
  const nextButton = <button onClick={handleReset}>もう一回！</button>;
  return (
    <div>
      <div>
        <p>{roundCount}回目</p>
        <p>{String(randTime / 1000)}秒でストップボタンを押してね</p>
        {buttonStatus === "start" ? startButton : buttonStatus === "stop" ? stopButton : buttonStatus === "next" ? nextButton : ""}
        <button onClick={handleResult}>やめる</button>

        <p>{status}</p>
        <p>{reactionTime}</p>
        <p>差：{resultTime / 1000}秒</p>
        <p>平均タイム:{allTime.length > 1 ? allTime.reduce((acc, cur) => acc + cur, 0) / allTime.length : ""}</p>
        <p>{allTime.map((time, index) => (
          <p key={index}>averaga:{time / 1000}秒</p>
        ))}</p>
      </div>
    </div>
  );
}