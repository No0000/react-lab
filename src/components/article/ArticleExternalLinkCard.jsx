export default function ArticleExternalLinkCard({
  href,
  title,
  description,
  domainLabel = "External Link",
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="article-link-card article-link-card-external"
    >
      <span className="article-link-label">{domainLabel}</span>
      <h3 className="article-link-title">{title}</h3>
      <p className="article-link-description">{description}</p>
      <span className="article-link-arrow">外部サイトを開く ↗</span>
    </a>
  );
}
