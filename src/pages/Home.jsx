import { notes } from "../data/notes";
import NoteCard from "../components/NoteCard";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Home() {
  const latestNotes = [...notes].reverse().slice(0, 3);

  return (
    <div className="container">

      <PageHeader
        title="なおらぼ"
        description="Reactを学びながら作ったものや学習ログ、趣味のイラストなどまとめているブログ的なものです"
      />

      <h2>Latest Notes</h2>

      <div className="notes-grid">
        {latestNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      <div style={{ marginTop: "16px" }}>
        <Link to="/notes">→ すべてのNotesを見る</Link>
      </div>

    </div>
  );
}