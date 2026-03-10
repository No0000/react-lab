import PageHeader from "../components/PageHeader";

export default function Projects() {
  return (
    <div className="container">
      <PageHeader
        title="Projects"
        description="作ったアプリやゲームを置いています"
      />


      <div>
        <h2>じゃんけんゲーム</h2>
        <p>Reactで作ったミニゲーム</p>
        <button>Play</button>
      </div>
    </div>  
  );
}