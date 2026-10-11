# Multilingual narration options — assessment only

No audio was generated for this assessment. Gadget Audit’s standing policy is to generate no audio.

## Current behavior

The player now uses this strict order: a matching prerecorded locale file when present, then the existing root English MP3, then no player if English is unavailable. Browser `speechSynthesis` and `SpeechSynthesisUtterance` are not used.

The library has prerecorded locale folders for `pt-BR`, `es-ES`, `de-DE`, `en-GB`, `en-AU`, `en-CA`, `en-IE` and `en-NZ`, plus root English. Two current articles have no matching files in any locale folder and therefore use English fallback. Several localized smart-lock recordings are implausibly short relative to the English master; decode success does not prove content completeness.

## Options considered

### Piper, local and open source

Strengths: no per-character bill, offline generation, small runtime, clear licensing per voice model when checked individually.

Trade-offs: language/voice coverage is uneven across 49 site languages; every voice model has its own quality and licensing constraints; pronunciation dictionaries and loudness mastering need per-language work. Static MP3 output would substantially increase both source and built artifact size.

### Coqui XTTS-v2 or similar voice cloning

Strengths: multilingual voice consistency and stronger prosody than many compact engines.

Trade-offs: XTTS-v2 is not suitable for this commercial site under its current non-commercial license. Voice cloning also requires explicit voice rights, GPU time, and extensive pronunciation/content QA. It is not recommended.

### Self-hosted LibreTranslate/Argos plus platform TTS

Translation and narration are separate problems. Argos/LibreTranslate can draft text but does not create spoken audio. A second engine and voice-license review would still be required.

### Browser speech synthesis

Strengths: nearly zero artifact weight.

Trade-offs: voices vary by device, can be missing, sound inconsistent, do not provide a durable audited recording, and are generated at playback. This violates the no-audio-generation rule and has been removed.

### Paid cloud neural TTS

Strengths: broad language coverage and generally better pronunciation.

Trade-offs: ongoing spend, vendor dependency and usage/privacy review. It conflicts with the current no-spend requirement and was not used.

## Weight impact

The eight localized folders currently occupy roughly 10–26 MB each after 32 kbps mono compression. Adding recordings for roughly 40 more locale/language variants at the present article count would likely add about 0.5 GB to source and another 0.5 GB to the built copy, before voice-model files. That conflicts with the current artifact-weight target.

## Recommendation

Keep the current prerecorded-locale → English fallback → hidden-player policy. Do not attempt all-language narration in this static artifact until the owner changes the no-generation rule, approves voice/licensing choices, and accepts either a much larger download or a server-backed streaming architecture. Any future rollout should begin with one language, fluent listening review of every article, transcript-duration checks and explicit commercial-license evidence.
