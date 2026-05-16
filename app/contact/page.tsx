export const metadata = {
  title: "Contact",
  description: "Contact Image Resizer.",
};

export default function ContactPage() {
  return (
    <article className="copy-block">
      <h1>Contact</h1>
      <p>
        Questions, bug reports, or feedback about the image resize tool? Reach out by email and include the device, browser, and what you expected to happen.
      </p>
      <h2>Email</h2>
      <p>
        <a href="mailto:hello@example.com">hello@example.com</a>
      </p>
      <h2>Helpful details</h2>
      <ul className="inline-list">
        <li>Your browser and device type</li>
        <li>The file format and original image size</li>
        <li>The width, height, or percentage you tried to use</li>
      </ul>
    </article>
  );
}
