import { useState, useEffect } from 'react';

export function useViewport() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update the viewport dimensions
    function handleResize() {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add a resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
}

export default useViewport;
