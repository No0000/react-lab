// エンディング
export default function EndingScreen({ resetGame }) {
  return (
    <div>
      <h2>エンディング</h2>
      <p>おめでとう。彼女と付き合えました。</p>
      <button onClick={resetGame}>タイトルに戻る</button>
    </div>
  )
}