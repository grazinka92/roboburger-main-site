# RoboBurger Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faithfully rebuild roboburger.com (currently WordPress on SiteGround) as a fast, static Astro site, visually identical 1:1, deployed on Cloudflare Pages.

**Architecture:** Static Astro site (`output: 'static'`), no server runtime. Shared `BaseLayout` + `Header`/`Footer` components reused across all pages. Each page is a `.astro` file under `src/pages/` whose route matches the current site's URL exactly. Interactive bits are handled without a backend: contact form via a static-friendly form service (Web3Forms), Calendly via embed/link, cookie consent + analytics reproduced from the live site.

**Tech Stack:** Astro 5, HTML/CSS (vanilla, CSS custom properties for design tokens), a small amount of vanilla JS (mobile menu, cookie banner). Node v24 / npm 11 (already installed). Git. Cloudflare Pages for hosting.

## Global Constraints

- **Fidelity:** Visual 1:1 reproduction of the live public site. The authoritative source for every page's exact text, layout, spacing, colors, and images is the **live page itself** — inspect it (browser DevTools / view-source / saved reference HTML), do not paraphrase from summaries.
- **Static only:** Astro `output: 'static'`. No SSR, no database, no server runtime.
- **Routes must match the current site exactly** (link + SEO parity):
  - `/` (Home)
  - `/our-product/` (Product)
  - `/about/` (About Us)
  - `/investor/` (Invest)
  - `/contact-us/` (Contact Us)
  - `/terms-services/` (Terms & Services)
  - `/privacy-policy/` (Privacy Policy)
  - `/cookies-policy/` (Cookies Policy)
  - Trailing slashes preserved → set `trailingSlash: 'always'` and `build.format: 'directory'`.
- **External links (verbatim):**
  - Sweet Robo → `https://sweetrobo.com/`
  - Instagram → `https://www.instagram.com/roboburger?igsh=ZWFuOG1tMzd3Znl6`
  - Facebook → `https://www.facebook.com/share/1AbhsJLYSs/`
  - LinkedIn → `https://www.linkedin.com/company/roboburger-inc/`
  - YouTube → `https://youtube.com/@theroboburger2700?si=aQMdVVGpW7MvYJEK`
- **Contact details (verbatim):** phone `1 (866) 805-3330`, WhatsApp `+1 844-793-3872`, email `Sales@RoboBurger.com`, address `132 32nd St Brooklyn NY 11232`.
- **Responsive parity:** must match the live site on mobile and desktop.
- **Deploy target:** Cloudflare Pages (company already uses Cloudflare for sweetrobo.com).
- **Commit after every task.** Small, frequent commits.
- **Note on "tests":** This is a faithful copy of a brochure site with no business logic, so "verify" steps are **build checks + visual/functional comparison against the live URL**, not unit tests. Each task ends with an independently checkable deliverable.

---

## Task 1: Scaffold Astro project + git + config

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/pages/index.astro` (temporary placeholder)

**Interfaces:**
- Produces: a buildable Astro project; the `src/pages/` route directory; npm scripts `dev`, `build`, `preview`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "roboburger-website",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://roboburger.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{ "extends": "astro/tsconfigs/strict" }
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
dist/
.astro/
reference/
.env
.DS_Store
```

- [ ] **Step 5: Create temporary `src/pages/index.astro`**

```astro
---
---
<html lang="en">
  <head><meta charset="utf-8" /><title>RoboBurger</title></head>
  <body><h1>RoboBurger — build in progress</h1></body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, `astro` installed, no errors.

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: build completes, `dist/index.html` exists.

- [ ] **Step 8: Verify dev server**

Run: `npm run dev` (then stop it)
Expected: serves at `http://localhost:4321/` and shows the placeholder heading.

- [ ] **Step 9: Init git + commit**

```bash
git init
git add .
git commit -m "chore: scaffold Astro static project"
```

---

## Task 2: Capture live-site reference (ground truth)

Save the current site's rendered HTML locally so reproduction works from real markup, not summaries. `reference/` is gitignored (Task 1) — it is a working aid, not shipped code.

**Files:**
- Create: `reference/*.html` (local only, gitignored)

- [ ] **Step 1: Download each page's HTML**

