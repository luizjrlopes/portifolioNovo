import type { StaticImageData } from "next/image";

export function withBasePath(path?: string | StaticImageData | null): string {
  if (!path) return "";

  // Se for StaticImageData, retorna o src diretamente (já está processado pelo Next)
  if (typeof path === "object" && "src" in path) {
    return path.src;
  }

  // Não prefixa URLs absolutas
  if (typeof path === "string" && /^https?:\/\//i.test(path)) return path;

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized =
    typeof path === "string" && path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
