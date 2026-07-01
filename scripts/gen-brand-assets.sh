#!/usr/bin/env bash
# Regenerate all static brand assets in public/ from the SVG masters in src/assets/brand/.
# Requires: rsvg-convert, optipng, and the AutoWarehouse fonts (see README in src/assets/brand).
# Usage: bash scripts/gen-brand-assets.sh
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=src/assets/brand
OUT=public
mkdir -p "$OUT/og"

png() { # svg  size  outfile
  rsvg-convert -w "$2" -h "$2" "$1" -o "$OUT/$3"
  optipng -quiet -o2 "$OUT/$3"
}

# Favicons (bold small variant) + app icons (standard tile)
png "$SRC/app-icon-small.svg" 16  favicon-16x16.png
png "$SRC/app-icon-small.svg" 32  favicon-32x32.png
png "$SRC/app-icon.svg"       180 apple-touch-icon.png
png "$SRC/app-icon.svg"       192 android-chrome-192x192.png
png "$SRC/app-icon.svg"       512 android-chrome-512x512.png
png "$SRC/app-icon-maskable.svg" 512 android-chrome-maskable-512x512.png

# favicon.svg — ship the standard tile master as the scalable favicon
cp "$SRC/app-icon.svg" "$OUT/favicon.svg"

# OG / social card (1200x630)
rsvg-convert -w 1200 -h 630 "$SRC/og-default.svg" -o "$OUT/og/default.png"
optipng -quiet -o2 "$OUT/og/default.png"

# Full logo lockup PNG (for README / press) — dark, 2x
rsvg-convert -w 1120 -h 300 "$SRC/logo-dark.svg" -o src/assets/images/full-logo.png
optipng -quiet -o2 src/assets/images/full-logo.png

# Multi-res favicon.ico (16/32/48) via the Bun helper
tmp=$(mktemp -d)
for s in 16 32 48; do rsvg-convert -w $s -h $s "$SRC/app-icon-small.svg" -o "$tmp/$s.png"; done
bun scripts/png-to-ico.ts "$tmp/16.png" "$tmp/32.png" "$tmp/48.png" "$OUT/favicon.ico"
rm -rf "$tmp"

echo "Brand assets regenerated in $OUT/"
