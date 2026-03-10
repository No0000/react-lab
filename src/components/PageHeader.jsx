export default function PageHeader({ title, description }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h1 style={{ marginBottom: "8px" }}>{title}</h1>
      <p style={{ marginTop: 0, color: "#666" }}>
        {description}
      </p>
    </div>
  );
}