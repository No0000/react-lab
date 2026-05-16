import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Timer from "./pages/Timer";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import useTaskManager from "./hooks/useTaskManager";
import useTrust from "./hooks/useTrust";

export default function TodoApp() {
  const [allTasks, setAllTasks] = useTaskManager("tasks"); // 別々のファイルでそれぞれ呼ぶとlocalStorageは共有されるが状態は独立してしまう。一つにまとめておくこと。[parsed]にしてしまうと二重カッコとなって配列の中に配列となってしまう。tasks->useTaskManagerに送るlocalStorageのキー
  const [data, setData] = useTrust("data");
  useEffect(() => {
    setData(prev => ({
      ...prev,
      tags: prev.tags ?? ["勉強", "仕事", "毎日", "買い物"]
    }));
  }, [setData]);


  return (
    <Routes>
      <Route path="todo" element={<Home allTasks={allTasks} setAllTasks={setAllTasks} data={data} setData={setData} />} />
      <Route path="todo/tasks" element={<Tasks allTasks={allTasks} setAllTasks={setAllTasks} data={data} setData={setData} />} />
      <Route path="todo/achievements" element={<Achievements data={data} />} />
      <Route path="todo/settings" element={<Settings />} />
      <Route path="todo/timer/:taskId" element={<Timer allTasks={allTasks} setAllTasks={setAllTasks} data={data} setData={setData} />} />
    </Routes>
  );
}