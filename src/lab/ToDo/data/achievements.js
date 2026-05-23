import Achievements from "../pages/Achievements";

// achievements.js
export const ACHIEVEMENTS = [
  {
    id: "total_tasks",
    title: "完了タスク数",
    thresholds: [5, 10, 25, 50, 100], // 段階的な目標値
    isConvert: false,
  },
  {
    id: "streak",
    title: "連続日数",
    thresholds: [3, 7, 14, 30, 60],
    isConvert: false,
  },
  {
    id: "total_time",
    title: "作業時間",
    thresholds: [500, 1800, 3600, 18000, 36000],
    isConvert: true,
  },
];