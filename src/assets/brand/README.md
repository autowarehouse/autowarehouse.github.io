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

```bash
bash scripts/gen-brand-assets.sh
```

Requires `rsvg-convert`, `optipng`, and the display fonts installed for
fontconfig (the text-bearing SVGs render with Archivo / JetBrains Mono):

```bash
# fetch the exact static weights into a local font dir, then: fc-cache -f
# families used: "Archivo SemiBold ExtraBold" (800), "Archivo SemiBold Black" (900),
#                "JetBrains Mono" (700)
```

Outputs land in `public/` (icons, `favicon.*`, `og/default.png`) and
`src/assets/images/full-logo.png` (README/press lockup).
