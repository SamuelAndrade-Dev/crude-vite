import { useCallback, useState } from "react";

interface UseVisibilityOptions<T> {
  initialVisible?: boolean;
  initialParams?: T;
}

export function useVisibility<T = undefined>(
  options: UseVisibilityOptions<T> = {},
) {
  const [isVisible, setIsVisible] = useState(options.initialVisible ?? false);
  const [params, setParams] = useState<T | undefined>(options.initialParams);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    setParams(undefined);
  }, []);

  const showWithParams = useCallback((nextParams: T) => {
    setParams(nextParams);
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    params,
    show,
    hide,
    showWithParams,
  };
}
