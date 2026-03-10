import stateQueueContent from "../content/notes/react-state-queue.md?raw";
import shallowCopyContent from "../content/notes/shallow-copy.md?raw";
import routerMemoContent from "../content/notes/react-router-memo.md?raw";

export const notes = [
  {
    id: 1,
    slug: "react-state-queue",
    title: "Reactのstate queueを理解した話",
    category: "React",
    summary: "setStateがすぐ反映されない理由を整理した。",
    date: "2026-03-08",
    content: stateQueueContent,
  },
  {
    id: 2,
    slug: "shallow-copy",
    title: "シャローコピーでハマった話",
    category: "JavaScript",
    summary: "配列だけコピーしても中のオブジェクトは同じ参照だった。",
    date: "2026-03-08",
    content: shallowCopyContent,
  },
  {
    id: 3,
    slug: "react-router-memo",
    title: "React Router導入メモ",
    category: "React",
    summary: "Vite環境にReact Routerを導入した時の手順。",
    date: "2026-03-08",
    content: routerMemoContent,
  },
];