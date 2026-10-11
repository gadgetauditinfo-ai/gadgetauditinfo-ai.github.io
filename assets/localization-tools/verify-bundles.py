#!/usr/bin/env python3
"""Structural coverage checks for Gadget Audit localization bundles."""
import json, re, subprocess
from pathlib import Path
from generate_bundles import catalog

ROOT=Path(__file__).resolve().parents[2]
STRINGS=catalog(ROOT)
LANGS=['pt-BR','pt-PT','es','de','fr','it','nl','sv','nb','da','pl','cs','tr','ja','ko','zh','hi','id','ar','fi','el','hu','ro','hr','sk','sl','et','lv','lt','lb','mt','bg','is','sq','sr','bs','mk','uk','ru','th','ms','fil','vi','bn','si','ne','kk','uz','sw']
failed=False
for lang in LANGS:
    path=ROOT/'assets/l10n'/f'{lang}.js'
    check=subprocess.run(['node','--check',str(path)],capture_output=True,text=True)
    text=path.read_text(encoding='utf-8') if path.exists() else ''
    match=re.search(r'window\.(?:GA_L10N|GA_[A-Z_]+)=(\{.*?\});',text,re.S)
    count=0
    if match:
        try: count=len(json.loads(match.group(1)))
        except json.JSONDecodeError: pass
    status='POPULATED' if count>1000 else 'STUB'
    print(f'{lang:6} {status:9} {count:5}/{len(STRINGS)} strings')
    if check.returncode:
        failed=True
        print(check.stderr.strip())
raise SystemExit(1 if failed else 0)
