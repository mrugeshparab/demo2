#!/usr/bin/env python3
"""Turn any picture into a two-page sketchbook spread for the portfolio.

Usage (run from the project folder):
  python tools/make_spread.py my-photo.jpg 01              # fit picture across both pages
  python tools/make_spread.py my-photo.jpg 02 --mode cover # fill both pages (crops edges)
  python tools/make_spread.py man.jpg 04 --cutout          # remove plain background (needs opencv)
  python tools/make_spread.py logo.png 03 --bg "#f6f1e6"   # choose the page colour

Writes assets/plate-NN.webp (2000x1020) and assets/plate-NN-sm.webp (900px, phones).
Use the name "about" instead of a number to make assets/about-photo.webp (landscape, transparent).
Needs: pip install pillow   (and for --cutout: pip install opencv-python-headless numpy)
"""
import argparse, os
from PIL import Image, ImageDraw, ImageFilter

W, H = 2000, 1020
p = argparse.ArgumentParser()
p.add_argument("image"); p.add_argument("name", help="01, 02, 03... or 'about'")
p.add_argument("--mode", choices=["fit", "cover"], default="fit")
p.add_argument("--bg", default="#f8f2e6", help="page colour, e.g. '#f8f2e6'")
p.add_argument("--cutout", action="store_true", help="remove a plain background")
p.add_argument("--no-fold", action="store_true", help="skip the centre-fold shadow")
a = p.parse_args()

def hexrgb(h): h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def cutout(im):
    import cv2, numpy as np
    arr = np.array(im.convert("RGB"))[:, :, ::-1].copy(); h, w = arr.shape[:2]
    mask = np.zeros((h, w), np.uint8); bgd = np.zeros((1, 65)); fgd = np.zeros((1, 65))
    rect = (int(w*.05), int(h*.03), int(w*.9), int(h*.94))
    cv2.grabCut(arr, mask, rect, bgd, fgd, 8, cv2.GC_INIT_WITH_RECT)
    m = np.where((mask == 1) | (mask == 3), 255, 0).astype("uint8")
    m = cv2.GaussianBlur(cv2.erode(m, np.ones((3, 3), np.uint8)), (5, 5), 1.2)
    out = Image.fromarray(np.dstack([arr[:, :, ::-1], m]), "RGBA")
    return out.crop(out.getbbox())

im = Image.open(a.image)
if a.cutout: im = cutout(im)
im = im.convert("RGBA")

if a.name == "about":                       # landscape, transparent background
    AW, AH = 1200, 720
    canvas = Image.new("RGBA", (AW, AH), (0, 0, 0, 0))
    s = min((AW-60)/im.width, (AH-40)/im.height); im = im.resize((int(im.width*s), int(im.height*s)), Image.LANCZOS)
    canvas.alpha_composite(im, ((AW-im.width)//2, (AH-im.height)//2))
    os.makedirs("assets", exist_ok=True); canvas.save("assets/about-photo.webp", "WEBP", quality=88, method=6)
    print("wrote assets/about-photo.webp"); raise SystemExit

bg = hexrgb(a.bg); canvas = Image.new("RGBA", (W, H), bg + (255,))
if a.mode == "cover":
    s = max(W/im.width, H/im.height)
    im = im.resize((int(im.width*s)+1, int(im.height*s)+1), Image.LANCZOS)
    canvas.alpha_composite(im, ((W-im.width)//2, (H-im.height)//2))
else:
    s = min(1700/im.width, 900/im.height); im = im.resize((int(im.width*s), int(im.height*s)), Image.LANCZOS)
    canvas.alpha_composite(im, ((W-im.width)//2, (H-im.height)//2))
if not a.no_fold:
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for i in range(50):
        al = int(34*(1-i/50)**2)
        d.line([(W//2-i, 0), (W//2-i, H)], fill=(74, 63, 48, al)); d.line([(W//2+i, 0), (W//2+i, H)], fill=(74, 63, 48, al))
    canvas.alpha_composite(ov)
canvas = canvas.convert("RGB"); os.makedirs("assets", exist_ok=True)
canvas.save(f"assets/plate-{a.name}.webp", "WEBP", quality=88, method=6)
canvas.resize((900, int(900*H/W)), Image.LANCZOS).save(f"assets/plate-{a.name}-sm.webp", "WEBP", quality=85, method=6)
print(f"wrote assets/plate-{a.name}.webp and assets/plate-{a.name}-sm.webp")
