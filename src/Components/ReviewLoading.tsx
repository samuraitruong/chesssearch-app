import { ReviewStatus } from '../Hooks/StockfishEngine';

interface ReviewLoadingProps {
  data: ReviewStatus;
}

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function ReviewLoading({ data }: ReviewLoadingProps) {
  if (!data) {
    return <></>;
  }
  const percentage = (data.current * 100) / data.total;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 block`}
    >
      <div className="fixed inset-0 bg-gray-700 opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <div className="text-center">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(1)}%`}
          />
        </div>
      </div>
    </div>
  );
}
export default ReviewLoading;
