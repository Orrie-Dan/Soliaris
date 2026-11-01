import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageMeta from "@/usePageMeta";
import { LEGAL_UPDATED } from "@/siteConfig";

export type LegalSection = { heading: string; body: ReactNode };

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export default function LegalPage({
  path,
  title,
  description,
  sections,
}: {
  path: string;
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  usePageMeta(title, description);

  return (
    <div id="top" className="bg-white">
      <Header />

      <section aria-labelledby="legal-title" className="px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[760px]">
          <p className="eyebrow mb-[22px]">LEGAL</p>
          <h1 id="legal-title" className="m-0 mb-4 font-heading text-[36px] font-extrabold leading-[1.1] tracking-[-0.014em] text-navy lg:text-[48px]">
            {title}
          </h1>
          <p className="m-0 mb-12 text-[13px] font-semibold text-inkSoft">Last updated: {LEGAL_UPDATED}</p>

          {sections.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="m-0 mb-3 font-heading text-[20px] font-extrabold leading-[1.3] text-navy">{s.heading}</h2>
              <div className="text-[15px] leading-[1.75] text-ink [&_p]:m-0 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">{s.body}</div>
            </section>
          ))}
        </div>
      </section>

      <Footer active={path} />
    </div>
  );
}
