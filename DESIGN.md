# Design references

Spiley is an app collection and independent studio site, separate from the Valentijn personal website.

Online references reviewed for this redesign:

- [Panic](https://panic.com/): distinctive presentations for apps and games, with personality provided by the actual products.
- [Not Boring Software](https://notbor.ing/): playful app identity, confident typography and direct product exploration.
- [Things by Cultured Code](https://culturedcode.com/things/): real interface screenshots and clear paths to the app.

This is an original implementation informed by those references; no third-party logos, proprietary illustrations or website code are included. The app artwork is the existing Spiley collection.

## Implementation

- Plus Jakarta Sans gives the studio its own typographic voice. It is self-hosted under the included SIL Open Font License.
- An app launcher introduces the four products. The two-column collection assigns each product a distinct background and shows full, proportional screenshots.
- Rounded download actions, screenshot galleries and product icons make the page an app catalogue rather than a CV.
- Short entrance animations, scroll reveals, icon hover movement and gallery transitions support exploration. Reduced-motion preferences disable animation. JavaScript remains optional for browsing the collection.
- Apps/games filters retain live status announcements. Clicking an app-launcher link restores hidden products before following its anchor.
- Legal pages use shared typography and navigation. Legal text, dates, canonical URLs and file paths remain intact.

## Tokens

Background #f7f8fc; text #18212c; accent #2854e8. App backgrounds: WatchWorld #dfeaff, Trésors de Paris #dceede, Exploding Booze #e9e0fa, Mazebound #f5e9bc. Content width 1160px; collection breakpoint 700px.
