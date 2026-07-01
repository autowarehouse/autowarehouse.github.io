# Brand assets — masters & regeneration

Source of truth for AutoWarehouse's static brand assets (favicons, app icons, OG
card, logo lockup). The **Agent Weave** mark — an orange ribbon (`#f25c1f`)
weaving vertically through three cream/ink slabs — is the canonical mark.

## Masters (edit these)

| File                               | Purpose                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `app-icon.svg`                     | Weave on dark rounded tile → `favicon.svg`, apple-touch, android-chrome |
| `app-icon-small.svg`               | Bolder strokes for 16/32px favicons + `.ico`                            |
| `app-icon-maskable.svg`            | Full-bleed dark, mark in the ~80% safe zone (Android maskable)          |
| `mark-reversed.svg`                | Transparent, cream slabs — mark for dark contexts                       |
| `logo-dark.svg` / `logo-light.svg` | Full lockup (mark + wordmark + tagline)                                 |
| `og-default.svg`                   | 1200×630 social card → `public/og/default.png`                          |

The in-page logo lives separately in `src/components/ui/Logo.astro` (uses
`currentColor` + `--orange` so it themes); keep it in sync with these masters.

## Regenerate the raster assets

The masters are the source of truth; the committed PNGs/ICO are generated from
them. Regeneration is rare (only when the mark changes) and done by hand with
`rsvg-convert` + `optipng`. The text-bearing SVGs (`logo-*`, `og-default`)
render with Archivo / JetBrains Mono, so install those fonts for fontconfig
first (`fc-cache -f` after) — families: `Archivo SemiBold ExtraBold` (800),
`Archivo SemiBold Black` (900), `JetBrains Mono` (700).

```bash
# icons (from src/assets/brand/, output to public/)
rsvg-convert -w 16  app-icon-small.svg    -o ../../../public/favicon-16x16.png
rsvg-convert -w 32  app-icon-small.svg    -o ../../../public/favicon-32x32.png
rsvg-convert -w 180 app-icon.svg          -o ../../../public/apple-touch-icon.png
rsvg-convert -w 192 app-icon.svg          -o ../../../public/android-chrome-192x192.png
rsvg-convert -w 512 app-icon.svg          -o ../../../public/android-chrome-512x512.png
rsvg-convert -w 512 app-icon-maskable.svg -o ../../../public/android-chrome-maskable-512x512.png
cp app-icon.svg ../../../public/favicon.svg

# social card
rsvg-convert -w 1200 -h 630 og-default.svg -o ../../../public/og/default.png

# press lockup (rendered on demand — not committed; nothing in the site imports it)
# rsvg-convert -w 1120 -h 300 logo-dark.svg -o /tmp/full-logo.png

# multi-res favicon.ico (needs ImageMagick or icoutils)
for s in 16 32 48; do rsvg-convert -w $s app-icon-small.svg -o /tmp/ico-$s.png; done
convert /tmp/ico-16.png /tmp/ico-32.png /tmp/ico-48.png ../../../public/favicon.ico
#   or: icotool -c -o ../../../public/favicon.ico /tmp/ico-16.png /tmp/ico-32.png /tmp/ico-48.png

# then compress the PNGs
optipng -o2 ../../../public/*.png ../../../public/og/*.png
```
