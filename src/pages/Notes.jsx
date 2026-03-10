import { useState } from "react";
import { notes } from "../data/notes";
import NoteCard from "../components/NoteCard";
import PageHeader from "../components/PageHeader";

const categories = [
  {id: 1, category: "React"},
  {id: 2, category: "JavaScript"},
  {id: 3, category: "Git"},
];

export default function Notes() {
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const filteredNotes = notes.filter((note) => {
    const matchText =
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchText.toLowerCase()) ||
      note.category.toLowerCase().includes(searchText.toLowerCase());

    const matchCategory =
      searchCategory === "all" || note.category === searchCategory;

    return matchText && matchCategory;
  });


  return (
    <div className="container">
      <PageHeader
        title="Notes"
        description="学んだことや詰まったことをまとめています。"
      />

      <input
        type="text"
        placeholder="検索..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "24px",
          fontSize: "16px",
        }}
      />


      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        <button
          className={searchCategory === "all" ? "category-button active" : "category-button"}
          onClick={() => setSearchCategory("all")}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            className={searchCategory === c.category ? "category-button active" : "category-button"}
            onClick={() => setSearchCategory(c.category)}
          >
            {c.category}
          </button>
        ))}
      </div>



      {filteredNotes.length === 0 ? (
        <p>該当するノートがありません。</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}