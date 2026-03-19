import { Link } from "react-router-dom";

export default function ArticleInternalLinkCard({
  to,
  title,
  description,
  label = "Related Note",
}) {
  return (
    <Link to={to} className="article-link-card article-link-card-internal">
      <span className="article-link-label">{label}</span>
      <h3 className="article-link-title">{title}</h3>
      <p className="article-link-description">{description}</p>
      <span className="article-link-arrow">記事を読む →</span>
    </Link>
  );
}
