# Gadget Audit performance audit — 2026-09-22

## Media added or modified since 2026-09-21

- Files weighed: **221** (33 WebP images, 188 MP3 narration files).
- Total media bytes before: **70,566,864 B**.
- Total media bytes after: **70,566,864 B**.
- JPEG candidates: **0**. PNG candidates: **0**. Therefore no JPEG/PNG recompression or conversion was applicable.
- WebP dimensions were preserved. Audio files were not transcoded.
- Deleted media assets: **0**. The reference scan found no unreferenced media; official logo/shield assets were not modified.

The complete per-asset before/after ledger is in `performance-audit-2026-09-22.csv`.

## Delivery changes

- All static images now include intrinsic width and height plus asynchronous decoding. Below-fold images are lazy; hero images remain eager and have high fetch priority.
- Narration MP3 URLs are attached only on the first Play action; audio preload is `none`.
- Campaign video metadata preload/posters and lazy YouTube no-cookie embeds are preserved.
- The large translation map is skipped for English editions while the region picker and edition runtime remain unchanged.

## Estimated homepage weight (United States edition)

- Initial critical payload, raw file bytes: **721,316 B (704.4 KiB)**.
- Estimated transfer with gzip for HTML/CSS/JS and original binary bytes: **460,562 B (449.8 KiB)**.
- Full static homepage payload after all lazy images load: approximately **1,479,644 B (1.41 MiB transferred)**.
- The **6,807,801 B** translation map is no longer requested for English editions. It remains available for localized editions, preserving the region picker and translations.
- Narration contributes **0 B before Play** because audio has no `src` until the user activates playback.

The initial estimate includes the homepage HTML, its three CSS files, `site-shell.js`, `edition.js`, the favicon, the official header logo, and the first eager Ferra hero. It excludes browser caching, HTTP headers, and lazy images below the initial fold.

## Verification checklist

- 324 static `<img>` elements checked: intrinsic dimensions, loading policy, and async decoding present.
- 19 campaign-video templates checked: `preload="metadata"` and poster retained.
- 41 YouTube iframe templates checked: `youtube-nocookie.com` and `loading="lazy"` retained.
- No external executable scripts or tracking/ad scripts were added.
- No Google Fonts or new font families were added; the existing font setup is unchanged.
