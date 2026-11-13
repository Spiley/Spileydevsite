# Spiley — Apps & games

An independent app studio site built with plain HTML, CSS and JavaScript. No framework or installation step is needed.

## Design

See [DESIGN.md](DESIGN.md) for the online references and design decisions. The four projects retain their real app icons, screenshots and store links. Plus Jakarta Sans is self-hosted; the SIL Open Font License is in assets/fonts/OFL.txt. Existing legal page URLs and app-ads.txt remain available.

## Editing and verification

Edit index.html, styles.css or script.js, then run:

    node scripts/version-assets.mjs
    node scripts/check-assets.mjs
    node --check script.js

Commit generated styles.<hash>.css and script.<hash>.js together with the HTML. The content hashes avoid stale styles and scripts after a Pages deployment. Retain earlier generated assets when they have been published, so cached HTML keeps working. No build step is required on GitHub Pages.

Use a static HTTP server to preview the repository. Check desktop and mobile, all three filters, the four screenshot galleries (including keyboard navigation and Escape), app-launcher links after filtering, and the policy pages. Without JavaScript, every app remains visible and screenshot links open the image.

## Project assets

WatchWorld (com.WatchWorld), Trésors de Paris (com.tresorsdeparis), Exploding Booze (com.explodingbooze) and Mazebound: Simple TD (nl.valentijnkeijser.towerdefense). Official app icons and screenshots are saved locally as WebP. assets/sources.json records their sources.
