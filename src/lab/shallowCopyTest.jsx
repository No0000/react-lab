const greetingList = [
  {id:0, title: "Hello."},
  {id:1, title: "Nice to meet you."},
  {id:2, title: "Good evening."},
  {id:3, title: "See you again!"}
].reverse();

export default function Test() {
  return (
    <ul>
      {greetingList.map((g) => (
        <li key={g.id}>
          id：{g.id}
          <br></br>
          title：{g.title}
        </li>
      ))}
    </ul>
  );
}