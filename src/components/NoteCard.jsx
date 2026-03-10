import { Link } from "react-router-dom";

export default function NoteCard({ note }) {
  const categoryColor = {
    React: "#61dafb",
    JavaScript: "#f7df1e",
    Git: "#f05032"
  };

  return (
    <Link
      to={`/notes/${note.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="note-card">
        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 8px",
              borderRadius: "999px",
              backgroundColor: categoryColor[note.category] || "#eee",
              fontSize: "12px",
              marginRight: "8px",
            }}
          >
            {note.category}
          </span>
          {note.date}
        </p>

        <h2 style={{ marginTop: "8px", marginBottom: "16px", fontSize: "20px", height: "50px" }}>
          {note.title}
        </h2>

        <p style={{ margin: 0, height: "70px" }}>{note.summary}</p>
      </article>
    </Link>
  );
}