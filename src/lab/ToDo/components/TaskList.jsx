import { useEffect } from "react";

function List({ allTasks, setAllTasks, isCheck, onTaskClick }) {
  function handleChange(doneId) {
    setAllTasks(allTasks.map((item) =>
      item.id === doneId ? { ...item, done: !item.done } : item
    ));
  }

  function handleDelete(deleteId) {
    setAllTasks(allTasks.filter((item) => item.id !== deleteId));
  }

  const filteredTasks = isCheck === null
    ? allTasks
    : allTasks.filter((item) => item.done === isCheck);

  if (filteredTasks.length === 0) {
    return <p style={{ color: "#6a6a7a", fontSize: "13px", textAlign: "center", padding: "16px 0" }}>タスクはありません</p>;
  }

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {filteredTasks.map((item) => (
        <div key={item.id}>
          <li
            onClick={() => onTaskClick(item.id)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid #3a3a4a", padding: "10px 14px", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                onClick={(e) => { e.stopPropagation(); handleChange(item.id); }}
                style={{
                  width: "16px", height: "16px", border: "1px solid",
                  borderColor: item.done ? "#b4a064" : "#6a6a7a",
                  background: item.done ? "rgba(180,160,100,0.2)" : "transparent",
                  flexShrink: 0, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                {item.done && <i className="ti ti-check" style={{ fontSize: "11px", color: "#b4a064" }} />}
              </div>
              <span style={{ fontSize: "13px", color: item.done ? "#6a6a7a" : "#e8e0cc", textDecoration: item.done ? "line-through" : "none" }}>
                {item.name}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
              style={{ fontSize: "11px", color: "#6a6a7a" }}>
              削除
            </button>
          </li>
          <div style={{display: "flex"}}>
            {item.tags?.length > 0 && (
              item.tags.map((tag) => (
                <div key={tag} style={{display: "flex", gap: "4px", flexWrap: "wrap"}}>
                  <span style={{fontSize: "10px", color: "#6a6a7a", border: "1px solid #3a3a4a", padding: "2px 6px"}}>{tag}</span>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </ul>
  );
}

export default function TaskList({ allTasks, setAllTasks, data, setData, onTaskClick, selectedFilters }) {
  useEffect(() => {
    const doneCheck = allTasks.length > 0 && allTasks.every((item) => item.done === true);
    if (doneCheck) {
      const today = new Date().toDateString();
      setData(prev => {
        const lastCompleted = prev.lastCompleted ? new Date(prev.lastCompleted).toDateString() : null;
        if (today === lastCompleted) return prev;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = lastCompleted === yesterday.toDateString();
        const newStreak = isConsecutive ? prev.streak + 1 : 1;
        return {
          ...prev,
          streak: newStreak,
          lastCompleted: new Date().toDateString(),
          trust: isConsecutive ? prev.trust + newStreak : prev.trust - 1,
        };
      });
    }
  }, [allTasks, setData]);

  const filterdByTag = selectedFilters.length === 0
    ? allTasks
    : allTasks.filter((item) => item.tags?.some(tag => selectedFilters.includes(tag)));

  return (
    <div style={{ padding: "12px" }}>
      <p style={{ fontSize: "11px", color: "#6a6a7a", marginBottom: "8px" }}>未完了</p>
      <div style={{maxHeight: "240px", overflowY: "auto"}}>
        <List allTasks={filterdByTag} setAllTasks={setAllTasks} isCheck={false} onTaskClick={onTaskClick ?? (() => {})} />
      </div>

      <p style={{ fontSize: "11px", color: "#6a6a7a", margin: "16px 0 8px" }}>完了</p>
      <div style={{maxHeight: "240px", overflowY: "auto"}}>
        <List allTasks={filterdByTag} setAllTasks={setAllTasks} isCheck={true} onTaskClick={onTaskClick ?? (() => {})} />

      </div>
    </div>
  );
}