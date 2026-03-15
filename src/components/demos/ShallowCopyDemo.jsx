import { useState } from "react";

export default function ShallowCopyDemo() {

  const [list, setList] = useState([
    { id: 0, name: "A" },
    { id: 1, name: "B" }
  ]);

  function change() {

    // シャローコピー
    const next = [...list];

    // オブジェクトを書き換える
    next[0].name = "changed";

    setList(next);
  }

  return (
    <div>

      <button onClick={change}>
        変更する
      </button>

      <pre style={{ marginTop: "16px" }}>
        {JSON.stringify(list, null, 2)}
      </pre>

    </div>
  );
}