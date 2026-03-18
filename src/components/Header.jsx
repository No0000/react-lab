import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        padding: "16px 24px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
      </nav>

      <div style={{ display: "flex"}}>
        <a
        href="https://x.com/naolabs2026"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", paddingRight: "10px" }}
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

        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>なおらぼ</span>
          <img
            style={{ height: "40px" }}
            src="/naolabs-main.PNG"
            alt="naolab-main"
          />
        </Link>
      </div>
      
    </header>
  );
}