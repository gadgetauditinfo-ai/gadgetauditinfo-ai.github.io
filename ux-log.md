# Gadget Audit — UX / Localization Overhaul Log (staged source)

## 2026-10-05 — Phase 1: Higgsfield technique study
Studied higgsfield.ai design techniques (via their public design-system docs —
`higgsfield-ai/skills`: design-taste-frontend.md, quanta-design.md; live CSS not
exposable to fetch tooling). Reverse-engineered TECHNIQUES only, never branding.
Full notes: `~/workspace/goals/gadget-audit-build-a-monetized-tech-publication/hidden_files/higgsfield-study-2026-10-05.md`.
Adopted: expo-out easing `cubic-bezier(.16,1,.3,1)`; asymmetric enter/exit pairs;
0.6s staggered reveals (transform/opacity only, once per element); :active
scale(.98) tactile press; role-based type discipline; single-accent color lock;
radius lock (18px cards / pill buttons / 8px inputs); tabular numerals;
44px touch targets; skeleton shimmer instead of spinners; prefers-reduced-motion
collapses everything to static.

## 2026-10-05 — Phase 2: Motion & polish layer (staged only)
- `assets/redesign-2026-10-05.css`: appended "Motion & Polish" layer — motion
  tokens, hero load choreography (kicker→headline→summary→CTAs→feature stage,
  60ms stagger), CSS view-timeline scroll reveals for cards/section heads
  (@supports-guarded, transform/opacity only), button asymmetric feedback +
  focus-visible rings, card hover lifts, tabular-nums prices/scores, radius
  lock, lazy-image skeleton shimmer, 44px coarse-pointer targets, [dir=rtl]
  mirroring for Arabic editions, reduced-motion kill-switch.
- `assets/site-shell.css`: appended article-page twin — article hero entry
  choreography, scroll reveals for product/pros-cons/specs/comparison/FAQ/
  verdict sections, deal-link feedback, focus rings, tabular numerals,
  radius lock, RTL body rules, reduced-motion kill-switch.
- Translated-edition headline fix: `text-wrap:balance` + one-step size
  reduction for non-English `html[lang]` on hero and article h1 (long
  translations like ES "Conozca las concesiones" no longer blow the scale).

