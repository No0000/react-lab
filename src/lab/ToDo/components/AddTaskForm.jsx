import { useState } from "react";

export default function AddTaskForm({allTasks, setAllTasks}) {
  const [task, setTask] = useState("");
  
  function handleClick() {
    const newTask = { id: Date.now(), name: task, done: false };
    setAllTasks([...allTasks, newTask]);
    setTask("");
  }

  return (
    <div className="p-5 bg-white border border-sky-200 rounded-xl shadow-md max-w-md">
      <h1 className="text-base font-semibold text-sky-700 mb-3 tracking-wide">タスクを追加</h1>
      <div className="flex gap-2">
        <input
          onChange={e => setTask(e.target.value)}
          value={task}
          type="text"
          placeholder="タスク名を入力..."
          className="flex-1 px-4 py-2 border border-sky-300 rounded-lg bg-sky-50 text-gray-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition"
        />
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-sky-400 text-white font-semibold rounded-lg hover:bg-sky-500 active:scale-95 transition"
        >
          追加
        </button>
      </div>
    </div>
  );
}