import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notes } from "../data/notes";

function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-ぁ-んァ-ン一-龠]/g, "");
}

function extractHeadings(markdown) {
  const lines = markdown.split("\n");

  return lines
    .map((line) => {
      const h2Match = line.match(/^##\s+(.*)/);
      if (h2Match) {
        return {
          level: 2,
          text: h2Match[1],
          id: createSlug(h2Match[1]),
        };
      }

      const h1Match = line.match(/^#\s+(.*)/);
      if (h1Match) {
        return {
          level: 1,
          text: h1Match[1],
          id: createSlug(h1Match[1]),
        };
      }

      return null;
    })
    .filter(Boolean);
}

export default function NoteDetail() {
  const { slug } = useParams();

  const note = notes.find((item) => item.slug === slug);

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

  const headings = extractHeadings(note.content);

  return (
    <div className="note-page">
      <div className="note-shell">
        <aside className="note-toc">
          <p className="note-toc-title">目次</p>

          {headings.length === 0 ? (
            <p>見出しはありません。</p>
          ) : (
            <ul>
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={
                    heading.level === 2 ? "toc-item toc-item-sub" : "toc-item"
                  }
                >
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <article className="note-detail">
          <Link to="/notes" className="back-button">
            ← Notesに戻る
          </Link>

          <p className="note-meta">
            <span className="note-meta-inner">
              {note.category} / {note.date}
            </span>
          </p>

          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1({ children }) {
                  const text = String(children);
                  const id = createSlug(text);
                  return <h1 id={id}>{children}</h1>;
                },
                h2({ children }) {
                  const text = String(children);
                  const id = createSlug(text);
                  return <h2 id={id}>{children}</h2>;
                },
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  if (!inline && match) {
                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {note.content}
            </ReactMarkdown>
          </div>

          <Link to="/notes" className="back-button">
            ← Notesに戻る
          </Link>
        </article>
      </div>
    </div>
  );
}