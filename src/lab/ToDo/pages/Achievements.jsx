import BottomMenu from "../components/BottomMenu";
import { ACHIEVEMENTS } from "../data/achievements";

function AchievementContent({dividend, divisor, achievementName, isConvert = false}) {
  function timeConversion(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours}時間${minutes}分${seconds}秒`;
  }

  return (
    <div style={{height: "50px", border: "1px solid #3a3a4a", padding: "10px 14px"}}>
      <p>{achievementName}：{isConvert ? `${timeConversion(dividend)} / ${timeConversion(divisor)}` : `${dividend} / ${divisor}`}</p>
      <div style={{ background: "#3a3a4a", height: "4px", borderRadius: "2px" }}>
        <div style={{
          width: `${Math.min((dividend / divisor) * 100, 100)}%`,
          height: "100%",
          background: "#b4a064",
          borderRadius: "2px"
        }} />
      </div>
    </div>
  );
}

export default function Achievements({ allTasks, data }) {
  const totalTrue = allTasks.filter(task => task.done === true).length; // 合計true数
  const streak = data.streak; // 連続日数
  const totalTaskTime = data.workRecords.reduce((sum, item) => sum + item.duration, 0); // 総作業時間

  const getCurrentValue = (id) => {
    if (id === "total_tasks") return totalTrue;
    if (id === "streak") return streak;
    if (id === "total_time") return totalTaskTime;
  }

  return (
    <div className="relative, w-full flex flex-col"
      style={{ position: "fixed", inset: 0, background: "#1a1a22", overflow: "hidden", color: "#e8e0cc",}}>
      <div style={{padding: "1rem"}}>
        <h1 style={{ color: "#e8e0cc", fontSize: "16px", fontWeight: 500 }}>実績</h1>
        <p style={{ fontSize: "11px", color: "#6a6a7a", margin: "16px 0 8px" }}>進行中</p>
        {ACHIEVEMENTS.map((achievement) => {
          const current = getCurrentValue(achievement.id);
          const divisor = achievement.thresholds.find(t => t > current) ?? achievement.thresholds.at(-1);
          return(
            <AchievementContent
              key={achievement.id} 
              dividend={current}
              divisor={divisor}  
              achievementName={achievement.title}
              isConvert={achievement.isConvert}
            />
          );
        })}
      </div>
  
      <div style={{padding: "1rem"}}>
        <p style={{ fontSize: "11px", color: "#6a6a7a", margin: "16px 0 8px" }}>達成済み</p>
        {ACHIEVEMENTS.map((achievement) => {
          const current = getCurrentValue(achievement.id);
          const divisors = achievement.thresholds.filter(t => t <= current) ?? "なし";
          console.log(divisors)
          return (
            divisors.map((threshold) => {
              return(
                <AchievementContent
                  key={`${achievement.id}-${threshold}`} 
                  dividend={current}
                  divisor={threshold}  
                  achievementName={achievement.title}
                  isConvert={achievement.isConvert}
                />
              );
            })
          );
        })}
      </div>

      <div className="flex-1" />
      
      <BottomMenu />
    </div>
  );
}