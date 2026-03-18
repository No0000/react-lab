import { allNotes } from "../data/allNotes";
import NoteCard from "../components/NoteCard";
import { challenges } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

export default function Home() {
  const latestNotes = allNotes.slice(0, 3);

  return (
    <div className="container">

      <PageHeader
        title="なおらぼ"
        description="フロントエンドエンジニアに転職を目指して現在無職で時間がある今のうちにやりたいことやる人生最後の夏休みをまとめたブログです。"
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

      <section style={{ marginBottom: "32px" }}>
        <h2>1000時間チャレンジ</h2>
        <p>どれだけ時間をかけてきたかをご紹介</p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      </section>
    </div>
  );
}