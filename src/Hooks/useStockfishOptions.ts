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
  // Initialize the options from local storage or with default values
  const [options, setOptions] = useState<StockfishOptions>(() => {
    const storedOptions = localStorage.getItem('stockfishOptions');
    return storedOptions
      ? JSON.parse(storedOptions)
      : { depth: 5, maxSearchTime: 1000, maxLines: 5 };
  });

  // Update local storage whenever options change
  useEffect(() => {
    localStorage.setItem('stockfishOptions', JSON.stringify(options));
  }, [options]);

  return [options, setOptions];
};

export default useStockfishOptions;
