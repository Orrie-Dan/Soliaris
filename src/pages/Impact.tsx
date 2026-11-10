import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageMeta from "@/usePageMeta";

const THEMES = [
  {
    icon: (
      <>
        <path d="M5 20c0-8 5-13 14-15-1 9-6 14-14 15Z" />
        <path d="M5 20c2-5 6-9 10-11" />
      </>
    ),
    title: <>Cleaner Energy<br />Systems</>,
    copy: "Advancing renewable and low-carbon energy solutions.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
      </>
    ),
    title: <>Expanded<br />Energy Access</>,
    copy: "Supporting reliable power for more homes and businesses.",
  },
  {
    icon: (
      <>
        <path d="M4 20h16" />
        <rect x="6" y="12" width="3" height="8" />
        <rect x="11" y="8" width="3" height="12" />
        <rect x="16" y="4" width="3" height="16" />
      </>
    ),
    title: <>Economic<br />Development</>,
    copy: "Enabling growth, industry and opportunity.",
  },
  {
    icon: (
      <>
        <path d="M12 21V11" />
        <path d="M12 11c-4 0-6-2.5-6-6 4 0 6 2.5 6 6Z" />
        <path d="M12 13c4 0 6-2.5 6-6-4 0-6 2.5-6 6Z" />
        <path d="M8 21h8" />
      </>
    ),
    title: <>Environmental<br />Stewardship</>,
    copy: "Respecting ecosystems in every development decision.",
  },
  {
    icon: (
      <>
        <circle cx="8" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.4" />
        <path d="M3.5 19c.5-3.4 2.4-5 4.5-5s4 1.6 4.5 5" />
        <path d="M14 18.5c.4-2.6 1.4-4 2.5-4s2.1 1.4 2.5 4" />
      </>
    ),
    title: <>Stronger<br />Communities</>,
    copy: "Putting people at the centre of energy development.",
  },
];

const COMMITMENTS = [
  "Promoting sustainable and low-carbon solutions",
  "Supporting local economic growth",
  "Respecting communities and the environment",
  "Working with partners to build long-term value",
];

export default function ImpactPage() {
  usePageMeta(
    "Impact",
    "SOLIARIS AFRICA LTD is committed to developing energy solutions that support economic growth, strengthen communities and protect the environment for future generations."
  );

  return (
    <div id="top" className="bg-white">
      <Header active="/impact" />

      {/* ============ HERO ============ */}
      <section
        aria-label="Sustainability and impact"
        className="relative h-[600px] overflow-hidden"
        style={{ background: "linear-gradient(110deg,#031B33 0%,#04223d 60%,#0a3350 100%)" }}
      >
        <div className="absolute right-0 top-0 h-full w-[44%]">
          <img
            src="/images/impact-child.webp"
            alt="Young African child with warm light on their face, looking toward the light"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 25%" }}
          />
        </div>
        <div className="absolute right-0 top-0 h-full w-[44%]" style={{ background: "linear-gradient(90deg,#04223d 0%,rgba(4,34,61,.3) 45%,rgba(4,34,61,0) 100%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.5),rgba(3,27,51,0) 40%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[620px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">OUR IMPACT</p>
            <h1 className="heroFade d2 m-0 mb-6 font-heading text-[42px] font-extrabold leading-[1.08] tracking-[-0.014em] text-white lg:text-[58px]">
              SUSTAINABLE ENERGY<br />FOR STRONGER<br /><span className="text-gold">COMMUNITIES</span>
            </h1>
            <p className="heroFade d3 m-0 max-w-[470px] text-[17px] leading-[1.7] text-white/90">
              We are committed to developing energy solutions that support economic growth,
              strengthen communities and protect the environment for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* ============ IMPACT THEMES ============ */}
      <section aria-label="Impact themes" className="border-b border-[#eef2f6] bg-white px-6 py-[84px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap justify-between gap-3">
          {THEMES.map((t, i) => (
            <div key={i} className="theme">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                {t.icon}
              </svg>
              <h2 className="mb-2 mt-4 font-heading text-base font-extrabold text-navy">{t.title}</h2>
              <p className="m-0 text-[13px] leading-[1.6] text-inkSoft">{t.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RESPONSIBLE DEVELOPMENT ============ */}
      <section aria-label="Responsible development" className="flex min-h-[560px] flex-wrap">
        <figure className="relative m-0 min-h-[380px] min-w-[min(320px,100%)] flex-[1_1_440px]">
          <img
            src="/images/impact-commitment.webp"
            alt="SOLIARIS technician in a hard hat and safety harness wiring solar panels on a rooftop"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </figure>
        <div className="relative flex min-w-[min(320px,100%)] flex-[1_1_440px] items-center overflow-hidden bg-deep">
          <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -top-10 right-[-60px] w-[420px] opacity-10">
            <g fill="none" stroke="#079B87" strokeWidth="1.2">
              <path d="M40,200 C40,110 110,40 200,40 C290,40 360,110 360,200 C360,290 290,360 200,360 C110,360 40,290 40,200 Z" />
              <path d="M70,200 C70,128 128,70 200,70 C272,70 330,128 330,200 C330,272 272,330 200,330 C128,330 70,272 70,200 Z" />
              <path d="M100,200 C100,145 145,100 200,100 C255,100 300,145 300,200 C300,255 255,300 200,300 C145,300 100,255 100,200 Z" />
              <path d="M130,200 C130,161 161,130 200,130 C239,130 270,161 270,200 C270,239 239,270 200,270 C161,270 130,239 130,200 Z" />
            </g>
          </svg>
          <div className="relative max-w-[560px] px-8 py-16 lg:px-[70px] lg:py-20">
            <p className="eyebrow-dark mb-6">OUR COMMITMENT</p>
            <h2 className="m-0 mb-[30px] font-serif text-[32px] font-bold leading-[1.22] text-white lg:text-[42px]">
              Responsible<br />Development for<br />a Brighter Africa
            </h2>
            <div className="flex flex-col gap-5">
              {COMMITMENTS.map((c) => (
                <div key={c} className="commit flex items-start gap-4">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F6B727" strokeWidth="1.8" className="mt-px shrink-0" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M8 12.5l2.6 2.6L16.5 9" />
                  </svg>
                  <p className="m-0 text-[15px] font-medium leading-[1.6] text-white/90">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer active="/impact" />
    </div>
  );
}
