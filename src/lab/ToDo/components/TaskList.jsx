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

  const toptTask = (isCheck) => {
    if (isCheck === false && filteredTasks.length > 0) {
      return <div key={filteredTasks[0].id}>{filteredTasks[0].name} <input type="checkbox" checked={filteredTasks[0].done} onChange={() => handleChange(filteredTasks[0].id)} /></div>;
    } else if (isCheck === false && filteredTasks.length <= 0) {
      return "現在タスクはありません";
    } else {
      return;
    }
  }

  return (
    <>
      <h2>{titleName}</h2>
      {toptTask(isCheck)}
      <ul>
        {/* 現状のタスクを一つ、それ以外の残りを表させるためにsliceを使用。AllTaskとdoneTaskの時は0でsliceをしない */}
        {filteredTasks.slice(isCheck === false ? 1 : 0).map((item) => (
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

    if (doneCheck) {
      const today = new Date().toDateString();
      // data.lastCompletedにデータが入っていれば変換したデータを返す。そうでなければnull
      const lastCompleted = data.lastCompleted ? new Date(data.lastCompleted).toDateString() : null;

      // 今日が既に完了済みなら何もしない
      if (today === lastCompleted) return;

      // 昨日完了していたかチェック
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // getDate -> 日にちを返す。-1しているので前日 setDate -> 数字を置き変え暦上正しくなるよう解釈する 0なら先月の最終日になる 5/1 -> 4/30
      const isConsecutive = lastCompleted === yesterday.toDateString();// toLocaleDateString -> 日時のフォーマット

      const newStreak = isConsecutive ? data.streak + 1 : 1; // data.streak + 1は書き換えてはいない。

      setData(prev => 
        ({
          ...prev,
          streak: newStreak, 
          lastCompleted: new Date().toDateString(), // 現在時刻を返す 例：2026-05-10T02:17:54.072Z
          trust: isConsecutive ? prev.trust + newStreak :  prev.trust - 1,  // 連続記録が途絶えたら-1する。isConsectiveには続いているかのtrue falseが入っているのでそれを使う。
        })
      );
    }
  }, [allTasks, data, setData]);

  return (
    <div>
      <h1>TaskList</h1>
      <List allTasks={allTasks} setAllTasks={setAllTasks} titleName={"Tasks"} isCheck={false} />
    </div>
  ); 
}