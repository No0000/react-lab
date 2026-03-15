export default function Callout({ title = "メモ", children }) {
  return (
    <div
      style={{
        margin: "24px 0",
        padding: "16px 18px",
        borderRadius: "14px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
      }}
    >
      <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>{title}</p>
      <div>{children}</div>
    </div>
  );
}