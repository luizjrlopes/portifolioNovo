export const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");

  if (sanitized.length === 3) {
    const [r, g, b] = sanitized.split("").map((char) => Number.parseInt(char + char, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (sanitized.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const bigint = Number.parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
