import charaImage from "../assets/character.PNG";

export default function CharacterPanel({data}) {
  // 便利な書き方。ぜひ覚えておきたい
  const getSerif = (trust) => {
    if (trust <= 10) return "初めまして";
    if (trust <= 30) return "最近頑張ってるね";
    return "いつもありがとう";
  }

  return (
    <div>
      <p>信頼度：{data.trust}</p>
      <p>{getSerif(data.trust)}</p>
      <img
        className="w-full h-auto object-cover"
        src={charaImage} 
        alt="キャラクターイメージ" 
      />
    </div>

  );
}