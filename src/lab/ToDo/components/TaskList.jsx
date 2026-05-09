import { useEffect } from "react";

function List({allTasks, setAllTasks, titleName, isCheck}) {
  function handleChange(doneId) {
    setAllTasks(allTasks.map((item) => {
      if (item.id === doneId) {
        return {...item, done: !item.done}; // mapの中で条件式を書くときはreturnが必要。また、オブジェクトをコピーしてから書き換えること（item.done = trueはよくない）
      }
      return item; // 何もなければそのままを返す
    }))
  }

  function handleDelete(deleteId) {
    setAllTasks(allTasks.filter((item) => item.id !== deleteId)); // filterだけで十分 {}をで囲む時とそのままで書くときの違いはreturnをするような処理を書くとき。そうでないなら、囲わずにそのままデータを返すようにする。
  }

  const filteredTasks = isCheck === null
    ? allTasks
    : allTasks.filter((item) => item.done === isCheck);

  return (
    <>
      <h2>{titleName}</h2>
      <ul>
        {filteredTasks.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.done} onChange={() => handleChange(item.id)}/> {/* onClickにするとReactが状態を管理すると解釈してchecedのエラーが出る。エラーの内容はonChangeがないと値を変えようとしても変えられない読み取り専用フィールドになるよ。*/}
            {item.name}
            <button
              style={{marginLeft: "30px"}}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function TaskList({allTasks, setAllTasks, data, setData}) {
  useEffect(() => {
    const doneCheck = allTasks.length > 0 &&  allTasks.every((item) => item.done === true); // Object.entriesはオブジェクトとキーのペアに変換するメソッド。使っても動くが配列ならeveryにする。また、タスクが0件の時にtrueをeveryは返してしまうため、それを防ぐためにlenghtで0ならfalseを返させる。

    if (doneCheck === true) {
      const now = new Date();
      setData(prev => 
        ({
          ...prev,
          streak: prev.streak + 1,
          lastCompleted: now.toLocaleString("ja-JP"),
        })
      );
      console.log(data);
    }
  }, [allTasks, data, setData]);

  return (
    <div>
      <h1>TaskList</h1>
      <List allTasks={allTasks} setAllTasks={setAllTasks} titleName={"AllTasks"} isCheck={null} />
      <List allTasks={allTasks} setAllTasks={setAllTasks} titleName={"Tasks"} isCheck={false} />
      <List allTasks={allTasks} setAllTasks={setAllTasks} titleName={"DoneTasks"} isCheck={true} />
    </div>
  ); 
}