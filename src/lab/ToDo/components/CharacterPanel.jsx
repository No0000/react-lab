import charaImage from "../assets/character.PNG";

export default function CharacterPanel({ data }) {
  const getSerif = (trust) => {
    if (trust <= 10) return "初めまして";
    if (trust <= 30) return "最近頑張ってるね";
    return "いつもありがとう";
  }

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none"
      style={{ zIndex: 0, bottom: "60px" }}>
      <img
        src={charaImage}
        alt="キャラクターイメージ"
        className="h-full w-auto object-contain"
        style={{ maxHeight: "100%" }}
      />
    </div>
  );
}