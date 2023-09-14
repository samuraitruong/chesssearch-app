interface EloSummaryProps {
  data: {
    elo: number[];
  };
}
export function EloSummary({ data: { elo } }: EloSummaryProps) {
  return (
    <div className="mb-3">
      <h2 className="text-center py-5 font-bold">Game Performance</h2>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
          <div className="text-3xl font-bold">{elo[0]}</div>

          <span className="text-gray-500">Rating</span>
        </div>

        <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
          <div className="text-3xl font-bold">{elo[1]}</div>
          <span className="text-gray-500">Rating</span>
        </div>
      </div>
    </div>
  );
}

export default EloSummary;
