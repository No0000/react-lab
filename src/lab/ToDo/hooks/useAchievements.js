import { useEffect, useState } from "react";

function usetAchivements(key) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {
      
    }
  })
}