import { useState, useEffect } from "react";

export default function Main() {
  return (
    <div>
      <Talk />
    </div>
  );
}

function Slot() {
  const [slots, setSlots] = useState([0, 0, 0]);
  const roles = [
    [5, 10, 15, 20, 30],
    [10, 15, 20, 25, 30],
    [5, 10, 15, 20, 30],
  ];

  const role = [5, 10, 15, 20, 30];
  const [slotIndex, setSlotIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);


  // const [slotIndexes, setSlotIndexes] = useState([0, 0, 0]);
  // const [isSpinning, setIsSpinning] = useState([true, true, true]);

  useEffect(() => {
    if (!isSpinning) return;

    const timer = setInterval(() => {
      setSlotIndex((prev) => (prev + 1) % 5);
    }, 200);

    return () => clearInterval(timer);
  }, [isSpinning])

  function handleClick() {
    setIsSpinning((prev) => !prev);
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{border: "1px solid black", textAlign: "center", width: "100px"}}>
      <p>上段：{(slotIndex-1) < 0 ? role[4] : role[slotIndex-1]}</p>
      <p>真ん中：{role[slotIndex]}</p>
      <p>下段：{(slotIndex+1) >= 5 ? role[0] : role[slotIndex+1]}</p>

      </div>
      <button onClick={handleClick}>stop</button>
      <p>現在の役：{!isSpinning ? role[slotIndex] : ""}</p>
    </div>
  );
}

function Slot2() {
  const roles = [
    [5, 10, 15, 20, 30],
    [10, 15, 20, 25, 30],
    [5, 10, 15, 20, 30],
  ];

  const [slotIndexes, setSlotIndexes] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState([true, true, true]);

  useEffect(() => {
    if (isSpinning.every((s) => !s)) return;

    const timer = setInterval(() => {
      setSlotIndexes((prev) =>
        prev.map((value, i) => {
          if (!isSpinning[i]) return value;
          return (value + 1) % roles[i].length;
        })
      );
    }, 200);

    return () => clearInterval(timer);
  }, [isSpinning]);

  function stopSlot(index) {
    setIsSpinning((prev) =>
      prev.map((s, i) => (i === index ? false : s))
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "16px", alignItems: "center" }}>
      {slotIndexes.map((slotIndex, index) => {
        const upperIndex = slotIndex === 0 ? roles[index].length - 1 : slotIndex - 1;
        const lowerIndex = slotIndex === roles[index].length - 1 ? 0 : slotIndex + 1;

        return (
          <div key={index} style={{ textAlign: "center" }}>
            <div style={{ border: "1px solid black", width: "100px" }}>
              <p>{roles[index][upperIndex]}</p>
              <p>{roles[index][slotIndex]}</p>
              <p>{roles[index][lowerIndex]}</p>
            </div>
            <button onClick={() => stopSlot(index)} disabled={!isSpinning[index]}>
              stop
            </button>
          </div>
        );
      })}

      <div>
        <p>左：{!isSpinning[0] ? roles[0][slotIndexes[0]] : ""}</p>
        <p>中：{!isSpinning[1] ? roles[1][slotIndexes[1]] : ""}</p>
        <p>右：{!isSpinning[2] ? roles[2][slotIndexes[2]] : ""}</p>
        <p>
          合計：
          {!isSpinning[0] && !isSpinning[1] && !isSpinning[2]
            ? roles[0][slotIndexes[0]] +
              roles[1][slotIndexes[1]] +
              roles[2][slotIndexes[2]]
            : ""}
        </p>
      </div>
    </div>
  );
}

function Talk() {
  const [talk, setTalk] = useState([
    "おはようございます",
    "こんにちは",
    "こんばんは",
    "おやすみなさい",
  ]);
  const [talkIndex, setTalkIndex] = useState(0);
  
  function nextTalk() {
    setTalkIndex((prev) => (talk.length - 1 <= prev ? 0 : prev + 1));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && e.key !== "Tab") {
      nextTalk();
    }
  }

  function changeTalk() {

  }

  return (
    <div 
      style={{
        width: "100%",
        height: "100vh",
        border: "1px solid black",
        margin: "0 auto",
        outline: "none"
      }}
      onClick={nextTalk}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <p style={{textAlign: "center"}}>{talk[talkIndex]}</p>
      <button onClick={changeTalk}>トーク切り替え</button>
    </div>
  );
}