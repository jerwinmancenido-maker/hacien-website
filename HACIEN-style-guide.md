# HACIEN Style Guide (v1)
One look for the staff app, the website and printed documents: **black and white, one blue pixel.**

## Logo files (`/workspace/hacien/brand/`)
| File | Use |
|---|---|
| logo-full.svg / logo-full-600.png / logo-full-1200.png | Default: wordmark + tagline, light backgrounds |
| logo-wordmark.svg | No tagline (app header, small spaces) |
| logo-full-white.svg / logo-full-white-1200.png | Dark backgrounds |
| logo-mono-black.svg | One-colour print, stamps, fax/photocopy |
| icon.svg, icon-dark.svg, icon-512/192/32.png, icon-dark-512.png, favicon.ico | App icon, favicon, avatar |

All letters are hand-built vector shapes (no font needed). The tagline is outlined Inter SemiBold (OFL).

**Rules**
- Clear space: the blue square's width × 2 on every side (≈ the A's stem width).
- Minimum size: full logo 40 mm / 160 px wide (tagline stays readable); wordmark 24 mm / 96 px; icon 16 px.
- On quotes: logo-full at **45 mm wide**, top-left.
- Don't: recolour the letters, change the blue, add a crossbar to the A, stretch, add shadows/outlines, place the black logo on busy photos or dark colours, or retype the logo in a font.

## Colours
| Token | Hex | Use |
|---|---|---|
| ink | `#0A0A0A` | Text, logo, headings |
| white | `#FFFFFF` | Backgrounds |
| grey-50 | `#FAFAFA` | Page background (app) |
| grey-100 | `#F5F5F5` | Table header, hover row |
| grey-200 | `#E5E5E5` | Borders, rules |
| grey-400 | `#A3A3A3` | Placeholder, disabled |
| grey-600 | `#525252` | Secondary text |
| grey-700 | `#404040` | Tagline, labels |
| blue | `#2563EB` | Pixel Blue: primary action, links, focus |
| blue-dark | `#1D4ED8` | Hover/pressed |
| blue-tint | `#EFF6FF` | Selected row, active nav background |
| success | `#15803D` on `#F0FDF4` | Paid, done |
| warning | `#B45309` on `#FFFBEB` | Due soon, check |
| danger | `#B91C1C` on `#FEF2F2` | Overdue, error |

**Ratio: ~90% black/white/grey, ≤10% blue.** Use blue for ONE primary button per screen, links, focus rings and the pixel motif. Never use it for big fills or body text. Status colours are only for small chips/text, not whole rows.

## Typography
- **UI and body: Inter** (Google Fonts, OFL), weights 400/500/600. Use `font-variant-numeric: tabular-nums` for amounts.
- **Display/headings: Archivo Black** (or Archivo 800/900), used sparingly for page titles, document titles and website hero. Uppercase titles get letter-spacing 0.02em.
- **Small caps labels:** Inter 600, 11–12px, uppercase, letter-spacing 0.08em, grey-700 (echoes the tagline).

App scale (px / line-height): 12/16 caption · 14/20 body & tables · 16/24 large body · 20/28 h3 · 24/32 h2 · 30/36 h1 (Archivo Black).
Print scale, A4 (pt): 7.5 footer/fine print · 9 table body · 10 body · 8 labels (caps) · 12 section heads · 18 document title (Archivo Black, e.g. "QUOTATION").
Website: hero 48–64px Archivo Black; body 16–18px Inter.

## Shape and space
- Radius 4px (inputs, chips), 6px (cards, buttons). No pill buttons.
- 1px `#E5E5E5` borders. Shadows only on overlays: `0 1px 2px rgba(0,0,0,.06)`.
- 4px spacing grid; card padding 16–24px; generous whitespace.
- **Pixel motif:** a solid blue square (6–8px). Use it sparingly: active nav marker, section-title bullet, empty-state accent. Max one or two per screen.

## Components: staff app
- **Primary button:** blue bg, white text, 6px radius, 36px tall, Inter 500 14px; hover blue-dark; focus ring 2px blue with 2px offset. Only one per screen.
- **Secondary:** white bg, 1px grey-200 border, ink text; hover grey-100. **Danger:** white bg, danger text and border.
- **Tables:** grey-100 header in caps label style, 1px grey-200 row dividers, 44px rows, right-aligned tabular amounts, hover grey-50; the whole row is a real link.
- **Chips:** 4px radius, 12px Inter 500, status colour text on its tint; neutral = grey-700 on grey-100.
- **Sidebar:** white, 1px right border. Active item: ink 600 text, blue-tint bg and a 6px blue square marker on the left. Inactive: grey-600.
- **Header:** logo-wordmark at 24px tall; app icon for mobile.
- **Forms:** 1px grey-200 inputs, 4px radius, label above in 13px 500; focus border blue + ring.

## Components: print documents (A4)
- 18 mm margins. Letterhead: logo-full 45 mm top-left; company name, address, TIN, email right-aligned in 8.5pt grey-700.
- One thin 0.5pt grey-200 rule under the letterhead. No heavy black bars or boxes.
- Title "QUOTATION" in 18pt Archivo Black, ink, with a small blue square before it (the only blue on the page besides the logo); doc no./date beneath.
- Bill to / Deliver to: two boxes with a 0.5pt grey-200 border, caps labels.
- Items table: caps header on grey-100, hairline rows, tabular amounts; totals box right-aligned, grand total bold.
- Terms, bank details, signatures ("Prepared by", "Conforme"); footer 7.5pt grey-600 with the page number. Hide browser headers and never print placeholders.
- Must print well in black and white (blue → dark grey).

## CSS variables
```css
:root{
  --ink:#0A0A0A; --white:#FFFFFF;
  --grey-50:#FAFAFA; --grey-100:#F5F5F5; --grey-200:#E5E5E5; --grey-400:#A3A3A3; --grey-600:#525252; --grey-700:#404040;
  --blue:#2563EB; --blue-dark:#1D4ED8; --blue-tint:#EFF6FF;
  --success:#15803D; --success-bg:#F0FDF4; --warning:#B45309; --warning-bg:#FFFBEB; --danger:#B91C1C; --danger-bg:#FEF2F2;
  --font-sans:"Inter",ui-sans-serif,system-ui,sans-serif; --font-display:"Archivo Black","Archivo",var(--font-sans);
  --radius-sm:4px; --radius:6px; --border:1px solid var(--grey-200);
  --shadow-overlay:0 1px 2px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.06);
  --focus-ring:0 0 0 2px #fff,0 0 0 4px var(--blue);
}
```
Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Archivo+Black&display=swap`

## Tailwind (v3 `theme.extend`)
```js
colors:{ ink:'#0A0A0A', grey:{50:'#FAFAFA',100:'#F5F5F5',200:'#E5E5E5',400:'#A3A3A3',600:'#525252',700:'#404040'},
  blue:{DEFAULT:'#2563EB',dark:'#1D4ED8',tint:'#EFF6FF'},
  success:{DEFAULT:'#15803D',bg:'#F0FDF4'}, warning:{DEFAULT:'#B45309',bg:'#FFFBEB'}, danger:{DEFAULT:'#B91C1C',bg:'#FEF2F2'} },
fontFamily:{ sans:['Inter','ui-sans-serif','system-ui'], display:['"Archivo Black"','Archivo','Inter'] },
borderRadius:{ sm:'4px', DEFAULT:'6px' },
```
Tailwind v4: put the same values in `@theme { --color-ink:#0A0A0A; --color-blue:#2563EB; … }`.
