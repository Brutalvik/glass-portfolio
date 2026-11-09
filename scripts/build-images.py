"""Build responsive background variants.

Usage: python3 scripts/build-images.py [source_dir]
Source images (PNG/JPG/WebP) are named after the scene keys in config/background-map.ts.
Without a source dir, the 2560px WebPs in public/bg are used to regenerate the smaller sizes.
"""
import pathlib
import sys

from PIL import Image

OUT = pathlib.Path("public/bg")
WIDTHS = [1280, 2560]
src_dir = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else OUT

for src in sorted(src_dir.iterdir()):
    if src.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
        continue
    key = src.stem.removesuffix("-2560").removesuffix("-1280")
    if key.endswith("-lqip"):
        continue
    im = Image.open(src).convert("RGB")
    for w in WIDTHS:
        if w > im.width:
            continue
        out = OUT / f"{key}-{w}.webp"
        im.resize((w, round(w * im.height / im.width)), Image.LANCZOS).save(out, "WEBP", quality=80 if w > 1280 else 76, method=6)
    im.resize((48, 27)).save(OUT / f"{key}-lqip.webp", "WEBP", quality=50)
    print("built", key)
