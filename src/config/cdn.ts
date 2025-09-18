export const CDN_BASE =
  process.env.NEXT_PUBLIC_CDN_BASE || "https://<conta>.blob.core.windows.net/<container>";

export const cdn = (path: string) => `${CDN_BASE}/${String(path).replace(/^\/+/, "")}`;
