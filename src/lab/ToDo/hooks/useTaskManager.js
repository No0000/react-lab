import { useState, useEffect } from "react";

function useTaskManager(key) { // localStorageのキー
  const [value, setValue] = useState(() => { // value = allTasks | setValue = setAllTasks
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : []; // 初回アクセス時、何も保存されていなければnullをlocalStorageのgetItemは返す。するとJSON.parseはエラーを出すので、データがある時とないときで条件判断を設ける。
  });

  // タスクに変更があるたびにlocalStorageで保存する
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]); 

  return [value, setValue];
}

export default useTaskManager;