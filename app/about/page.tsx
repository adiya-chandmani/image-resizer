export const metadata = {
  title: "About",
  description: "Learn what Image Resizer does and when to use it.",
};

export default function AboutPage() {
  return (
    <article className="copy-block">
      <h1>About Image Resizer</h1>
      <p>
        Image Resizer is a lightweight browser-based tool for quickly changing image dimensions without heavy editors, signups, or uploads.
        It is designed for people who need a fast answer to searches like resize image online, photo resizer, or change image size.
      </p>
      <h2>Who it helps</h2>
      <ul className="inline-list">
        <li>Students and job seekers resizing photos for forms or applications</li>
        <li>Store owners preparing product images for marketplaces and CMS uploads</li>
        <li>Anyone shrinking large images for email, blog posts, or faster web pages</li>
      </ul>
      <h2>Why this site exists</h2>
      <p>
        Image resizing is a consistently searched utility. This site focuses on privacy, speed, and simple controls so visitors can finish the task in under a minute.
      </p>
    </article>
  );
}
