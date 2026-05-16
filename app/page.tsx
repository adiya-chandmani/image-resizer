import Link from "next/link";
import { ImageResizerTool } from "@/components/image-resizer-tool";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="label">Free online image resize tool</p>
          <h1>Resize images online without uploads, watermarks, or waiting.</h1>
          <p>
            Image Resizer helps you resize JPG, PNG, and WebP files directly in your browser. Set an exact width and height,
            scale by percentage, lock aspect ratio, and download the resized image in seconds.
          </p>
          <div className="hero-actions">
            <a className="button" href="#image-resizer-tool">Resize an image</a>
            <Link className="button-secondary" href="/about">How the tool works</Link>
          </div>
        </div>
        <div className="stat-grid">
          <article className="card">
            <h2>Private by default</h2>
            <p>Your image is processed locally in your browser, so there is no file upload required for the core resize flow.</p>
          </article>
          <article className="card">
            <h2>Pixel and percentage modes</h2>
            <p>Choose exact dimensions or quickly shrink images for email, forms, or social sharing.</p>
          </article>
          <article className="card">
            <h2>Fast downloads</h2>
            <p>Preview the original and resized dimensions, then export a ready-to-use copy immediately.</p>
          </article>
        </div>
      </section>

      <div id="image-resizer-tool">
        <ImageResizerTool />
      </div>

      <section className="info-grid section">
        <article className="card">
          <h2>Why use an image resizer?</h2>
          <p>
            Resizing helps reduce file dimensions for websites, online forms, email attachments, and faster page loads.
          </p>
        </article>
        <article className="card">
          <h2>When exact dimensions matter</h2>
          <p>
            Use fixed pixel values for profile pictures, marketplace listings, CMS uploads, thumbnails, or banner graphics.
          </p>
        </article>
        <article className="card">
          <h2>Simple, accessible workflow</h2>
          <p>
            The interface stays lightweight, keyboard-friendly, and readable on mobile so visitors can resize quickly from any device.
          </p>
        </article>
      </section>

      <section className="faq section">
        <h2>Image resizer FAQ</h2>
        <div className="faq-grid">
          <article>
            <h3>Can I resize a photo without losing quality?</h3>
            <p>Downscaling usually preserves visual quality well. Enlarging a small image may make it look softer or pixelated.</p>
          </article>
          <article>
            <h3>Does this image resizer upload my file?</h3>
            <p>No. The core resize action runs in your browser using canvas, which helps keep the workflow private and fast.</p>
          </article>
          <article>
            <h3>Which formats work?</h3>
            <p>You can open common JPG, PNG, and WebP images, then download the resized output as PNG or JPEG.</p>
          </article>
        </div>
      </section>
    </>
  );
}
