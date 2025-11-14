import { useState, useEffect, useCallback } from "react";

type LoadingState = {
  [key: string]: boolean;
};

export function useProgressiveLoading<T extends Record<string, any>>(
  loaders: Record<keyof T, () => Promise<any>>,
  delays: Partial<Record<keyof T, number>> = {}
) {
  const [data, setData] = useState<Partial<T>>({});
  const [loadingStates, setLoadingStates] = useState<LoadingState>(
    Object.keys(loaders).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const updateData = useCallback((key: keyof T, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setLoadingStates((prev) => ({ ...prev, [key]: false }));
  }, []);

  const updateLoadingState = useCallback((key: keyof T, isLoading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: isLoading }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      const entries = Object.entries(loaders);

      for (const [key, loader] of entries) {
        const delay = delays[key as keyof T] || 0;

        setTimeout(async () => {
          if (cancelled) return;

          try {
            const result = await loader();
            if (!cancelled) {
              updateData(key as keyof T, result);
            }
          } catch (error) {
            console.error(`Failed to load ${key}:`, error);
            if (!cancelled) {
              updateLoadingState(key as keyof T, false);
            }
          }
        }, delay);
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [loaders, delays, updateData, updateLoadingState]);

  return { data, loadingStates };
}
