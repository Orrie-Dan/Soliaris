import { Link } from "react-router";
import Header, { HOME_LINKS } from "@/components/Header";
import Footer from "@/components/Footer";
import Magnet from "@/components/Magnet";
import RegionalMap from "@/components/RegionalMap";
import usePageMeta from "@/usePageMeta";
import { NEWS, formatNewsDate } from "@/data/news";

const [featured, ...rest] = NEWS;

const Arrow = ({ size = 14, width = 2.4 }: { size?: number; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function HomePage() {
  usePageMeta(
    undefined,
    "SOLIARIS AFRICA LTD is a Gambian company dedicated to developing reliable, sustainable and modern energy infrastructure across The Gambia and the wider West African region."
  );

  return (
    <div className="relative bg-white">
      <Header
        variant="overlay"
        links={HOME_LINKS}
        cta={{ href: "/opportunities", label: "Explore Opportunities" }}
      />

      {/* ============ SECTION 1 · CINEMATIC HERO ============ */}
      <section aria-label="Powering a Brighter Africa" className="relative h-[820px] overflow-hidden bg-deep">
        <img
          src="/images/home-hero-sunset.webp"
          alt="Sunset over a large solar farm beside coastal wetlands, a winding river and a distant city"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.72) 0%,rgba(3,27,51,.25) 40%,rgba(3,27,51,.05) 72%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg,rgba(3,27,51,.55) 0%,rgba(3,27,51,.2) 42%,rgba(3,27,51,0) 66%)" }} aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-[150px]" style={{ background: "linear-gradient(to bottom,rgba(3,27,51,.55),rgba(3,27,51,0))" }} aria-hidden="true" />

        <div className="absolute inset-0 mx-auto flex max-w-site flex-col justify-center px-6 lg:px-10">
          <div className="max-w-[760px] pt-[72px]">
            <div className="heroFade d1 mb-[18px] flex items-center gap-4">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/80 bg-white/10">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
              </span>
              <p className="m-0 text-[11px] font-bold leading-[1.8] tracking-[0.24em] text-white">
                THE ENERGY TRANSITION<br />IN MOTION
              </p>
            </div>
            <h1 className="heroFade d2 m-0 mb-4 font-heading text-[52px] font-extrabold leading-[0.98] tracking-[-0.015em] text-white lg:text-[82px]">
              POWERING A<br /><span className="text-gold">BRIGHTER AFRICA.</span>
            </h1>
            <p className="heroFade d3 m-0 mb-[26px] max-w-[460px] text-[16.5px] leading-[1.6] text-white/95">
              Developing the future of power in The Gambia and West Africa.
            </p>
            <div className="heroFade d4 flex flex-wrap gap-4">
              <a href="#energy-systems" className="btn-gold !rounded-md !px-[22px] !py-[13px] !text-[13.5px] !tracking-[0.01em]" style={{ background: "rgba(246,183,39,.92)" }}>
                Explore Our Solutions
                <Arrow />
              </a>
              <a href="#purpose" className="btn-goldline" style={{ padding: "12px 24px", fontSize: "13.5px", letterSpacing: ".01em", borderRadius: "6px" }}>
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* slide rail */}
        <div aria-hidden="true" className="absolute right-11 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3.5 lg:flex">
          <span className="font-heading text-sm font-bold text-gold">01</span>
          <span className="h-[34px] w-[1.5px] bg-white/50" />
          <span className="font-heading text-xs font-semibold text-white/75">06</span>
          <span className="h-2.5" />
          <span className="h-[7px] w-[7px] rounded-full bg-gold" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-[5px] w-[5px] rounded-full bg-white/45" />
          ))}
        </div>

        <a href="#purpose" aria-label="Scroll to explore" className="absolute bottom-10 right-11 hidden items-center gap-3.5 lg:flex">
          <span className="text-[10px] font-bold tracking-[0.26em] text-white/85">SCROLL TO EXPLORE</span>
          <span className="scrollPulse flex h-[42px] w-[42px] items-center justify-center rounded-full border-[1.5px] border-white/80">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </span>
        </a>
      </section>

      {/* ============ SECTION 2 · OUR PURPOSE ============ */}
      <Magnet id="purpose" selector=".pframe" radius={250} pull={0.12} grow={0.03} aria-label="Our purpose" className="bg-white px-6 py-[100px] pt-[110px] lg:px-10">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-14">
          <div className="min-w-[320px] flex-[1_1_400px]">
            <p className="eyebrow mb-[26px]">OUR PURPOSE</p>
            <h2 className="m-0 mb-[26px] font-heading text-[42px] font-extrabold leading-[1.02] tracking-[-0.015em] text-navy lg:text-[68px]">
              ENERGY<br />IS MORE<br /><span className="text-teal">THAN POWER.</span>
            </h2>
            <p className="m-0 max-w-[430px] text-base leading-[1.75] text-ink">
              Energy strengthens <strong className="text-navy">communities</strong>, supports{" "}
              <strong className="text-navy">growing economies</strong>, and creates opportunities for
              future generations. SOLIARIS AFRICA LTD is focused on advancing sustainable energy
              development and modern infrastructure.
            </p>
          </div>
          <div className="flex min-w-[320px] flex-[1_1_560px] items-center justify-end gap-[34px]">
            <div className="flex gap-4 overflow-hidden py-1.5">
              {[
                { src: "/images/purpose-pylons.webp", alt: "High-voltage transmission towers at dusk" },
                { src: "/images/purpose-solar.webp", alt: "Solar photovoltaic panels" },
                { src: "/images/purpose-city.webp", alt: "Aerial view of a growing African city" },
              ].map((img) => (
                <figure key={img.src} className="pframe m-0 h-[390px] w-[184px] shrink-0 overflow-hidden rounded" style={{ transform: "skewX(-7deg)" }}>
                  <img className="pimg h-full object-cover" src={img.src} alt={img.alt} style={{ width: "150%", transform: "skewX(7deg) translateX(-26px)" }} />
                </figure>
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 gap-[18px]">
              <span className="w-px bg-[#d7dfe6]" />
              <div className="flex flex-col justify-center gap-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6b7c8d]">PEOPLE</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6b7c8d]">INFRASTRUCTURE</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#6b7c8d]">OPPORTUNITY</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-ocean">A CLEANER<br />TOMORROW</span>
              </div>
            </div>
          </div>
        </div>
      </Magnet>

      {/* ============ SECTION 3 · EXPLORE OUR ENERGY SYSTEMS ============ */}
      <Magnet id="energy-systems" selector=".ep" radius={330} pull={0.06} grow={0.02} aria-label="Explore our energy systems" className="overflow-hidden bg-deep pt-[54px]">
        <div className="mx-auto max-w-site px-6 pb-[34px] lg:px-10">
          <p className="eyebrow-dark m-0">EXPLORE OUR ENERGY SYSTEMS</p>
        </div>
        <div className="-mx-[70px] flex h-[500px] overflow-hidden">
          {[
            {
              href: "/what-we-do",
              src: "/images/panel-solar-wind.webp",
              alt: "Solar panels at sunset with wind turbines in the background",
              title: <>SOLAR &amp;<br />WIND ENERGY</>,
              copy: "Renewable solutions for a more resilient Africa.",
              pad: "0 56px 44px 110px",
              goldArrow: false,
              border: true,
            },
            {
              href: "/what-we-do",
              src: "/images/panel-power.webp",
              alt: "Industrial power plant structures in a tropical setting",
              title: <>POWER<br />DEVELOPMENT</>,
              copy: "Independent power projects for sustainable growth.",
              pad: "0 56px 44px 80px",
              goldArrow: true,
              border: true,
            },
            {
              href: "/what-we-do",
              src: "/images/panel-grid.webp",
              alt: "Transmission towers and power lines silhouetted against an orange sunset sky",
              title: <>GRID &amp;<br />INFRASTRUCTURE</>,
              copy: "Stronger grids for brighter communities.",
              pad: "0 110px 44px 80px",
              goldArrow: false,
              border: false,
            },
          ].map((p, i) => (
            <Link
              key={i}
              to={p.href}
              className="ep relative min-w-[240px] flex-[1_1_0] overflow-hidden"
              style={{ transform: "skewX(-8deg)", borderRight: p.border ? "2px solid rgba(3,27,51,.9)" : undefined }}
            >
              <img className="epimg absolute inset-0 h-full object-cover" src={p.src} alt={p.alt} style={{ width: "140%", transform: "skewX(8deg) translateX(-80px)" }} />
              <span className="epshade absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.96) 10%,rgba(3,27,51,.45) 52%,rgba(3,27,51,.22))" }} aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 block" style={{ padding: p.pad, transform: "skewX(8deg)" }}>
                <span className="block font-heading text-[30px] font-extrabold leading-[1.1] tracking-[0.01em] text-white">{p.title}</span>
                <span className="mt-3 block max-w-[240px] text-sm leading-[1.55] text-white/80">{p.copy}</span>
                <span
                  className="eparrow mt-5 flex h-[46px] w-[46px] items-center justify-center rounded-full border-[1.5px]"
                  style={p.goldArrow ? { borderColor: "#F6B727", color: "#F6B727" } : { borderColor: "rgba(255,255,255,.75)", color: "#FFFFFF" }}
                >
                  <Arrow size={16} width={2.2} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Magnet>

      {/* ============ SECTION 4 · THE GAMBIA AND BEYOND (interactive map) ============ */}
      <RegionalMap />

      {/* ============ SECTION 5 + 6 · OPPORTUNITIES & IMPACT ============ */}
      <section id="opportunities" aria-label="Development opportunities and impact" className="bg-white px-6 pt-[84px] lg:px-10">
        <div className="mx-auto grid max-w-content gap-12 md:grid-cols-2">
          <div className="flex min-w-[280px] flex-col justify-end pb-2">
            <p className="eyebrow mb-[22px]">OPPORTUNITIES, NOT PROMISES</p>
            <p className="m-0 max-w-[440px] text-base leading-[1.75] text-ink">
              We focus on identifying and advancing energy development opportunities across renewable
              energy, power generation, grid infrastructure, and related solutions.
            </p>
          </div>

          <div className="flex min-w-[280px] flex-wrap gap-5">
            {[
              {
                src: "/images/dev-priorities.webp",
                alt: "Solar panels, wind turbines and a substation at sunset",
                pos: "center 40%",
                title: <>Development<br />Priorities</>,
                copy: "Exploring renewable energy, power generation and infrastructure opportunities in The Gambia and the wider region.",
              },
              {
                src: "/images/partner-industrial.webp",
                alt: "Industrial energy plant structures",
                pos: "center",
                title: <>Partner<br />With Us</>,
                copy: "We work with governments, utilities, investors and industry partners to develop sustainable energy solutions.",
              },
            ].map((c, i) => (
              <Link key={i} to="/opportunities" className="opp relative block h-[300px] flex-[1_1_240px] rounded-md">
                <img className="oppimg absolute inset-0 h-full w-full rounded-md object-cover" src={c.src} alt={c.alt} style={{ objectPosition: c.pos }} />
                <span className="absolute inset-0 rounded-md" style={{ background: "linear-gradient(to top,rgba(3,27,51,.92) 8%,rgba(3,27,51,.35) 55%,rgba(3,27,51,.2))" }} aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 block p-[26px] pb-7">
                  <span className="block font-heading text-2xl font-extrabold leading-[1.15] text-white">{c.title}</span>
                  <span className="mt-2.5 block text-[13px] leading-[1.55] text-white/80">{c.copy}</span>
                  <span className="eparrow mt-4 flex h-[42px] w-[42px] items-center justify-center rounded-full border-[1.5px] border-white/75 text-white">
                    <Arrow size={15} width={2.2} />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <figure className="relative m-0 min-h-[480px] min-w-[280px] overflow-hidden rounded-md">
            <img
              src="/images/impact-composite.webp"
              alt="Soliaris Africa sun symbol over sunlit African waterways and forest islands"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "56% 40%" }}
            />
          </figure>

          <div id="impact" className="flex min-w-[280px] flex-wrap items-center gap-[34px] rounded-md bg-mist px-[46px] py-11">
            <div className="min-w-[260px] flex-[1.5_1_300px]">
              <p className="m-0 mb-4 text-[11px] font-bold tracking-[0.2em] text-ocean">A BRIGHTER, MORE SUSTAINABLE TOMORROW</p>
              <h2 className="m-0 mb-4 font-heading text-[42px] font-extrabold leading-[1.05] tracking-[-0.012em] text-navy">
                OUR IMPACT<br /><span className="text-teal">GOES FURTHER</span>
              </h2>
              <p className="m-0 mb-6 max-w-[420px] text-[15px] leading-[1.65] text-ink">
                We are committed to a cleaner environment, stronger communities and long-term economic
                growth through responsible and sustainable energy development.
              </p>
              <Link to="/impact" className="btn-teal">
                Our Approach
                <Arrow />
              </Link>
            </div>
            <div className="flex min-w-[190px] flex-[1_1_190px] flex-col gap-5 border-l border-[#d9e1e8] pl-7">
              {[
                {
                  icon: <><path d="M5 20c0-8 5-13 14-15-1 9-6 14-14 15Z" /><path d="M5 20c2-5 6-9 10-11" /></>,
                  label: <>CLEANER ENERGY<br />SOLUTIONS</>,
                },
                {
                  icon: <><circle cx="8" cy="9" r="3" /><circle cx="16.5" cy="10" r="2.4" /><path d="M3.5 19c.5-3.4 2.4-5 4.5-5s4 1.6 4.5 5" /><path d="M14 18.5c.4-2.6 1.4-4 2.5-4s2.1 1.4 2.5 4" /></>,
                  label: <>STRONGER<br />COMMUNITIES</>,
                },
                {
                  icon: <><path d="M4 20h16" /><rect x="6" y="12" width="3" height="8" /><rect x="11" y="8" width="3" height="12" /><rect x="16" y="4" width="3" height="16" /></>,
                  label: <>ECONOMIC<br />OPPORTUNITY</>,
                },
                {
                  icon: <><path d="M12 21V11" /><path d="M12 11c-4 0-6-2.5-6-6 4 0 6 2.5 6 6Z" /><path d="M12 13c4 0 6-2.5 6-6-4 0-6 2.5-6 6Z" /><path d="M8 21h8" /></>,
                  label: <>A MORE RESILIENT<br />AFRICA</>,
                },
              ].map((row, i) => (
                <div key={i} className="impactRow flex items-center gap-3.5">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#079B87" strokeWidth="1.5" className="shrink-0" aria-hidden="true">
                    {row.icon}
                  </svg>
                  <span className="text-[11px] font-bold leading-[1.5] tracking-[0.1em] text-ink">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[70px]" />
      </section>

      {/* ============ SECTION 6B · NEWS & INSIGHTS ============ */}
      <section id="news" aria-label="News and insights" className="bg-mist px-6 pb-[100px] pt-[92px] lg:px-10">
        <div className="mx-auto max-w-content">
          <div className="mb-[46px] flex flex-wrap items-end justify-between gap-7">
            <div>
              <p className="eyebrow mb-5">NEWS &amp; INSIGHTS</p>
              <h2 className="m-0 font-heading text-[44px] font-extrabold leading-[1.12] tracking-[-0.012em] text-navy">
                THE LATEST FROM<br /><span className="text-teal">SOLIARIS AFRICA</span>
              </h2>
            </div>
            <p className="m-0 mb-1.5 max-w-[380px] text-[14.5px] leading-[1.7] text-ink">
              Company announcements, perspectives and updates as we work toward a brighter energy
              future for the region.
            </p>
          </div>
          {/* Newest story gets a wide featured card; any older ones fall into a grid below it. */}
          {featured && (
            <Link to={`/news/${featured.slug}`} className="lift-card grid overflow-hidden rounded-md border border-cardline bg-white text-inherit lg:grid-cols-[1.15fr_1fr]">
              <figure className="relative m-0 h-[280px] overflow-hidden sm:h-[360px] lg:h-auto lg:min-h-[440px]">
                <img className="zoom-img absolute inset-0 h-full w-full object-cover" src={featured.image.src} alt={featured.image.alt} />
              </figure>
              <div className="flex flex-col p-8 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="newstag">{featured.tag}</span>
                  <time dateTime={featured.date} className="text-[12.5px] font-semibold tracking-[0.04em] text-inkSoft">
                    {formatNewsDate(featured.date)}
                  </time>
                </div>
                <h3 className="m-0 mb-4 mt-5 font-heading text-[26px] font-extrabold leading-[1.25] tracking-[-0.01em] text-navy sm:text-[30px]">
                  {featured.title}
                </h3>
                <p className="m-0 mb-8 text-[15px] leading-[1.7] text-ink">{featured.summary}</p>
                {featured.figures && (
                  <dl className="m-0 mb-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cardline pt-7">
                    {featured.figures.slice(0, 4).map((f) => (
                      <div key={f.label} className="flex flex-col">
                        {/* dt must come first in a <dl>; order-* shows the figure above its label */}
                        <dt className="order-2 text-[12.5px] leading-[1.5] text-inkSoft">{f.label}</dt>
                        <dd className="order-1 m-0 mb-1 font-heading text-[22px] font-extrabold leading-[1.1] text-teal">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <span className="learnmore mt-auto">
                  READ THE FULL STORY
                  <Arrow size={13} />
                </span>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <div className="mt-6 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <Link key={item.slug} to={`/news/${item.slug}`} className="lift-card flex flex-col overflow-hidden rounded-md border border-cardline bg-white text-inherit">
                  <figure className="m-0 h-[190px] overflow-hidden">
                    <img className="zoom-img h-full w-full object-cover" src={item.image.src} alt={item.image.alt} />
                  </figure>
                  <div className="flex flex-1 flex-col p-[26px] pb-7">
                    <span className="newstag">{item.tag}</span>
                    <h3 className="m-0 mb-2.5 mt-3.5 font-heading text-lg font-extrabold leading-[1.35] text-navy">{item.title}</h3>
                    <p className="m-0 mb-[18px] flex-1 text-[13.5px] leading-[1.65] text-inkSoft">{item.summary}</p>
                    <span className="learnmore">
                      READ MORE
                      <Arrow size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ SECTION 7 · FINAL CTA ============ */}
      <section id="cta" aria-label="Partner for a brighter Africa" className="relative flex min-h-[430px] items-center overflow-hidden">
        <img
          src="/images/river-sunset.webp"
          alt="River winding through dark grassland at sunset"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(3,27,51,.88) 0%,rgba(3,27,51,.66) 55%,rgba(3,27,51,.8) 100%)" }} aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-content flex-wrap items-center justify-between gap-12 px-6 py-20 lg:px-10">
          <div className="min-w-[300px] flex-[1_1_440px]">
            <p className="eyebrow-dark mb-[22px]">PARTNER FOR A BRIGHTER AFRICA</p>
            <h2 className="m-0 font-heading text-[42px] font-extrabold leading-[1.04] tracking-[-0.014em] text-white lg:text-[60px]">
              LET&apos;S DEVELOP<br /><span className="text-gold">WHAT COMES NEXT.</span>
            </h2>
          </div>
          <div className="min-w-[280px] flex-[0_1_420px]">
            <p className="m-0 mb-[26px] text-[15px] leading-[1.7] text-white/90">
              SOLIARIS AFRICA LTD is open to strategic partnerships, investment opportunities and
              collaborative development across The Gambia and West Africa.
            </p>
            <Link to="/opportunities" className="btn-gold">
              EXPLORE OPPORTUNITIES
              <Arrow size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer active="/" />
    </div>
  );
}
