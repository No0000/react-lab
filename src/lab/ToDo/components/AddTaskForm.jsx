import { useState } from "react";

export default function AddTaskForm({allTasks, setAllTasks}) {
  const [task, setTask] = useState("");
  
  function handleClick() {
    const newTask = { id: Date.now(), name: task, done: false };
    setAllTasks([...allTasks, newTask]);
    setTask("");
  }

  return (
    <div>
      <h1>AddTaskForm</h1>
      <div>
        AddTaskName :
        <input
          onChange={e => setTask(e.target.value)}
          value={task}
          type="text" 
        />
        <button onClick={handleClick}>AddTask</button>
      </div>
    </div>

  );
}