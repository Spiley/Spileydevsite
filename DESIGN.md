# Design reference

This site follows the **Swiss / International Typographic Style**, rather than a custom decorative visual language.

Primary reference: [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970).

The source describes typographic grids, sans serif typography, precise execution, restrained colour, and composition without ornamentation. This implementation translates those principles into a contemporary, responsive app portfolio:

- A consistent 5:7 grid aligns project information, screenshots, and the developer section. It becomes a single column on small screens.
- Helvetica Neue, Helvetica, and Arial use the visitor's installed fonts. No external font request is required.
- Large, left-aligned typography carries the hierarchy. Body copy describes the actual projects directly.
- White, near-black, solid divider lines, and one cobalt accent replace the old cream/orange palette, decorative illustrations, and floating phone mockups.
- Official app screenshots are shown upright and uncropped, with their original proportions. The project imagery supplies most of the colour.
- Navigation and project actions stay visible, including without JavaScript. Filters are progressively enhanced; screenshot links open an image when JavaScript is unavailable.
- Keyboard focus, the native modal dialog, live announcements, and reduced-motion support are retained.

## Tokens

| Role | Value |
| --- | --- |
| Background | `#ffffff` |
| Primary text | `#171717` |
| Secondary text | `#626262` |
| Divider | `#dedede` |
| Accent / keyboard focus | `#2249d8` |
| Neutral surface | `#f3f3f3` |
| Maximum content width | `1280px` |
| Desktop / tablet / mobile margins | `56px` / `32px` / `20px` |

The referenced movement informs the layout and typography; this site does not reproduce another company's identity or artwork.
