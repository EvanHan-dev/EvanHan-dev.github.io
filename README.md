# Evan Han — portfolio

An Astro portfolio and three independent technical notes. Projects are illustrative concepts, not claims about company work.

## Run locally

```sh
npm ci
npm run dev
npm run build
```

## GitHub Pages

This project targets the **user site** repository `EvanHan-dev/EvanHan-dev.github.io`, with `https://evanhan-dev.github.io` as the site URL and no base path. Push to `main`, then select **Settings → Pages → Build and deployment → Source → GitHub Actions**. The included workflow builds with Node 22 and deploys the `dist` artifact. Check **Actions** for the deployment result and open the URL shown by the deployment job. GitHub Pages must be available for the repository's visibility and account plan.

If using a project repository instead, update `site` and set `base` in `astro.config.mjs`, then change root-relative links and the favicon to honor that base path before deploying.

Edit `src/pages/index.astro` and the files under `src/pages/blog/` to replace the sample content with approved personal work. Review material for confidential information before publishing.

