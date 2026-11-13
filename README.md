# Spiley - Apps & games

A static app studio site built with plain HTML, CSS and JavaScript. The main collection features WatchWorld, Exploding Booze and Mazebound. Trésors de Paris is a compact additional project with store links and no images.

## Current store artwork

Current official screenshots and icons live in assets/store/. Their original URLs, dimensions and check date are recorded in assets/store/sources.json. The Exploding Booze gallery has separate Android and iPhone/iPad selections, with links to the matching store.

To refresh the artwork and gallery data from Google Play and Apple's developer catalogue:

    npm ci
    npm run sync:stores

This updates the app previews, runtime gallery data and provenance, then generates versioned CSS/JavaScript and checks the result. Commit the changed HTML, script, store assets and generated files together. Run the command again when the store listings change. Node dependencies are development tools; the published site has no package install or build requirement.

## Editing and verification

For changes to text, styles or interactions:

    node scripts/version-assets.mjs
    npm run check
    node --check script.js

Publish the repository directly with GitHub Pages. Preserve CNAME, app-ads.txt, policy URLs and previously published assets so cached pages can still load. Plus Jakarta Sans is self-hosted with its SIL Open Font License in assets/fonts/OFL.txt.

Check desktop and mobile, app/game filters, all three galleries, Android/iOS switching for Exploding Booze, arrow keys, Escape and launcher navigation after filtering. Legal pages retain their text and paths. Screenshot links open their image directly when JavaScript is unavailable.

See DESIGN.md for the original design references.
