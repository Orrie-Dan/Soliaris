import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTabs from "@/components/ScrollTabs";
import usePageMeta from "@/usePageMeta";

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.6" className="mt-0.5 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8 12.5l2.6 2.6L16.5 9" />
  </svg>
);

export default function AboutPage() {
  usePageMeta(
    "About Us",
    "SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable and modern energy infrastructure across The Gambia and the wider West African region."
  );

  return (
    <div id="top" className="bg-white">
      <Header active="/about" />

      {/* ============ HERO ============ */}
      <section
        aria-label="About Soliaris Africa"
        className="relative h-[620px] overflow-hidden"
        style={{ background: "linear-gradient(115deg,#031B33 0%,#04223d 55%,#06304f 100%)" }}
      >
        <img
          src="/images/about-hero.webp"
          alt="African woman engineer in a white safety helmet and protective glasses at an electrical substation"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.55) 42%,rgba(3,27,51,.08) 68%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.5),rgba(3,27,51,0) 40%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[640px]">
            <p className="eyebrow-dark heroFade d1 mb-[26px]">ABOUT US</p>
            <h1 className="heroFade d2 m-0 mb-6 font-heading text-[44px] font-extrabold leading-[1.05] tracking-[-0.014em] text-white lg:text-[64px]">
              A STRONGER<br />ENERGY FUTURE<br /><span className="text-gold">FOR GENERATIONS</span>
            </h1>
            <p className="heroFade d3 m-0 max-w-[470px] text-[17px] leading-[1.7] text-white/90">
              SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable
              and modern energy infrastructure across The Gambia and the wider West African region.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION NAVIGATION ============ */}
      <div className="sticky top-[76px] z-40">
        <ScrollTabs
          ariaLabel="About page sections"
          tabs={[
            { key: "story", label: "OUR STORY", target: "story" },
            { key: "mission", label: "MISSION & VISION", target: "purpose-sec" },
            { key: "values", label: "OUR VALUES", target: "values" },
            { key: "gov", label: "GOVERNANCE", target: "governance" },
          ]}
        />
      </div>

      {/* ============ OUR STORY ============ */}
      <section id="story" aria-label="Our story" className="scroll-mt-[150px] bg-white px-6 pb-[100px] pt-[110px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-[70px]">
          <div className="min-w-[320px] flex-[1_1_400px]">
            <p className="eyebrow mb-7">OUR STORY</p>
            <h2 className="m-0 mb-7 font-serif text-[36px] font-bold leading-[1.18] tracking-[-0.01em] text-navy lg:text-5xl">
              Built for<br />Africa&apos;s Energy<br />Tomorrow
            </h2>
            <p className="m-0 mb-9 max-w-[440px] text-base leading-[1.75] text-ink">
              We are established to participate in the development of renewable energy, power
              generation, grid infrastructure and related projects that support national development
              and regional energy security. From our home in The Gambia, we are building the
              partnerships and capabilities to help power West Africa&apos;s growth.
            </p>
            <a href="#purpose-sec" className="btn-gold !px-[26px] !py-[15px] !text-[13px]">
              OUR APPROACH
              <Arrow />
            </a>
          </div>
          <figure className="storyframe m-0 h-[480px] min-w-[320px] flex-[1.15_1_480px] overflow-hidden rounded-md">
            <img
              className="storyimg h-full w-full object-cover"
              src="/images/solar-park-aerial.webp"
              alt="Aerial view of a utility-scale solar park with rows of photovoltaic panels over green ground"
            />
          </figure>
        </div>
      </section>

      {/* ============ OUR PURPOSE ============ */}
      <section id="purpose-sec" aria-label="Mission, vision and values" className="scroll-mt-[150px] bg-mist px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-[54px]">OUR PURPOSE</p>
          <div className="flex flex-wrap">
            <div className="min-w-[280px] flex-[1_1_300px] py-1 pr-11">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.4" fill="#079B87" stroke="none" />
              </svg>
              <h3 className="mb-3.5 mt-5 font-heading text-xl font-extrabold text-navy">Our Mission</h3>
              <p className="m-0 text-[14.5px] leading-[1.75] text-ink">
                To advance reliable and sustainable energy infrastructure through strategic project
                development, innovative technologies and partnerships.
              </p>
            </div>
            <div id="values" className="min-w-[280px] flex-[1_1_300px] scroll-mt-[170px] border-l border-[#dbe3ea] px-11 py-1">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h3 className="mb-3.5 mt-5 font-heading text-xl font-extrabold text-navy">Our Vision</h3>
              <p className="m-0 text-[14.5px] leading-[1.75] text-ink">
                To become a trusted energy and infrastructure development partner in The Gambia and
                across West Africa.
              </p>
            </div>
            <div className="min-w-[280px] flex-[1_1_300px] border-l border-[#dbe3ea] py-1 pl-11">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
                <path d="M9 12l2 2 4-4.5" />
              </svg>
              <h3 className="mb-3.5 mt-5 font-heading text-xl font-extrabold text-navy">Our Values</h3>
              <p className="m-0 text-[14.5px] leading-[1.75] text-ink">
                Integrity, technical excellence, sustainability, safety and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GOVERNANCE ============ */}
      <section id="governance" aria-label="Governance" className="scroll-mt-[150px] bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-start gap-[70px]">
          <div className="min-w-[320px] flex-[1_1_400px]">
            <p className="eyebrow mb-[26px]">GOVERNANCE</p>
            <h2 className="m-0 mb-6 font-serif text-[32px] font-bold leading-[1.2] text-navy lg:text-[40px]">
              Sound governance<br />from day one
            </h2>
            <p className="m-0 max-w-[470px] text-[15.5px] leading-[1.75] text-ink">
              As a newly incorporated Gambian company, SOLIARIS AFRICA LTD is committed to sound
              corporate governance, regulatory compliance and responsible business conduct as the
              foundation of every opportunity we pursue.
            </p>
          </div>
          <div className="flex min-w-[300px] flex-[1_1_400px] flex-col gap-[26px] pt-3">
            {[
              {
                title: "REGULATORY COMPLIANCE",
                copy: "Operating in line with Gambian law and the standards expected of international energy partners.",
              },
              {
                title: "TRANSPARENCY & ACCOUNTABILITY",
                copy: "Clear decision-making and honest communication with partners, institutions and communities.",
              },
              {
                title: "RESPONSIBLE BUSINESS CONDUCT",
                copy: "Safety, environmental care and ethical practice at the centre of how we develop every project.",
              },
            ].map((p) => (
              <div key={p.title} className="pill flex items-start gap-[18px]">
                <CheckIcon />
                <div>
                  <h3 className="m-0 mb-1.5 font-heading text-[15px] font-bold tracking-[0.03em] text-navy">{p.title}</h3>
                  <p className="m-0 text-sm leading-[1.65] text-inkSoft">{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer active="/about" />
    </div>
  );
}
