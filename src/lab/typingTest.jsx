import { useState } from "react";

export default function EventTest() {
  const [pushKey, setPushKey] = useState("");
  const [index, setIndex] = useState(0);

  const keywords = ["tokyo", "hokkaidou", "kanagawa"];

  const currentWord = keywords[index];

  function handleChange(e) {
    const value = e.target.value;
    setPushKey(value);

    if (value === currentWord) {
      setIndex((prev) => prev + 1);
      setPushKey("");
    }
  }

  return (
    <div>
      <h1>タイピング</h1>
      <p>{currentWord}</p>

      {index < keywords.length ? (
        <>
          <p>お題：{currentWord}</p>

          <input
            value={pushKey}
            onChange={handleChange}
          />
        </>
      ) : (
        <p>クリア</p>
      )}
    </div>
  )
}