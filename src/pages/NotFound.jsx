import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1>404</h1>
      <p>ページが見つかりません。</p>

      <Link to="/" className="back-button">
        ホームに戻る
      </Link>
    </div>
  );
}