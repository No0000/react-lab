import Achievements from "../pages/Achievements";

// achievements.js
export const ACHIEVEMENTS = [
  {
    id: "total_tasks",
    title: "完了タスク数",
    isConvert: false,
    thresholds: [
      { value: 1,   label: "はじめの一歩" },
      { value: 5,   label: "軌道に乗ってきた" },
      { value: 10,  label: "習慣のたまご" },
      { value: 25,  label: "コツコツの申し子" },
      { value: 50,  label: "タスクマスター" },
      { value: 100, label: "伝説の完遂者" },
    ],
  },
  {
    id: "streak",
    title: "連続日数",
    isConvert: false,
    thresholds: [
      { value: 2,  label: "三日坊主回避" },
      { value: 7,  label: "一週間の意志" },
      { value: 14, label: "本物の習慣" },
      { value: 30, label: "ひと月の継続者" },
      { value: 60, label: "揺るぎない日課" },
    ],
  },
  {
    id: "total_time",
    title: "作業時間",
    isConvert: true,
    thresholds: [
      { value: 300,   label: "集中のひよこ" },
      { value: 1800,  label: "30分の達人" },
      { value: 3600,  label: "1時間の壁を超えた" },
      { value: 18000, label: "5時間の探求者" },
      { value: 36000, label: "10時間の求道者" },
    ],
  },
];