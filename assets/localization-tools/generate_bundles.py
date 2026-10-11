#!/usr/bin/env python3
"""Build one static Gadget Audit translation bundle with a local LibreTranslate server.

The script never calls a hosted translation service. Start LibreTranslate on the
same machine, then run this file once per target language. Review every emitted
bundle before release; machine translation is a draft, not editorial approval.
"""
from __future__ import annotations
import argparse
import html.parser
import json
import re
import urllib.request
from pathlib import Path

SKIP_TAGS = {"script", "style", "noscript", "code", "pre"}
ATTRS = {"alt", "aria-label", "placeholder", "title"}

class VisibleText(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0
        self.values: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self.depth += 1
        if not self.depth:
            for key, value in attrs:
                if key in ATTRS and value:
                    self.add(value)

    def handle_endtag(self, tag):
        if tag in SKIP_TAGS and self.depth:
            self.depth -= 1

    def handle_data(self, data):
        if not self.depth:
            self.add(data)

    def add(self, value):
        clean = " ".join(value.split())
        if clean and re.search(r"[A-Za-z]", clean):
            self.values.append(clean)


def catalog(root: Path) -> list[str]:
    values: list[str] = []
    for page in [root / "index.html", *(root / "assets").glob("**/index.html")]:
        parser = VisibleText()
        parser.feed(page.read_text(encoding="utf-8", errors="ignore"))
        values.extend(parser.values)
    inventory = (root / "assets/article-inventory.js").read_text(encoding="utf-8")
    for key in ("title", "tag", "dek", "alt", "meta", "summary", "verdict", "name"):
        values.extend(re.findall(rf"{key}:\s*'((?:\\.|[^'])*)'", inventory))
        values.extend(re.findall(rf'"{key}"\s*:\s*"((?:\\.|[^"])*)"', inventory))
    return sorted(set(values))


def translate_batch(endpoint: str, source: str, target: str, batch: list[str]) -> list[str]:
    body = json.dumps({"q": batch, "source": source, "target": target, "format": "text"}).encode()
    request = urllib.request.Request(endpoint, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=180) as response:
        payload = json.load(response)
    translated = payload.get("translatedText")
    if isinstance(translated, str) and len(batch) == 1:
        return [translated]
    if not isinstance(translated, list) or len(translated) != len(batch):
        raise RuntimeError("LibreTranslate returned an unexpected batch response")
    return translated


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("target", help="LibreTranslate target language, for example fi or th")
    ap.add_argument("--root", default=str(Path(__file__).resolve().parents[2]))
    ap.add_argument("--endpoint", default="http://127.0.0.1:5000/translate")
    ap.add_argument("--batch-size", type=int, default=32)
    ap.add_argument("--audit-only", action="store_true")
    args = ap.parse_args()
    root = Path(args.root).resolve()
    strings = catalog(root)
    output = root / "assets/l10n" / f"{args.target}.js"
    if args.audit_only:
        print(json.dumps({"language": args.target, "strings": len(strings), "utf8_bytes": sum(len(s.encode()) for s in strings), "output": str(output)}, indent=2))
        return
    if not re.match(r"^https?://(?:127\.0\.0\.1|localhost)(?::\d+)?/", args.endpoint):
        raise SystemExit("Refusing a non-local endpoint. Run a self-hosted LibreTranslate instance on localhost.")
    translated: dict[str, str] = {}
    for start in range(0, len(strings), args.batch_size):
        batch = strings[start:start + args.batch_size]
        results = translate_batch(args.endpoint, "en", args.target, batch)
        translated.update(zip(batch, results))
        print(f"{min(start + len(batch), len(strings))}/{len(strings)}", flush=True)
    payload = "/* Generated with a local LibreTranslate instance; editorial review required. */\nwindow.GA_L10N=" + json.dumps(translated, ensure_ascii=False, separators=(",", ":")) + ";\n"
    tmp = output.with_suffix(".js.tmp")
    tmp.write_text(payload, encoding="utf-8")
    tmp.replace(output)
    print(f"wrote {output} ({output.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
