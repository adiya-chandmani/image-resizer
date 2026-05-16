# Image Resizer

A fast, SEO-friendly microtool built with Next.js App Router and TypeScript. It helps visitors resize JPG, PNG, and WebP images directly in the browser using exact pixel dimensions or percentage scaling.

## Features

- Browser-based image resizing with no server upload required for the core workflow
- Exact width and height controls with optional aspect-ratio lock
- Percentage resize mode for quick shrinking
- PNG and JPEG downloads after resizing
- Static-first marketing pages: home, about, privacy, terms, and contact
- `robots.txt` and `sitemap.xml` generated from `NEXT_PUBLIC_SITE_URL`

## Local development

```bash
npm install
npm run build
npm run dev
```

## Environment

Create `.env.local` with:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## AdSense placeholder

Do not add AdSense until the production domain is live and approved. When the domain is ready, add verification and ad units only after checking Core Web Vitals, layout stability, and content quality.

## Deploy

Vercel import is still needed because the Vercel CLI is not configured in this environment.
