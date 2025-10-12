export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") return () => {};

  const body = document.body;
  const current = Number(body.getAttribute("data-scroll-lock") || "0");

  if (current === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    body.setAttribute("data-prev-overflow", prevOverflow);
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      const prevPaddingRight = body.style.paddingRight;
      body.setAttribute("data-prev-pr", prevPaddingRight);
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  body.setAttribute("data-scroll-lock", String(current + 1));

  return () => {
    const count = Number(body.getAttribute("data-scroll-lock") || "1");
    const next = Math.max(0, count - 1);
    if (next === 0) {
      const prevOverflow = body.getAttribute("data-prev-overflow");
      if (prevOverflow !== null) {
        body.style.overflow = prevOverflow;
        body.removeAttribute("data-prev-overflow");
      } else {
        body.style.removeProperty("overflow");
      }

      const prevPR = body.getAttribute("data-prev-pr");
      if (prevPR !== null) {
        body.style.paddingRight = prevPR;
        body.removeAttribute("data-prev-pr");
      } else {
        body.style.removeProperty("padding-right");
      }
    }
    body.setAttribute("data-scroll-lock", String(next));
  };
}

