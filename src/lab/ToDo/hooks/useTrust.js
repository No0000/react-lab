import { useEffect, useState } from "react";

function useTrust(key) {
  const [value, setValue] = useState(() =>{
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {streak:0, lastCompleted: null, trust: 0};
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];


/* 
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const doneCheck = Object.entries(allTasks).every(([ojbKey, item]) => item.done === true);

  if (doneCheck === true) {
    const copyData = [...value];
    const now = new Date();
    setValue([
      ...copyData,
      lastCompleted: now.toDateString("ja-JP")
    ])

    if (startOfDay <= value.lastCompleted && value.lastCompleted >= endOfDay) {
      setValue({
        streak: copyData.streak + 1,

      })
    }
  }
 */
}

export default useTrust;