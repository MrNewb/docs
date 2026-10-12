# MrNewb Docs

Documentation site for MrNewb FiveM scripts, built with [Fumadocs](https://fumadocs.dev).

Live: [https://mrnewb.github.io/docs](https://mrnewb.github.io/docs)

Resource READMEs should link here (`/docs/<slug>`).

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs). The app is served under `/docs`.

## Build

```bash
bun run build
```

Static output is written to `out/` for GitHub Pages.

## Deploy

Push to `main` (or run the workflow by hand). GitHub Actions builds the static export and publishes Pages.

On [MrNewb/docs](https://github.com/MrNewb/docs) → **Settings → Pages**, set Source to **GitHub Actions**.

## Structure

```
content/docs/     # MDX pages and meta.json sidebar
app/              # Next.js app
source.config.ts
```
