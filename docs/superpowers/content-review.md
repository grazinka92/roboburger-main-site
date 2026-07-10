# Content & decisions to review with GG

Running list of items that need GG's confirmation. None block building the site; they must be resolved before going live.

## 1. Proxima Nova font — licensing ⚠️
The current site self-hosts the commercial font **Proxima Nova** (files under `/wp-content/uploads/2025/10/`). We reuse the same files to stay faithful (same posture as the live site today). However, self-hosting Proxima Nova requires a valid webfont license.
- **Action for GG:** confirm Sweet Robo has a license to self-host Proxima Nova on the web. Options if not: (a) use Adobe Fonts embed for Proxima Nova (GG has Adobe), (b) switch to a free look-alike (e.g. Mulish / Hind / Montserrat), (c) purchase a webfont license.
- **Status:** OPEN. Building with the existing files for now.

## 2. Invest page — stale copy ⚠️
The live `/investor/` page says: *"The option to invest will open in January 2026."* Today is 2026-07, so this is likely outdated. Copied verbatim for fidelity.
- **Action for GG:** confirm the current investor status / provide updated wording.
- **Status:** OPEN. Reproduced verbatim; not silently changed.

## 3. Contact form destination + service key
The rebuilt contact form will use a static-friendly service (Web3Forms, free) that emails submissions.
- **Action for GG:** confirm the destination email (default `Sales@RoboBurger.com`) and create a free Web3Forms access key (or approve me guiding you through it).
- **Status:** OPEN. Building with a placeholder key until provided.

## 4. GitHub repo (for deployment)
- **Action for GG:** create an empty repository on the company GitHub and share its URL so we can push and connect Cloudflare Pages.
- **Status:** OPEN. Local git repo already initialized.

## 5. Vector logo
- **Action for GG:** provide the logo in vector (.ai / .svg / .eps). Interim: current logo will be extracted from the live site.
- **Status:** OPEN.

## 6. Cloudflare account access
- **Action for GG:** identify who manages the company Cloudflare account (needed to connect Pages and later move the domain).
- **Status:** OPEN. Needed only at deploy/cutover.
