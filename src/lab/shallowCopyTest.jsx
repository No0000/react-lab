import { useEffect, useRef, useState } from "react";
import "./GameScreen.css";

export default function Test() {
  const [answer] = useState(() => Math.floor(Math.random() * 100000));
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [screenMode, setScreenMode] = useState("dialog");
  const [dialogues, setDialogues] = useState([
    "……接続を確認。",
    "暗証番号を入力してください。"
  ]);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const text = dialogues[dialogIndex];
    let i = 0;

    setVisibleText("");

    const interval = setInterval(() => {
      i++;
      setVisibleText(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [dialogIndex]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newValues = [...inputs];
    newValues[index] = value;
    setInputs(newValues);

    if (value !== "" && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && inputs[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  function onClickNextDialogue() {
    if (dialogIndex < dialogues.length - 1) {
      setDialogIndex((prev) => prev + 1);
    } else {
      setScreenMode("input");
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
    }
  }

  function onClickJudge() {
    const joinedInput = inputs.join("");
    const numberInput = Number(joinedInput);

    if (
      joinedInput === "" ||
      joinedInput.length !== 5 ||
      inputs.includes("") ||
      Number.isNaN(numberInput)
    ) {
      setDialogues([
        "入力値に不備があります。",
        "5桁の数字を入力してください。"
      ]);
      setDialogIndex(0);
      setScreenMode("dialog");
      return;
    }

    if (numberInput < answer) {
      setMessage("もっと大きいよ");
      setDialogues([
        "照合結果を表示します。",
        "入力された番号は小さすぎます。",
        "再入力してください。"
      ]);
    } else if (numberInput > answer) {
      setMessage("もっと小さいよ");
      setDialogues([
        "照合結果を表示します。",
        "入力された番号は大きすぎます。",
        "再入力してください。"
      ]);
    } else {
      setMessage("正解！");
      setDialogues([
        "照合結果を表示します。",
        "認証に成功しました。"
      ]);
    }

    setInputs(["", "", "", "", ""]);
    setCount((prev) => prev + 1);
    setDialogIndex(0);
    setScreenMode("dialog");
  }

  return (
    <div className="blackBack">
      <div className="blackBelt">
        <div className="mainScreen">
          <p className="typewriter">0から100までの数字を当てよう</p>
          <p>ヒント：{message}</p>
          <p>答え：{answer}</p>

          <div className="subtitle">
            {screenMode === "dialog" && (
              <div>
                <p>
                  {visibleText}
                </p>
                <button className="judgeButton" onClick={onClickNextDialogue}>
                  次へ
                </button>
              </div>
            )}

            {screenMode === "input" && (
              <div>
                <div>
                  {inputs.map((value, index) => (
                    <input
                      className="inputNumber"
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>
                <button
                  className="judgeButton"
                  onClick={onClickJudge}
                >
                  回答する
                </button>
              </div>
            )}
          </div>

          <p className="verticalText">
            試行回数<span className="countText">{count}</span>
          </p>
        </div>
      </div>
    </div>
  );
}