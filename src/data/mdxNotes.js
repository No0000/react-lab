const mdxFiles = import.meta.glob("../content/notes/*.mdx", {
  eager: true,
});

const rawMdxFiles = import.meta.glob("../content/notes/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "").trim();
}

function normalizeRawSource(source) {
  if (typeof source === "string") {
    return source;
  }

  if (source && typeof source.default === "string") {
    return source.default;
  }

  return "";
}

function extractTocFromSource(source) {
  const headingPattern = /<h([1-3])\s+id="([^"]+)">([\s\S]*?)<\/h\1>/g;
  const normalizedSource = normalizeRawSource(source);

  return Array.from(normalizedSource.matchAll(headingPattern)).map((match) => ({
    id: match[2],
    text: stripTags(match[3]),
    level: Number(match[1]),
  }));
}

function extractTocFromComponentSource(component) {
  const componentSource = String(component ?? "");
  const headingPattern =
    /jsx[s]?\("h([1-3])",\s*\{id:"([^"]+)",children:"([^"]+)"\}\)/g;

  return Array.from(componentSource.matchAll(headingPattern)).map((match) => ({
    id: match[2],
    text: match[3].trim(),
    level: Number(match[1]),
  }));
}

export const mdxNotes = Object.entries(mdxFiles)
  .map(([path, mod], index) => {
    const metadata = mod.metadata || {};
    const rawSource = rawMdxFiles[path];
    const extractedToc = extractTocFromSource(rawSource);
    const fallbackToc = extractTocFromComponentSource(mod.default);
    const toc =
      extractedToc.length > 0
        ? extractedToc
        : fallbackToc.length > 0
          ? fallbackToc
          : mod.toc || [];

    return {
      id: index + 1,
      title: metadata.title || "No Title",
      slug: metadata.slug || path.split("/").pop().replace(".mdx", ""),
      date: metadata.date || "",
      category: metadata.category || "Note",
      summary: metadata.summary || "",
      tags: metadata.tags || [],
      toc,
      Component: mod.default,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));
