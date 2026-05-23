import { useEffect, useState } from "react";

function useTrust(key) {
  const [value, setValue] = useState(() =>{
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {
      streak:0,
      lastCompleted: null,
      trust: 0,
      workRecords: [],
      tags: ["勉強", "仕事", "毎日", "買い物"]
    };
  }); // データを呼び出す

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]); // データを保存する

  return [value, setValue];
}

export default useTrust;