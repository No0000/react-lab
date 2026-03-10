export default function Footer() {
  const now = new Date();
  const year = now.getFullYear();
  const siteName = "lab";

  return (
    <footer style={{height: "60px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderTop: "1px solid #ddd" }}>
      <small>&copy; {year} {siteName} All Rights Reserved.</small>
    </footer>
  );
}