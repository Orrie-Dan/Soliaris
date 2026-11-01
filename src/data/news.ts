export type NewsItem = {
  /** URL segment: the article lives at /news/<slug>. */
  slug: string;
  /** ISO date (YYYY-MM-DD) of the event. */
  date: string;
  tag: string;
  title: string;
  /** One or two sentences, used on cards and as the page description. */
  summary: string;
  image: { src: string; alt: string };
  /** Headline numbers shown in a panel on the article. */
  figures?: { value: string; label: string }[];
  body: string[];
  /** Photos from the original publication, shown after the body. */
  gallery?: { src: string; alt: string }[];
  /** Original announcement this article is based on. */
  source?: { label: string; href: string };
};

/** Newest first. Each item gets a pre-rendered page and a sitemap entry (see ROUTES in App.tsx). */
export const NEWS: NewsItem[] = [
  {
    slug: "soma-solar-park-phase-ii-ppa",
    date: "2026-10-28",
    tag: "PROJECT MILESTONE",
    title: "NAWEC and SOLIARIS AFRICA sign 25-year PPA for Soma Solar Park Phase II",
    summary:
      "The US$169 million project will add 148.44 MWp of solar PV with battery storage to The Gambia's power supply.",
    image: {
      src: "/images/news/soma-phase-ii/signing.webp",
      alt: "Representatives of NAWEC and SOLIARIS AFRICA sign the Power Purchase Agreement in front of the flag of The Gambia",
    },
    figures: [
      { value: "25 years", label: "Power Purchase Agreement" },
      { value: "US$169M", label: "Project value" },
      { value: "148.44 MWp", label: "Solar PV capacity, with battery storage" },
      { value: "~250 GWh", label: "Expected generation per year" },
    ],
    body: [
      "The National Water and Electricity Company (NAWEC) and SOLIARIS AFRICA LTD have signed a 25-year Power Purchase Agreement for Phase II of the Soma Solar Park, at a signing ceremony on Wednesday, 28 October 2026.",
      "Valued at US$169 million, the project will add 148.44 MWp of solar photovoltaic capacity to The Gambia's grid, supported by a battery energy storage system to help deliver steadier power from a variable resource.",
      "NAWEC Managing Director Gallo Saidy described the signing as a defining moment for the utility. Mountaga Sy, Vice President of SOLIARIS AFRICA LTD, called the agreement a transformative milestone for the company and its partners.",
      "Hon. Nani Juwara, Minister of Petroleum, Energy and Mines, noted that once commissioned the plant is expected to generate around 250 GWh of electricity a year — supporting more reliable power for homes, schools, health facilities and businesses across the country.",
    ],
    gallery: [
      { src: "/images/news/soma-phase-ii/signed-agreements.webp", alt: "Signatories hold up the signed Power Purchase Agreement" },
      { src: "/images/news/soma-phase-ii/handshake.webp", alt: "Handshake after the signing of the agreement" },
      { src: "/images/news/soma-phase-ii/handshake-2.webp", alt: "Handshake in front of the flag of The Gambia" },
      { src: "/images/news/soma-phase-ii/speech-1.webp", alt: "A speaker addresses the signing ceremony from the podium" },
      { src: "/images/news/soma-phase-ii/speech-2.webp", alt: "A speaker addresses the signing ceremony from the podium" },
      { src: "/images/news/soma-phase-ii/speech-3.webp", alt: "A speaker addresses the signing ceremony from the podium" },
      { src: "/images/news/soma-phase-ii/group-photo.webp", alt: "Group photo of officials and delegates at the signing ceremony" },
      { src: "/images/news/soma-phase-ii/team.webp", alt: "Members of the SOLIARIS AFRICA delegation at the ceremony" },
      { src: "/images/news/soma-phase-ii/site-visit.webp", alt: "Delegation group photo outdoors" },
    ],
    source: {
      label: "Read NAWEC's announcement on LinkedIn",
      href: "https://www.linkedin.com/posts/nawec-signs-ppa-for-soma-solar-park-phase-ugcPost-7521298032202518528-bmzB/",
    },
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-10-28" → "28 October 2026" (formatted by hand so server and browser output always match). */
export function formatNewsDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
