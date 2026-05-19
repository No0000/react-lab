import { useNavigate, useLocation } from "react-router-dom";

export default function BottomMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: "ti-home", label: "ホーム", path: "/lab/todo" },
    { icon: "ti-list-check", label: "タスク", path: "/lab/todo/tasks" },
    { icon: "ti-trophy", label: "実績", path: "/lab/todo/achievements" },
    { icon: "ti-settings", label: "設定", path: "/lab/todo/settings" },
  ];

  return (
    <div className="grid grid-cols-4 gap-0"
      style={{
        background: "#141418", 
        borderTop: "1px solid #3a3a4a", 
        zIndex: 10,
        flexShrink: 0
      }}>
      {items.map((item) => (
        <button key={item.label}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center gap-1 py-3"
          style={{
            borderTop: location.pathname === item.path ? "2px solid #b4a064" : "2px solid transparent",
            background: location.pathname === item.path ? "rgba(180,160,100,0.1)" : "transparent",
          }}>
          <i className={`ti ${item.icon}`}
            style={{ fontSize: "20px", color: location.pathname === item.path ? "#b4a064" : "#6a6a7a" }} />
          <span style={{ fontSize: "10px", color: location.pathname === item.path ? "#b4a064" : "#6a6a7a" }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}