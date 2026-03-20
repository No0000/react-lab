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
    <div className="challenge-card">
      <h3>{challenge.name}</h3>
      {/* 時間 */}
      <div className="challenge-card-hours">
        {challenge.totalHours}h / {challenge.goalHours}h
      </div>

      {/* プログレスバー */}
      <div className="challenge-card-progress">
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#222",
          }}
        />
      </div>

      {/* 残り */}
      <div className="challenge-card-remaining">
        残り {remainingHours}h
      </div>

      {/* コメント */}
      <div className="challenge-card-comment">{challenge.comment}</div>
    </div>
  );
}
