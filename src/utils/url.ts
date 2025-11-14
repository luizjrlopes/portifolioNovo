export function withBasePath(path?: string | null): string {
  if (!path) return "";
  // Não prefixa URLs absolutas
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
