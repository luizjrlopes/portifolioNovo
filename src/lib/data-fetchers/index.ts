/**
 * Utilitário genérico para buscar dados da API com fallback para mock
 */

// Detecta a porta atual durante o runtime
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

interface FetchDataOptions<T> {
  endpoint: string;
  mockData: T[];
  devDelay?: number;
  revalidate?: number;
  transform?: (data: any) => T;
}

/**
 * Função genérica para buscar dados com fallback
 * @param options - Configurações da busca
 * @returns Promise com os dados tipados
 */
export async function fetchData<T>({
  endpoint,
  mockData,
  devDelay = 300,
  revalidate = 3600,
  transform,
}: FetchDataOptions<T>): Promise<T[]> {
  // Retorna dados mock imediatamente para desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), devDelay);
    });
  }

  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint} from API`);
    }

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!items.length) {
      console.warn(`API returned no ${endpoint}, using mock data as fallback.`);
      return mockData;
    }

    // Se houver transformação, aplica; senão retorna os items diretamente
    return transform ? items.map(transform) : items;
  } catch (error) {
    console.error(
      `Error fetching ${endpoint} from API, falling back to mock data:`,
      error
    );
    return mockData;
  }
}
