import CharacterPanel from "../components/CharacterPanel";
import WeatherWidget from "../components/WeatherWidget";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";

export default function Home({allTasks, setAllTasks, data, setData}) {
  return (
    <div>
      <CharacterPanel data={data} />
      <WeatherWidget />
      <TaskList allTasks={allTasks} setAllTasks={setAllTasks} data={data} setData={setData} />
      <AddTaskForm allTasks={allTasks} setAllTasks={setAllTasks} />
    </div>
  );
}