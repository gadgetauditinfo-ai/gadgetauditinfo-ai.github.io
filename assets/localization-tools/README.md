# Gadget Audit static-localization pipeline

## Release rule

Every article is authored in English, then its visible text, image descriptions, form labels and metadata are added to every non-English language bundle before the article is published. A release is not considered fully localized until the bundle audit is complete and the target-language page has been reviewed by a fluent editor.

## Architecture

- `assets/edition.js` owns the 96-edition registry and translates exact English source strings at render time.
- `assets/l10n/<language>.js` contains one dictionary per language and sets `window.GA_L10N`.
- Each HTML page loads only the selected edition's dictionary. This avoids shipping every language to every reader.
- Every page publishes 96 edition-level `hreflang` links plus `x-default`.
- English is the canonical source. Product names, model numbers, URLs, prices and measurements remain source facts; translators must not alter them.

## Free/self-hosted workflow

1. Run a local LibreTranslate server with the required Argos language models. Do not point the script at a paid or hosted endpoint.
2. Measure a language without translating:

   `python3 assets/localization-tools/generate_bundles.py fi --audit-only`

3. Generate or refresh one language:

   `python3 assets/localization-tools/generate_bundles.py fi`

4. Review the emitted `assets/l10n/fi.js` for product names, model numbers, amounts, links, headings and sentence boundaries.
5. Run `python3 assets/localization-tools/verify-bundles.py`.
6. Open that edition at phone and desktop widths. Check article copy, navigation, search, the Gadget Finder, metadata and prices. RTL languages must also be checked for direction and mixed Latin/product-name runs.
7. Build and audit the artifact only after every required bundle passes.

The generator refuses non-local translation endpoints. It writes atomically and handles one language at a time so an interrupted run does not damage another bundle.

## New-article checklist

- Add the article once to `assets/article-inventory.js`, including its real URL and image.
- The homepage derives its count from that inventory and appends any inventory entry whose card is missing.
- Run the generator for every non-English language, including regional Portuguese bundles (`pt-BR`, `pt-PT`).
- Review high-risk strings: titles, affiliate disclosures, warnings, measurements, prices, product verdicts and accessibility labels.
- Confirm that no English prose remains in each non-English edition, except brand names and technical terms intentionally kept in English.
- Record the reviewer and date. "Machine translated" is not equivalent to "fluent-human verified."

## Current limitations

Nineteen languages currently contain substantial prebuilt dictionaries. Thirty language files are honest empty stubs so unsupported editions can use the existing free runtime translator when available instead of receiving a false completeness claim. Runtime translation is not equivalent to crawlable, editorially reviewed localization; the remaining bundles must be generated and reviewed before the 49-language rollout can be called complete.
