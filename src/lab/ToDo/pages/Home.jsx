import CharacterPanel from "../components/CharacterPanel";
import WeatherWidget from "../components/WeatherWidget";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import useTaskManager from "../hooks/useTaskManager";
import useTrust from "../hooks/useTrust";

export default function Home() {
  const [allTasks, setAllTasks] = useTaskManager("tasks"); // 別々のファイルでそれぞれ呼ぶとlocalStorageは共有されるが状態は独立してしまう。一つにまとめておくこと。[parsed]にしてしまうと二重カッコとなって配列の中に配列となってしまう。tasks->useTaskManagerに送るlocalStorageのキー
  const [data, setData] = useTrust("data");

  return (
    <div>
      <CharacterPanel />
      <WeatherWidget />
      <TaskList allTasks={allTasks} setAllTasks={setAllTasks} data={data} setData={setData} />
      <AddTaskForm allTasks={allTasks} setAllTasks={setAllTasks} />
    </div>
  );
}