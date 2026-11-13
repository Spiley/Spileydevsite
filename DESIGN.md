# Design references

Spiley is an app collection and independent studio site, separate from the Valentijn personal website.

Online references reviewed for this redesign:

- [Panic](https://panic.com/): distinctive presentations for apps and games, with personality provided by the actual products.
- [Not Boring Software](https://notbor.ing/): playful app identity, confident typography and direct product exploration.
- [Things by Cultured Code](https://culturedcode.com/things/): real interface screenshots and clear paths to the app.

This is an original implementation informed by those references; no third-party logos, proprietary illustrations or website code are included. The app artwork comes from the current official Google Play and App Store listings. Source URLs and the check date are recorded in assets/store/sources.json.

## Implementation

- Plus Jakarta Sans gives the studio its own typographic voice. It is self-hosted under the included SIL Open Font License.
- An app launcher introduces the three featured products. The collection assigns each product a distinct background and shows full, proportional screenshots. Trésors de Paris is a small text-only additional project with store links.
- Rounded download actions, screenshot galleries and product icons make the page an app catalogue rather than a CV.
- Short entrance animations, scroll reveals, icon hover movement and gallery transitions support exploration. Reduced-motion preferences disable animation. JavaScript remains optional for browsing the collection.
- Apps/games filters retain live status announcements. Clicking an app-launcher link restores hidden products before following its anchor.
- Legal pages use shared typography and navigation. Legal text, dates, canonical URLs and file paths remain intact.

## Tokens

Background #f7f8fc; text #18212c; accent #2854e8. App backgrounds: WatchWorld #dfeaff, Trésors de Paris #dceede, Exploding Booze #e9e0fa, Mazebound #f5e9bc. Content width 1160px; collection breakpoint 700px.

## Store refresh

Run npm run sync:stores to fetch the latest published Android artwork and the iPhone screenshots for Exploding Booze. The script records provenance, updates previews and the platform-aware gallery, generates content-hashed assets and runs consistency checks. The app-star decoration and status dot are removed from all current pages.
