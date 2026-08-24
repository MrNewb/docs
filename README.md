# MrNewb Docs

Documentation site for MrNewb FiveM scripts, built with [Nextra](https://nextra.site).

Live: [https://mrnewb.github.io/docs](https://mrnewb.github.io/docs)

Resource READMEs should link here (`/docs/<slug>`), not the retired Gitbook.

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs) after `bun dev`. The app is served under `/docs`. Opening `http://localhost:3000` alone will not load the site.

If you see a blank white page:

1. Stop the dev server
2. Delete `.next`
3. Run `bun dev` again and open **http://localhost:3000/docs**
4. Hard refresh (`Ctrl+Shift+R`)

Do not run `bun run build` while `bun dev` is running.

## Build

```bash
bun run build
```

Static output is written to `out/` for GitHub Pages.

## Deploy

Push to `main` (or run the workflow by hand). GitHub Actions builds the static export and publishes Pages.

Repo: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

On [MrNewb/docs](https://github.com/MrNewb/docs) → **Settings → Pages**, set Source to **GitHub Actions** (not a branch). After the first successful run the site is at [https://mrnewb.github.io/docs](https://mrnewb.github.io/docs).

## Structure

```
pages/
  index.mdx             # Introduction
  newb_bridge/          # one resource among the others
  mrnewbbeekeeping/
  …
theme.config.tsx
styles.css
```
