import { useState, useEffect } from "react";

export default function Test() {
  return (
    <div>
      <Practice12 />
    </div>
  );
}

function Practice1() {
  const [getIndex, setGetIndex] = useState(0); 
  const numbers = [10, 20, 30, 40];

  function handleClick() {
    if (numbers.length -1 <= getIndex) {
      setGetIndex(0);
    } else {
      setGetIndex((prev) => prev + 1);
    }
  }

  return (
    <div>
      <p>現在：{numbers[getIndex]}</p>
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

function Practice2() {
  const [getIndex, setGetIndex] = useState(0); 
  const numbers = [10, 20, 30, 40];

  function handleClick() {
    if (numbers.length -1 <= getIndex) {
      setGetIndex(0);
    } else {
      setGetIndex((prev) => prev + 1);
    }
  }

  const upperIndex = getIndex + 1  > numbers.length - 1 ? 0 : getIndex + 1;
  const lowerIndex = getIndex <= 0 ? numbers.length - 1 : getIndex - 1; 

  return (
    <div>
      <p>上：{numbers[upperIndex]}</p>
      <p>中：{numbers[getIndex]}</p>
      <p>下：{numbers[lowerIndex]}</p>
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

function Practice3() {
  const data = [
    [1, 2, 3],
    [10, 20, 30],
    [100, 200, 300],
  ];

  const [indexes, setIndexes] = useState([0, 0, 0]);

  return (
    <div>
      {indexes.map((i, index) => (
        <p key={index}>{index+1}列目：{data[index][i]}</p>
      ))}
    </div>
  );
}

function Practice4() {
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState([true, true, true]);

  const data = [
    [1, 2, 3],
    [10, 20, 30],
    [100, 200, 300],
  ];

  useEffect(() => {
    if (spinning.every((s) => !s)) {
      return;
    }

    const timer = setInterval(() => {
      setIndexes((prev) => 
        prev.map((value, i) => {
          if (!spinning[i]) return value;
          return (value + 1) % data[i].length;
        })
      );
    }, 200);

    return () => clearInterval(timer);
  }, [spinning]);

  function handleClick(index) {
    setSpinning((prev) =>
      prev.map((s, i) => (i === index ? false : s))
    );
  }


  return (
    <div>
      {indexes.map((i, index) => (
        <div key={index}>
          <p>{data[index][i]}</p>
          <button onClick={() => handleClick(index, i)}>stop</button>
        </div>
      ))}
      <p>{spinning.every((s) => !s) === true ? data[0][indexes[0]] + data[1][indexes[1]] + data[2][indexes[2]]: ""}</p>
    </div>
  );
}

function Practice5() {
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState([true, true, true]);

  const data = [
    [5, 10, 15],
    [1, 2, 3],
    [100, 200, 300],
  ];

  /* レーンに関する処理
    ・レーンが全て止まっていたら
    ・各レーンの処理
  */
  useEffect(() => {
    if (isSpinning.every((s) => !s)) return; // レーンが全て止まっていたら何もしない

    // レーンが一つでも動いていたら
    const timer = setInterval(() => {
      setIndexes((prev) =>  // indexesの配列を一つずつ取り出して更新
        // 時間ごとに各配列の数値を進める
        prev.map((value, i) => { // value -> 行 i -> 列
          if (!isSpinning[i]) return value; // 対応した行のレーンが止まっていたら何もしない
          return (value + 1) % data[i].length; // 対応した行のレーンが動いていたら+1して3で割ったあまりから0,1,2のループをさせる
        })
      );
    }, 300);

    return () => clearInterval(timer);
  }, [isSpinning]);

  // レーンのボタンを押した時の処理
  function stopSlot(i) {
    setIsSpinning((prev) =>
      prev.map((s, index) =>
        i === index ? false : s
      )
    );
  }

  function retry() {
    setIndexes((prev) =>
      prev.map(() => 0)
    );

    setIsSpinning((prev) =>
      prev.map(() => true)
    );
  }

  return (
    <div>
      {indexes.map((i, index) => (
        <div key={index}>
          <p>{data[index][i]}</p>
          <button onClick={() => stopSlot(index)} disabled={!isSpinning[index]}>{isSpinning[index] ? "stop" : "clicked"}</button>
        </div>
      ))}
      <p>
        合計：{isSpinning.every((s) => !s) 
        ? indexes.map((index, i) => data[i][index]).reduce((acc, cur) => acc + cur, 0)
        : ""} 
      </p>
      <button onClick={retry}>All Reset</button>
    </div>
  );
}

function Practice6() {
  const [arr, setArr] = useState([0, 0, 0]);

  function handleClick(i) {
    setArr((prev) =>
      prev.map((value, index) => index === i ? value + 1 : value)
    );
  }

  function reset() {
    setArr((prev) =>
      prev.map(() => 0)
    );
  }

  return (
    <div>
      {arr.map((a, index) => (
        <div key={index}>
          <p>{a}</p>
          <button onClick={() => handleClick(index)}>+1</button>
        </div>
      ))}
      <button onClick={reset}>Reset</button>
      <p>
        合計：{arr.reduce((acc, cur) => acc + cur, 0)}
      </p>
    </div>
  );
}

function Practice7() {
  const [arr, setArr] = useState([0, 0, 0]);
  
  function randomArr() {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    console.log(randomIndex);
    setArr((prev) =>
      prev.map((value, index) => randomIndex === index ?  value + randomNumber : value)
    );
  }

  return (
    <div>
      {arr.map((a, index) => (
        <p key={index}>{index + 1}番目：{a}</p>
      ))}
      <button onClick={randomArr}>click</button>
    </div>
  );
}

function Practice8() {
  const score = [
    [10, 20, 30],
    [5, 15, 25],
    [8, 12, 22],
  ];

  const total = score.flat().reduce((sum, val) => sum + val, 0);

  console.log(total);
}

function Practice9() {
  const data = [
    [3, 7, 2],
    [9, 1, 5],
    [4, 6, 8],
  ];

  const aryMax = function (a, b) {return Math.max(a, b);}
  const total = data.map((d) => d.reduce(aryMax));
  
  console.log(total);
}

function Practice10() {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  const transpose = a => a[0].map((_, c) => a.map(r => r[c]));

  const result = transpose(matrix);
  console.log(result);
}

function Practice11() {
  const sutudents = [
    ["Alice", 80, 90],
    ["Bob", 40, 55],
    ["Carol", 70,60 ],
    ["Dave", 30, 45],
  ];

  const passedStudents = a => a.filter(score => score[1] >= 60 && score[2] >= 60).map(name => name[0]);

  const result = passedStudents(sutudents);

  console.log(result);
}

function Practice12() {
  const reels = [
    ["cherry", "lemon", "seven"],
    ["lemon", "seven", "cherry"],
    ["seven", "cherry", "lemon"],
  ];
  let indexes = [1, 0, 2];

  function judge(reels, indexes) {
    const selected = reels.map((reel, i) => reel[indexes[i]]);
    const isWin = selected.every(v => v === selected[0]);

    return isWin ? "当たり" : "はずれ";
  }

  const result = judge(reels, indexes);

  console.log(result);
}