## 2026-10-05 — Phase 3: True localization (staged only)
Root cause of the "editions only change prices" complaint — THREE gates were
switched off:
1. `assets/edition.js`: `isLocalized=false` was HARDCODED (comment: "content
   stays English until translations are reviewed"). Now
   `isLocalized = !/^en/.test(cfg.lang)` — every non-English edition
   translates; English-locale editions (us, gb, pk, sg…) keep English.
2. `window.__GA_L10N_ENABLED` was NEVER set — the ~1MB per-language bundles
   in `assets/l10n/` (es/de/ja/fr/it/pt/nl/…) were generated (LibreTranslate)
   but never loaded. The inline loader in 290 pages now loads them
   unconditionally (`if(b)` instead of `if(b&&window.__GA_L10N_ENABLED)`).
3. Narration: `localizedNarration()` already routes to
   `audio-narration/{locale}/{slug}.mp3` and REFUSES to fall back to English
   on non-English editions (player hides instead — kept as the safety rule).
   Verified reality 2026-10-05: es-ES/de-DE/pt-BR folders hold only ~12–14s
   SAMPLE clips, not full narrations — full-length localized narration is now
   being generated (see pipeline below); locales get registered in
   `recordedLocales` only when full audio exists.
- Also fixed: cookie-consent strings ("Your cookie choice" etc.) were missing
  from every bundle → added ES/DE/JA translations to `localeUI` in edition.js
  (dynamic consent banner is translated by the MutationObserver pass).
  Same treatment for the header tagline ("Independent reviews, practical
  guides and campaign audits", injected by site-shell.js so never in the
  bundles) and the "Theme" toggle label.
- Bootstrap repair (2026-10-05): the inline `data-ga-edition-bootstrap`
  edition→locale map in all pages still listed the OLD 69 editions, so new
  codes (ad, li, sm, tw, hk, qa, kw, il) silently fell back to `us`. Rebuilt
  the map from the new 38-edition SUPPORTED_EDITIONS in all 100 pages
  (two bootstrap variants handled). The inline l10n-bundle loader map was
  rebuilt too (ad→'es' fallback — no Catalan bundle exists; il unmapped —
  no Hebrew bundle exists, on-device translator covers it). Pruned 6,176
  stale hreflang `<link rel="alternate">` tags for dropped editions.
  Two pages (`faceless-youtube-creator-gear-2026`, `creator-gear`) had NO
  bootstrap/loader at all → added both; screenshot-verified the former now
  fully translates to Spanish.
- `isBR` was hardcoded false while `br` is a supported edition → now
  `isBR = edition==='br'` so the Brazil context/terminology code actually runs.
- On-device Translator API fallback (`translateWithBrowser`) kept for strings
  missing from bundles.

### Localized narration pipeline (zero-spend, documented for batch runs)
- Engine: Chatterbox Multilingual (`chatterbox.mtl_tts`, MIT license,
  commercially permissive) in `~/workspace/.chatterbox-venv/`, voice-cloned
  from the channel voice with `cfg_weight=0.0` (kills English accent bleed).
- Script: transcribe EN narration MP3 with faster-whisper
  (`~/workspace/.whisper-venv`), translate paragraphs EN→target with Google
  gtx (free, no key; brand/product names placeholder-shielded), synthesize
  per-paragraph, concat → `assets/audio-narration/{locale}/{slug}.mp3`
  (e.g. `ja-JP/best-ai-voice-recorders-2026.mp3`).
- Proof: full Japanese narration for `best-ai-voice-recorders-2026`
  (1306 words → 12:16 audio) and `best-wireless-earbuds-under-100`
  (1664 words → 17:25 audio) generated 2026-10-05; `recordedLocales`
  extended with `jp:'ja-JP'` (key is the EDITION CODE — first attempt used
  `ja` and the probe silently missed; caught by DOM verification).
  Player verified via headless DOM: status reads "ja-JP · 音声概要" and the
  audio src resolves to the ja-JP MP3 on both articles.
  Remaining locales (es/de/pt-BR/…) need the same batch run —
  ~1–2.5h CPU per article per language; schedule unattended, do NOT run
  interactively.
- QC: transcribe generated audio with faster-whisper in target language and
  diff word-coverage against the translated script (pattern from
  `voice-lab/verify_chunks.py`).

## 2026-10-05 — Phase 4: High-purchasing-power editions (CORRECTED per owner)
Owner correction: NOT every Asian country — only high GDP-per-capita markets;
explicitly NO Pakistan ("low purchasing power = wasted traffic"). Same bar
globally. Figures: IMF 2025 nominal GDP per capita (Wikipedia nominal list,
cross-checked via worldometers/statisticstimes).
- Bar: ≥ ~$30k nominal. Africa checked: Seychelles $18,479 / Mauritius
  $12,977 (IMF 2025) — below bar, excluded; Africa gets zero editions.
- Final 38 editions in `SUPPORTED_EDITIONS`: Europe — gb ie ad at be cy cz dk
  fi fr de is it li lu mt nl no pt sm es se ch (23); Americas — us ca bs (3);
  Asia-Pacific — jp kr sg tw hk au nz (7); Middle East — ae sa qa kw il (5).
- Pruned from the old 69: all of Latin America ex-Bahamas, all of Africa,
  South/Southeast/East Asia ex-SG/JP/KR/TW/HK, lower-GDP Europe (incl. tr, pl,
  gr, ru, ua). All kept codes have full EDITIONS entries (currency, locale,
  language, voice) — syntax-checked with node.

## 2026-10-05 — Phase 5: Verification (staged, headless Chromium)
Screenshots: `…/hidden_files/redesign-2026-10-05/phase2/*.jpg` (all <200KB).
- home-light-1440 / home-dark-1440 / home-light-768 / home-light-390: premium
  hero, pill CTAs, trending strip, disclosure — clean at all widths.
- article-light-1440 / article-dark-1440 / article-light-390: earbuds article
  clean, light + dark, mobile single-column.
- home-es-1440 / article-es-1440: FULL Spanish translation verified — nav
  (Inicio/Análisis/Guías/…), hero ("Vea el producto. Conozca las
  concesiones."), article title, breadcrumb, prices in €, edition picker
  "España". Cookie banner + balanced headlines re-verified after fix.
- Caveat: sandbox headless Chromium cannot fetch Google Fonts
  (ERR_EMPTY_RESPONSE), so screenshots show fallback faces; the Space
  Grotesk/Source Serif 4 stacks were verified via computed styles earlier and
  load fine in real browsers.

## Constraints honored
- Staged source ONLY (`~/workspace/ts-spaces/gadget-audit/`). Production and
  `~/workspace/deploy/gadget-audit-pages/` untouched.
- Earbuds `article-inventory.js` fix intact (5 products); no `* differ` junk
  files; `_redirects` pretty-URL rewrites untouched.
- Zero spend: no paid APIs; translation via free gtx; TTS fully local.
- English-first default preserved (en-locale editions never translate).

## 2026-10-05 — Phase 6: Localization extended to all 38 editions (staged only)
Owner order: "all countries, not just 2-3" — every edition gets full UI + article
translation and its own narration language.

### Translation bundles
- NEW full bundles via offline Argos Translate (zero-spend): `assets/l10n/el.js`
  (1.5MB), `fi.js` (1.0MB), `he.js` (1.2MB) — stubs replaced, 5960 keys each,
  matching current catalog (drift top-up handled mid-run).
- `assets/l10n/zh.js`: values converted Simplified→Traditional (OpenCC s2t,
  5292 values changed, zero simplified-only chars remain) — tw/hk are the only
  zh editions.
- `il` was missing from the inline bundle-loader map → added `il:'he'` in
  root index.html + 98 assets/**/index.html (99 files).
- `assets/edition.js` `localeUI`: replaced the 15-key partials with FULL
  57-key chrome maps (tagline, Theme, cookie banner, Our Picks, Key specs,
  Pros/Cons, FAQ, video/audio labels…) for fr it pt nl da fi sv nb el cs ko
  zh ar he (+ el/fi/he partials upgraded). `node --check` OK.
- Quality: machine-translation drafts ("editorial review required"); he pair
  is the weakest (a few untranslated/doubled strings). Prices/brand names
  pass through untouched.

### Narration (zero-spend Piper TTS, per-language voices)
- Full-length MP3s (96k) for best-ai-voice-recorders-2026 + best-wireless-earbuds-under-100
  in 16 locales: es-ES de-DE fr-FR it-IT pt-PT nl-NL da-DK fi-FI sv-SE nb-NO
  el-CY cs-CZ ko-KR zh-TW ar-SA he-IL (+ pre-existing ja-JP ×2). All durations
  verified >6min; faster-whisper QC detected the correct language at p=1.00
  for every locale; brand-shield token mends clean ("leftover tokens: NONE").
- `recordedLocales` in edition.js now maps 27 edition codes → their locale
  dirs (de/at/ch/li→de-DE, fr, it/sm→it-IT, nl/be→nl-NL, tw/hk→zh-TW,
  ae/sa/qa/kw→ar-SA, +es pt da fi sv no cy cz jp kr il). Never-English rule
  intact: is/lu/mt have no audio → player hides instead of falling back.

### Blocked (no offline route exists)
- is (Icelandic), lb (Luxembourgish), mt (Maltese): Argos has no en→is/lb/mt
  pairs (verified against the package index); Piper has no mt voice.
  Bundles stay stubs, no narration — on-device translator fallback + hidden
  player, same as before.

### Verification
- 42 screenshots (21 language groups × home+article, 1440px, all <200KB):
  `…/hidden_files/redesign-2026-10-05/phase3/`.
- DOM-verified the audio element `src` resolves to the right locale file per
  edition (es→es-ES, fr→fr-FR, il→he-IL, sa→ar-SA; us→English default;
  is/mt/lu→player hidden, no English leak).
- Visual spot-checks: ar RTL + full Arabic chrome, he RTL, tw Traditional,
  all clean; cookie banner/tagline/Theme now translated everywhere.

## 2026-10-05 (cookie-banner l10n fix)
- `assets/site-shell.js` `initCookieNotice()` now renders through the global `T()` helper (`window.GA_T`) so the cookie banner is translated at creation time on localized editions — no more English flash before the 120/650ms re-translate pass. Verified: sa edition shows Arabic banner, us edition stays English. `node --check` passes.
