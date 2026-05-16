export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Image Resizer.",
};

export default function PrivacyPage() {
  return (
    <article className="copy-block">
      <h1>Privacy Policy</h1>
      <p>
        Image Resizer does not require an account, and the core resize flow processes your image in the browser on your device.
      </p>
      <h2>Data we may collect</h2>
      <ul className="inline-list">
        <li>Basic anonymous analytics such as page views, browser type, and device category</li>
        <li>Information you choose to share by email or through a contact form</li>
      </ul>
      <h2>How data is used</h2>
      <p>
        Limited data may be used to maintain the site, improve performance, understand demand, and respond to support requests. We do not sell personal data.
      </p>
      <h2>Third-party services</h2>
      <p>
        Hosting providers, analytics tools, and email services may process technical information needed to operate the website reliably.
      </p>
    </article>
  );
}
