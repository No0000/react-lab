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
}

export default useTrust;