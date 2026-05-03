// ショップ
const ITEMS = [
  { id: 0, name: "プレゼント", cost: 30, affectionGain: 1 },
  { id: 1, name: "手紙", cost: 60, affectionGain: 2 },
  { id: 2, name: "特別なプレゼント", cost: 100, affectionGain: 3 },  
];

export default function ShopScreen({ points, affection, buyItem, goNextStage }) {
  return (
    <div>
      <h2>ショップ</h2>
      <p>所持ポイント：{points}pt 好感度：{affection}</p>

      {ITEMS.map(item => (
        <div key={item.id}>
          <span>{item.name} {item.cost}pt 好感度＋{item.affectionGain}</span>
          <button
            onClick={() => buyItem(item.cost, item.affectionGain)}
            disabled={points < item.cost}
          >
            購入
          </button>
        </div>
      ))}

      <button onClick={goNextStage}>次のステージへ</button>
    </div>
  );
} 