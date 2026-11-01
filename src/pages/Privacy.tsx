import LegalPage from "@/components/LegalPage";
import { CONTACT } from "@/siteConfig";

const link = "text-teal underline";
const Email = () => <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      description="How SOLIARIS AFRICA LTD collects, uses and protects personal information submitted through this website."
      sections={[
        {
          heading: "1. Who we are",
          body: (
            <>
              <p>
                This website is operated by SOLIARIS AFRICA LTD, a company based in The Gambia
                (&ldquo;SOLIARIS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). We
                are responsible for the personal information described in this policy.
              </p>
              <p>
                This policy explains what information we collect when you visit our website or
                contact us through it, how we use it, who we share it with and the choices you have.
                For any privacy question, email us at <Email />.
              </p>
            </>
          ),
        },
        {
          heading: "2. Information we collect",
          body: (
            <>
              <p><strong>Information you give us.</strong> When you use our contact form or email us, we collect what you choose to provide:</p>
              <ul>
                <li>your full name and email address;</li>
                <li>your organization and country, if you add them;</li>
                <li>the type of inquiry and the content of your message.</li>
              </ul>
              <p>
                Please don&rsquo;t send sensitive information (such as health, financial or
                identity-document details) through the form; we don&rsquo;t need it to respond.
              </p>
              <p>
                <strong>Information collected automatically.</strong> Like most websites, our
                hosting provider records basic technical data when pages are requested, such as IP
                address, browser type, the page requested and the time of the request. These logs
                are used to deliver the site, keep it secure and fix problems.
              </p>
            </>
          ),
        },
        {
          heading: "3. Cookies and tracking",
          body: (
            <p>
              This website does not use advertising cookies, analytics tools or tracking pixels, and
              we do not build profiles of visitors. Our fonts are served from our own website rather
              than a third-party font service. If we introduce analytics or cookies in the future,
              we will update this policy and, where required, ask for your consent first.
            </p>
          ),
        },
        {
          heading: "4. How we use your information",
          body: (
            <>
              <p>We use the information you send us to:</p>
              <ul>
                <li>read and respond to your inquiry;</li>
                <li>follow up on partnership, project or general discussions that you start with us;</li>
                <li>keep a record of our correspondence; and</li>
                <li>protect the website and our form from spam and misuse.</li>
              </ul>
              <p>
                We do not sell or rent your personal information, and we do not use it for unrelated
                marketing. We will only send you further communications that relate to the inquiry
                you made, unless you ask to hear from us more generally.
              </p>
            </>
          ),
        },
        {
          heading: "5. Why we are allowed to use it",
          body: (
            <p>
              We process your information because you asked us to respond to you, and because we
              have a legitimate interest in handling business inquiries and running a secure
              website. Where the law requires consent for a particular use, we will ask for it, and
              you can withdraw it at any time.
            </p>
          ),
        },
        {
          heading: "6. Who we share it with",
          body: (
            <>
              <p>We share personal information only with service providers that help us run this website:</p>
              <ul>
                <li>
                  <strong>Formspree</strong>, which receives contact-form submissions and forwards
                  them to us by email;
                </li>
                <li>
                  <strong>Vercel</strong>, which hosts the website and keeps the technical request
                  logs described above; and
                </li>
                <li>our email provider, which stores the messages we send and receive.</li>
              </ul>
              <p>
                These providers act on our instructions and are not allowed to use your information
                for their own purposes. We may also disclose information if required by law, or to
                protect our rights, users or the public.
              </p>
            </>
          ),
        },
        {
          heading: "7. International transfers",
          body: (
            <p>
              Our service providers may store and process information outside The Gambia, including
              in the United States and the European Union. Where we use them, we rely on providers
              that apply recognised safeguards to protect personal information.
            </p>
          ),
        },
        {
          heading: "8. How long we keep it",
          body: (
            <p>
              We keep inquiry correspondence for as long as needed to deal with it, and generally no
              longer than 24 months after our last contact with you, unless it forms part of an
              ongoing business relationship or we must keep it for legal reasons. Technical logs are
              kept by our hosting provider for a short period in line with its own retention
              settings.
            </p>
          ),
        },
        {
          heading: "9. How we protect it",
          body: (
            <p>
              The website is served over an encrypted (HTTPS) connection, and access to inquiries is
              limited to the people who need it to respond. No method of transmission or storage is
              completely secure, so we cannot guarantee absolute security, but we take reasonable
              steps to protect your information.
            </p>
          ),
        },
        {
          heading: "10. Your rights",
          body: (
            <>
              <p>Depending on where you live, you may have the right to:</p>
              <ul>
                <li>ask for a copy of the personal information we hold about you;</li>
                <li>ask us to correct or delete it;</li>
                <li>object to or ask us to limit how we use it; and</li>
                <li>withdraw any consent you have given.</li>
              </ul>
              <p>
                To make a request, email <Email />. We may need to confirm your identity before we
                respond. If you are unhappy with how we have handled your information, you can also
                contact the data protection authority where you live.
              </p>
            </>
          ),
        },
        {
          heading: "11. Links to other websites",
          body: (
            <p>
              Our website links to other sites, such as news sources and social media. We are not
              responsible for their content or privacy practices, so please read their policies when
              you visit them.
            </p>
          ),
        },
        {
          heading: "12. Children",
          body: (
            <p>
              This website is intended for businesses and professionals. It is not aimed at children,
              and we do not knowingly collect personal information from anyone under 16.
            </p>
          ),
        },
        {
          heading: "13. Changes to this policy",
          body: (
            <p>
              We may update this policy from time to time, for example if we add new features to the
              website. The &ldquo;Last updated&rdquo; date at the top of this page shows when it
              last changed. Significant changes will be highlighted on this page.
            </p>
          ),
        },
        {
          heading: "14. Contact us",
          body: (
            <p>
              SOLIARIS AFRICA LTD, The Gambia, West Africa. Email: <Email />.
            </p>
          ),
        },
      ]}
    />
  );
}
