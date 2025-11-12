---
name: image.neon-poster
description: Generate neon-anime poster and export PNG.
version: 1
owner: supervisor.design
inputs:
  - key: palette
    required: false
  - key: headline
    required: false
  - key: cta
    required: false
outputs:
  - key: poster_png
    path: assets/posters/cheeky-prints-hero.png
  - key: prompt_txt
    path: assets/prompts/cheeky-prints-hero.txt
acceptance:
  - "PNG >= 2048px and brand contrast passes"
---
## Prompt
Palette: #FF3E9E, #2DD4FF, #7C3AED, #FFC42D, #0B1020. Dynamic hair, glow, particles. Headline “CHEEKY PRINTS”. CTA “GET CHEEKY”.
