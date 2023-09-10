export function ReviewSummary({
  data: { blackAccuracy, whiteAccuracy },
  result,
}: any) {
  return (
    <div className="flex justify-between mb-2">
      <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
        <div className="text-3xl font-bold">{whiteAccuracy.toFixed(1)}</div>

        <span className="text-gray-500">Accuracy</span>
      </div>
      <div className="flex justify-center align-middle items-center font-semibold">
        {result}
      </div>
      <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
        <div className="text-3xl font-bold">{blackAccuracy.toFixed(1)}</div>
        <span className="text-gray-500">Accuracy</span>
      </div>
    </div>
  );
}
export default ReviewSummary;
