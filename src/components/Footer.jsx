export default function Footer() {
  const now = new Date();
  const year = now.getFullYear();
  const siteName = "なおらぼ";

  return (
    <footer
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
      }}
    >
      <small>&copy; {year} {siteName}</small>

      <a
        href="https://x.com/naolabs2026"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* Xアイコン */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="black"
        >
          <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.828l-5.34-6.93L4.5 22H1.244l8.02-9.164L1 2h6.828l4.83 6.29L18.244 2Zm-1.197 18h1.803L7.02 3.902H5.086l11.96 16.098Z"/>
        </svg>
      </a>
    </footer>
  );
}