import BottomMenu from "../components/BottomMenu";
import { ACHIEVEMENTS } from "../data/achievements";
import { useState } from "react";

const TAB_LABEL = {
  pending: "未達成",
  achieved: "達成",
};

function AchievementContent({dividend, divisor, achievementName, achievementLabel, isConvert = false, isClaimed, isAchieved}) {
  function timeConversion(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}時間${minutes}分${seconds}秒`;
  }

  function handleClick() {

  }

  const isClaimedAndAchieved = !isClaimed && isAchieved;

  return (
    <div style={{
      border: `1px solid ${isClaimedAndAchieved ? "#b4a064" : "#3a3a4a"}`,
      background: isClaimedAndAchieved ? "rgba(180,160,100,0.08)" : "rgba(255,255,255,0.04)",
      padding: "10px 14px",
      margin: "10px 0",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "13px", color: isClaimedAndAchieved ? "#b4a064" : "#e8e0cc", margin: "0 0 2px" }}>
            {achievementLabel}
          </p>
          <p style={{ fontSize: "11px", color: "#6a6a7a", margin: 0 }}>
            {achievementName}：{isConvert
              ? `${timeConversion(dividend)} / ${timeConversion(divisor)}`
              : `${dividend} / ${divisor}`}
          </p>
        </div>

        {isClaimedAndAchieved && (
          <button 
            style={{
              padding: "4px 12px",
              background: "rgba(180,160,100,0.15)",
              border: "1px solid #b4a064",
              color: "#b4a064",
              fontSize: "12px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            受け取る
          </button>
        )}

        {isClaimed && (
          <span style={{ fontSize: "11px", color: "#6a6a7a" }}>受け取り済み</span>
        )}
      </div>

      <div style={{ background: "#3a3a4a", height: "3px", borderRadius: "2px", marginTop: "10px" }}>
        <div style={{
          width: `${Math.min((dividend / divisor) * 100, 100)}%`,
          height: "100%",
          background: isClaimedAndAchieved ? "#b4a064" : "#4a4a5a",
          borderRadius: "2px",
        }} />
      </div>
    </div>
  );
}

export default function Achievements({ allTasks, data }) {
  const [achievementTab, setAchivementTab] = useState("pending");
  const totalTrue = allTasks.filter(task => task.done === true).length; // 合計true数
  const streak = data.streak; // 連続日数
  const totalTaskTime = data.workRecords.reduce((sum, item) => sum + item.duration, 0); // 総作業時間

  const getCurrentValue = (id) => {
    if (id === "total_tasks") return totalTrue;
    if (id === "streak") return streak;
    if (id === "total_time") return totalTaskTime; 
  }

  // tabに応じてthresholdsを返す関数
  const getThresholds = (achievement, current, claimedAchievements) => {
    if (achievementTab === "pending") {
      const claimed = achievement.thresholds.filter(t => t.value <= current && !claimedAchievements.includes(`${achievement.id}-${t.value}`));
      const next = achievement.thresholds.find(t => t.value > current) ?? achievement.thresholds.at(-1);
      return [...claimed, next ? [next] : []].flat(); // 配列で統一して返す
    }
    if (achievementTab === "achieved") {
      return achievement.thresholds.filter(t => claimedAchievements.includes(`${achievement.id}-${t.value}`)); // filterは見つからなかった場合[]（からの配列）を返す
    }
    return [];
  };

  return (
    <div className="relative, w-full flex flex-col"
      style={{ position: "fixed", inset: 0, background: "#1a1a22", overflow: "hidden", color: "#e8e0cc",}}>
      <div style={{padding: "1rem"}}>
        <h1 style={{ color: "#e8e0cc", fontSize: "16px", fontWeight: 500 }}>実績</h1>
        <div>
          {Object.entries(TAB_LABEL).map(([key, label]) => ( // オブジェクトなのでmapを直接使えない
            <button
              key={key}
              onClick={() => setAchivementTab(key)} // ボタンを押すと対応したstateになる
              style={{
                margin: "0 4px",
                color: achievementTab === key ? "#b4a064" : "#6a6a7a",
              }}
            >
              {label}
            </button>
          ))}

        </div>

        <div style={{maxHeight: "300px", overflowY: "auto"}}>
          {ACHIEVEMENTS.map((achievement) => {
            const current = getCurrentValue(achievement.id);
            const thresholds = getThresholds(achievement, current, data.claimedAchievements);
            
            return thresholds.map((threshold) => {
              const isClaimed = data.claimedAchievements.includes(`${achievement.id}-${threshold.value}`);
              const isAchieved = current >= threshold.value;

              return (
                <AchievementContent
                  key={`${achievement.id}-${threshold.value}`}
                  dividend={current}
                  divisor={threshold.value}
                  achievementName={achievement.title}
                  achievementLabel={threshold.label}
                  isConvert={achievement.isConvert}
                  isClaimed={isClaimed}
                  isAchieved={isAchieved}
                />
              )
            });
          })}
        </div>
      </div>

      <div className="flex-1" />
      
      <BottomMenu />
    </div>
  );
}