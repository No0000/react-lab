import { useRef, useState } from "react";
import "./GameScreen.css";

export default function Test() {
  const [answer, setAnswer] = useState(() => Math.floor(Math.random() * 90000) + 10000); // 正解の数字
  const [message, setMessage] = useState(""); // ヒント
  const [count, setCount] = useState(0); // 試行回数
  const [inputs, setInputs] = useState(["", "", "", "", ""]); // ５桁の数字入力欄
  const inputRefs = useRef([]);


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
  }

  // 判定関数
  function onClickJudge() {
    const joinedInput = inputs.join("");
    const numberInput = Number(joinedInput);

    if (
      joinedInput === "" ||
      joinedInput.length !== 5 ||
      inputs.includes("") ||
      Number.isNaN(numberInput)
    ) {
      setMessage("5桁の数字を入力してね");
      return;
    }

    if (numberInput < answer) {
      setMessage("もっと大きいよ");
    } else if (numberInput > answer) {
      setMessage("もっと小さいよ");
    } else {
      setMessage("正解！");
    }

    setInputs(["", "", "", "", ""]);
    setCount((prev) => prev + 1);
    inputRefs.current[0]?.focus();
  } 

  return (
    <div className="blackBack">
      <div className="blackBelt">
        <div className="mainScreen">
          <p>0から100までの数字を当てよう</p>
          <p>ヒント：{message}</p>
          <p>答え：{answer}</p>
          <div className="subtitle">
            <button
              className="judgeButton"
              onClick={onClickJudge}
            >
              回答する
            </button>
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
          </div>
          <p className="verticalText">試行回数<span className="countText">{count}</span></p>
        </div>
      </div>
    </div>
  );
}