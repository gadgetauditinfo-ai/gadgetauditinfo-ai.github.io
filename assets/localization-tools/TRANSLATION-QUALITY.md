# Translation quality register — 25 September 2026

## What is verified

- 96 editions are present in the edition registry.
- 49 language-bundle paths exist, and each page requests only its active non-English language bundle.
- 19 language bundles contain substantial machine-translated dictionaries: Portuguese (Brazil), Portuguese (Portugal), Spanish, German, French, Italian, Dutch, Swedish, Norwegian Bokmål, Danish, Polish, Czech, Turkish, Japanese, Korean, Simplified Chinese, Hindi, Indonesian and Arabic.
- Structural QA can verify valid JavaScript, dictionary load, unchanged links and page rendering.

## What is not verified

No bundle has been reviewed end-to-end by a fluent human editor. The 19 populated bundles must therefore be described as **machine translated with structural QA**, not editorially verified. Idioms, product terminology, inflection, tone and mixed-language brand/model names may be awkward or wrong.

The following 30 language bundles are currently stubs, not translations: Finnish, Greek, Hungarian, Romanian, Croatian, Slovak, Slovenian, Estonian, Latvian, Lithuanian, Luxembourgish, Maltese, Bulgarian, Icelandic, Albanian, Serbian, Bosnian, Macedonian, Ukrainian, Russian, Thai, Malay, Filipino, Vietnamese, Bengali, Sinhala, Nepali, Kazakh, Uzbek and Swahili. Those editions fall back to a free browser translation route when one is available; coverage and crawlability are not guaranteed.

## Risk bands for editorial review

These bands are prioritization guidance, not quality scores.

- **Highest review risk:** Arabic, Hindi, Japanese, Korean and Simplified Chinese — script, segmentation, honorific/register and mixed Latin model-name handling need native review.
- **High review risk:** Turkish, Polish and Czech — morphology and technical compound phrasing can fail while remaining grammatically plausible.
- **Moderate review risk:** Portuguese, Spanish, German, French, Italian, Dutch, Swedish, Norwegian Bokmål and Danish — likely readable machine output, but buying advice, safety language and price qualifiers still need fluent review.
- **Unrated:** all 30 stub languages — there is no static bundle to assess yet.

## Release gate

A language becomes "fluent-human verified" only when a named fluent reviewer checks all current templates and articles, records the review date, and repeats the review for materially changed strings. Until then, public reporting must use the labels above.
