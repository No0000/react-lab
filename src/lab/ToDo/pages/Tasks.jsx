import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import BottomMenu from "../components/BottomMenu";

export default function Tasks({ allTasks, setAllTasks, data, setData }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-sm min-h-screen flex flex-col"
      style={{ background: "#1a1a22" }}>

      <div className="px-4 py-4" style={{ borderBottom: "1px solid #3a3a4a" }}>
        <h1 style={{ color: "#e8e0cc", fontSize: "16px", fontWeight: 500 }}>タスク</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <TaskList
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          data={data}
          setData={setData}
          onTaskClick={(taskId) => navigate(`/lab/todo/timer/${taskId}`)}
        />
      </div>

      <div style={{ borderTop: "1px solid #3a3a4a" }}>
        <AddTaskForm allTasks={allTasks} setAllTasks={setAllTasks} data={data} />
      </div>

      <BottomMenu />
    </div>
  );
}