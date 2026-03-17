export default function ChallengeCard({ challenge }) {
  const progress = Math.min(
    (challenge.totalHours / challenge.goalHours) * 100,
    100
  );

  const remainingHours = Math.max(
    challenge.goalHours - challenge.totalHours,
    0
  );

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "14px",
        padding: "14px",
        width: "260px",
        fontSize: "14px",
      }}
    >
      <h3>{challenge.name}</h3>
      {/* 時間 */}
      <div style={{ marginBottom: "6px", color: "#555" }}>
        {challenge.totalHours}h / {challenge.goalHours}h
      </div>

      {/* プログレスバー */}
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#eee",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#222",
          }}
        />
      </div>

      {/* 残り */}
      <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>
        残り {remainingHours}h
      </div>

      {/* コメント */}
      <div
        style={{
          fontSize: "12px",
          color: "#666",
          lineHeight: 1.4,
        }}
      >
        {challenge.comment}
      </div>
    </div>
  );
}