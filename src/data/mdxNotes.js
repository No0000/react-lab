const mdxFiles = import.meta.glob("../content/notes/*.mdx", {
  eager: true,
});

export const mdxNotes = Object.entries(mdxFiles)
  .map(([path, mod], index) => {
    const metadata = mod.metadata || {};
    const toc = mod.toc || [];

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