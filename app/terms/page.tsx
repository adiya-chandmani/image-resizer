export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for Image Resizer.",
};

export default function TermsPage() {
  return (
    <article className="copy-block">
      <h1>Terms of Service</h1>
      <p>
        Image Resizer is provided for general informational and utility purposes. We aim to keep the tool accurate and available, but use of the output remains your responsibility.
      </p>
      <h2>Acceptable use</h2>
      <ul className="inline-list">
        <li>Do not misuse the service, automate abusive traffic, or attempt unauthorized access.</li>
        <li>Do not rely on the tool for regulated or compliance-critical image processing workflows without your own validation.</li>
      </ul>
      <h2>Availability</h2>
      <p>
        We may update, improve, or remove features at any time. By continuing to use the site, you agree to the current terms.
      </p>
    </article>
  );
}
