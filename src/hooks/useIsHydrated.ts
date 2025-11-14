import { useState, useEffect } from "react";

/**
 * Hook para detectar se o componente foi hidratado no cliente
 * Útil para evitar diferenças entre server e client render
 */
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
