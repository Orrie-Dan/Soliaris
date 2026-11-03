import { useState } from "react";
import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import usePageMeta from "@/usePageMeta";
import { CONTACT, FORM_ENDPOINT } from "@/siteConfig";

/** Quick-pick buttons for the inquiry type; they set (and reflect) the INQUIRY TYPE select. */
const TABS: { label: string; selectValue: string }[] = [
  { label: "GENERAL INQUIRY", selectValue: "general" },
  { label: "PARTNERSHIPS", selectValue: "partnerships" },
  { label: "PROJECT OPPORTUNITIES", selectValue: "projects" },
];

export default function ContactPage() {
  usePageMeta(
    "Contact",
    "Get in touch with SOLIARIS AFRICA LTD. We welcome inquiries from governments, development partners, investors, and industry stakeholders."
  );
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    country: "",
    type: "general",
    msg: "",
  });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  // honeypot: hidden from people, filled in by bots; Formspree drops submissions that set it
  const [gotcha, setGotcha] = useState("");

  const pickTab = (t: (typeof TABS)[number]) => setForm((f) => ({ ...f, type: t.selectValue }));

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const problems: string[] = [];
    if (!form.name.trim()) problems.push("your full name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) problems.push("a valid email address");
    if (!form.msg.trim()) problems.push("a message");
    if (problems.length) {
      setErr(`Please provide ${problems.join(", ")}.`);
      return;
    }
    if (!FORM_ENDPOINT) {
      setErr(`The contact form isn't available right now. Please email us at ${CONTACT.email}.`);
      return;
    }
    setErr("");
    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          organization: form.org.trim(),
          email: form.email.trim(),
          country: form.country.trim(),
          inquiryType: form.type,
          message: form.msg.trim(),
          _replyto: form.email.trim(),
          _subject: `Website inquiry (${form.type}) from ${form.name.trim()}`,
          _gotcha: gotcha,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
      setForm((f) => ({ ...f, msg: "" }));
    } catch {
      setErr(`Sorry, your message couldn't be sent. Please try again, or email us at ${CONTACT.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="top" className="bg-white">
      <Header active="/contact" cta={{ href: "#contact-form", label: "Get in Touch" }} />

      {/* ============ CONTACT SPLIT ============ */}
      <section aria-label="Contact Soliaris Africa" className="flex min-h-[860px] flex-wrap">
        <figure className="relative m-0 min-h-[420px] min-w-[min(320px,100%)] flex-[1_1_400px] bg-deep">
          <img
            src="/images/contact-hq.webp"
            alt="Soliaris Africa Ltd headquarters building with palm trees at sunset"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "32% center" }}
          />
          <span className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,27,51,.3) 0%,rgba(3,27,51,0) 35%)" }} aria-hidden="true" />
        </figure>

        <div id="contact-form" className="min-w-[min(340px,100%)] flex-[1.25_1_520px] scroll-mt-[100px] bg-white px-8 py-16 lg:px-[70px] lg:py-[84px]">
          <p className="eyebrow mb-[22px]">GET IN TOUCH</p>
          <h1 className="m-0 mb-4 font-serif text-[32px] font-bold leading-[1.2] text-navy lg:text-[42px]">
            Let&apos;s Build a Brighter<br />Africa Together
          </h1>
          <p className="m-0 mb-[30px] max-w-[520px] text-[15px] leading-[1.7] text-ink">
            We welcome inquiries from governments, development partners, investors, and industry
            stakeholders.
          </p>

          <div className="mb-8 flex flex-wrap gap-2.5" role="group" aria-label="Inquiry type">
            {TABS.map((t) => (
              <button
                key={t.selectValue}
                type="button"
                aria-pressed={form.type === t.selectValue}
                aria-controls="cf-type"
                className={`ctab ${form.type === t.selectValue ? "active" : ""}`}
                onClick={() => pickTab(t)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {!sent ? (
            <form noValidate onSubmit={submit} className="flex max-w-[640px] flex-col gap-5">
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
                className="absolute left-[-9999px] h-px w-px opacity-0"
              />
              <div className="flex flex-wrap gap-5">
                <div className="fld">
                  <label htmlFor="cf-name">FULL NAME *</label>
                  <input id="cf-name" type="text" autoComplete="name" placeholder="Your full name" value={form.name} onChange={set("name")} />
                </div>
                <div className="fld">
                  <label htmlFor="cf-org">COMPANY / ORGANIZATION</label>
                  <input id="cf-org" type="text" autoComplete="organization" placeholder="Organization name" value={form.org} onChange={set("org")} />
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                <div className="fld">
                  <label htmlFor="cf-email">EMAIL *</label>
                  <input id="cf-email" type="email" autoComplete="email" placeholder="name@example.com" value={form.email} onChange={set("email")} />
                </div>
                <div className="fld">
                  <label htmlFor="cf-country">COUNTRY</label>
                  <input id="cf-country" type="text" autoComplete="country-name" placeholder="Country" value={form.country} onChange={set("country")} />
                </div>
              </div>
              <div className="fld !flex-none">
                <label htmlFor="cf-type">INQUIRY TYPE</label>
                <select id="cf-type" value={form.type} onChange={set("type")}>
                  <option value="general">General Inquiry</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="projects">Project Opportunities</option>
                  <option value="media">Media &amp; Other</option>
                </select>
              </div>
              <div className="fld !flex-none">
                <label htmlFor="cf-msg">MESSAGE *</label>
                <textarea id="cf-msg" placeholder="Tell us about your inquiry" value={form.msg} onChange={set("msg")} />
              </div>
              {err && (
                <p className="errbox m-0" role="alert">
                  {err}
                </p>
              )}
              <p className="m-0">
                <button type="submit" className="btn-gold disabled:cursor-wait disabled:opacity-70" disabled={sending}>
                  {sending ? "SENDING…" : "SEND MESSAGE"}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </p>
              <p className="m-0 text-xs leading-[1.6] text-[#8a99a8]">
                We use the details you provide only to respond to your inquiry. See our{" "}
                <Link to="/privacy" className="underline hover:text-navy">Privacy Policy</Link>.
              </p>
            </form>
          ) : (
            <div className="max-w-[640px]">
              <p className="okbox m-0 mb-5" role="status">
                <strong>Thank you — your message has been sent.</strong>
                <br />
                The SOLIARIS AFRICA LTD team will respond to the email address you provided.
              </p>
              <button
                className="ctab"
                onClick={() => {
                  setSent(false);
                  setErr("");
                }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          )}

          <dl className="mt-12 grid max-w-[640px] gap-6 border-t border-hairline pt-8 text-[14px] leading-[1.6] sm:grid-cols-3">
            <div>
              <dt className="mb-1.5 text-xs font-semibold tracking-[0.06em] text-ink">EMAIL</dt>
              <dd className="m-0"><a href={`mailto:${CONTACT.email}`} className="font-semibold text-navy hover:text-teal">{CONTACT.email}</a></dd>
            </div>
            <div>
              <dt className="mb-1.5 text-xs font-semibold tracking-[0.06em] text-ink">PHONE</dt>
              <dd className="m-0"><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="font-semibold text-navy hover:text-teal">{CONTACT.phone}</a></dd>
            </div>
            <div>
              <dt className="mb-1.5 text-xs font-semibold tracking-[0.06em] text-ink">OFFICE</dt>
              <dd className="m-0 not-italic text-navy">{CONTACT.address.map((line) => <span key={line} className="block">{line}</span>)}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Footer active="/contact" />
    </div>
  );
}
