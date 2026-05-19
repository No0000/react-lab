import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import BottomMenu from "../components/BottomMenu";
import { useState } from "react";

export default function Tasks({ allTasks, setAllTasks, data, setData }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="relative w-full flex flex-col"
      style={{ position: "fixed", inset: 0, background: "#1a1a22", overflow: "hidden" }}>

      <div className="px-4 py-4" style={{ borderBottom: "1px solid #3a3a4a" }}>
        <h1 style={{ color: "#e8e0cc", fontSize: "16px", fontWeight: 500 }}>タスク</h1>
        <button onClick={() => setIsFilterOpen(!isFilterOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px"}}
        >
          <i className="ti ti-menu-2" style={{color: "#e8e0cc", fontSize: "20px"}} />
        </button>
        {selectedFilters.length > 0 && (
          <div style={{display: "flex", alignItems: "center", fontSize: "10px"}}>
            <p style={{color: "#6a6a7a"}}>フィルター：</p>
            {selectedFilters.map((filterTag) => (
              <div key={filterTag} style={{display: "flex", gap: "4px", flexWrap: "wrap"}}>
                <span style={{ color: "#6a6a7a", border: "1px solid #3a3a4a", padding: "2px 6px"}}>{filterTag}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <TaskList
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          data={data}
          setData={setData}
          onTaskClick={(taskId) => navigate(`/lab/todo/timer/${taskId}`)}
          selectedFilters={selectedFilters}
        />
      </div>

      <div style={{ borderTop: "1px solid #3a3a4a" }}>
        <AddTaskForm allTasks={allTasks} setAllTasks={setAllTasks} data={data} />
      </div>

    {/* フィルターオーバーレイ */}
    {isFilterOpen && (
      <div 
        onClick={() => setIsFilterOpen(false)}
        style={{position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 10}}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{position: "abusolute", top: "50%", left: "50%", Transform: "translate(-50%, -50%)", background: "#1e1e2a", border: "1px solid 3a3a4a", padding: "20px", width: "280px"}}>
          
          <p style={{color: "#e8e0cc", fontSize: "14px", fontWeight: 500, marginBottom: "12px"}}>タグで絞り込む</p>

          <div style={{display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px"}}>
            {(data?.tags ?? []).map((tag) => (
              <button key={tag}
                onClick={() => setSelectedFilters(prev =>
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                style={{
                  padding: "6px 12px", fontSize: "12px", cursor: "pointer",
                  background: selectedFilters.includes(tag) ? "rgba(180,160,100,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selectedFilters.includes(tag) ? "#b4a064" : "#3a3a4a"}`,
                  color: selectedFilters.includes(tag) ? "#b4a064" : "#6a6a7a",
                }}>
                {tag}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setSelectedFilters([])}
              style={{ flex: 1, padding: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid #3a3a4a", color: "#6a6a7a", fontSize: "12px", cursor: "pointer" }}>
              リセット
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              style={{ flex: 1, padding: "8px", background: "rgba(180,160,100,0.15)", border: "1px solid #b4a064", color: "#b4a064", fontSize: "12px", cursor: "pointer" }}>
              適用
            </button>
          </div>
        </div>  
      </div>
    )}

      <BottomMenu />
    </div>
  );
}