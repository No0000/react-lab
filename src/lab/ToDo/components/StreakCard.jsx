export default function StreakCard({data}) {
  return (
    <div>
      <p>連続達成記録：{data.streak}</p>
    </div>
  );
}