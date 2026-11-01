import { Link } from "react-router";
import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/siteConfig";

const link = "text-teal underline";
const Email = () => <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of Use"
      description="The terms that apply to your use of the SOLIARIS AFRICA LTD website."
      sections={[
        {
          heading: "1. About these terms",
          body: (
            <>
              <p>
                This website is operated by SOLIARIS AFRICA LTD, a company based in The Gambia
                (&ldquo;SOLIARIS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).
                These terms apply to your use of the website and everything published on it.
              </p>
              <p>
                By using the website you agree to these terms. If you do not agree, please do not use
                the site. Our <Link to="/privacy" className={link}>Privacy Policy</Link> explains how
                we handle personal information and forms part of these terms.
              </p>
            </>
          ),
        },
        {
          heading: "2. Information only, not an offer",
          body: (
            <>
              <p>
                The website describes our company, the areas we work in and opportunities we are
                exploring. It is provided for general information only. In particular:
              </p>
              <ul>
                <li>
                  project descriptions, opportunity areas, figures and timelines are illustrative and
                  may change, be delayed or not go ahead;
                </li>
                <li>
                  the regional map and the countries shown on it describe markets we are exploring.
                  They do not mean we currently operate, hold licences or supply power in those
                  countries, and the distances shown are straight-line distances, not infrastructure;
                </li>
                <li>
                  nothing on the website is an offer, a solicitation of investment, a commitment to
                  enter into any agreement, or financial, legal, technical or investment advice.
                </li>
              </ul>
              <p>
                Any partnership, investment or project arrangement with SOLIARIS will be governed
                only by a separate written agreement signed by both parties. You should get your own
                professional advice before making any decision.
              </p>
            </>
          ),
        },
        {
          heading: "3. Accuracy and forward-looking statements",
          body: (
            <p>
              We work to keep the website accurate and up to date, but we do not guarantee that its
              content is complete, current or error-free. Some statements describe our plans and
              expectations for the future. These depend on factors outside our control, such as
              regulatory approvals, financing, market conditions and partner decisions, and actual
              results may differ.
            </p>
          ),
        },
        {
          heading: "4. Using the website",
          body: (
            <>
              <p>You may browse the website and share links to it. You agree not to:</p>
              <ul>
                <li>use it for any unlawful, fraudulent or harmful purpose;</li>
                <li>try to gain unauthorised access to the website, its servers or related systems;</li>
                <li>introduce viruses or other harmful code, or interfere with the site&rsquo;s operation;</li>
                <li>scrape or copy content in bulk using automated tools;</li>
                <li>send spam or misleading messages through our contact form; or</li>
                <li>suggest that you are affiliated with or endorsed by SOLIARIS when you are not.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "5. Intellectual property",
          body: (
            <p>
              The SOLIARIS AFRICA LTD name, logo, text, graphics, maps and design of this website
              belong to us or to our licensors. You may view and print pages for your own reference,
              but you may not copy, reproduce, modify or republish our content or branding for any
              other purpose without our written permission. Some photographs and news items belong to
              third parties and remain their property.
            </p>
          ),
        },
        {
          heading: "6. Information you send us",
          body: (
            <p>
              When you contact us, please make sure the information you send is accurate and that you
              are entitled to share it. Do not send confidential information or business proposals
              you need to protect unless we have first agreed confidentiality terms in writing.
              Sending us a message does not create a business relationship or any obligation on
              either side.
            </p>
          ),
        },
        {
          heading: "7. Links to other websites",
          body: (
            <p>
              The website contains links to websites run by others, including news sources and
              social media. These are provided for convenience only. We do not control those sites
              and are not responsible for their content, availability or privacy practices.
            </p>
          ),
        },
        {
          heading: "8. Availability",
          body: (
            <p>
              We may change, suspend or withdraw any part of the website at any time without notice.
              We do not guarantee that the website will always be available or free from
              interruptions, errors or viruses.
            </p>
          ),
        },
        {
          heading: "9. Limitation of liability",
          body: (
            <>
              <p>
                The website is provided &ldquo;as is&rdquo;. To the fullest extent permitted by law,
                we exclude all warranties about it, and we are not liable for any loss or damage
                arising from your use of, or reliance on, the website or its content, including loss
                of profits, business, opportunity or data.
              </p>
              <p>
                Nothing in these terms limits or excludes any liability that cannot be limited or
                excluded by law.
              </p>
            </>
          ),
        },
        {
          heading: "10. Changes to these terms",
          body: (
            <p>
              We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at
              the top of this page shows when they last changed. By continuing to use the website
              after a change, you accept the updated terms.
            </p>
          ),
        },
        {
          heading: "11. Governing law",
          body: (
            <p>
              These terms are governed by the laws of The Gambia, and the courts of The Gambia have
              jurisdiction over any dispute arising from them or from your use of the website. If any
              part of these terms is found to be unenforceable, the rest will remain in effect.
            </p>
          ),
        },
        {
          heading: "12. Contact us",
          body: (
            <p>
              Questions about these terms can be sent to SOLIARIS AFRICA LTD, The Gambia, West
              Africa, at <Email />.
            </p>
          ),
        },
      ]}
    />
  );
}
