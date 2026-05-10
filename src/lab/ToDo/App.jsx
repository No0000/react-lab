import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Stats from "./pages/Stats";
import useTaskManager from "./hooks/useTaskManager";
import useTrust from "./hooks/useTrust";

export default function TodoApp() {
  const [allTasks, setAllTasks] = useTaskManager("tasks"); // 別々のファイルでそれぞれ呼ぶとlocalStorageは共有されるが状態は独立してしまう。一つにまとめておくこと。[parsed]にしてしまうと二重カッコとなって配列の中に配列となってしまう。tasks->useTaskManagerに送るlocalStorageのキー
  const [data, setData] = useTrust("data");

  return (
    <div>
      <Routes>
        <Route
          path="/" 
          element={
            <Home 
              allTasks={allTasks} 
              setAllTasks={setAllTasks} 
              data={data} 
              setData={setData}       
            />
          } 


        />
        <Route
          path="/stats"
          element={
            <Stats
              allTasks={allTasks} 
              setAllTasks={setAllTasks} 
              data={data}
              setData={setData}
            />
          }
        />
      </Routes>
    </div>
  );
}