export default function ImageFrame({ src, alt, caption }) {
  return (
    <figure style={{ margin: "32px 0" }}>
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "16px",
          padding: "12px",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            width: "100%",
            borderRadius: "12px",
          }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}