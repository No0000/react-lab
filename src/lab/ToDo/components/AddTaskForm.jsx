import { useState } from "react";

export default function AddTaskForm({ allTasks, setAllTasks, data }) {
  const [task, setTask] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  function handleTagToggle(tag) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  function handleClick() {
    if (!task.trim()) return;
    const newTask = { id: Date.now(), name: task, done: false };
    setAllTasks([...allTasks, newTask]);
    setTask("");
  }

  return (
    <div style={{ padding: "12px", background: "#141418", borderTop: "1px solid #3a3a4a" }}>

      {/* タグ選択 */}
      <div style={{display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px"}}>
        {(data?.tags ?? []).map((tag) => (
          <button key={tag}
            onClick={() => handleTagToggle(tag)}
            style={{
              padding: "4px 10px", fontSize: "11px", cursor: "pointer",
              background: selectedTags.includes(tag) ? "rgba(180,160,100,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${selectedTags.includes(tag) ? "#b4a064" : "#3a3a4a"}`,
              color: selectedTags.includes(tag) ? "#b4a064" : "#6a6a7a",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 入力＋追加ボタン */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          onChange={e => setTask(e.target.value)}
          value={task}
          type="text"
          placeholder="タスク名を入力..."
          style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid #4a4a5a", padding: "8px 12px", fontSize: "13px", color: "#e8e0cc", outline: "none" }}
        />
        <button onClick={handleClick}
          style={{ padding: "8px 16px", background: "rgba(180,160,100,0.15)", border: "1px solid #b4a064", color: "#b4a064", fontSize: "13px", cursor: "pointer" }}>
          追加
        </button>
      </div>
    </div>
  );
}