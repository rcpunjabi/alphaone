# Alpha One Garage Door Service Website

Static HTML/CSS/JS website for Alpha One Garage Door Service.

## Current Hosting Workflow

This site is deployed manually through Hostinger hPanel because the Git connection could not be completed while impersonating the client.

### Verified content release: November 7, 2026

The deployed content commit is `7276a60479f6f944358e82b3cc3be9c69356fa6e`, with release marker `20261107-seo-aeo`. Its content-only package contains 16 HTML pages and `site-release.json`. All 17 public files were verified against the package hashes after upload.

That deployment excluded `.htaccess`, CSS, JavaScript, and all other server files. The repository `.htaccess` was subsequently reconciled with an authenticated Hostinger backup as a source-preservation change; this did not change or redeploy the live server configuration.

The live server also contains `estimate-request-received.html` and `1776-offer-ended.html`, which are not in this checkout. Preserve these pages and other server-only files during future releases.

Recommended manual deployment:

1. Inspect the current live file inventory and `.htaccess` before choosing the release scope. Preserve unrelated routing, integrations, and server-only files.
2. For a content release, build a clean ZIP from the exact reviewed commit with an explicit file list. For example, to reproduce the verified November 7 package:

   ```bash
   git archive --format=zip -o alphaone-content-upload.zip 7276a60479f6f944358e82b3cc3be9c69356fa6e -- '*.html' site-release.json
   ```

3. Upload or extract only the intended package files directly into `public_html`, replacing the corresponding existing files. Do not delete unrelated server files.
4. Verify public file hashes and the customer paths after upload. Clear/purge Hostinger cache only if the intended files have not propagated.

Use a full-site archive only when the release requires it and the current server rules and server-only files have been reconciled explicitly. Do not treat this repository as a complete inventory of `public_html`, or overwrite live `.htaccess` merely because it appears in an archive.

## Cache Busting

The site uses query-string cache keys on static assets, for example:

```html
<link rel="stylesheet" href="css/site.css?v=20260710-modal-images">
<script src="js/main.js?v=20260710-modal-images"></script>
```

When changing CSS or JavaScript, update the matching `?v=` value in the HTML so browsers and Hostinger do not keep serving stale files.

## Illustrations

The active illustration assets live in:

```text
assets/illustrations/
```

Current service mappings are defined in `css/site.css`:

- `.media-hero` -> `hero-home.svg`
- `.media-installation` -> `service-installation.svg`
- `.media-repair` -> `service-repair.svg`
- `.media-openers` -> `service-openers.svg`
- `.media-commercial` -> `service-commercial.svg`
- `.media-maintenance` -> `service-maintenance.svg`
- `.media-about` -> `pillars-shop.svg`

The homepage service popups reuse these same media classes through `js/main.js`.

Source Drive folder for the approved illustration set:

```text
https://drive.google.com/drive/folders/1SQns42u5tfZy4X_J8-_R0mWdJQyIGiF6
```

## Go HighLevel Form

The contact form is embedded from Go HighLevel:

```text
https://api.leadconnectorhq.com/widget/form/bKCXwQJwLrBYXMwhfEsa
```

The website controls the outer iframe/card width and desktop height cap. The internal form field layout and generated iframe height are controlled mostly by Go HighLevel and its embed script.

If the hero form needs to become materially shorter, edit the form layout/fields inside Go HighLevel rather than only changing this repository.

## Local Preview

From the repository root:

```bash
python3 -m http.server 4184 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4184/index.html
```

Before packaging, check:

- Homepage desktop and mobile portrait.
- `Our Mission` section on portrait mobile.
- Hero contact form.
- Homepage service popups.
- Service page hero illustrations.

## GEO and structured data

- Keep the canonical business name exactly `Alpha One Garage Door Service` in public titles, visible NAP details, and structured data.
- The homepage owns the canonical `#business` entity, alternate historical names, verified profile links, geographic coordinates, service areas, and offer catalog.
- Installation, repair, opener, and core-city pages reference that same `#business` ID and include source-matched `Service` and visible `FAQPage` data.
- Regenerate the Lombard, Glen Ellyn, and Wheaton pages after editing their source data:

  ```bash
  node scripts/generate-city-pages.mjs
  ```

- Do not add a BBB rating or accreditation badge unless the exact Alpha One record is verified first.
- When adding a location page, link it from `service-area.html`, `sitemap.xml`, and `llms.txt`; avoid copying claims, prices, reviews, or service coverage that the website does not already support.
