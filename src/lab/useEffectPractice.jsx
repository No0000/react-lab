import { useState, useEffect } from "react";

export default function Test() {
  return (
    <div>
      <Practice1And2 />
      <Practicre3 />
    </div>
  );
}

function Practice1And2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("ゲーム開始");
  }, []);

  useEffect(() => {
    console.log("カウントが更新された");
  }, [count]);


  return (
    <div>
      <button onClick={() => setCount(prev => prev + 1)}>カウント</button>
      <p>{count}</p>
    </div>
  );
}

function Practicre3() {
  const [text, setText] = useState("コマンドを選択");
  const [infoText, setInfoText] = useState("敵が現れた！");
  const [myHp, setMyHp] = useState(10);
  const [enemyHp, setEnemyHp] = useState(10);
  const [mode, setMode] = ("");

  const isGameOver = enemyHp <= 0 || myHp <= 0;

  useEffect(() => {
    if (enemyHp <= 0) {
      const id = setTimeout(() => {
        setMode("result");
      }, 3000);

      return () => clearTimeout(id);
    }
  }, [enemyHp]);

  function handleClick(e) {
    const value = e.target.textContent;

    if (enemyHp <= 0 || myHp <= 0) return;

    if (value === "攻撃") {
      const rnd = Math.floor(Math.random() * 3) + 1;
      setText("攻撃！");
      setEnemyHp((prev) => Math.max(prev - rnd, 0));
      setInfoText(`相手に${rnd}のダメージを与えた`);
    } else if (value === "防御") {
      setText("あなたは防御している");
      setInfoText("次の攻撃に備えて身構えた");
    } else if (value === "回復") {
      const rnd = Math.floor(Math.random() * 5) + 1;
      setText("回復魔法を唱えた！");
      setMyHp((prev) => Math.min(prev + rnd, 10));
      setInfoText(`自分の体力を${rnd}回復した`);
    }
  }

  return (
    <div>
      <p>敵の体力：{enemyHp}</p>

      <button onClick={handleClick} disabled={isGameOver}>攻撃</button>
      <button onClick={handleClick} disabled={isGameOver}>防御</button>
      <button onClick={handleClick} disabled={isGameOver}>回復</button>

      <p>自分の体力：{myHp}</p>
      <p>{infoText}</p>
      <p>{text}</p>
      <p>{enemyHp <= 0 ? "敵を倒した！" : ""}</p>
      <p>{myHp <= 0 ? "あなたは倒れた…" : ""}</p>
      <p>{mode}</p>
    </div>
  );
}

