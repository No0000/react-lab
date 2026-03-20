import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  const categoryColor = {
    React: "#61dafb",
    JavaScript: "#f7df1e",
    Git: "#f05032",
    Illustration: "#98fb98",
    Note: "#ffd991"
  };

  return (
    <Link
      to={`/notes/${note.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="note-card">
        <p className="note-card-meta">
          <span
            className="note-card-category"
            style={{ backgroundColor: categoryColor[note.category] || "#eee" }}
          >
            {note.category}
          </span>
          {note.date}
        </p>

        <h2 className="note-card-title">
          {note.title}
        </h2>

        <p className="note-card-summary">{note.summary}</p>
      </article>
    </Link>
  );
}
