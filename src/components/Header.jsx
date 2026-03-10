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

      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span>なおらぼ</span>
        <img
          style={{ height: "40px" }}
          src="/naolabs-main.PNG"
          alt="naolab-main"
        />
      </Link>
    </header>
  );
}