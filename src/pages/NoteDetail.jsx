import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mdxNotes } from "../data/mdxNotes";

export default function NoteDetail() {
  const { slug } = useParams();
  const note = mdxNotes.find((item) => item.slug === slug);
  const articleRef = useRef(null);
  const [tocItems, setTocItems] = useState([]);

  useEffect(() => {
    if (!note || !articleRef.current) {
      setTocItems([]);
      return;
    }

    const headings = Array.from(
      articleRef.current.querySelectorAll("h1[id], h2[id], h3[id]")
    );

    setTocItems(
      headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent ?? "",
        level: Number(heading.tagName.replace("H", "")),
      }))
    );
  }, [note, slug]);

  if (!note) {
    return (
      <div className="container">
        <h1>記事が見つかりません</h1>
        <Link to="/notes" className="back-button">
          ← Notesに戻る
        </Link>
      </div>
    );
  }

  const MdxComponent = note.Component;

  const hasToc = tocItems.length > 0;
  const getTocItemClassName = (level) => {
    if (level === 3) {
      return "toc-item toc-item-sub toc-item-sub-deep";
    }

    if (level === 2) {
      return "toc-item toc-item-sub";
    }

    return "toc-item";
  };

  return (
    <div className="note-page">
      <div className={hasToc ? "note-shell" : "note-shell-single"}>
        {hasToc && (
          <aside className="note-toc">
            <p className="note-toc-title">目次</p>
            <ul>
              {tocItems.map((item) => (
                <li key={item.id} className={getTocItemClassName(item.level)}>
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <article className="note-detail">
          <Link to="/notes" className="back-button">
            ← Notesに戻る
          </Link>

          <p className="note-meta">
            <span className="note-meta-inner">
              {note.category} / {note.date}
            </span>
          </p>

          <div className="markdown-body" ref={articleRef}>
            <MdxComponent />
          </div>

          <Link to="/notes" className="back-button">
            ← Notesに戻る
          </Link>
        </article>
      </div>
    </div>
  );
}
