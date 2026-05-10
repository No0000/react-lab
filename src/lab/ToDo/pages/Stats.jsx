import StreakCard from "../components/StreakCard";
import TrustMeter from "../components/TrustMeter";

export default function Stats({allTasks, setAllTasks, data, setData}) {
  return (
    <div>
      <StreakCard data={data} />
      <TrustMeter data={data} />
    </div>
  );
}