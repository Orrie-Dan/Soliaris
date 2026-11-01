import { useEffect, useRef } from "react";

type MagnetProps = {
  /** CSS selector (within this wrapper) for the elements that react to the cursor. */
  selector: string;
  /** Distance in px at which an element starts following the cursor. */
  radius?: number;
  /** Fraction of the cursor offset applied as translation. */
  pull?: number;
  /** Extra scale applied at zero distance. */
  grow?: number;
  id?: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/**
 * Proximity "magnet" hover effect from the approved design: each matching
 * element eases toward the cursor as it approaches, one by one.
 */
export default function Magnet({
  selector,
  radius = 250,
  pull = 0.1,
  grow = 0.03,
  id,
  className,
  children,
  ...rest
}: MagnetProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(sec.querySelectorAll<HTMLElement>(selector));
    for (const el of items) {
      el.dataset.base = el.style.transform || "";
    }

    const onMove = (e: MouseEvent) => {
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          const s = 1 - dist / radius;
          el.style.transform =
            (el.dataset.base || "") +
            ` translate(${(dx * pull * s).toFixed(1)}px,${(dy * pull * s).toFixed(1)}px)` +
            ` scale(${(1 + grow * s).toFixed(3)})`;
        } else {
          el.style.transform = el.dataset.base || "";
        }
      }
    };
    const onLeave = () => {
      for (const el of items) {
        el.style.transform = el.dataset.base || "";
      }
    };

    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
    };
  }, [selector, radius, pull, grow]);

  return (
    <section id={id} className={className} ref={ref as React.RefObject<HTMLElement>} {...rest}>
      {children}
    </section>
  );
}
