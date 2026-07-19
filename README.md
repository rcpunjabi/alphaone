# Alpha One Garage Door Service Website

Static HTML/CSS/JS website for Alpha One Garage Door Service.

## Current Hosting Workflow

This site is deployed manually through Hostinger hPanel because the Git connection could not be completed while impersonating the client.

Recommended manual deployment:

1. Build a clean ZIP from the committed repository state:

   ```bash
   git archive --format=zip -o alphaone-upload.zip HEAD
   ```

2. Upload the full ZIP to Hostinger File Manager.
3. Extract it inside `public_html`.
4. Overwrite existing files when prompted.
5. Clear/purge Hostinger cache if the live site does not update immediately.

Do not upload only changed files unless you are intentionally doing a surgical hotfix. Full ZIP upload has been the most reliable path for this site.

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
