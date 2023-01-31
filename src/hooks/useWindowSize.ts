import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 500);

    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  });

  return width;
};

export default useWindowSize;
