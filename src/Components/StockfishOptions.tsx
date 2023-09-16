import React, { useEffect } from 'react';
import useStockfishOptions, {
  StockfishOptions,
} from '../Hooks/useStockfishOptions';

const StockfishOptionsComponent: React.FC = () => {
  const [options, setOptions] = useStockfishOptions();

  useEffect(() => {
    localStorage.setItem('stockfishOptions', JSON.stringify(options));
  }, [options]);

  const handleOptionChange = (key: keyof StockfishOptions, value: number) => {
    setOptions({ ...options, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Stockfish Options</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Depth Level</label>
        <input
          type="number"
          value={options.depth}
          onChange={(e) => handleOptionChange('depth', Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Max Search Time (ms)</label>
        <input
          type="number"
          value={options.maxSearchTime}
          onChange={(e) =>
            handleOptionChange('maxSearchTime', Number(e.target.value))
          }
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Max Lines</label>
        <input
          type="number"
          value={options.maxLines}
          onChange={(e) =>
            handleOptionChange('maxLines', Number(e.target.value))
          }
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default StockfishOptionsComponent;
