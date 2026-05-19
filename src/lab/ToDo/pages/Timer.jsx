import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PRESETS = [5, 15, 25, 50];

export default function Timer({ allTasks, setAllTasks, data, setData }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = allTasks.find((item) => item.id === Number(taskId));

  const [limitSec, setLimitSec] = useState(25 * 60);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleSave(completed) {
    setIsRunning(false);
    const record = {
      taskId: task.id,
      taskName: task.name,
      date: new Date().toLocaleDateString("ja-JP"),
      duration: elapsed,
      completed,
    };

    // タスク完了の場合はdoneをtrueにする
    if (completed) {
      setAllTasks(allTasks.map((item) =>
        item.id === task.id ? { ...item, done: true } : item
      ));
    }

    setData(prev => ({
      ...prev,
      workRecords: [...(prev.workRecords ?? []), record],
      trust: completed ? prev.trust + 3 : prev.trust,
    }));
    navigate("/lab/todo/tasks");
  }

  if (!task) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#1a1a22", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6a6a7a" }}>タスクが見つかりません</p>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#1a1a22", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", gap: "32px", overflowY: "auto" }}>

      {/* タスク名 */}
      <p style={{ color: "#6a6a7a", fontSize: "13px" }}>{task.name}</p>

      {/* タイマー表示 */}
      <div onClick={() => !isRunning && setIsEditingTime(true)}
        style={{ cursor: isRunning ? "default" : "pointer", textAlign: "center" }}>
        <p style={{ fontSize: "64px", fontWeight: 500, color: "#e8e0cc", letterSpacing: "4px", margin: 0 }}>
          {formatTime(elapsed)}
        </p>
        <p style={{ fontSize: "12px", color: "#6a6a7a", marginTop: "4px" }}>
          ／ {formatTime(limitSec)}
        </p>
      </div>

      {/* カスタム時間入力 */}
      {isEditingTime && (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="number"
            placeholder="分を入力"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            style={{ width: "100px", background: "rgba(255,255,255,0.05)", border: "1px solid #4a4a5a", padding: "6px 10px", color: "#e8e0cc", fontSize: "13px", outline: "none" }}
          />
          <button
            onClick={() => {
              const min = parseInt(customInput);
              if (min > 0) setLimitSec(min * 60);
              setIsEditingTime(false);
              setCustomInput("");
            }}
            style={{ padding: "6px 12px", background: "rgba(180,160,100,0.15)", border: "1px solid #b4a064", color: "#b4a064", fontSize: "13px", cursor: "pointer" }}>
            OK
          </button>
        </div>
      )}

      {/* プリセット */}
      <div style={{ display: "flex", gap: "8px" }}>
        {PRESETS.map((min) => (
          <button key={min}
            onClick={() => { setLimitSec(min * 60); setElapsed(0); setIsRunning(false); }}
            style={{
              padding: "6px 12px",
              background: limitSec === min * 60 ? "rgba(180,160,100,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${limitSec === min * 60 ? "#b4a064" : "#3a3a4a"}`,
              color: limitSec === min * 60 ? "#b4a064" : "#6a6a7a",
              fontSize: "12px", cursor: "pointer"
            }}>
            {min}分
          </button>
        ))}
      </div>

      {/* 開始・一時停止 */}
      {!isRunning ? (
        <button onClick={() => setIsRunning(true)}
          style={{ padding: "12px 48px", background: "rgba(180,160,100,0.15)", border: "1px solid #b4a064", color: "#b4a064", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}>
          開始
        </button>
      ) : (
        <button onClick={() => setIsRunning(false)}
          style={{ padding: "12px 48px", background: "rgba(255,255,255,0.04)", border: "1px solid #4a4a5a", color: "#e8e0cc", fontSize: "15px", cursor: "pointer" }}>
          一時停止
        </button>
      )}

      {/* タスク完了・やめる */}
      <div style={{ display: "flex", gap: "16px" }}>
        <button onClick={() => handleSave(true)}
          style={{ padding: "10px 24px", background: "rgba(180,160,100,0.15)", border: "1px solid #b4a064", color: "#b4a064", fontSize: "13px", cursor: "pointer" }}>
          タスク完了
        </button>
        <button onClick={() => handleSave(false)}
          style={{ padding: "10px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid #3a3a4a", color: "#6a6a7a", fontSize: "13px", cursor: "pointer" }}>
          やめる
        </button>
      </div>

      {/* 戻る */}
      <button onClick={() => navigate("/lab/todo/tasks")}
        style={{ fontSize: "12px", color: "#6a6a7a", background: "none", border: "none", cursor: "pointer" }}>
        ← タスク一覧に戻る
      </button>

    </div>
  );
}