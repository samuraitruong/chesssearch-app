import {
  AreaChart,
  Area,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  XAxis,
  CartesianGrid,
} from 'recharts';
import { GameReview } from '../Shared/Model';
import { useMemo } from 'react';

interface MoveChartProps {
  reviewData: GameReview;
}

export function MoveChart({ reviewData }: MoveChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-400 text-white-500 px-4 py-2 font-semibold">
          <p className="">{`${payload[0].payload.move}`}</p>
          <span>{payload[0].payload.elo}</span>
        </div>
      );
    }

    return null;
  };

  const data = useMemo(() => {
    if (!reviewData) {
      return [];
    }
    const chartData = [];
    let index = 1;
    for (const move of reviewData.moves) {
      if (move.playedMove.bestLine?.winChance) {
        chartData.push({
          move: move.san,
          elo: move.playedMove.bestLine.elo,
          index: index++,
          winChance:
            move.color === 'w'
              ? move.playedMove.bestLine?.winChance
              : 100 - move.playedMove.bestLine?.winChance,
        });
      }
    }
    return chartData;
  }, [reviewData]);

  return (
    <div className="mb-2 w-full">
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip content={<CustomTooltip />} />
          <YAxis domain={[0, 100]} hide={true} />
          <XAxis dataKey="index" hide={true} />
          <Scatter dataKey="winChance" fill="red" data={data}>
            {data.map((entry, index) => (
              <circle
                key={`scatter-${index}`}
                cx={entry.index}
                cy={entry.winChance}
                r={3}
                fill="red"
              />
            ))}
          </Scatter>
          {
            <Area
              type="monotone"
              dataKey="winChance"
              stroke="transparent"
              fill="#48ed42"
            />
          }
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoveChart;
