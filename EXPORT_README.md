# 617 East Trust — Premium Redesign Export

**Project Version:** 04d197ee (Latest)  
**Export Date:** July 27, 2026  
**Status:** Production-ready, fully tested

---

## What's Included

This export contains the complete 617 East Trust premium website redesign, built with React 19, Vite 7, Tailwind CSS 4, and the Midnight Ledger design system.

### Key Features

- **13 Production Pages** — Home, Services (6 detail pages), About, Contact, Blog (4 posts), Privacy, Terms
- **Premium Motion Design** — Cinematic Ken Burns hero drift, scroll-driven parallax, staggered element reveals, animated scroll indicator
- **Full SEO Implementation** — JSON-LD schema on every page, dynamic meta tags, sitemap.xml, robots.txt, GA4 conversion tracking
- **Responsive Design** — Mobile-first, tested on desktop/tablet/mobile viewports
- **Accessibility** — Keyboard navigation, reduced-motion support, semantic HTML, ARIA labels
- **Brand System** — Midnight Ledger (dark/gold), Cormorant Garamond display, DM Sans body, DM Mono data
- **Contact Form** — Wired to n8n webhook with success/error states and form validation

---

## File Structure

```
617east-redesign/
├── client/
│   ├── src/
│   │   ├── pages/              # 13 page components
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # useReveal, useHeroEntrance, etc.
│   │   ├── data/               # Services, blog posts
│   │   ├── App.tsx             # Router
│   │   ├── index.css           # Design tokens, keyframes
│   │   └── main.tsx            # Entry point
│   ├── public/                 # favicon, robots.txt, sitemap.xml
│   └── index.html              # HTML template with OG meta tags
├── server/                     # Express server (static deployment)
├── package.json                # Dependencies
└── README.md                   # Development guide
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 22+ 
- pnpm 10+

### Install & Run

```bash
cd 617east-redesign
pnpm install
pnpm dev
```

Dev server runs on `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Design System Reference

### Colors (Midnight Ledger)
- **Background:** `oklch(0.10 0.008 240)` — near-black
- **Foreground:** `oklch(0.94 0.005 80)` — cream
- **Accent (Gold):** `oklch(0.78 0.12 80)` — warm amber
- **Muted:** `oklch(0.52 0.008 80)` — mid-gray

### Typography
- **Display:** Cormorant Garamond (serif, 500–700 weight)
- **Body:** DM Sans (sans-serif, 400–600 weight)
- **Mono:** DM Mono (monospace, 400 weight for data)

### Motion
- **Hero entrance:** 150ms label fade → 350ms rule draw → 500ms headline reveal → 1100ms subtext fade
- **Ken Burns drift:** 24s slow background pan on Home hero
- **Scroll parallax:** Background drifts slower than content on scroll
- **Scroll indicator:** 2.2s bobbing arrow, fades on scroll

---

## Deployment

### Manus (Recommended)
The project is built for Manus static hosting. Click **Publish** in the Management UI to deploy.

### External Hosting (Vercel, Netlify, etc.)
1. Build: `pnpm build`
2. Deploy the `dist/` folder
3. Configure server to serve `dist/index.html` for all routes (SPA routing)

### Self-Hosted
```bash
pnpm build
NODE_ENV=production node dist/index.js
```

Server listens on port 3000 by default.

---

## SEO & Analytics

### Google Search Console
1. Submit sitemap: `https://617east.com/sitemap.xml`
2. Request indexing for key pages
3. Monitor Core Web Vitals

### GA4 Events
- `generate_lead` — Contact form submission
- `click_to_call` — Phone number clicks

### Schema Markup
- Service pages: `Service` schema with pricing, timeline
- Blog posts: `BlogPosting` + `FAQPage` schema
- About page: `AboutPage` + `Person` (Lamont Legrand)
- Contact page: `ContactPage` + `ContactPoint`

---

## Contact Form Integration

The form submits to: `https://n8n.617east.com/webhook/617east-contact`

**To change the webhook endpoint:**
1. Open `client/src/pages/Contact.tsx`
2. Find the `fetch()` call (line ~63)
3. Replace the URL with your webhook endpoint
4. Rebuild: `pnpm build`

**Form payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "message": "string"
}
```

---

## Customization Guide

### Change Brand Colors
Edit `client/src/index.css` — update the CSS variables in `:root` and `.dark` sections.

### Update Services
Edit `client/src/data/services.ts` — add/remove services, prices, timelines.

### Add Blog Posts
Edit `client/src/data/blog.ts` — add new post objects with slug, title, content, FAQ schema.

### Modify Copy
Each page is a React component in `client/src/pages/`. Edit text directly in JSX.

### Change Fonts
Edit `client/index.html` — update Google Fonts links. Then update font-family in `client/src/index.css`.

---

## Troubleshooting

### Build errors
```bash
pnpm install
pnpm build
```

### TypeScript errors
```bash
npx tsc --noEmit
```

### Dev server not starting
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

---

## Support & Documentation

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Tailwind CSS 4:** https://tailwindcss.com
- **Wouter (routing):** https://github.com/molefrog/wouter
- **shadcn/ui:** https://ui.shadcn.com

---

## License

This project is proprietary to 617 East Trust. All rights reserved.

---

**Questions?** Contact info@617east.com or (910) 315-1800
