import { useState } from "react";

export default function EventTest() {
  return (
    <>
{/*       <EventPractice1 />
      <EventPractice2 />
      <EventPractice3 />
      <EventPractice4 />
      <EventPractice5 />
      <EventPractice6 />
      <EventPractice7 />
      <EventPracticeA />
      <EventPracticeB />
      <EventPracticeC />
      <EventPracticeD /> */}
      <EventPracticreA1 />
    </>
  )
}

function EventPractice1() {
  const [text, setText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
  }

  return(
    <div>
      <input onChange={handleChange} value={text} />
      <p>入力中：{text}</p>
    </div>
  );
}

function EventPractice2() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSubmitted(e.target.value);
    }
  }

  return(
    <div>
      <input 
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <p>確定：{submitted}</p>
    </div>
  );
}

function EventPractice3() {
  const [keyName, setKeyName] = useState("");

  function handleKeyDown(e) {
    setKeyName(e.key);
  }

  return (
    <div>
      <input onKeyDown={handleKeyDown} />
      <p>押したキー：{keyName}</p>
    </div>
  );
}

function EventPractice4() {
  const [text, setText] = useState("");

  function handleChange(e) {
    const value = e.target.value;

    if (Number(value)) {
      setText(value);
    }
  }

  return (
    <div>
      <input  value={text} onChange={handleChange} />
      <p>{text}</p>
    </div>
  );
}

function EventPractice5() {
  const [buttonName, setButtonName] = useState("");

  function handleClick(e) {
    setButtonName(e.target.textContent);
  } 

  return (
    <div>
      <button onClick={handleClick}>赤</button>
      <button onClick={handleClick}>青</button>
      <button onClick={handleClick}>緑</button>

      <p>押したボタン：{buttonName}</p>
    </div>
  );
}

function EventPractice6() {
  const [text, setText] = useState("");
  const keyword = "tokyo";

  function handleChange(e) {
    setText(e.target.value);
  }

  const isMistake = !keyword.startsWith(text);

  return (
    <div>
      <p>お題：{keyword}</p>
      <input value={text} onChange={handleChange} />
      <p>{isMistake ? "ミス" : "OK"}</p>
    </div>
  );
}

function EventPractice7() {
  const [message, setMessage] = useState("何か入力して");

  function handleKeyDown(e) {
    const value = e.key;

    if (value === "Backspace") {
      setMessage("削除した");
    } else {
      setMessage("追記");
    }
  } 

  return (
    <div>
      <input onKeyDown={handleKeyDown} />
      <p>{message}</p>
    </div>
  );
}

function EventPracticeA() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  } 

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setText("");
    }
  }

  return (
    <div>
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

function EventPracticeB() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleKeyDown(e) {
    if(e.key === "Escape") {
      setText("キャンセル");
    }
  }

  return (
    <div>
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

function EventPracticeC() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div>
      <input
        value={text}
        onChange={handleChange}
      />
      <p>テキストの長さ：{text.length}</p>
    </div>
  );
}

function EventPracticeD() {
  const [buttonName, setButtonName] = useState("none");

  function handleClick(e) {
    const value = e.target.textContent;
    let color = "";

    if (value === "赤") {
      color = "red";
    } else if (value === "青") {
      color = "blue";
    } else if (value === "緑") {
      color = "green";
    }

    setButtonName(color);
  }

  return (
    <div>
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "1px solid black",
          backgroundColor: `${buttonName}`
        }}
      >

      </div>
      <button onClick={handleClick}>赤</button>
      <button onClick={handleClick}>青</button>
      <button onClick={handleClick}>緑</button>
    </div>
  );
}

function EventPracticreA1() {
  const [text, setText] = useState("コマンドを選択");
  const [infoText, setInfoText] = useState("敵が現れた！");
  const [myHp, setMyHp] = useState(10);
  const [enemyHp, setEnemyHp] = useState(10);


  function handleClick(e) {
    const value = e.target.textContent;

    if (value === "攻撃") {
      const rnd = Math.floor(Math.random() * 3) + 1;
      setText("攻撃！");
      setEnemyHp((prev) => prev - rnd);
      setInfoText(`相手に${rnd}のダメージを与えた`);
    } else if (value === "防御") {
      setText("あなたは防御をしている");
    } else if (value === "回復") {
      const rnd = Math.floor(Math.random() * 5) + 1;
      setText("回復魔法を唱えた！");
      setMyHp((prev) => prev + rnd);
      setInfoText(`自分の体力を${rnd}回復した`);
    }
  }

  return (
    <div>
      <p>敵の体力：{enemyHp}</p>
      <button onClick={handleClick}>攻撃</button>
      <button onClick={handleClick}>防御</button>
      <button onClick={handleClick}>回復</button>
      <p>自分の体力：{myHp}</p>
      <p>{infoText}</p>
      <p>{text}</p>
      <p>{enemyHp <= 0 ? "敵を倒した！" : ""}</p>
    </div>
  );
}