```bash
mkdir -p reference
curl -sL https://roboburger.com/               -o reference/home.html
curl -sL https://roboburger.com/our-product/   -o reference/product.html
curl -sL https://roboburger.com/about/         -o reference/about.html
curl -sL https://roboburger.com/investor/      -o reference/investor.html
curl -sL https://roboburger.com/contact-us/    -o reference/contact.html
curl -sL https://roboburger.com/terms-services/  -o reference/terms.html
curl -sL https://roboburger.com/privacy-policy/  -o reference/privacy.html
curl -sL https://roboburger.com/cookies-policy/  -o reference/cookies.html
```

- [ ] **Step 2: Verify capture**

Run: `ls -la reference/` and open one file.
Expected: 8 non-empty `.html` files; opening `reference/home.html` shows RoboBurger markup.

- [ ] **Step 3: Inventory fonts, colors, analytics, and assets**

Inspect `reference/home.html` (and the live site in a browser) and write findings into `reference/NOTES.md` (also gitignored):
- `@font-face` / Google Fonts `<link>` URLs and font-family names in use.
- Primary/accent color hex values (from DevTools → Computed).
- Any analytics/tag scripts (Google Analytics/GTM, Meta Pixel) and their IDs.
- Cookie-consent banner script/provider, if any.
- URLs of key images (hero, gallery, logo, partner logos, brochure PDF).

Expected: `reference/NOTES.md` lists concrete font names, hex codes, analytics IDs (or "none found"), and image URLs.

- [ ] **Step 4: Commit** (no shipped files change; commit the plan progress only if applicable — otherwise skip)

Note: nothing to commit here since `reference/` is ignored. Proceed to Task 3.

---

## Task 3: Design tokens + global styles + fonts

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/fonts.css` (only if fonts are self-hosted)

**Interfaces:**
- Produces: CSS custom properties `--color-bg`, `--color-fg`, `--color-accent`, `--font-heading`, `--font-body`, plus a CSS reset and base typography. Consumed by every component/page.

- [ ] **Step 1: Create `src/styles/global.css` with tokens + reset**

Fill the values from `reference/NOTES.md` (Task 2, Step 3). Structure:

```css
:root {
  /* Colors — set exact hex from reference/NOTES.md */
  --color-bg: #ffffff;
  --color-fg: #0a0a0a;
  --color-accent: #ff5a1f;      /* replace with exact orange/red from live site */
  --color-muted: #6b6b6b;

  /* Fonts — set exact families from reference/NOTES.md */
  --font-heading: 'REPLACE_HEADING_FONT', system-ui, sans-serif;
  --font-body: 'REPLACE_BODY_FONT', system-ui, sans-serif;

  --maxw: 1200px; /* match live container width */
}

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; font-family: var(--font-body); color: var(--color-fg); background: var(--color-bg); line-height: 1.5; }
img, svg, video { max-width: 100%; height: auto; display: block; }
a { color: inherit; }
h1, h2, h3, h4 { font-family: var(--font-heading); line-height: 1.15; }
.container { width: 100%; max-width: var(--maxw); margin-inline: auto; padding-inline: 1rem; }
```

Replace every `REPLACE_*` token and the accent hex with the real values captured in Task 2. No `REPLACE_*` may remain.

- [ ] **Step 2: Load fonts**

If the live site uses Google Fonts, add the exact `<link>` in the layout `<head>` (Task 4). If self-hosted, download the woff2 files into `public/fonts/` and create `src/styles/fonts.css` with matching `@font-face` rules. Use the same family names/weights the live site uses.

- [ ] **Step 3: Verify tokens render**

Temporarily import `global.css` in `src/pages/index.astro` and add a heading + accent-colored element.
Run: `npm run dev`
Expected: heading uses the correct font; accent color matches the live site (compare with DevTools color picker on both).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css public/fonts 2>/dev/null; git add -A
git commit -m "feat: global styles, design tokens, and fonts"
```

---

