export default function TitleScreen({ onStart }) {
  return (
    <div>
      <h1>じゃんけん彼女</h1>
      <button onClick={onStart}>はじめる</button>
    </div>
  );
}