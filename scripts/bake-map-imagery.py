"""Bakes the homepage map's imagery tone into one ready-to-show image.

RegionalMap.tsx used to draw public/images/regmap-satellite.jpg twice with SVG filters (land tone
everywhere, then a darker sea tone through a feathered Natural Earth coastline mask). Browsers
recompute those filters and the blurred mask on every paint, which made the map slow to appear and
to zoom. This script applies the same maths once and writes public/images/regmap.webp.

Usage (after scripts/build-africa-map.mjs):  python scripts/bake-map-imagery.py
Needs Pillow and numpy.
"""

import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/images/regmap-satellite.jpg"
DEST = ROOT / "public/images/regmap.webp"
DATA = ROOT / "src/data/westAfricaMap.ts"
FRAME_W = 1920  # map frame width in SVG units; the imagery is drawn at 2x


def saturate(img, s):
    """feColorMatrix type="saturate"."""
    m = np.array([
        [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s],
        [0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s],
        [0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s],
    ])
    return np.clip(img @ m.T, 0, 1)


def land_tone(img):
    img = saturate(img, 1.05)
    return np.clip(img * 1.1 - 0.04, 0, 1)


def sea_tone(img):
    img = saturate(img, 1.1)
    out = np.empty_like(img)
    out[..., 0] = 0.8 * img[..., 0]
    out[..., 1] = 1.05 * img[..., 1] ** 0.88
    out[..., 2] = 1.18 * img[..., 2] ** 0.8 + 0.02
    return np.clip(out, 0, 1)


def land_mask(size, scale):
    """The LAND path (all country outlines), filled, stroked 1.5 and feathered like #rm-sea."""
    ts = DATA.read_text(encoding="utf8")
    paths = re.findall(r'"d":"([^"]+)"', ts.split("export const LOCATOR")[0])
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    for d in paths:
        for ring in re.findall(r"M([^MZ]+)Z", d):
            pts = [tuple(float(v) * scale for v in p.split(",")) for p in ring.split("L")]
            draw.polygon(pts, fill=255, outline=255, width=max(1, round(1.5 * scale)))
    return mask.filter(ImageFilter.GaussianBlur(1.4 * scale))


def main():
    src = Image.open(SRC).convert("RGB")
    scale = src.width / FRAME_W
    img = np.asarray(src, dtype=np.float64) / 255
    land = np.asarray(land_mask(src.size, scale), dtype=np.float64)[..., None] / 255
    out = land_tone(img) * land + sea_tone(img) * (1 - land)
    Image.fromarray(np.round(out * 255).astype(np.uint8)).save(DEST, "WEBP", quality=75, method=6)
    print(f"{DEST.relative_to(ROOT)}: {DEST.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
