# Midjourney Image Generation Guide — Loading Carousel

## Quick Reference

| Spec | Value |
|------|-------|
| **Total images** | 11 |
| **Dimensions** | 768 x 432 (16:9) |
| **Format** | WebP or JPG |
| **Target size** | < 100KB each |
| **Save to** | `public/loading/` |

---

## Story Phase — Treasure Hunt Theme (5 images)

### 1. story-1.webp

**Message:** "Consulting a suspiciously stained treasure map..."

```
A weathered treasure map spread across a tavern table, suspicious coffee and rum stains obscuring key landmarks, a cartoon-like compass rose pointing in the wrong direction, candlelight flickering over faded ink, warm amber and sepia tones, comical yet cinematic wide shot --ar 16:9 --v 6.1
```

---

### 2. story-2.webp

**Message:** "Bribing a parrot for insider information..."

```
A colorful macaw parrot perched on a dock post, a hand offering it a gold doubloon, the parrot looking smug and judgmental, a pirate ship blurred in the harbor background, tropical golden-hour lighting, comical cinematic --ar 16:9 --v 6.1
```

---

### 3. story-3.webp

**Message:** "Blowing dust off a very dramatic treasure chest..."

```
A massive ornate treasure chest in a torch-lit cave, an enormous cloud of dust billowing off the lid as it cracks open, golden light spilling from inside, cobwebs and ancient coins scattered around, dramatic and slightly absurd, cinematic --ar 16:9 --v 6.1
```

---

### 4. story-4.webp

**Message:** "Cross-referencing pirate diaries with tax records..."

```
A cluttered desk piled with tattered pirate journals next to neat stacks of bureaucratic ledgers, a quill pen, reading spectacles balanced on a skull, ink bottles and old tax stamps, warm lamplight, absurd scholarly pirate aesthetic, cinematic --ar 16:9 --v 6.1
```

---

### 5. story-5.webp

**Message:** "Digging through history's lost-and-found bin..."

```
A chaotic lost-and-found bin overflowing with historical artifacts — a golden crown, a rusty cutlass, ancient coins, a compass, a message in a bottle — sitting in a dusty underground chamber, warm amber glow from a hanging lantern, comical abundance, cinematic --ar 16:9 --v 6.1
```

---

## Audio Phase — Treasure Discovery/Unearthing Theme (6 images)

### 6. audio-1.webp

**Message:** "A treasure hunter is clearing their throat..."

```
A rugged treasure hunter in a torch-lit ancient ruin, hand on chest dramatically clearing their throat, dust swirling around them, explorer hat and worn leather gear, golden torchlight bouncing off stone walls, comical theatrical pose, cinematic --ar 16:9 --v 6.1
```

---

### 7. audio-2.webp

**Message:** "Polishing the narration until it gleams like gold..."

```
Hands polishing a large gold bar with a velvet cloth until it gleams brilliantly, surrounded by a pile of treasure and jewels in a cave, exaggerated shine and sparkle effects, warm golden light flooding the scene, comical perfectionism, cinematic --ar 16:9 --v 6.1
```

---

### 8. audio-3.webp

**Message:** "The storyteller found a megaphone in the ruins..."

```
An adventurer standing atop ancient crumbling ruins, triumphantly holding up a battered brass megaphone covered in moss and vines, dramatic sunset backlighting, wind-swept hair, heroic and absurd pose, cinematic wide shot --ar 16:9 --v 6.1
```

---

### 9. audio-4.webp

**Message:** "Translating ancient treasure gossip into English..."

```
A stone tablet covered in ridiculous hieroglyphic-style carvings of pirates and treasure chests, a magnifying glass hovering over the symbols, a messy notebook of attempted translations beside it, warm candlelight, scholarly chaos, cinematic --ar 16:9 --v 6.1
```

---

### 10. audio-5.webp

**Message:** "A voice echoes from inside a treasure chest..."

```
A glowing treasure chest slightly ajar in a dark cavern, visible sound waves and golden light emanating from inside, gems and coins scattered around the base, eerie yet comical atmosphere, dramatic rim lighting, cinematic --ar 16:9 --v 6.1
```

---

### 11. audio-6.webp

**Message:** "Someone is dramatically unrolling a scroll..."

```
A pair of hands dramatically unrolling an enormous ancient scroll that cascades across a stone floor in a torch-lit temple, the scroll covered in treasure maps and illustrations, dust rising from the parchment, theatrical golden lighting, comical grandeur, cinematic --ar 16:9 --v 6.1
```

---

## After Generating

### Resize and optimize (ImageMagick example)

```bash
# Single file
convert input.png -resize 768x432 -quality 80 public/loading/story-1.webp

# Batch (if all PNGs are in a folder)
for f in story-*.png; do convert "$f" -resize 768x432 -quality 80 "public/loading/${f%.png}.webp"; done
for f in audio-*.png; do convert "$f" -resize 768x432 -quality 80 "public/loading/${f%.png}.webp"; done
```

### Final directory structure

```
public/loading/
├── story-1.webp
├── story-2.webp
├── story-3.webp
├── story-4.webp
├── story-5.webp
├── audio-1.webp
├── audio-2.webp
├── audio-3.webp
├── audio-4.webp
├── audio-5.webp
└── audio-6.webp
```

Once all 11 images are in `public/loading/`, let Claude know and the carousel code will be built.
