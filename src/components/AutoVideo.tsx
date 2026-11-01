import { useEffect, useRef } from "react";

/**
 * Muted, looping hero video that force-plays on mount (React quirk: the muted
 * attribute alone doesn't guarantee autoplay) and stays paused/hidden under
 * prefers-reduced-motion (the .hero-video class hides it via CSS; a poster
 * <img> behind it carries the still frame).
 *
 * `lazy` is for videos below the fold: nothing is downloaded until the video
 * nears the viewport, and it pauses again while scrolled out of view.
 */
export default function AutoVideo({
  src,
  poster,
  className = "",
  style,
  lazy = false,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  lazy?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    if (!lazy) {
      v.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [lazy]);

  return (
    <video
      ref={ref}
      className={`hero-video ${className}`}
      src={src}
      poster={poster}
      autoPlay={!lazy}
      muted
      loop
      playsInline
      preload={lazy ? "none" : "auto"}
      aria-hidden="true"
      style={style}
    />
  );
}
