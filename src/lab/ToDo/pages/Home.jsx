import { useNavigate, useLocation } from "react-router-dom";
import CharacterPanel from "../components/CharacterPanel";
import WeatherWidget from "../components/WeatherWidget";
import BottomMenu from "../components/BottomMenu";

export default function Home({ allTasks, setAllTasks, data, setData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const topTask = allTasks.filter((item) => !item.done)[0] ?? null;

  const getSerif = (trust) => {
    if (trust <= 10) return "初めまして！一緒に頑張ろう";
    if (trust <= 30) return "最近頑張ってるね";
    return "いつもありがとう";
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col"
      style={{ background: "#38c4b4", border: "1px solid #3a3a4a" }}>

      {/* キャラクター */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none" 
        style={{ zIndex: 0, top: "30px", bottom: "20px" }}>
        <CharacterPanel data={data} />
      </div>

      {/* 天気：左上 */}
      <div className="p-3 pb-0" style={{ zIndex: 1, position: "relative" }}>
        <WeatherWidget />
      </div>

      <div className="flex-1" />    

      {/* セリフ＋トップタスク */}
      <div className="px-3 pb-3 flex flex-col gap-2" style={{ zIndex: 1, position: "relative" }}>

        {/* セリフ：右寄せ */}
        <div className="self-end px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #4a4a5a" }}>
          <span style={{ fontSize: "12px", color: "#c8c0a8" }}>{getSerif(data.trust)}</span>
        </div>

        {/* トップタスク */}
        <div className="flex items-center gap-3 px-4 py-3"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #4a4a5a" }}>
          {topTask ? (
            <>
              <div style={{ width: "16px", height: "16px", border: "1px solid #8a8070", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#e8e0cc" }}>{topTask.name}</span>
            </>
          ) : (
            <span style={{ fontSize: "13px", color: "#6a6a7a" }}>タスクはありません</span>
          )}
        </div>
      </div>

      {/* ボトムメニュー */}
      <BottomMenu />

    </div>
  );
}