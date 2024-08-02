import { useCallback } from "react";
import { throttle } from 'lodash';

const useThrottle = (fetchData, delay) => {
  const throttledFetchData = useCallback(
    throttle(() => {
      fetchData();
    }, delay), 
    [fetchData, delay]
  );

  return throttledFetchData;
};

export default useThrottle;