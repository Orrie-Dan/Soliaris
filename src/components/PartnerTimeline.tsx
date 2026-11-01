import { useEffect, useRef } from "react";

const STAGES = [
  {
    cls: "s1",
    icon: (
      <>
        <path d="M4 6h16v10H9l-5 4V6Z" />
        <path d="M8 11h8" />
      </>
    ),
    title: "1. Engage",
    copy: "Initial discussions and alignment on shared objectives.",
  },
  {
    cls: "s2",
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4.5 4.5" />
      </>
    ),
    title: "2. Explore Opportunities",
    copy: "Technical and commercial evaluation of the opportunity.",
  },
  {
    cls: "s3",
    icon: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="4.5" />
      </>
    ),
    title: "3. Develop",
    copy: "Project structuring and the right partnership model.",
  },
  {
    cls: "s4",
    icon: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M8 12.5l2.6 2.6L16.5 9" />
      </>
    ),
    title: "4. Deliver",
    copy: "Implementation and long-term collaboration.",
  },
];

/** Partnership process timeline that lights up as it scrolls into view. */
export default function PartnerTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("lit");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add("lit");
          io.disconnect();
          break;
        }
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="ptimeline" ref={ref} className="relative">
      <div className="ptrack" aria-hidden="true">
        <span className="pfill"></span>
      </div>
      <div className="flex flex-wrap gap-y-7">
        {STAGES.map((s) => (
          <div key={s.cls} className={`pstage ${s.cls}`}>
            <div className="sicon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.6" aria-hidden="true">
                {s.icon}
              </svg>
            </div>
            <h2 className="mb-2 mt-5 font-heading text-[17px] font-extrabold text-navy">{s.title}</h2>
            <p className="m-0 text-[13.5px] leading-[1.6] text-inkSoft">{s.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
