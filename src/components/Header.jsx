import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "16px 24px", backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}