## Task 4: Base layout + Header + Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Produces: `BaseLayout` with props `{ title: string; description?: string }` and a default `<slot />` for page content; imports `global.css`; renders `Header` above the slot and `Footer` below. Every page consumes `BaseLayout`.

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
const { title, description = '' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <!-- Google Fonts <link> here if used (from Task 3) -->
  </head>
  <body>
    <Header />
    <main><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create `src/components/Header.astro`**

Reproduce the live header (logo left, nav right, mobile hamburger). Nav items and hrefs (exact):

```astro
---
const nav = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/our-product/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Sweet Robo', href: 'https://sweetrobo.com/' },
  { label: 'Invest', href: '/investor/' },
  { label: 'Contact Us', href: '/contact-us/' },
];
---
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="logo"><img src="/logo.svg" alt="RoboBurger" /></a>
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false">☰</button>
    <nav class="site-nav">
      {nav.map((i) => <a href={i.href}>{i.label}</a>)}
    </nav>
  </div>
</header>
<script>
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  btn?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(!!open));
  });
</script>
<style>
  /* Match live header: colors, spacing, sticky behavior, breakpoint for hamburger */
  .header-inner { display: flex; align-items: center; justify-content: space-between; }
  .site-nav { display: flex; gap: 1.5rem; }
  .nav-toggle { display: none; background: none; border: 0; font-size: 1.5rem; }
  @media (max-width: 900px) {
    .nav-toggle { display: block; }
    .site-nav { display: none; flex-direction: column; }
    .site-nav.open { display: flex; }
  }
</style>
```

Adjust styling (colors, sticky, exact breakpoint) to match the live header by inspecting it.

- [ ] **Step 3: Create `src/components/Footer.astro`**

Reproduce the live footer: contact block, social icons, Pages column, Legal column.

```astro
---
const pages = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Product', href: '/our-product/' },
  { label: 'Invest', href: '/investor/' },
  { label: 'Sweet Robo', href: 'https://sweetrobo.com/' },
  { label: 'Contact Us', href: '/contact-us/' },
];
const legal = [
  { label: 'Terms & Services', href: '/terms-services/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Cookies Policy', href: '/cookies-policy/' },
];
const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/roboburger?igsh=ZWFuOG1tMzd3Znl6' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1AbhsJLYSs/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/roboburger-inc/' },
  { label: 'YouTube', href: 'https://youtube.com/@theroboburger2700?si=aQMdVVGpW7MvYJEK' },
];
---
<footer class="site-footer">
  <div class="container">
    <p>132 32nd St Brooklyn NY 11232</p>
    <p><a href="tel:+18668053330">1 (866) 805-3330</a> · <a href="mailto:Sales@RoboBurger.com">Sales@RoboBurger.com</a></p>
    <nav class="social">{social.map((s) => <a href={s.href} target="_blank" rel="noopener">{s.label}</a>)}</nav>
    <nav class="foot-pages">{pages.map((p) => <a href={p.href}>{p.label}</a>)}</nav>
    <nav class="foot-legal">{legal.map((l) => <a href={l.href}>{l.label}</a>)}</nav>
  </div>
</footer>
<style>/* Match live footer layout, columns, colors, social icons */</style>
```

Replace text social labels with the real icon SVGs from the live footer during styling.

- [ ] **Step 4: Wire the placeholder home page through the layout**

Update `src/pages/index.astro` to use `BaseLayout` so Header/Footer render.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: header nav + footer render on `/`; every nav/footer href matches the Global Constraints list; mobile menu toggles under 900px (compare breakpoint to live).
Run: `npm run build` → Expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: base layout with header and footer"
```

---

## Task 5: Home page (`/`)

Reproduce `reference/home.html` / live `https://roboburger.com/`. Sections in order:
1. Hero — "the first and only fully autonomous burger machine" + primary CTA.
2. Value proposition (innovation / revenue / low startup cost).
3. Deployment locations (the 18 venue types: malls, airports, universities, hospitals, stadiums, etc.).
4. Product feature — "A Chef. A Kitchen. A Business. In a Box".
5. Key benefits (24/7, staff-free, 10 sq ft).
6. Gen 3 pre-order campaign (200-unit launch, $27,500, $5,000 deposit).
7. Testimonials (Shark Tank investor quotes).
8. Gallery (product + installation photos).
+ CTAs ("Contact Us To Reserve") linking as on the live site.

**Files:**
- Modify: `src/pages/index.astro` (replace placeholder with full home page)
- Create: `src/components/home/*.astro` if a section is complex enough to isolate (optional; keep files focused)
- Add images to `public/images/` (download from live site; optimize)

**Interfaces:**
- Consumes: `BaseLayout`, `Header`, `Footer`, `global.css` tokens.

- [ ] **Step 1: Build the page**

Use `BaseLayout` with the live `<title>`/meta description (copy from `reference/home.html`). Reproduce each section above with the live text verbatim and matching layout/spacing. Download hero/gallery/testimonial images into `public/images/` and reference them.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; `dist/index.html` present.

- [ ] **Step 3: Visual comparison**

Run: `npm run dev`; open `http://localhost:4321/` and `https://roboburger.com/` side by side at desktop (1280px) and mobile (375px).
Expected: same sections, order, text, images, colors, and responsive behavior. Note any diffs and fix before committing.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: home page"
```

---

## Task 6: Product page (`/our-product/`)

Reproduce live `https://roboburger.com/our-product/`. Sections in order:
1. Hero "Our Product".
2. Autonomous Burger Kitchen overview + "Own One" CTA.
3. Product description (compact 10 sq ft unit).
4. Specifications (70 burgers per refill, electrical, dimensions).
5. Menu features (3 patties, 3 toppings, 6 sauces, toasted bun).
6. Key features grid (9 items: no plumbing, self-cleaning, built-in cameras, real-time viewing, plug & play, customizable menu, remote monitoring, patented tech, 3D view).
7. Business value (6 advantages).
8. Gen 3 upgrades (capacity, design, live window, footprint; "128 of 200 available at $5,000 down").
9. Pre-order CTA ($27,500 + contact button).
10. "Join the Revolution" section.
11. Product brochure download link (grab the PDF into `public/`).
12. Footer (component).

**Files:**
- Create: `src/pages/our-product/index.astro`
- Add: images/icons to `public/images/`, brochure PDF to `public/`

- [ ] **Step 1: Build the page** using `BaseLayout`, verbatim live text, matching layout, downloaded images/icons, and the brochure download link pointing to the local PDF.
- [ ] **Step 2: Verify build** — Run: `npm run build` → Expected: `dist/our-product/index.html` exists.
- [ ] **Step 3: Visual comparison** vs live `/our-product/` at 1280px and 375px; fix diffs.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: product page"`

---

## Task 7: About page (`/about/`)

Reproduce live `https://roboburger.com/about/`. Sections in order:
1. Hero — "What if getting a fresh, hot burger didn't require a kitchen, a chef or even a building?"
2. Company story (culinary + robotic automation origin).
3. Vision statement.
4. Mission statement.
5. Sweet Robo partnership (2025; 25+ countries, thousands of machines).
6. Sweet Robo credentials (4 points).
7. Partner logos gallery.
8. Partnership benefits.
9. Footer.

**Files:**
- Create: `src/pages/about/index.astro`
- Add: partner logo images to `public/images/partners/`

- [ ] **Step 1: Build the page** using `BaseLayout`, verbatim text, matching layout, downloaded partner logos.
- [ ] **Step 2: Verify build** — Run: `npm run build` → Expected: `dist/about/index.html` exists.
- [ ] **Step 3: Visual comparison** vs live `/about/` at 1280px and 375px; fix diffs.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: about page"`

---

## Task 8: Invest page (`/investor/`)

Reproduce live `https://roboburger.com/investor/`. Sections in order:
1. Hero — "Invest in the Future, Invest in RoboBurger".
2. "Coming soon" message — currently: "The option to invest will open in January 2026..." **← COPY VERBATIM, but this is likely stale (today is 2026-07). Flag for GG to confirm/update; do not silently change.**
3. "Get In Touch" CTA → `/contact-us/`.
4. Footer.

**Files:**
- Create: `src/pages/investor/index.astro`

- [ ] **Step 1: Build the page** using `BaseLayout`, verbatim text (including the January 2026 line), CTA linking to `/contact-us/`.
- [ ] **Step 2: Verify build** — Run: `npm run build` → Expected: `dist/investor/index.html` exists.
- [ ] **Step 3: Visual comparison** vs live `/investor/`; fix diffs.
- [ ] **Step 4: Add a note** in `docs/superpowers/content-review.md` (create it) listing the stale "January 2026" copy for GG to review.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: investor page"`

---

## Task 9: Contact page (`/contact-us/`) + form + Calendly + WhatsApp

Reproduce live `https://roboburger.com/contact-us/`. Sections in order:
1. Page title "Contact Us" + tagline "Have Questions or Ideas? Let's Connect...".
2. "Send a Message" contact form. **Read the exact fields from `reference/contact.html`** (typically Name, Email, message; possibly phone/company) and reproduce them exactly.
3. "Call Us" — `1 (866) 805-3330`.
4. "Email Us" — `Sales@RoboBurger.com` (1-business-day response).
5. Additional contact methods — phone, WhatsApp `+1 844-793-3872`, email, Calendly scheduling link.
6. Footer.

**Files:**
- Create: `src/pages/contact-us/index.astro`

**Form approach:** Web3Forms (free, static-friendly, emails submissions — no backend). Requires a free access key tied to the destination email.

- [ ] **Step 1: Obtain a Web3Forms access key**

GG (or dev) signs up free at web3forms.com with the destination email (e.g. `Sales@RoboBurger.com`) and gets an access key. Until available, use the literal placeholder `WEB3FORMS_ACCESS_KEY` and record this dependency in `docs/superpowers/content-review.md`.

- [ ] **Step 2: Build the page + form**

Match the live form's exact fields. Form skeleton:

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="WEB3FORMS_ACCESS_KEY" />
  <!-- reproduce the exact fields from reference/contact.html, e.g.: -->
  <input type="text"  name="name"    placeholder="Name"    required />
  <input type="email" name="email"   placeholder="Email"   required />
  <textarea          name="message" placeholder="Message" required></textarea>
  <!-- honeypot spam trap -->
  <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" />
  <button type="submit">Send</button>
</form>
```

Add WhatsApp link `https://wa.me/18447933872`, `tel:`/`mailto:` links, and the Calendly link/embed exactly as on the live site.

- [ ] **Step 3: Verify build** — Run: `npm run build` → Expected: `dist/contact-us/index.html` exists.
- [ ] **Step 4: Visual comparison** vs live `/contact-us/`; confirm all fields and contact methods present; fix diffs.
- [ ] **Step 5: Functional check** (once real access key is set): submit a test message; confirm it arrives at the destination email. Until then, note as pending in `content-review.md`.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: contact page with form, calendly, whatsapp"`

---

## Task 10: Legal pages (Terms, Privacy, Cookies)

Reproduce the text of the three legal pages verbatim from the reference HTML.

**Files:**
- Create: `src/pages/terms-services/index.astro`
- Create: `src/pages/privacy-policy/index.astro`
- Create: `src/pages/cookies-policy/index.astro`

- [ ] **Step 1: Build the three pages** using `BaseLayout`, copying the full legal text verbatim from `reference/terms.html`, `reference/privacy.html`, `reference/cookies.html`. Preserve headings, lists, and paragraph structure.
- [ ] **Step 2: Verify build** — Run: `npm run build` → Expected: `dist/terms-services/index.html`, `dist/privacy-policy/index.html`, `dist/cookies-policy/index.html` all exist.
- [ ] **Step 3: Visual/text comparison** vs the three live pages; confirm no missing clauses.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: legal pages"`

---

## Task 11: Cookie consent banner + analytics

Reproduce whatever the live site uses, based on `reference/NOTES.md` (Task 2, Step 3).

**Files:**
- Create: `src/components/CookieBanner.astro` (only if the live site has a consent banner)
- Modify: `src/layouts/BaseLayout.astro` (inject analytics script + banner)

- [ ] **Step 1: Analytics** — If the live site loads Google Analytics/GTM or Meta Pixel, add the same snippet with the same ID to `BaseLayout` `<head>`/`<body>` per the provider's placement. If none found, skip and note "no analytics on live site" in `content-review.md`.
- [ ] **Step 2: Cookie banner** — If the live site shows a consent banner, reproduce it (component + minimal vanilla JS that stores consent in `localStorage` and gates non-essential scripts). Match wording and link to `/cookies-policy/`. If none found, skip.
- [ ] **Step 3: Verify** — Run: `npm run build && npm run dev`; confirm banner appears/dismisses and analytics loads (Network tab shows the request) matching live behavior.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: cookie banner and analytics"`

---

## Task 12: Brand assets — logo, favicon, image optimization

**Files:**
- Add: `public/logo.svg` (from GG's vector), `public/favicon.ico` / `public/favicon.svg`
- Modify: image references if filenames change

**Dependency:** GG provides the vector logo (.ai/.svg/.eps). If not yet available, extract the current logo from the live site as an interim asset and record the dependency in `content-review.md`.

- [ ] **Step 1: Add the vector logo** as `public/logo.svg` (export from .ai to optimized SVG if needed). Confirm `Header`/`Footer` reference it and it's crisp at all sizes.
- [ ] **Step 2: Favicon** — reproduce the live site's favicon (grab `/favicon.ico` from live or export from the logo). Add to `public/` and reference in `BaseLayout` `<head>`.
- [ ] **Step 3: Optimize images** — ensure `public/images/` assets are reasonably sized (compress large PNG/JPG; prefer web-sized dimensions). Optionally introduce Astro `<Image>` later; not required for parity.
- [ ] **Step 4: Verify** — Run: `npm run build`; check logo + favicon render on desktop and mobile.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: brand logo, favicon, optimized images"`

---

## Task 13: Cloudflare Pages deployment

Publish to a temporary `*.pages.dev` URL for review, connected to the company GitHub repo, auto-deploying on push. **Domain cutover is deliberately NOT here** — see Task 15.

**Files:**
- Create: `public/_redirects` (only if redirects are needed)

**Dependency:** GitHub repo created by GG on the company GitHub; access to the company Cloudflare account (to connect the repo).

- [ ] **Step 1: Push repo to company GitHub**

```bash
git remote add origin <company-github-repo-url>
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Connect Cloudflare Pages to the repo** (Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git). Build settings:
  - Framework preset: **Astro**
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Node version: 20+ (set `NODE_VERSION=20` env var if needed).

- [ ] **Step 3: Verify deploy** — Cloudflare builds and serves at `https://<project>.pages.dev`. Open it; confirm all 8 routes load and match local.
- [ ] **Step 4: Verify auto-deploy** — push a trivial change; confirm Cloudflare rebuilds automatically.
- [ ] **Step 5: Commit** any config (`_redirects`, env notes) — `git add -A && git commit -m "chore: cloudflare pages config"`

---

## Task 14: Final QA pass

**Files:** none (verification + fixes only)

- [ ] **Step 1: Full side-by-side** — every page (`/`, `/our-product/`, `/about/`, `/investor/`, `/contact-us/`, `/terms-services/`, `/privacy-policy/`, `/cookies-policy/`) vs live, at 1280px and 375px. Log diffs; fix.
- [ ] **Step 2: Link audit** — click every header, footer, and in-body link; confirm internal routes resolve and external links (Sweet Robo, socials, WhatsApp, Calendly) open correctly.
- [ ] **Step 3: Form test** — submit the contact form with the real Web3Forms key; confirm email delivery.
- [ ] **Step 4: Meta/SEO parity** — each page has the live `<title>` and meta description; check Open Graph tags if the live site has them.
- [ ] **Step 5: Performance sanity** — run Lighthouse (Chrome DevTools) on the `.pages.dev` site; confirm no broken assets and good scores (static site should score well).
- [ ] **Step 6: Commit** fixes — `git add -A && git commit -m "fix: final QA adjustments"`

---

## Task 15: Domain cutover runbook (execute later)

Executed only after GG approves the `.pages.dev` preview AND Cloudflare account access is confirmed. Documented here; not run during initial build.

**Files:**
- Create: `docs/superpowers/domain-cutover.md`

- [ ] **Step 1: Write the runbook** capturing:
  1. In Cloudflare Pages → the project → Custom domains → add `roboburger.com` and `www.roboburger.com`.
  2. Move `roboburger.com` DNS to Cloudflare (nameserver change from SiteGround `ns1/ns2.siteground.net` to Cloudflare) OR, if DNS stays elsewhere, add the CNAME/records Cloudflare provides. (Since the company already uses Cloudflare for sweetrobo.com, moving the domain into that Cloudflare account is the clean path.)
  3. Wait for DNS propagation; verify `https://roboburger.com` serves the new site.
  4. Keep the SiteGround WordPress instance untouched for a rollback window (e.g., 2 weeks) before decommissioning.
  5. Rollback: revert nameservers/records to SiteGround.
- [ ] **Step 2: Commit** — `git add -A && git commit -m "docs: domain cutover runbook"`

---

## Self-Review (completed by plan author)

- **Spec coverage:** Every spec section maps to a task — scope/pages → Tasks 5–10; Astro foundation → Tasks 1,3,4; source-from-live → Task 2; edit model (no CMS) → inherent (static pages); interactive (form/Calendly/cookies/analytics) → Tasks 9,11; brand assets → Tasks 3,12; hosting Cloudflare Pages + GitHub → Task 13; verification → Task 14; domain cutover → Task 15; open items (Cloudflare access, form service, fonts, stale Invest copy) → tracked in Tasks 8,9,12,13 and `content-review.md`.
- **Placeholder scan:** Intentional, clearly-flagged pending values remain only where they depend on external input: `REPLACE_*` font/color tokens (resolved in Task 3 from captured values), `WEB3FORMS_ACCESS_KEY` (Task 9), `<company-github-repo-url>` (Task 13). Each has an explicit resolution step. No vague "add error handling"-type placeholders.
- **Type/route consistency:** Routes match Global Constraints exactly across all tasks; `BaseLayout` prop shape `{title, description?}` is consistent between Task 4 and its consumers (Tasks 5–10); nav/footer href lists are identical to the external-links constraint.
