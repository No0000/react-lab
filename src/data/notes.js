const noteFiles = import.meta.glob("../content/notes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---([\s\S]*?)---/);

  if (!match) {
    return { data: {}, content: raw };
  }

  const frontmatter = match[1];
  const content = raw.slice(match[0].length).trim();

  const data = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key) return;

    data[key.trim()] = rest.join(":").trim();
  });

  return { data, content };
}

function parseNote(raw, path, index) {
  const { data, content } = parseFrontmatter(raw);

  return {
    id: index + 1,
    title: data.title || "No Title",
    slug: data.slug || path.split("/").pop().replace(".md", ""),
    date: data.date || "",
    category: data.category || "Note",
    summary: data.summary || "",
    tags: [],
    content,
  };
}

export const notes = Object.entries(noteFiles)
  .map(([path, raw], index) => parseNote(raw, path, index))
  .sort((a, b) => new Date(b.date) - new Date(a.date));