import { useState } from "react";
import { allNotes } from "../data/allNotes";
import NoteCard from "../components/NoteCard";
import PageHeader from "../components/PageHeader";

const categories = [
  {id: 1, category: "React"},
  {id: 2, category: "JavaScript"},
  {id: 3, category: "Git"},
  {id: 4, category: "Illustration"},
  {id: 5, category: "Note"},
];

export default function Notes() {
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  const filteredNotes = allNotes.filter((note) => {
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
        className="notes-search-input"
      />


      <div className="notes-filter-row">
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
