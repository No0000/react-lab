export default function TalkCharacter({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        margin: "20px 0",
      }}
      >
      <img
        style={{
          transform: "scaleX(-1)",
          width: "70px",
          height: "70px",
          borderRadius: "999px",
          objectFit: "cover",
          flexShrink: 0,
        }}
        src="/favicon.png"
        alt="character-image"
      />
      <p
        style={{
          margin: 0,
          padding: "0px 16px",
          border: "2px solid black",
          borderRadius: "20px",
          backgroundColor: "#fff",
          maxWidth: "420px",
          lineHeight: 1.6,
        }}
      >
        {children}
      </p>

    </div>
  );
}