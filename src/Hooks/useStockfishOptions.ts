import { useState, useEffect } from 'react';

// Define the type for your Stockfish options
export type StockfishOptions = {
  depth: number;
  maxSearchTime: number;
  maxLines: number;
};

const useStockfishOptions = (): [
  StockfishOptions,
  (options: StockfishOptions) => void
] => {
  const [options, setOptions] = useState<StockfishOptions>(() => {
    const storedOptions = localStorage.getItem('stockfishOptions');
    return storedOptions
      ? JSON.parse(storedOptions)
      : { depth: 12, maxSearchTime: 3000, maxLines: 1 };
  });

  useEffect(() => {
    localStorage.setItem('stockfishOptions', JSON.stringify(options));
  }, [options]);

  return [options, setOptions];
};

export default useStockfishOptions;
