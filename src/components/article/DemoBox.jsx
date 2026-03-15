export default function DemoBox({ title = "デモ", children }) {
  return (
    <section
      style={{
        margin: "32px 0",
        padding: "20px",
        borderRadius: "16px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
        {title}
      </h3>
      {children}
    </section>
  );
}