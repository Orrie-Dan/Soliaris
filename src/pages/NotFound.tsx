import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageMeta from "@/usePageMeta";

export default function NotFoundPage() {
  usePageMeta("Page Not Found");

  return (
    <div id="top" className="bg-white">
      <Header />

      <section aria-label="Page not found" className="bg-mist px-6 py-[140px] lg:px-10">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-[26px]">404</p>
          <h1 className="m-0 mb-6 font-heading text-[42px] font-extrabold leading-[1.05] tracking-[-0.014em] text-navy lg:text-[58px]">
            PAGE<br /><span className="text-teal">NOT FOUND</span>
          </h1>
          <p className="m-0 mb-9 max-w-[470px] text-base leading-[1.75] text-ink">
            The page you are looking for doesn&apos;t exist or has moved.
          </p>
          <Link to="/" className="btn-gold">
            BACK TO HOME
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
