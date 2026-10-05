# Spiley apps

An independent developer portfolio built with plain HTML, CSS, and JavaScript. No package install or build step is needed.

## Preview

Open `index.html` in a browser, or run a local server from this directory:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Projects

The four projects were verified against [Spiley's live Google Play catalog](https://play.google.com/store/apps/developer?id=Spiley) on October 3, 2026:

- WatchWorld — `com.WatchWorld`
- Trésors de Paris — `com.tresorsdeparis`
- Exploding Booze — `com.explodingbooze`
- Mazebound: Simple TD — `nl.valentijnkeijser.towerdefense`

Official app icons and three screenshots per project are saved locally in `assets/` and compressed to WebP. `assets/sources.json` records their Google Play sources. The Manrope font loads from Google Fonts with an Arial fallback.

## Editing and publishing

Edit project descriptions and store links in `index.html`. The screenshot galleries and project filters are controlled by `script.js`. To add a project, update the card markup, filter counts, gallery metadata, and image assets together.

Publish this folder as a static site. Keep the existing privacy pages, terms, and `app-ads.txt` at their current paths. No changes to their legal text are needed for this redesign.
