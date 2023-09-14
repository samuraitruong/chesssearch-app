/// <reference types="vite-svg-loader" />
import {
  MoveClassification,
  MoveClassificationIcons,
} from '../Shared/Constants';

interface LineItemProps {
  counts: number[];
  title: string;
  classification: MoveClassification;
  clickOnSummaryItem: (
    side: 'b' | 'w',
    classification: MoveClassification
  ) => void;
}
function LineItem({
  title,
  counts,
  classification,
  clickOnSummaryItem,
}: LineItemProps) {
  const cssName =
    'move-classification-' +
    classification.toLocaleLowerCase().replace(' ', '-');
  const [whiteCount, blackCount] = counts;
  const classificationTitle = title || classification;

  return (
    <div className={`flex w-full justify-between ${cssName} text-sm`}>
      <div
        className="pl-5 cursor-pointer"
        onClick={() => clickOnSummaryItem('w', classification)}
      >
        {' '}
        {whiteCount}
      </div>
      <div>
        <Icon src={MoveClassificationIcons[classification]} />
        <span className="ml-1 font-semibold">{classificationTitle}</span>
      </div>

      <div
        className="pr-5 cursor-pointer"
        onClick={() => clickOnSummaryItem('b', classification)}
      >
        {' '}
        {blackCount}
      </div>
    </div>
  );
}

interface IconProps {
  src: string;
}

function Icon({ src }: IconProps) {
  return <img src={src} className="inline" />;
}
interface ReviewSummaryProps {
  clickOnSummaryItem: (
    side: 'b' | 'w',
    classification: MoveClassification
  ) => void;
  data: any;
  result: string;
}
export function ReviewSummary({
  data,
  result,
  clickOnSummaryItem,
}: ReviewSummaryProps) {
  const {
    accuracy,
    good,
    inaccuracy,
    mistake,
    excellent,
    best,
    blunder,
    briliant,
    miss,
    great,
    book,
  } = data;
  const [waccuracy, baccuracy] = accuracy;
  return (
    <div className="mb-3">
      <h2 className="text-center py-5 font-bold">Game Review</h2>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
          <div className="text-3xl font-bold">{waccuracy.toFixed(1)}</div>

          <span className="text-gray-500">Accuracy</span>
        </div>
        <div className="flex justify-center align-middle items-center font-semibold">
          {result}
        </div>
        <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
          <div className="text-3xl font-bold">{baccuracy.toFixed(1)}</div>
          <span className="text-gray-500">Accuracy</span>
        </div>
      </div>

      <div className="flex justify-between mb-2 flex-col">
        {[
          [briliant, MoveClassification.briliant, 'Briliant'],
          [great, MoveClassification.great, 'Great Move'],
          [best, MoveClassification.best, 'Best Move'],
          [excellent, MoveClassification.excellent, 'Excellent'],
          [good, MoveClassification.good, 'Good'],
          [book, MoveClassification.book, 'Book'],
          [inaccuracy, MoveClassification.inaccuracy, 'Inaccuracy'],
          [mistake, MoveClassification.mistake, 'Mistake'],
          [miss, MoveClassification.miss, 'Miss'],
          [blunder, MoveClassification.blunder, 'Blunder'],
        ].map(([counts, cl, title]) => (
          <LineItem
            key={cl}
            counts={counts}
            clickOnSummaryItem={clickOnSummaryItem}
            classification={cl}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}
export default ReviewSummary;
