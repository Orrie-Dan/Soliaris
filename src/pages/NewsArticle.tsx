import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageMeta from "@/usePageMeta";
import { formatNewsDate, type NewsItem } from "@/data/news";

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function NewsArticlePage({ item }: { item: NewsItem }) {
  usePageMeta(item.title, item.summary);

  return (
    <div id="top" className="bg-white">
      <Header />

      <article aria-labelledby="article-title">
        {/* ============ HERO ============ */}
        <header className="relative flex min-h-[460px] items-end overflow-hidden bg-deep">
          <img
            src={item.image.src}
            alt={item.image.alt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.94) 0%,rgba(3,27,51,.6) 45%,rgba(3,27,51,.25) 100%)" }} aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-content px-6 pb-12 pt-32 lg:px-10 lg:pb-16">
            <p className="eyebrow-dark heroFade d1 mb-5">
              {item.tag} · <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
            </p>
            <h1 id="article-title" className="heroFade d2 m-0 max-w-[880px] font-heading text-[32px] font-extrabold leading-[1.12] tracking-[-0.012em] text-white lg:text-[50px]">
              {item.title}
            </h1>
          </div>
        </header>

        {/* ============ BODY ============ */}
        <div className="px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <p className="m-0 mb-10 text-[19px] font-medium leading-[1.7] text-navy">{item.summary}</p>

            {item.figures && (
              <dl className="m-0 mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-cardline bg-cardline md:grid-cols-4">
                {item.figures.map((f) => (
                  <div key={f.label} className="flex flex-col bg-mist px-5 py-6">
                    {/* dt must come first in a <dl>; order-* shows the figure above its label */}
                    <dt className="order-2 text-[12.5px] leading-[1.5] text-inkSoft">{f.label}</dt>
                    <dd className="order-1 m-0 mb-1.5 font-heading text-[24px] font-extrabold leading-[1.1] text-teal">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {item.body.map((para) => (
              <p key={para} className="m-0 mb-6 text-[16px] leading-[1.8] text-ink">{para}</p>
            ))}

            {item.gallery && (
              <section aria-label="Photos" className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {item.gallery.map((photo) => (
                  <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md bg-mist">
                    <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[3/2] h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
                  </a>
                ))}
              </section>
            )}

            {item.source && (
              <p className="m-0 mt-10 border-t border-hairline pt-6 text-[14px] text-inkSoft">
                Source:{" "}
                <a href={item.source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal underline hover:text-navy">
                  {item.source.label}
                </a>
              </p>
            )}

            <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
              <Link to="/#news" className="learnmore">
                <span className="inline-flex rotate-180"><Arrow size={13} /></span>
                ALL NEWS
              </Link>
              <Link to="/contact" className="btn-gold">
                PARTNER WITH US
                <Arrow size={15} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
