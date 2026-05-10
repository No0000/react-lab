import CharacterPanel from "../components/CharacterPanel";
import WeatherWidget from "../components/WeatherWidget";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";

export default function Home({allTasks, setAllTasks, data, setData}) {
  return (
    <div className="bg-white w-full max-w-sm">
      <WeatherWidget />
      <div className="flex gap-2 border border-sky-200 rounded-xl">
        <div className="w-1/2">
          <CharacterPanel data={data} />
        </div>
        <div className="w-1/2 bg-sky-300/75">
          <TaskList allTasks={allTasks} setAllTasks={setAllTasks} data={data} setData={setData} />
        </div>

      </div>
      <AddTaskForm allTasks={allTasks} setAllTasks={setAllTasks} />
    </div>
  );
}