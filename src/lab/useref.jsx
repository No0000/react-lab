import { useRef } from "react";

export default function Useref() {
  const inputRefs = useRef([]);

  function handleClick() {
    inputRefs.current[0].focus();
  }

  return (
    <div>
      <button onClick={handleClick}>入力欄に移動</button>
      {[0, 1, 2].map((_, index) =>
        <input
          key={index}
          ref={(el) => {inputRefs.current[index] = el}}
        />
      )}
    </div>
  );
}