export default function Ranked({ rankedData }) {
  if (!rankedData || rankedData.length === 0) {
    return <div>No ranked data available</div>;
  }

  return (
    <div>
      {rankedData.map((data, index) => (
        <div key={index}>
          <h3>{data.queueType}</h3>
          <p>
            Tier: {data.tier} {data.rank}
          </p>
          <p>LP: {data.leaguePoints}</p>
          <p>
            Wins: {data.wins} | Losses: {data.losses}
          </p>
        </div>
      ))}
    </div>
  );
}
