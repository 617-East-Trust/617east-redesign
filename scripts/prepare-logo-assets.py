"""Create faithful, web-ready 617 East Trust seal exports from the approved master.

This script only resizes and re-encodes the supplied image. It does not crop,
retouch, redraw, or otherwise alter the artwork.
"""
from pathlib import Path
from PIL import Image, ImageOps, features

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "brand-assets" / "617east-trust-seal-master.png"
PUBLIC = ROOT / "client" / "public"
IMAGES = PUBLIC / "images"

if not MASTER.is_file():
    raise FileNotFoundError(f"Approved logo master not found: {MASTER}")

IMAGES.mkdir(parents=True, exist_ok=True)

with Image.open(MASTER) as source:
    image = ImageOps.exif_transpose(source).convert("RGB")
    if image.size != (1920, 1920):
        raise ValueError(f"Expected square 1920px master, got {image.size}")

    def resize(edge: int) -> Image.Image:
        return image.resize((edge, edge), Image.Resampling.LANCZOS)

    # Header/footer source: 512px serves high-DPI displays without changing art.
    large = resize(512)
    large.save(IMAGES / "617east-trust-seal.webp", "WEBP", quality=88, method=6)

    if features.check("avif"):
        large.save(IMAGES / "617east-trust-seal.avif", "AVIF", quality=72, speed=6)

    # A 256px palette PNG is the broad-compatibility <img> fallback.
    fallback = resize(256).convert("P", palette=Image.Palette.ADAPTIVE, colors=256)
    fallback.save(IMAGES / "617east-trust-seal.png", "PNG", optimize=True)

    # Platform icons retain the whole mark (no crop) at native target dimensions.
    icon = resize(192)
    icon.save(PUBLIC / "icon-192.png", "PNG", optimize=True)
    icon.save(PUBLIC / "favicon.ico", "ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

print(f"Master: {MASTER}")
for path in sorted([MASTER, IMAGES / "617east-trust-seal.webp", IMAGES / "617east-trust-seal.avif", IMAGES / "617east-trust-seal.png", PUBLIC / "icon-192.png", PUBLIC / "favicon.ico"]):
    if path.exists():
        with Image.open(path) as output:
            print(f"{path.relative_to(ROOT)}: {output.format} {output.size[0]}x{output.size[1]} {path.stat().st_size} bytes")
