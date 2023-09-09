import { ReviewStatus } from '../Hooks/StockfishEngine';

interface ReviewLoadingProps {
  data: ReviewStatus;
}

export function ReviewLoading({ data }: ReviewLoadingProps) {
  if (!data) {
    return <></>;
  }
  const text = `${((data.current * 100) / data.total).toFixed(2)}%`;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 block`}
    >
      <div className="fixed inset-0 bg-gray-700 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 mx-auto text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.291 0-4.417-.944-6-2.47z"
            ></path>
          </svg>
          <p className="mt-2">{text}</p>
        </div>
      </div>
    </div>
  );
}
export default ReviewLoading;
