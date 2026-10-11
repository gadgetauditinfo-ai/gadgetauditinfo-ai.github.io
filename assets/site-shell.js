(()=>{
'use strict';
const scriptUrl=new URL(document.currentScript.src,document.baseURI);
const assetRoot=new URL('./',scriptUrl);
const siteRoot=new URL('../',assetRoot);
const isEmbeddedArtifactRoute=/^\/spaces\/v2\/[^/]+\/$/.test(siteRoot.pathname);
const toPrettyPath=value=>{if(isEmbeddedArtifactRoute)return value;const m=String(value||'').match(/^assets\/(.+?)\/(?:index\.html)?([?#].*)?$/);if(m)return'/'+m[1]+'/'+(m[2]||'');const h=String(value||'').match(/^index\.html([?#].*)?$/i);if(h)return'/'+(h[1]||'');return value};
const link=path=>new URL(toPrettyPath(path),siteRoot).href;
const T=s=>(window.GA_T?window.GA_T(s):s);
const upgradeHref=new URL('upgrade.css',assetRoot).href;
if(![...document.querySelectorAll('link[rel~="stylesheet"]')].some(node=>{try{return new URL(node.href,document.baseURI).href===upgradeHref}catch{return false}})){const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=upgradeHref;document.head.append(stylesheet)}
const redesignHref=new URL('ga-redesign-2026-10-11.css',assetRoot).href;
if(![...document.querySelectorAll('link[rel~="stylesheet"]')].some(node=>{try{return new URL(node.href,document.baseURI).href===redesignHref}catch{return false}})){const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=redesignHref;document.head.append(stylesheet)}
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const regions=[
 {name:'Europe',countries:[
  {id:'gb',name:'United Kingdom',currency:'GBP',flag:'🇬🇧',rate:0.7396},
  {id:'ie',name:'Ireland',currency:'EUR',flag:'🇮🇪',rate:0.8626},
  {id:'al',name:'Albania',currency:'ALL',flag:'🇦🇱',rate:80.44},
  {id:'ad',name:'Andorra',currency:'EUR',flag:'🇦🇩',rate:0.8787730291},
  {id:'at',name:'Austria',currency:'EUR',flag:'🇦🇹',rate:0.8787730291},
  {id:'by',name:'Belarus',currency:'BYN',flag:'🇧🇾',rate:3.01},
  {id:'be',name:'Belgium',currency:'EUR',flag:'🇧🇪',rate:0.8787730291},
  {id:'ba',name:'Bosnia and Herzegovina',currency:'BAM',flag:'🇧🇦',rate:1.719408938},
  {id:'bg',name:'Bulgaria',currency:'EUR',flag:'🇧🇬',rate:0.8787730291},
  {id:'hr',name:'Croatia',currency:'EUR',flag:'🇭🇷',rate:0.8787730291},
  {id:'cy',name:'Cyprus',currency:'EUR',flag:'🇨🇾',rate:0.8787730291},
  {id:'cz',name:'Czechia',currency:'CZK',flag:'🇨🇿',rate:21.456},
  {id:'dk',name:'Denmark',currency:'DKK',flag:'🇩🇰',rate:6.571208226},
  {id:'ee',name:'Estonia',currency:'EUR',flag:'🇪🇪',rate:0.8787730291},
  {id:'fi',name:'Finland',currency:'EUR',flag:'🇫🇮',rate:0.8787730291},
  {id:'fr',name:'France',currency:'EUR',flag:'🇫🇷',rate:0.8787730291},
  {id:'de',name:'Germany',currency:'EUR',flag:'🇩🇪',rate:0.8787730291},
  {id:'gr',name:'Greece',currency:'EUR',flag:'🇬🇷',rate:0.8787730291},
  {id:'hu',name:'Hungary',currency:'HUF',flag:'🇭🇺',rate:321.8276111},
  {id:'is',name:'Iceland',currency:'ISK',flag:'🇮🇸',rate:121.3398667},
  {id:'it',name:'Italy',currency:'EUR',flag:'🇮🇹',rate:0.8787730291},
  {id:'xk',name:'Kosovo',currency:'EUR',flag:'🇽🇰',rate:0.8787730291},
  {id:'lv',name:'Latvia',currency:'EUR',flag:'🇱🇻',rate:0.8787730291},
  {id:'li',name:'Liechtenstein',currency:'CHF',flag:'🇱🇮',rate:0.827450114},
  {id:'lt',name:'Lithuania',currency:'EUR',flag:'🇱🇹',rate:0.8787730291},
  {id:'lu',name:'Luxembourg',currency:'EUR',flag:'🇱🇺',rate:0.8787730291},
  {id:'mt',name:'Malta',currency:'EUR',flag:'🇲🇹',rate:0.8787730291},
  {id:'md',name:'Moldova',currency:'MDL',flag:'🇲🇩',rate:17.66226797},
  {id:'mc',name:'Monaco',currency:'EUR',flag:'🇲🇨',rate:0.8787730291},
  {id:'me',name:'Montenegro',currency:'EUR',flag:'🇲🇪',rate:0.8787730291},
  {id:'nl',name:'Netherlands',currency:'EUR',flag:'🇳🇱',rate:0.8787730291},
  {id:'mk',name:'North Macedonia',currency:'MKD',flag:'🇲🇰',rate:54.10565673},
  {id:'no',name:'Norway',currency:'NOK',flag:'🇳🇴',rate:9.490600096},
  {id:'pl',name:'Poland',currency:'PLN',flag:'🇵🇱',rate:3.852616536},
  {id:'pt',name:'Portugal',currency:'EUR',flag:'🇵🇹',rate:0.8787730291},
  {id:'ro',name:'Romania',currency:'RON',flag:'🇷🇴',rate:4.638291172},
  {id:'ru',name:'Russia',currency:'RUB',flag:'🇷🇺',rate:84.99548699},
  {id:'sm',name:'San Marino',currency:'EUR',flag:'🇸🇲',rate:0.8787730291},
  {id:'rs',name:'Serbia',currency:'RSD',flag:'🇷🇸',rate:103.1985081},
  {id:'sk',name:'Slovakia',currency:'EUR',flag:'🇸🇰',rate:0.8787730291},
  {id:'si',name:'Slovenia',currency:'EUR',flag:'🇸🇮',rate:0.8787730291},
  {id:'es',name:'Spain',currency:'EUR',flag:'🇪🇸',rate:0.8787730291},
  {id:'se',name:'Sweden',currency:'SEK',flag:'🇸🇪',rate:9.907835799},
  {id:'ch',name:'Switzerland',currency:'CHF',flag:'🇨🇭',rate:0.827450114},
  {id:'ua',name:'Ukraine',currency:'UAH',flag:'🇺🇦',rate:44.95919155},
  {id:'va',name:'Vatican City',currency:'EUR',flag:'🇻🇦',rate:0.8787730291},]},
 {name:'Americas',countries:[
  {id:'us',name:'United States',currency:'USD',flag:'🇺🇸',rate:1},
  {id:'ca',name:'Canada',currency:'CAD',flag:'🇨🇦',rate:1.3867},]},
 {name:'Oceania',countries:[
  {id:'au',name:'Australia',currency:'AUD',flag:'🇦🇺',rate:1.3945},
  {id:'nz',name:'New Zealand',currency:'NZD',flag:'🇳🇿',rate:1.7204},]},
 {name:'Asia',countries:[
  {id:'jp',name:'Japan',currency:'JPY',flag:'🇯🇵',rate:158.3907547},
  {id:'kr',name:'South Korea',currency:'KRW',flag:'🇰🇷',rate:1368.476772},
  {id:'sg',name:'Singapore',currency:'SGD',flag:'🇸🇬',rate:1.279788644},
  {id:'tw',name:'Taiwan',currency:'TWD',flag:'🇹🇼',rate:31.7971611},
  {id:'hk',name:'Hong Kong',currency:'HKD',flag:'🇭🇰',rate:7.842723395},
  {id:'my',name:'Malaysia',currency:'MYR',flag:'🇲🇾',rate:4.083999962},]},
 {name:'Middle East',countries:[
  {id:'ae',name:'United Arab Emirates',currency:'AED',flag:'🇦🇪',rate:3.672879409},
  {id:'sa',name:'Saudi Arabia',currency:'SAR',flag:'🇸🇦',rate:3.754800176},
  {id:'qa',name:'Qatar',currency:'QAR',flag:'🇶🇦',rate:3.644999996},
  {id:'kw',name:'Kuwait',currency:'KWD',flag:'🇰🇼',rate:0.3077100469},
  {id:'bh',name:'Bahrain',currency:'BHD',flag:'🇧🇭',rate:0.3769532499},
  {id:'om',name:'Oman',currency:'OMR',flag:'🇴🇲',rate:0.3850000019},
  {id:'il',name:'Israel',currency:'ILS',flag:'🇮🇱',rate:3.033994},]},
 {name:'Africa',countries:[
  {id:'za',name:'South Africa',currency:'ZAR',flag:'🇿🇦',rate:16.41449375},
  {id:'eg',name:'Egypt',currency:'EGP',flag:'🇪🇬',rate:51.66106322},
  {id:'ng',name:'Nigeria',currency:'NGN',flag:'🇳🇬',rate:1327.973436},
  {id:'ke',name:'Kenya',currency:'KES',flag:'🇰🇪',rate:129.449841},
  {id:'ma',name:'Morocco',currency:'MAD',flag:'🇲🇦',rate:9.603036975},
  {id:'gh',name:'Ghana',currency:'GHS',flag:'🇬🇭',rate:11.58989039},]}
];
const countries=regions.flatMap(region=>region.countries);
const EDITION_STORAGE_KEY='ga-edition';
const pagePreferences=new URLSearchParams(location.search);
const queryTheme=pagePreferences.get('theme');
const storedTheme=(()=>{try{return localStorage.getItem('ga-theme')}catch{return null}})();
const savedTheme=['light','dark'].includes(queryTheme)?queryTheme:(['light','dark'].includes(storedTheme)?storedTheme:null);
if(['light','dark'].includes(queryTheme))try{localStorage.setItem('ga-theme',queryTheme)}catch{}
const savedRegion=window.__GA_EDITION__||pagePreferences.get('edition');
const CONSENT_STORAGE_KEY='ga-consent';
const validConsent=value=>['allow','decline'].includes(value);
const readStoredConsent=()=>{try{const value=localStorage.getItem(CONSENT_STORAGE_KEY);return validConsent(value)?value:null}catch{return null}};
const queryConsent=pagePreferences.get(CONSENT_STORAGE_KEY);
if(!readStoredConsent()&&validConsent(queryConsent))try{localStorage.setItem(CONSENT_STORAGE_KEY,queryConsent)}catch{}
let consent=readStoredConsent();
let theme=['light','dark'].includes(savedTheme)?savedTheme:(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
let country=countries.find(item=>item.id===savedRegion)||countries.find(item=>item.id==='us')||countries[0];
const resolveInternalAnchor=raw=>{const value=String(raw||'').trim();if(!value||value.startsWith('#')||value.startsWith('mailto:')||value.startsWith('tel:'))return null;let u;if(/^(?:\.\.\/)+/i.test(value)){const clean=value.replace(/^(?:\.\.\/)+/,'');u=new URL(/^(?:assets\/|index\.html(?:[?#]|$))/i.test(clean)?clean:`assets/${clean}`,siteRoot)}else{const base=/^(?:assets\/|index\.html(?:[?#]|$))/i.test(value)?siteRoot:document.baseURI;u=new URL(value,base)}if(u.origin!==location.origin)return null;const rootPath=siteRoot.pathname.endsWith('/')?siteRoot.pathname:`${siteRoot.pathname}/`;if(u.pathname.startsWith(rootPath)){const relative=u.pathname.slice(rootPath.length),nested=relative.lastIndexOf('/assets/');if(nested>0){const fixed=new URL(relative.slice(nested+1),siteRoot);fixed.search=u.search;fixed.hash=u.hash;u=fixed}}
const prettyMatch=u.pathname.match(/\/assets\/(.+?\/)(?:index\.html)?$/);if(prettyMatch&&!isEmbeddedArtifactRoute&&u.origin===location.origin){const pretty=new URL(u.pathname.replace(/\/assets\/(.+?\/)(?:index\.html)?$/,'/$1'),u.origin);pretty.search=u.search;pretty.hash=u.hash;u=pretty}return u};
const normalizedDocumentPath=value=>(String(value||'').replace(/index\.html$/i,'').replace(/\/+$/,'')||'/');
const syncPreferenceLinks=()=>{document.querySelectorAll('a[href]').forEach(a=>{try{const raw=(a.getAttribute('href')||'').trim();if(!raw||raw.startsWith('#'))return;const u=resolveInternalAnchor(raw);if(!u)return;if(u.hash&&normalizedDocumentPath(u.pathname)===normalizedDocumentPath(location.pathname)){a.setAttribute('href',u.hash);return}u.searchParams.set('theme',theme);u.searchParams.set('edition',window.__GA_EDITION__||'us');u.searchParams.delete('region');u.searchParams.delete(CONSENT_STORAGE_KEY);if(a.href!==u.href)a.href=u.href}catch{}})};
const commitPreferences=()=>{try{localStorage.setItem('ga-theme',theme);if(consent)localStorage.setItem(CONSENT_STORAGE_KEY,consent)}catch{}const url=new URL(location.href);url.searchParams.set('theme',theme);url.searchParams.set('edition',window.__GA_EDITION__||'us');url.searchParams.delete('region');url.searchParams.delete(CONSENT_STORAGE_KEY);history.replaceState(null,'',url);syncPreferenceLinks()};
const refreshConsentState=()=>{consent=readStoredConsent();document.documentElement.dataset.optionalConsent=consent||'off';if(consent)document.querySelector('.ga-cookie-notice')?.remove();else if(!document.querySelector('.ga-cookie-notice'))initCookieNotice();syncPreferenceLinks()};
const setTheme=()=>{document.documentElement.dataset.theme=theme;document.querySelectorAll('#gaTheme,[data-ga-theme],#themeToggle').forEach(button=>{button.setAttribute('role','switch');button.setAttribute('aria-label','Dark mode');button.setAttribute('aria-checked',String(theme==='dark'));button.removeAttribute('aria-pressed');const symbol=button.querySelector('.ga-theme-symbol');if(symbol)symbol.textContent=theme==='dark'?'☾':'☀'})};
setTheme();
const handleLocalFragment=event=>{const a=event.target.closest('a[href]');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;let u;try{u=new URL(a.getAttribute('href'),location.href)}catch{return}if(!u.hash||u.origin!==location.origin||u.pathname!==location.pathname)return;let target;try{target=document.getElementById(decodeURIComponent(u.hash.slice(1)))}catch{}if(!target)return;event.preventDefault();event.stopImmediatePropagation();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});history.pushState(null,'',location.pathname+location.search+u.hash)};
document.addEventListener('click',handleLocalFragment,true);
const navHref=path=>link(path);
const chevronSvg='<svg class="ga-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const subgroup=(label,items)=>`<div class="ga-subgroup"><button class="ga-sub-toggle" type="button" aria-expanded="false">${label}${chevronSvg}</button><div class="ga-subpanel">${items.map(([text,path,note])=>`<a href="${navHref(path)}"><span>${text}</span>${note?`<small class="ga-item-note">${note}</small>`:''}</a>`).join('')}</div></div>`;
const dropdown=(label,body)=>`<div class="ga-menu-group"><button class="ga-nav-toggle" type="button" aria-expanded="false">${label}${chevronSvg}</button><div class="ga-menu-panel">${body}</div></div>`;
const reviewMenu=`<span class="ga-menu-label">Reviews by category</span>${subgroup('Audio',[["Audio review archive",'assets/audio/reviews/index.html','Archive'],["Earbuds under $100",'assets/best-wireless-earbuds-under-100/index.html','Best picks'],["ANC or comfort?",'assets/features/noise-cancelling-fit-guide/index.html','Face-off']])}${subgroup('Power',[["Power review archive",'assets/power/reviews/index.html','Archive'],["Power-bank face-off",'assets/face-offs/power-banks/index.html','Face-off'],["Fly-safe power banks",'assets/features/power-bank-airline-guide/index.html','Guide']])}${subgroup('Smart Home',[["Smart-home archive",'assets/smart-home/reviews/index.html','Archive'],["Best smart locks",'assets/best-smart-locks-2026/index.html','Best picks'],["Privacy-first speaker setup",'assets/features/smart-home-privacy-checklist/index.html','Guide']])}${subgroup('Crowdfunding',[["Crowdfunding archive",'assets/crowdfunding/reviews/index.html','Archive'],["Current campaign audit",'assets/crowdfunding-gadgets/index.html','Audit'],["September Kickstarter picks",'assets/best-kickstarter-gadgets-september-2026/index.html','Best picks']])}${subgroup('EDC',[["EDC review archive",'assets/edc/reviews/index.html','Archive'],["EDC gadgets under $50",'assets/best-edc-gadgets-under-50/index.html','Best picks'],["The three-tool rule",'assets/features/edc-three-tool-rule/index.html','Guide']])}`;
const guideMenu=`<span class="ga-menu-label">Guides by category</span>${subgroup('Audio',[["Audio guides",'assets/audio/index.html','Hub'],["Audio best picks",'assets/audio/best-picks/index.html','Best picks'],["Audio how-tos",'assets/audio/how-tos/index.html','How-to']])}${subgroup('Power',[["Power guides",'assets/power/index.html','Hub'],["Power best picks",'assets/power/best-picks/index.html','Best picks'],["Fly-safe power banks",'assets/features/power-bank-airline-guide/index.html','How-to']])}${subgroup('Smart Home',[["Smart-home guides",'assets/smart-home/index.html','Hub'],["Best smart locks",'assets/best-smart-locks-2026/index.html','Best picks'],["Smart-home how-tos",'assets/smart-home/how-tos/index.html','How-to']])}${subgroup('Crowdfunding',[["Crowdfunding guides",'assets/crowdfunding/index.html','Hub'],["Crowdfunding how-tos",'assets/crowdfunding/how-tos/index.html','How-to'],["Seven campaign red flags",'assets/features/crowdfunding-red-flags/index.html','Guide']])}${subgroup('EDC',[["EDC guides",'assets/edc/index.html','Hub'],["EDC best picks",'assets/edc/best-picks/index.html','Best picks'],["EDC how-tos",'assets/edc/how-tos/index.html','How-to']])}`;
const dealsMenu=`<span class="ga-menu-label">Deals by category</span>${subgroup('Deal desk',[["All verified deals",'assets/deals/index.html','Latest'],["How we verify deals",'assets/how-we-verify-deals/index.html','Standards'],["Affiliate policy",'assets/affiliate-disclosure/index.html','Disclosure']])}${subgroup('Audio & Power',[["Audio deals",'assets/audio/deals/index.html','Audio'],["Power deals",'assets/power/deals/index.html','Power'],["Deal standards",'assets/deals-standards/index.html','Policy']])}${subgroup('Home, EDC & Campaigns',[["Smart-home deals",'assets/smart-home/deals/index.html','Smart Home'],["EDC deals",'assets/edc/deals/index.html','EDC'],["Crowdfunding deals",'assets/crowdfunding/deals/index.html','Campaigns']])}`;
const aboutMenu=`<a href="${navHref('assets/about/index.html')}">About</a><a href="${navHref('assets/editorial-policy/index.html')}">Editorial policy</a><a href="${navHref('assets/authors/editorial-team/index.html')}">Research desk</a><a href="${navHref('assets/editorial-policy/index.html')}">How we review</a><a href="${navHref('assets/how-we-rate/index.html')}">How we rate</a><a href="${navHref('assets/corrections/index.html')}">Corrections</a><a href="${navHref('assets/contact/index.html')}">Contact</a>`;
const topSocials=`<nav class="ga-top-socials" aria-label="Social media"><a class="ga-social-facebook" href="https://www.facebook.com/GadgetAudit" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v9h4v-9h3.3l.7-4h-4V9c0-.7.3-1 1-1z"/></svg></a><a class="ga-social-instagram" href="https://www.instagram.com/gadgetaudit1/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></a><a class="ga-social-youtube" href="https://www.youtube.com/@GadgetAudit" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L16 12l-6.4 3.6z"/></svg></a><a class="ga-social-x" href="https://x.com/GadgetAudit" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#000"/><g transform="translate(12 12) scale(.82) translate(-12 -12)"><path fill="#fff" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z"/></g></svg></a><a class="ga-social-pinterest" href="https://www.pinterest.com/gadgetaudit/" target="_blank" rel="noopener" aria-label="Pinterest"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62.001 12.017.001z"/></svg></a><a class="ga-social-tiktok" href="https://www.tiktok.com/@gadgetaudit1" target="_blank" rel="noopener" aria-label="TikTok"><svg class="ic-mono" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg><svg class="ic-color" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#000"/><g transform="translate(12 12) scale(.8) translate(-12 -12)"><path fill="#FE2C55" transform="translate(.45 .45)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#25F4EE" transform="translate(-.45 -.45)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></g></svg></a><a class="ga-social-threads" href="https://www.threads.com/@gadgetaudit1" target="_blank" rel="noopener" aria-label="Threads"><svg class="ic-mono" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg><svg class="ic-color" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#000"/><g transform="translate(12 12) scale(.8) translate(-12 -12)"><path fill="#fff" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></g></svg></a></nav>`;
const countryButtons=regions.map((region,index)=>{const expanded=region.countries.some(c=>c.id===country.id);const panelId=`gaRegionCountries${index}`;return `<section class="ga-region-group${expanded?' is-open':''}"><button class="ga-region-toggle" type="button" aria-expanded="${expanded}" aria-controls="${panelId}"><span>${region.name}</span>${chevronSvg}</button><div class="ga-region-countries" id="${panelId}"${expanded?'':' hidden'}>${region.countries.map(c=>`<button class="ga-country-button${c.id===country.id?' is-current':''}" type="button" data-country="${c.id}" aria-label="${c.name}, ${c.currency}"><span class="ga-country-label"><span class="ga-country-name">${c.name}</span><span class="ga-country-flag" aria-hidden="true">${c.flag}</span></span><small>${c.currency}</small></button>`).join('')}</div></section>`}).join('');
const countryOptions=regions.map(region=>`<optgroup label="${region.name}">${region.countries.map(c=>`<option value="${c.id}"${c.id===country.id?' selected':''}>${c.name} ${c.flag} · ${c.currency}</option>`).join('')}</optgroup>`).join('');
const headerMarkup=`<div class="ga-shell-nav"><div class="ga-utility-row"><button class="ga-menu-button" id="gaMenu" type="button" aria-label="Open navigation" aria-expanded="false"><span class="ga-menu-lines" aria-hidden="true"></span></button><a class="ga-brand" href="${navHref('index.html')}" aria-label="Gadget Audit home"><img src="${new URL('gadget-audit-shield.webp',assetRoot).href}" alt="Gadget Audit" width="740" height="915" loading="eager" decoding="async"><span class="ga-brand-wordmark" aria-hidden="true">Gadget Audit</span></a><span class="ga-scope-note">Independent reviews, practical guides and campaign audits</span>${topSocials}<a class="ga-search-link" href="${navHref('assets/search/index.html')}" aria-label="Search"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4 4"></path></svg><span class="ga-search-label">Search</span></a><a class="ga-finder-link" href="${navHref('index.html')}#finder" aria-label="Gadget Finder"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg><span class="ga-finder-label">Gadget Finder</span></a><button class="ga-tool" id="gaTheme" type="button" role="switch" aria-label="Dark mode" aria-checked="false"><span class="ga-theme-symbol" aria-hidden="true">☀</span><span class="ga-tool-label">Theme</span></button><div class="ga-region-wrap"><button class="ga-tool" id="gaRegion" type="button" aria-label="Choose country and currency" aria-expanded="false" aria-controls="gaRegionPanel"><span class="ga-country-name ga-selected-country">${country.name}</span><span class="ga-flag" aria-hidden="true">${country.flag}</span><span class="ga-tool-label ga-country-code">${country.currency}</span>${chevronSvg}</button><div class="ga-region-panel" id="gaRegionPanel"><div class="ga-region-head"><div><strong>Choose your region</strong><span>Verified retail prices stay in US dollars and can show an approximate reference conversion.</span></div><button class="ga-region-close" type="button" aria-label="Close region selector">×</button></div><div class="ga-region-groups">${countryButtons}</div><p class="ga-rate-note">Approximate conversion from USD. Final price and availability may vary by retailer, taxes and region. Embedded exchange-rate snapshot: September 22, 2026.</p></div></div></div><div class="ga-nav-panel" id="gaNavPanel" hidden><nav class="ga-primary-nav" aria-label="Primary navigation"><a href="${navHref('index.html')}">Home</a>${dropdown('Reviews',reviewMenu)}${dropdown('Guides',guideMenu)}<a href="${navHref('assets/crowdfunding/index.html')}">Crowdfunding</a><a href="${navHref('assets/edc/index.html')}">EDC</a><a href="${navHref('assets/power/index.html')}">Power</a><a href="${navHref('assets/smart-home/index.html')}">Smart Home</a><a href="${navHref('assets/audio/index.html')}">Audio</a>${dropdown('Deals',dealsMenu)}${dropdown('About',aboutMenu)}<div class="ga-mobile-region"><label for="gaMobileCountry">Region & currency</label><select id="gaMobileCountry">${countryOptions}</select></div></nav></div></div>`;
const footerMarkup=`<div class="ga-shell-nav"><div class="ga-footer-grid"><div class="ga-footer-brand"><img src="${new URL('gadget-audit-shield.webp',assetRoot).href}" alt="Gadget Audit" width="740" height="915" loading="lazy" decoding="async"><p>Independent gadget research with evidence labels, practical buying guidance and the trade-offs left in.</p></div><nav class="ga-footer-col" aria-label="Explore"><h2>Explore</h2><ul><li><a href="${navHref('all-reviews/')}">Latest reviews & guides</a></li><li><a href="${navHref('assets/crowdfunding/index.html')}">Crowdfunding</a></li><li><a href="${navHref('assets/edc/index.html')}">Everyday carry</a></li><li><a href="${navHref('assets/power/index.html')}">Power</a></li><li><a href="${navHref('assets/smart-home/index.html')}">Smart home</a></li><li><a href="${navHref('assets/audio/index.html')}">Audio</a></li></ul></nav><nav class="ga-footer-col" aria-label="Standards"><h2>Standards</h2><ul><li><a href="${navHref('assets/editorial-policy/index.html')}">How we review</a></li><li><a href="${navHref('assets/how-we-test/index.html')}">How we evaluate</a></li><li><a href="${navHref('assets/how-we-rate/index.html')}">How we rate</a></li><li><a href="${navHref('assets/editorial-policy/index.html')}">Editorial policy</a></li><li><a href="${navHref('assets/authors/editorial-team/index.html')}">Research desk</a></li><li><a href="${navHref('assets/corrections/index.html')}">Corrections</a></li></ul></nav><nav class="ga-footer-col" aria-label="Company and legal"><h2>Company</h2><ul><li><a href="${navHref('assets/about/index.html')}">About</a></li><li><a href="mailto:gadgetauditinfo@gmail.com">gadgetauditinfo@gmail.com</a></li><li><a href="${navHref('assets/contact/index.html')}">Contact</a></li><li><a href="${navHref('assets/affiliate-disclosure/index.html')}">Affiliate disclosure</a></li><li><a href="${navHref('assets/deals-standards/index.html')}">Deals standards</a></li><li><a href="${navHref('assets/privacy-policy/index.html')}">Privacy policy</a></li><li><a href="${navHref('assets/terms-of-service/index.html')}">Terms of service</a></li><li><a href="${navHref('assets/sitemap/index.html')}">Sitemap</a></li></ul></nav></div><div class="ga-footer-bottom"><span>© 2026 Gadget Audit. Evidence before enthusiasm.</span><div class="ga-socials"><a class="ga-social-facebook" href="https://www.facebook.com/GadgetAudit" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v9h4v-9h3.3l.7-4h-4V9c0-.7.3-1 1-1z"/></svg><span>Facebook</span></a><a class="ga-social-instagram" href="https://www.instagram.com/gadgetaudit1/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg><span>Instagram</span></a><a class="ga-social-youtube" href="https://www.youtube.com/@GadgetAudit" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L16 12l-6.4 3.6z"/></svg><span>YouTube</span></a><a class="ga-social-x" href="https://x.com/GadgetAudit" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#000"/><g transform="translate(12 12) scale(.82) translate(-12 -12)"><path fill="#fff" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z"/></g></svg><span>X</span></a><a class="ga-social-pinterest" href="https://www.pinterest.com/gadgetaudit/" target="_blank" rel="noopener" aria-label="Pinterest"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62.001 12.017.001z"/></svg><span>Pinterest</span></a><a class="ga-social-tiktok" href="https://www.tiktok.com/@gadgetaudit1" target="_blank" rel="noopener" aria-label="TikTok"><svg class="ic-mono" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg><svg class="ic-color" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#000"/><g transform="translate(12 12) scale(.8) translate(-12 -12)"><path fill="#FE2C55" transform="translate(.45 .45)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#25F4EE" transform="translate(-.45 -.45)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></g></svg><span>TikTok</span></a><a class="ga-social-threads" href="https://www.threads.com/@gadgetaudit1" target="_blank" rel="noopener" aria-label="Threads"><svg class="ic-mono" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg><svg class="ic-color" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#000"/><g transform="translate(12 12) scale(.8) translate(-12 -12)"><path fill="#fff" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></g></svg><span>Threads</span></a></div></div></div>`;
function streamlineArticles(){
 const isArticle=document.body.matches('[data-route^="article/"],.gu-article')||document.querySelector('article.view,.gu-article');
 if(!isArticle)return;
 document.querySelectorAll('.article-body>hr,.gu-article-body>hr,.content>hr').forEach(rule=>rule.remove());
 const articleHeader=document.querySelector('main .article-header');
 const affiliateDisclosure=document.querySelector('.article-body>.disclosure');
 if(articleHeader&&affiliateDisclosure)articleHeader.insertAdjacentElement('afterend',affiliateDisclosure);
 const guideHeader=document.querySelector('main .gu-article-header');
 const guideDisclosure=document.querySelector('.gu-article-body>.gu-disclosure');
 if(guideHeader&&guideDisclosure)guideHeader.insertAdjacentElement('afterend',guideDisclosure);
}
function repairBreadcrumbHomes(){
 document.querySelectorAll('.breadcrumb,.crumb,.gu-breadcrumb,[aria-label="Breadcrumb"],[aria-label="breadcrumb"]').forEach(trail=>{
  const home=[...trail.querySelectorAll('a[href]')].find(anchor=>anchor.textContent.trim().toLowerCase()==='home');
  if(home)home.href=link('index.html');
 });
}
function enhanceSearchClear(){
 document.querySelectorAll('input[type="search"]').forEach(input=>{
  if(input.dataset.gaClearEnhanced==='true'||input.closest('[aria-hidden="true"],[inert]'))return;
  input.dataset.gaClearEnhanced='true';
  const field=document.createElement('span');field.className='ga-search-field';input.before(field);field.append(input);
  const clear=document.createElement('button');clear.type='button';clear.className='ga-search-clear';clear.setAttribute('aria-label','Clear search');clear.textContent='×';field.append(clear);
  const sync=()=>{clear.hidden=!input.value};
  input.addEventListener('input',sync);
  clear.addEventListener('click',()=>{input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()});
  sync();
 });
}
function initCookieNotice(){document.documentElement.dataset.optionalConsent=consent||'off';if(consent)return;const notice=document.createElement('section');notice.className='ga-cookie-notice';notice.setAttribute('aria-labelledby','gaCookieTitle');notice.innerHTML=`<div class="ga-cookie-copy"><h2 id="gaCookieTitle">${T('Your cookie choice')}</h2><p>${T('Optional advertising and analytics technologies are off unless you allow them. Gadget Audit does not currently load advertising or analytics code.')} <a href="${navHref('assets/privacy-policy/index.html')}">${T('Read the privacy policy')}</a>.</p></div><div class="ga-cookie-actions"><button type="button" data-ga-consent="decline">${T('Decline optional cookies')}</button><button type="button" data-ga-consent="allow">${T('Allow optional cookies')}</button></div>`;const header=document.querySelector('#gaSiteHeader,header');header?.insertAdjacentElement('afterend',notice);notice.querySelectorAll('[data-ga-consent]').forEach(button=>button.addEventListener('click',()=>{const decision=button.dataset.gaConsent;if(!validConsent(decision))return;try{localStorage.setItem(CONSENT_STORAGE_KEY,decision)}catch{}consent=readStoredConsent()||decision;document.documentElement.dataset.optionalConsent=consent;commitPreferences();notice.remove()}))}
function closeMenus(except){document.querySelectorAll('.ga-menu-group.is-open,.ga-menu-group.is-hovered').forEach(group=>{if(group!==except&&!group.contains(except)){group.classList.remove('is-open','is-hovered');group.querySelector(':scope > .ga-nav-toggle')?.setAttribute('aria-expanded','false')}});document.querySelectorAll('.ga-subgroup.is-open').forEach(group=>{if(group!==except&&!except?.contains(group)){group.classList.remove('is-open');group.querySelector(':scope > .ga-sub-toggle')?.setAttribute('aria-expanded','false')}});const region=document.querySelector('.ga-region-wrap');if(region&&region!==except){region.classList.remove('is-open');document.querySelector('#gaRegion')?.setAttribute('aria-expanded','false')}}
function formatMoney(value,currency){const digits=['PKR','INR','JPY','KRW','IDR','CLP','COP','ARS','NGN','PHP','THB','EGP','KES','HUF','CZK'].includes(currency)?0:2;return new Intl.NumberFormat(undefined,{style:'currency',currency,maximumFractionDigits:digits,minimumFractionDigits:digits}).format(value)}
function convertPrices(){return}
function setCountry(id){const next=countries.find(item=>item.id===id);if(!next)return;country=next;try{localStorage.setItem(EDITION_STORAGE_KEY,country.id)}catch{}window.__GA_EDITION__=country.id;document.documentElement.dataset.edition=country.id;document.querySelectorAll('.ga-flag').forEach(el=>el.textContent=country.flag);document.querySelectorAll('.ga-country-code').forEach(el=>el.textContent=country.currency);document.querySelectorAll('.ga-selected-country').forEach(el=>el.textContent=country.name);document.querySelectorAll('.ga-country-button').forEach(el=>el.classList.toggle('is-current',el.dataset.country===country.id));const mobile=document.querySelector('#gaMobileCountry');if(mobile)mobile.value=country.id;const url=new URL(location.href);url.searchParams.set('theme',theme);url.searchParams.set('edition',country.id);url.searchParams.delete('region');url.searchParams.delete(CONSENT_STORAGE_KEY);location.assign(url.href)}
function enhanceNarration(){const player=document.querySelector('#articlePlayer,.article-audio'),audio=player?.querySelector('audio');if(!player||!audio||player.dataset.gaEnhanced==='true')return;player.dataset.gaEnhanced='true';const status=player.querySelector('#audioStatus');if(status){status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true')}const play=player.querySelector('#audioPlay,.audio-play');if(play){play.setAttribute('aria-pressed',String(!audio.paused));audio.addEventListener('play',()=>play.setAttribute('aria-pressed','true'));audio.addEventListener('pause',()=>play.setAttribute('aria-pressed','false'));audio.addEventListener('ended',()=>play.setAttribute('aria-pressed','false'));play.addEventListener('click',()=>{if(audio.paused){audio.play().catch(()=>{if(status)status.textContent='Playback failed to start';});}else{audio.pause();}});const progress=player.querySelector('#audioProgress,.audio-progress');if(progress){progress.addEventListener('input',()=>{if(Number.isFinite(audio.duration)&&audio.duration>0){audio.currentTime=Math.min(audio.duration,Math.max(0,Number(progress.value)));}});}}const waveform=player.querySelector('#audioWaveform,.waveform');if(waveform){waveform.setAttribute('role','slider');waveform.setAttribute('aria-valuemin','0');waveform.setAttribute('aria-valuemax','100');const sync=()=>{const percent=audio.duration?Math.round(audio.currentTime/audio.duration*100):0;waveform.setAttribute('aria-valuenow',String(percent));waveform.setAttribute('aria-valuetext',`${Math.floor(audio.currentTime/60)}:${String(Math.floor(audio.currentTime%60)).padStart(2,'0')} elapsed`)};waveform.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key)||!Number.isFinite(audio.duration))return;event.preventDefault();const delta=event.key==='ArrowLeft'?-5:5;audio.currentTime=Math.max(0,Math.min(audio.duration,audio.currentTime+delta));sync();if(status)status.textContent=`${delta<0?'Skipped back':'Skipped forward'} 5 seconds · ${waveform.getAttribute('aria-valuetext')}`});audio.addEventListener('timeupdate',sync);audio.addEventListener('loadedmetadata',sync)}const speedButtons=[...player.querySelectorAll('.speed-btn')];const syncSpeed=()=>speedButtons.forEach(button=>{const active=Number(button.dataset.speed)===audio.playbackRate;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});speedButtons.forEach(button=>{button.type='button';button.addEventListener('click',()=>{audio.playbackRate=Number(button.dataset.speed)||1;syncSpeed()})});syncSpeed();const speedRow=player.querySelector('.speed-row');if(speedRow&&!speedRow.getAttribute('role'))speedRow.setAttribute('role','group');const tools=document.createElement('div');tools.className='ga-audio-tools';tools.setAttribute('role','group');tools.setAttribute('aria-label','Narration controls');tools.innerHTML='<button type="button" class="ga-skip" data-seconds="-15" aria-label="Skip back 15 seconds">−15s</button><button type="button" class="ga-skip" data-seconds="15" aria-label="Skip forward 15 seconds">+15s</button><label class="ga-volume"><span>Volume</span><input type="range" min="0" max="100" step="5" value="100" aria-label="Narration volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="100 percent"></label><button type="button" class="ga-mute" aria-label="Mute narration" aria-pressed="false">Mute</button>';const side=player.querySelector('.audio-side')||player;const speed=side.querySelector('.speed-row');if(speed)speed.insertAdjacentElement('beforebegin',tools);else side.append(tools);tools.querySelectorAll('.ga-skip').forEach(button=>button.addEventListener('click',()=>{audio.currentTime=Math.max(0,Math.min(Number.isFinite(audio.duration)?audio.duration:Infinity,audio.currentTime+Number(button.dataset.seconds)));if(status)status.textContent=Number(button.dataset.seconds)<0?'Skipped back 15 seconds':'Skipped forward 15 seconds'}));const volume=tools.querySelector('input');const mute=tools.querySelector('.ga-mute');let lastAudibleVolume=1;const syncVolume=()=>{const percent=Math.round(audio.volume*100);volume.value=String(percent);volume.setAttribute('aria-valuenow',String(percent));volume.setAttribute('aria-valuetext',`${percent} percent`)};const syncMute=()=>{const muted=audio.muted||audio.volume===0;mute.setAttribute('aria-pressed',String(muted));mute.textContent=muted?'Unmute':'Mute';mute.setAttribute('aria-label',muted?'Unmute narration':'Mute narration')};volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;if(audio.volume>0)lastAudibleVolume=audio.volume;audio.muted=false;syncVolume();syncMute()});volume.addEventListener('change',()=>{if(status)status.textContent=`Narration volume ${Math.round(audio.volume*100)} percent`});mute.addEventListener('click',()=>{const shouldUnmute=audio.muted||audio.volume===0;if(shouldUnmute&&audio.volume===0)audio.volume=lastAudibleVolume;audio.muted=!shouldUnmute;syncVolume();syncMute();if(status)status.textContent=shouldUnmute?'Narration unmuted':'Narration muted'});audio.addEventListener('volumechange',()=>{if(audio.volume>0)lastAudibleVolume=audio.volume;syncVolume();syncMute()});syncVolume();syncMute()}
function enhanceRecentUpdates(){
  if(document.querySelector('.ga-recent-updates'))return;
  const route=(location.pathname.match(/\/assets\/([^/]+)\//)||[])[1]||(document.body.dataset.route||'').replace(/^article\//,'');
  const updates={
    'best-wireless-earbuds-under-100':['2026-09-20 — Nothing Ear (a) spec corrections: Bluetooth 5.2 → 5.3 in key specs and cons; “8-band EQ in the Nothing X app” → “custom 3-band EQ (Bass/Mids/Treble sliders) plus presets” (8-band EQ is flagship Nothing Ear only). Sources: Amazon product info, Gadgets360, Android Central, Smartprix, GSMArena.','2026-09-20 — Deal badges added to buy boxes from live Amazon price checks: Soundcore Liberty 4 NC $79.99 (20% off list $99.99); EarFun Air Pro 4 $53.16 (33% off, limited-time, ends ~Sept 21).'],
    'edc-power-banks':['2026-09-21 — Baseus Picogo AM52 buy box updated: $59.98 (25% off $79.99, limited-time, ends ~Sept 21) — deal shallowed from the $55.98 observed 2026-09-20.','2026-09-20 — Buy boxes refreshed from live Amazon checks: Baseus Picogo AM52 $55.98 (30% off $79.99, limited-time deal, ends ~Sept 21 — deal deepened from $59.98); UGREEN Nexode 25000mAh $89.99 (31% off $129.99) gains new “Save 5% at checkout” promo (coupon UGREEN200P, ~$85.49 effective).'],
    'crowdfunding-gadgets':['2026-09-20 — Campaign-state labels added from the Sept 20 crowdfunding reality check: MOVESPEED ClariWatt Duo and HEXFORME DICE labeled live campaigns, not yet shipping or tested; Raymoto A1 labeled “campaign closed — outcome being verified” (campaign ended ~late July 2026; funding outcome unconfirmed).'],
    'best-kickstarter-gadgets-september-2026':['2026-09-20 — Campaign-state labels added from the Sept 20 crowdfunding reality check: PexarBolt Ultra TB5 “funded, live (ends ~mid-Nov 2026) — not yet shipping, not tested”; Sond Dreambuds “funded (Jun 2026) — first shipments promised Q4 2026, no shipping evidence yet”. Sept 22 watchlist added: CyboPal ONE and FridgeCal 2 (both confirmed on schedule via PR Newswire).'],
    'smart-home-upgrades-earn-their-keep':['2026-09-25 — Ring Battery Doorbell subscription naming updated to Ring Home (formerly Ring Protect), and the battery claim now reads “up to ~6–12 months per charge.”','2026-09-25 — August Wi-Fi Smart Lock pricing now distinguishes its $230 launch MSRP from the current $199.99 august.com price; connectivity corrected to dual-band Wi-Fi (2.4/5GHz).','2026-09-25 — Blink Mini’s unverified 3.5-star review-average claim was removed; the verified “4.4 stars, 300,000+ ratings” line remains.','2026-09-25 — Google Nest Thermostat copy now notes that Matter support arrived in a later firmware update.','2026-09-25 — Google Nest Thermostat savings estimate corrected from ~$130–$180 a year to roughly $131–$145 a year, matching Google’s official estimate.'],
    'smart-home-gadgets-beginners-2026':['2026-09-25 — Echo Show 8 (4th Gen) price corrected from $179 to $179.99; Wi-Fi 6E wording is unchanged.','2026-09-25 — Philips Hue Essential four-bulb starter-kit RRP corrected from $99.99 to $119.99.'],
    'best-edc-gadgets-under-50':['2026-09-23 — Nite Ize DoohicKey copy no longer calls the tool blade-free; the TSA-friendly wording now includes a screening-outcome caveat.','2026-09-23 — Nite Ize DoohicKey construction wording corrected from “stainless one-piece body” to “durable stainless steel body.”','2026-09-23 — WUBEN E2 Pulse copy now distinguishes the unspecified front-emitter CRI from the CRI 90 side light.'],
    'amazon-essentials':['2026-09-21 — Buy boxes updated from live Amazon checks: TP-Link Tapo C120 back to $39.99 (yesterday’s 10% discount ended); Logitech MX Master 3S $118.99 via third-party seller “Sales For You” (up from $89.99, no longer sold by Amazon.com).']
  };
  if(!updates[route])return;
  const disclosure=document.querySelector('.article-body>.disclosure');
  if(!disclosure)return;
  const section=document.createElement('section');section.className='ga-recent-updates';section.setAttribute('aria-labelledby','recentUpdates');section.innerHTML=`<h2 id="recentUpdates">Recent updates</h2><ul>${updates[route].map(text=>{const date=text.slice(0,10);return `<li><time datetime="${date}">${date}</time>${escapeHtml(text.slice(10))}</li>`}).join('')}</ul>`;disclosure.insertAdjacentElement('afterend',section);
}
function enhanceCopyFeedback(){const button=document.querySelector('#copyContact');if(!button||document.querySelector('#copyContactFeedback'))return;const feedback=document.createElement('div');feedback.id='copyContactFeedback';feedback.className='ga-copy-feedback';feedback.hidden=true;feedback.innerHTML='<span id="copyContactStatus" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" aria-label="Dismiss copy confirmation">Dismiss</button>';button.insertAdjacentElement('afterend',feedback);button.setAttribute('aria-describedby','copyContactStatus');const status=feedback.querySelector('#copyContactStatus'),dismiss=feedback.querySelector('button');let timer;const hide=()=>{clearTimeout(timer);feedback.hidden=true;status.textContent=''};dismiss.addEventListener('click',hide);new MutationObserver(()=>{const text=button.textContent.trim();const message=text==='Copied'?'Email address copied to clipboard.':text.includes('selected')?'Email address selected. Copy it manually.':'';if(!message)return;clearTimeout(timer);status.textContent=message;feedback.hidden=false;timer=setTimeout(hide,5000)}).observe(button,{childList:true,subtree:true})}
function enhanceBackToTop(){
 if(document.querySelector('.ga-back-to-top'))return;
 const button=document.createElement('button');
 button.type='button';
 button.className='ga-back-to-top';
 button.setAttribute('aria-label','Back to top');
 button.textContent='↑';
 document.body.append(button);
 let ticking=false;
 const sync=()=>{const visible=window.scrollY>600;button.classList.toggle('is-visible',visible);button.hidden=!visible;ticking=false};
 window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(sync)}},{passive:true});
 sync();
 button.addEventListener('click',()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
}
function enhanceSelectionMethodology(){
 const slug=(document.body.dataset.route||'').replace(/^article\//,'');
 const selectionLogic={
  'best-wireless-earbuds-under-100':'We compared current retail pricing with published ANC, battery, comfort and codec evidence, then matched each pair to a distinct buyer priority.',
  'crowdfunding-gadgets':'We compared documented product claims, campaign materials and campaign-state evidence, then weighed each idea’s practical use case against delivery and fulfilment risk.',
  'amazon-essentials':'We compared published specifications, documented retail pricing and availability, then prioritized clear everyday utility over novelty.',
  'edc-upgrades':'We compared published specifications, carry format, everyday usefulness and documented price or availability, then weighed each upgrade against its stated limitations.',
  'audio-upgrades':'We compared published audio features, compatibility, comfort considerations and documented price or availability, then matched each pick to a distinct listening use case.',
  'edc-power-banks':'We compared published capacity, charging output, portability and documented retail availability, then weighed real carrying value against the limitations noted in the cited sources.'
 };
 if(!selectionLogic[slug]||document.querySelector('#how-we-choose'))return;
 if(document.querySelector('details.methodology,section.methodology'))return;
 const score=reviewScores[slug]?.score;
 const pros=[...document.querySelectorAll('#overallPros li')].map(item=>item.textContent.trim()).filter(Boolean);
 const cons=[...document.querySelectorAll('#overallCons li')].map(item=>item.textContent.trim()).filter(Boolean);
 const verdict=document.querySelector('#finalVerdictText')?.textContent.trim();
 const anchor=document.querySelector('.picks-box,.gu-guide-picks');
 if(!anchor||!score||!pros.length||!cons.length||!verdict)return;
 const section=document.createElement('details');
 section.className='ga-methodology';section.id='how-we-choose';
 section.innerHTML=`<summary>How we score</summary><div class="ga-methodology-details"><p><strong>Research-based review.</strong> ${escapeHtml(selectionLogic[slug])}</p><div class="ga-methodology-score"><span>Research score</span><strong>${score.toFixed(1)}<small>/10</small></strong></div><div class="ga-methodology-evidence"><div><h3>What supported the shortlist</h3><ul>${pros.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></div><div><h3>Trade-offs we kept in view</h3><ul>${cons.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></div></div><div class="ga-methodology-bottom"><p><strong>Bottom line:</strong> ${escapeHtml(verdict)}</p><a href="${navHref('assets/editorial-policy/index.html')}">Read our methodology and editorial policy <span aria-hidden="true">→</span></a></div></div>`;
 anchor.insertAdjacentElement('afterend',section);
 const toc=document.querySelector('#articleToc,.gu-toc ol');
 if(toc&&!toc.querySelector('a[href="#how-we-choose"]')){const item=document.createElement('li'),link=document.createElement('a');link.href='#how-we-choose';link.textContent='How we score';item.append(link);toc.append(item)}
}
function enhanceTables(){document.querySelectorAll('table').forEach(table=>{let wrap=table.parentElement;if(!wrap.classList.contains('ga-table-wrap')){wrap=document.createElement('div');wrap.className='ga-table-wrap';table.before(wrap);wrap.append(table)}if(table.matches('[data-sort-table],.comparison-table,.spec-table'))wrap.classList.add('ga-table-scroll');const heads=[...table.querySelectorAll('thead th')].map(th=>th.textContent.trim());table.querySelectorAll('tbody tr').forEach(row=>[...row.children].forEach((cell,i)=>{if(!cell.dataset.label&&heads[i])cell.dataset.label=heads[i]}))})}
function enhancePicksLinks(){document.querySelectorAll('.picks-box').forEach(box=>{if(box.dataset.gaPicksLinked==='true')return;box.dataset.gaPicksLinked='true';box.querySelectorAll('.pick-row').forEach((row,i)=>{const strong=row.querySelector('.pick-copy strong');if(!strong||strong.querySelector('a'))return;const n=i+1;const target=document.getElementById(`product-${n}`)?`product-${n}`:(document.getElementById(`item-${n}`)?`item-${n}`:null);if(!target)return;const anchor=document.createElement('a');anchor.href=`#${target}`;while(strong.firstChild)anchor.append(strong.firstChild);strong.append(anchor)})})}
function enhanceVideoFrames(){document.querySelectorAll('.video-frame.youtube-frame').forEach(frame=>{const iframe=frame.querySelector('iframe');if(!iframe||iframe.dataset.gaPlaceholder==='true')return;iframe.dataset.gaPlaceholder='true';frame.classList.add('ga-video-loading');const ready=()=>{frame.classList.remove('ga-video-loading');frame.classList.add('ga-video-ready')};iframe.addEventListener('load',ready,{once:true});if(iframe.src&&iframe.src!=='about:blank')iframe.addEventListener('error',()=>frame.classList.remove('ga-video-loading'),{once:true});new MutationObserver(()=>{if(iframe.hasAttribute('src'))frame.classList.add('ga-video-loading')}).observe(iframe,{attributes:true,attributeFilter:['src']})})}
function repairEvidenceCount(){document.querySelectorAll('.ga-test-receipt p').forEach(p=>{if(!p.textContent.includes('Directly linked evidence sources'))return;const strong=p.querySelector('strong');if(strong&&strong.textContent.trim()===''){const article=p.closest('.article-body,article.content')||document.querySelector('.article-body,article.content');const count=new Set([...(article?.querySelectorAll('a[href^="http"]')||[])].map(a=>a.href)).size;strong.textContent=String(count)}})}
const reviewScores={
 'amazon-essentials':{score:8.8,stars:4.4},'audio-upgrades':{score:8.7,stars:4.35},
 'edc-upgrades':{score:8.6,stars:4.3},'best-wireless-earbuds-under-100':{score:8.6,stars:4.3},
 'edc-power-banks':{score:8.5,stars:4.25},'best-smart-locks-2026':{score:8.4,stars:4.2},
 'crowdfunding-gadgets':{score:8.4,stars:4.2}
};
/* Version 1.1 research scores use half-star steps only. Each entry follows the
   article's published order and is justified by that product block's verdict
   and stated trade-offs; no unpublished category sub-scores are implied. */
const productScoresByArticle={
 'amazon-essentials':[
  {score:4.5,basis:'Listed first; the verdict calls it “the mouse to beat” for focused desk work.'},
  {score:4.5,basis:'Listed second; the verdict recommends it for laptop-heavy travel.'},
  {score:4.0,basis:'Listed third; the verdict recommends it as an easy compact Alexa option.'},
  {score:4.0,basis:'Listed fourth; the verdict favors its affordable, compact monitoring role.'},
  {score:4.0,basis:'Listed fifth; the verdict favors distraction-free reading.'}
 ],
 'audio-upgrades':[
  {score:4.5,basis:'The article’s only pick and the first model it recommends auditioning for all-round travel use.'}
 ],
 'best-edc-gadgets-under-50':[
  {score:4.5,basis:'Ranked first; the verdict calls it the best $20 EDC-lighting buy, with runtime limits noted.'},
  {score:4.5,basis:'Ranked second; the verdict calls it the most capable task light under $50.'},
  {score:4.0,basis:'Ranked third; the verdict calls it the most tool-per-dollar, with clear capability limits.'},
  {score:4.0,basis:'Ranked fourth; the verdict calls it the default first multitool, offset by travel limits.'},
  {score:3.5,basis:'Ranked fifth; the verdict favors its low cost and low bulk, with limited leverage noted.'}
 ],
 'best-kickstarter-gadgets-september-2026':[
  {score:4.5,basis:'Ranked first; the verdict calls it the group’s strongest creator-desk concept.'},
  {score:4.0,basis:'Ranked second; the camera concept is strong, but regulatory risk lowers the judgment.'},
  {score:4.0,basis:'Ranked third; the no-subscription idea stands out, while comfort and retail terms remain unproven.'},
  {score:3.5,basis:'Ranked fourth; the local-AI idea is strong, but compatibility limits still need proof.'},
  {score:3.5,basis:'Ranked fifth; the verdict recommends it only for specific desk or travel charging needs.'},
  {score:3.5,basis:'Ranked sixth; the verdict favors judging the retail product rather than campaign hype.'}
 ],
 'best-smart-locks-2026':[
  {score:4.5,basis:'Ranked first; the verdict names it the most futuristic choice, with cost and door-fit limits.'},
  {score:4.0,basis:'Ranked second; the verdict calls it the most convincing hands-free deadbolt if pricing holds.'},
  {score:4.0,basis:'Ranked third; the verdict favors its standards stack but notes no biometric entry.'},
  {score:4.0,basis:'Ranked fourth; the verdict names it the smart-money biometric pick, with ecosystem limits.'},
  {score:3.5,basis:'Ranked fifth; the verdict favors hands-off power, with platform limits noted.'}
 ],
 'best-wireless-earbuds-under-100':[
  {score:4.5,basis:'Ranked first and named the default recommendation after balancing features, ANC and price.'},
  {score:4.5,basis:'Ranked second; the verdict finds the most hardware for the money, with device caveats.'},
  {score:4.0,basis:'Ranked third; the verdict favors design and tuning but notes missing wireless charging.'},
  {score:3.5,basis:'Ranked fourth; the verdict favors comfort and controls over ANC.'},
  {score:3.0,basis:'Ranked fifth; the verdict treats it as a budget route to ANC and recommends stretching upward if possible.'}
 ],
 'crowdfunding-gadgets':[
  {score:4.0,basis:'Ranked first; the verdict favors its distinctive design while warning about delivery timing.'},
  {score:4.0,basis:'Ranked second; the verdict favors its charging visibility for a specialist audience.'},
  {score:3.5,basis:'Ranked third; the verdict favors its tactile niche rather than broad utility.'},
  {score:3.0,basis:'Ranked fourth; the verdict limits it to light, portable engraving work.'}
 ],
 'edc-power-banks':[
  {score:4.5,basis:'Ranked first; the verdict favors its slim one-phone-charge role.'},
  {score:4.5,basis:'Ranked second; the verdict calls it the default magnetic iPhone choice.'},
  {score:4.0,basis:'Ranked third; the verdict calls it the best all-in-one travel battery for laptops.'},
  {score:3.0,basis:'Ranked fourth; the verdict highlights maximum capacity but warns against near-term travel use.'}
 ],
 'edc-upgrades':[
  {score:4.5,basis:'Ranked first; the verdict calls it the cheapest meaningful pocket upgrade.'},
  {score:4.5,basis:'Ranked second; the verdict recommends it for everyday fixes without full multitool bulk.'},
  {score:4.0,basis:'Ranked third; the verdict says its output earns the pocket space.'}
 ]
};
const officialVideos={
 'logitech mx master 3s':'3-FpSsIbPis',
 'anker prime 27,650mah':'zoSZA0nNv0k',
 'amazon echo pop':'JTIO7rKxicI',
 'tp-link tapo c120':'5sPVa_NGPR0',
 'sony wh-1000xm5':'v6EjmbMgv80',
 'wuben e2 pulse':'Y8gExKsOIEU',
 'olight oclip 2 pro':'rHVXnflsglY',
 'oknife mk':'Cq_ta0B9aX4',
 'leatherman micra':'WWYyAcmaNdU',
 'nite ize doohickey':'LTD9VPJz570',
 'ysmart toolt — “the key-fob toolkit”':'I2cQAWzhQR4',
 'metmo pocket grip — “the pocket machinist”':'2bHDrtRtuNU',
 'lever gear toolcard pro — “the wallet backup”':'pFlTyhD1vwk',
 'kondor blue edc multi-tool v2 — “the camera-rig specialist”':'inSmrtV5DWU',
 'klarus horizon mt07 — “the full-size value”':'MZQz7WV-Eec',
 'violoop — the ai pc agent with a kill switch':'g8oigCiHo64',
 'camscanner apex 1 pro — the scanner that doesn\'t need a computer':'fYhRAWcc1L4',
 'creality sparkx i8 — multi-color printing without the purge tax':'gqizFAJbZx4',
 'viaim rise — earbuds that take notes for you':'zfAFJOf7pNk',
 'podcast in a box — the studio is already in your pocket':'Tv3RhgwHihY',
 'spark ring — the one we\'re watching, not backing (yet)':'i1NMGrV9Dj0',
 'pexarbolt ultra':'njJtJRytSJs',
 'hoverair versa':'eWNhu7JzLRM',
 'sond dreambuds':'1196118328',
 'ugreen homeagent':'fB8rQY3Kiro',
 'snapmaker u1':'wVU6QUZ-61E',
 'switchbot lock ultra max vision pro combo':'pX5xFTSAgXk',
 'switchbot lock vision pro':'_IVU0cobhfE',
 'desloc v150 plus':'63oNL-hQ-kc',
 'soundcore liberty 4 nc':'Z3FvEPS5sfw',
 'earfun air pro 4':'xIP-O1uM1lo',
 'nothing ear (a)':'reUB7bT8chc',
 'sony wf-c510':'En7bLOQaDZM',
 'jlab go pop anc':'6pJVizZbbHY',
 'ringconn gen 3 — “the ring that buzzes”':'iwBBwpRs-PY',
 'ultrahuman ring air — “the graduate”':'tfN2Z-2Nm9A',
 'even realities r1 — “the glasses\' sidekick”':'yZrcgiKFOD0',
 'spark ring — “the risky one”':'i1NMGrV9Dj0',
 'circular ring 3 slim — “the payments bet”':'MQR1M2B_j3s',
 'nitecore nw5000 magnetic wireless power bank':'aG9JqcJSWIY',
 'ugreen nexode 25000mah 200w power bank':'CUSbMoNA_A0',
 'keysmart':'d-BPMVPtL9c',
 'leatherman skeletool cx':'VUQu0ERufz8',
 'nitecore tini 3':'YpI1hq1ZhcA',
 'amazon echo show 8 (3rd gen) — “step one: the brain”':'wKMOI5tuumI',
 'tp-link tapo p125m — “step two: your first automation”':'Tx7i0R3Se7I',
 'aqara fp400 — “step five: automations that actually work”':'5cKvgdl_ZPw',
 'google nest thermostat — “the one that pays for itself”':'20367DapHlc',
 'august wi-fi smart lock (4th generation) — “the subscription-free lock”':'RjS9nPA1oiI',
 'ring battery doorbell (newest model) — “the package-thief tax”':'98w_b-HoClg',
 'hatch sleep clock — the one that watches your sleep without touching you':'nTpvMQFIB1M',
 'soundcore sleep a30 — the anc sleep earbud that became the reference':'KBNDckehs6A',
 'ozlo sleepbuds 2 — the premium passive pick, from the bose sleepbuds heirs':'vWsVD3RrLto',
 'qalo sl-1 smart band — the subscription-free tracker that undercuts oura':'qJ63X0TTmq8',
 'oura ring 5 — the contrast anchor: the best tracker that charges rent':'8C8dC9yQ7m8',
 'sleepphones wireless — the $99.95 budget pick that isn\'t a compromise':'O9GIJHpQ3Go'
};
function starSpans(value,className='ga-mini-star'){return Array.from({length:5},(_,index)=>`<span class="${className}" style="--fill:${Math.max(0,Math.min(1,value-index))*100}%">★</span>`).join('')}
function fillExistingStars(scope=document){scope.querySelectorAll('.stars[aria-label],#scoreStars[aria-label]').forEach(group=>{const match=group.getAttribute('aria-label')?.match(/([0-5](?:\.\d+)?)\s*(?:out of\s*(?:five|5)|\/\s*5)/i);if(!match)return;const value=Number(match[1]);group.querySelectorAll('.star').forEach((star,index)=>star.style.setProperty('--fill',`${Math.max(0,Math.min(1,value-index))*100}%`))})}
function enhanceReviewCards(scope=document){scope.querySelectorAll('a.card,a.article-tile,a.ga-card,a.latest-item,a.feature-card,a.side-card').forEach(card=>{if(card.querySelector(':scope .ga-card-rating'))return;let slug='';try{slug=new URL(card.href,location.href).pathname.replace(/\/index\.html$/,'').split('/').filter(Boolean).pop()||''}catch{return}const rating=reviewScores[slug];if(!rating)return;const row=document.createElement('span');row.className='ga-card-rating is-research';row.setAttribute('aria-label',`${T('Research-based editorial score')} ${rating.score} ${T('out of 10')}, ${rating.stars} ${T('out of 5 stars')}; ${T('not a hands-on lab-test result')}`);row.innerHTML=`<small>Research-based editorial score</small><strong>${rating.score}</strong><span class="ga-mini-stars" aria-hidden="true">${starSpans(rating.stars)}</span>`;const target=card.querySelector('.card-body,.tile-copy,.latest-item-copy,.feature-copy,.side-copy')||card;const meta=target.querySelector(':scope > .meta,:scope > .ga-meta,:scope > .feature-cta');if(meta)target.insertBefore(row,meta);else target.append(row)});fillExistingStars(scope)}
function normalizeDealStatuses(scope=document){
 scope.querySelectorAll('[data-affiliate-placeholder="pending"],.deal-status-line,.deal-empty-state,.classification-pending,.ga-tracking,.ga-deal-audit,.ga-price-chart').forEach(node=>node.remove());
 scope.querySelectorAll('.deal-box').forEach(box=>{box.dataset.gaDealNormalized='true';box.querySelectorAll('.deal-note,.deal-offer>p').forEach(node=>node.remove());if(!box.querySelector('a[href],.deal-price,[data-usd]'))box.remove()});
}
function normalizeProductName(text){return String(text||'').replace(/^\s*\d+\.\s*/,'').trim()}
function currentArticleSlug(){const path=location.pathname.replace(/\/+$/,'').replace(/\/index\.html$/,'');return path.split('/assets/')[1]?.split('/').filter(Boolean)[0]||''}
function findProductScore(name,index,slug=currentArticleSlug()){
 const entries=productScoresByArticle[slug],item=entries?.[index];
 return item&&typeof item.score==='number'?item:null;
}
function productRatingMarkup(name,index,slug=currentArticleSlug()){
 const item=findProductScore(name,index,slug),methodURL=link('assets/how-we-rate/index.html#score-types');
 if(!item)return `<div class="ga-product-score is-research is-unscored" role="group" aria-label="${T('Not scored')}"><strong>${T('Not scored')}</strong><small>${T('No honest differentiating basis is stated in this article.')} <a href="${methodURL}">${T('How scoring works')}</a></small></div>`;
 return `<div class="ga-product-score is-research" role="group" aria-label="${T('Research-based editorial score')} ${item.score.toFixed(1)} ${T('out of 5')}"><span class="ga-product-score-stars" aria-hidden="true">${starSpans(item.score,'ga-product-score-star')}</span><span class="ga-product-score-value"><strong>${item.score.toFixed(1)}/5</strong><b>${T('Research-based editorial score')}</b></span><small>${item.basis} ${T('Editorial judgment from research — not a hands-on lab-test result.')} <a href="${methodURL}">${T('Methodology')}</a></small></div>`
}
function ensureOfficialProductMedia(product,name){if(product.querySelector('.product-video,.ga-official-video'))return;const key=normalizeProductName(name).toLocaleLowerCase('en-US'),id=officialVideos[key];const copy=product.querySelector('.product-copy,.gu-product-copy')||product;const verdict=copy.querySelector('.product-verdict-box,.gu-one-line');const section=document.createElement('section');section.className=`product-video${id?'':' product-video-unavailable'}`;if(id){section.setAttribute('aria-label',`Official product video for ${name}`);section.innerHTML=`<div class="video-head"><h3>Official product video</h3><p class="video-caption">From the brand’s official channel</p></div><div class="video-frame youtube-frame"><iframe data-src="https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&cc_load_policy=1" title="Official product video: ${escapeHtml(name)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="video-fallback" hidden><strong>Video unavailable</strong></div></div>`}else{section.setAttribute('aria-label',`Official product video unavailable for ${name}`);section.innerHTML='<div class="video-head"><h3>Official product video is unavailable.</h3><p class="video-caption">No independently verified manufacturer or campaign upload is currently available.</p></div>'}if(verdict)verdict.before(section);else copy.append(section)}
function enhanceProductCommerce(scope=document){
 const products=[...scope.querySelectorAll('.article-body .product,.gu-article-body .gu-product')];
 products.forEach((product,index)=>{const heading=product.querySelector('.product-copy>h2,.gu-product-copy>h2,.gu-product-head h2,h2');if(!heading)return;const productName=normalizeProductName(heading.dataset.gaProductName||heading.textContent);if(!productName)return;heading.dataset.gaProductName=productName;heading.textContent=`${index+1}. ${productName}`;
  product.querySelectorAll('button.gu-check-price,a.ga-amazon-search,[data-affiliate-placeholder="pending"],.deal-status-line,.deal-empty-state').forEach(node=>node.remove());
  let rating=product.querySelector('.ga-product-score,.gu-product-rating');if(!rating){rating=document.createElement('div');rating.innerHTML=productRatingMarkup(productName,index);rating=rating.firstElementChild;const anchor=product.querySelector('.verdict,.gu-product-verdict')||heading;anchor.insertAdjacentElement('afterend',rating)}else{rating.outerHTML=productRatingMarkup(productName,index)}
  ensureOfficialProductMedia(product,productName);
 });
}
function normalizeArticleNumbering(){
 const products=[...document.querySelectorAll('.article-body .product,.gu-article-body .gu-product')];
 if(!products.length)return;
 products.forEach((product,index)=>{
  product.querySelectorAll('.product-media>.number,.gu-product-media>.gu-num,.gu-product-head>.gu-num').forEach(badge=>badge.remove());
  const heading=product.querySelector('.product-copy>h2,.gu-product-copy>h2,.gu-product-head h2,h2');
  if(!heading)return;
  const productName=(heading.dataset.gaProductName||heading.textContent).replace(/^\s*\d+\.\s*/,'').trim();
  heading.dataset.gaProductName=productName;
  const numberedName=`${index+1}. ${productName}`;
  if(heading.textContent!==numberedName)heading.textContent=numberedName;
 });
 document.querySelectorAll('.pick-row').forEach(row=>{
  if(!row.querySelector('.pick-index'))return;
  const name=row.querySelector('.pick-copy strong,strong');
  if(name){const cleanName=name.textContent.replace(/^\s*\d+\.\s*/,'').trim();if(name.textContent!==cleanName)name.textContent=cleanName;}
 });
 const toc=document.querySelector('#articleToc,.sidebar>ol,.gu-toc>ol');
 if(!toc)return;
 const links=[...toc.querySelectorAll('a[href]')];
 const productLinks=new Map();
 const sectionLinks=[];
 links.forEach(anchor=>{
  let hash='';
  try{hash=new URL(anchor.getAttribute('href'),location.href).hash}catch{}
  const match=hash.match(/^#(?:product|item)-(\d+)$/);
  if(match)productLinks.set(Number(match[1]),anchor);
  else sectionLinks.push(anchor);
 });
 const desired=products.map((product,index)=>{
  const number=index+1;
  const heading=product.querySelector('.product-copy>h2,.gu-product-copy>h2,.gu-product-head h2,h2');
  const productName=(heading?.dataset.gaProductName||heading?.textContent||`Product ${number}`).replace(/^\s*\d+\.\s*/,'').trim();
  const original=productLinks.get(number);
  return {href:`#${product.id||`product-${number}`}`,name:original?.textContent.replace(/^\s*\d+\.\s*/,'').trim()||productName};
 });
 const current=links.map(anchor=>({href:new URL(anchor.getAttribute('href'),location.href).hash,name:anchor.textContent.replace(/^\s*\d+\.\s*/,'').trim()}));
 const matches=current.length===desired.length&&current.every((entry,index)=>entry.href===desired[index].href&&entry.name===desired[index].name);
 if(!matches){
  toc.innerHTML='';
  desired.forEach(entry=>{const item=document.createElement('li');const anchor=document.createElement('a');anchor.href=entry.href;anchor.textContent=entry.name;item.append(anchor);toc.append(item)});
 }
 toc.dataset.gaNumberingNormalized='true';
 if(sectionLinks.length&&!toc.parentElement.querySelector('[data-ga-toc-sections]')){
  const sections=document.createElement('nav');
  sections.className='ga-toc-sections';
  sections.dataset.gaTocSections='true';
  sections.setAttribute('aria-label','Other review sections');
  sectionLinks.forEach(original=>{const anchor=document.createElement('a');anchor.href=original.getAttribute('href');anchor.innerHTML=original.innerHTML;sections.append(anchor)});
  toc.insertAdjacentElement('afterend',sections);
 }
}
function watchReviewCards(){let queued=false;const observer=new MutationObserver(records=>{if(queued||!records.some(record=>record.addedNodes.length))return;queued=true;requestAnimationFrame(()=>{queued=false;enhanceReviewCards();normalizeDealStatuses();enhanceProductCommerce();normalizeArticleNumbering()})});observer.observe(document.body,{childList:true,subtree:true})}
function enhanceEvergreenGuides(){
 const slug=(location.pathname.match(/\/assets\/([^/]+)\//)||[])[1];
 const guides={
  'desk-setup-upgrades':[
   {name:'Logitech MX Master 3S',image:'mx-master.webp',alt:'Logitech MX Master 3S productivity mouse',verdict:'Best for focused desk work',summary:'A sculpted productivity mouse with precise scrolling and multi-device switching for long work sessions.',specs:'Right-handed ergonomic shape · Electromagnetic scroll wheel · Multi-device switching',price:'$79.99',usd:79.99,deal:{label:'Price last verified 2026-10-07',retailer:'Best Buy',badge:'20% OFF',price:'$79.99',comparison:'Comp. Value $99.99 · Save $20 · 20% off',availability:'Sold by Best Buy direct · In stock · Get it Tomorrow · Pickup: Ready Today · Deal ends in about 22 hours',note:'Verified live 2026-10-07 at Best Buy: $79.99, Save $20 against a $99.99 Comp. Value (20% off), sold by Best Buy direct and in stock. Shipping shows “Get it Tomorrow”; pickup shows “Ready Today.” The observed live countdown indicated about 22 hours remaining.'}}, 
   {name:'Anker Prime 27,650mAh',image:'anker-prime.webp',alt:'Anker Prime 27,650mAh power bank with display',verdict:'Best for laptop power away from the outlet',summary:'A high-capacity battery for keeping a laptop, phone and accessories moving between desks.',specs:'27,650mAh · Laptop-class output · Onboard charging display',price:'Price not verified'},
   {name:'MOVESPEED ClariWatt Duo',image:'clariwatt-duo.webp',alt:'MOVESPEED ClariWatt Duo USB-C cable with power display',verdict:'Best for seeing what a USB-C port is doing',summary:'A USB-C cable concept with a built-in display for live charging information.',specs:'USB-C · Live power display · Crowdfunding product',price:'Campaign pricing varies'},
   {name:'TP-Link Tapo C120',image:'tapo-c120.webp',alt:'TP-Link Tapo C120 compact indoor security camera',verdict:'Best compact camera for a home workspace',summary:'A compact indoor camera for checking a workspace remotely, with the privacy trade-offs that connected cameras require.',specs:'Compact indoor camera · App control · Local-storage support',price:'$39.99',usd:39.99}
  ],
  'everyday-carry-essentials':[
   {name:'KeySmart',image:'keysmart.webp',alt:'KeySmart compact key organizer',verdict:'Best for taming a noisy keyring',summary:'A compact organizer that stacks compatible keys into a cleaner, quieter package.',specs:'Expandable key stack · Compact format · Accessory loop',price:'Price not verified'},
   {name:'Leatherman Skeletool CX',image:'leatherman.webp',alt:'Leatherman Skeletool CX lightweight multitool',verdict:'Best lightweight multitool',summary:'A stripped-back multitool centered on the functions people reach for most.',specs:'Pliers · Locking blade · Bit driver · Pocket clip',price:'Price not verified'},
   {name:'Nitecore TINI 2',image:'nitecore.webp',alt:'Nitecore TINI 2 compact keychain flashlight',verdict:'Best keychain light',summary:'A tiny rechargeable flashlight that gives you a proper beam without using your phone battery.',specs:'Keychain format · USB-C charging · Multiple brightness levels',price:'Price not verified'},
   {name:'Nitecore NW5000',image:'nitecore-nw5000.webp',alt:'Nitecore NW5000 magnetic wireless power bank',verdict:'Best slim magnetic power bank',summary:'A carbon-fiber magnetic battery designed to add useful phone power without taking over a pocket.',specs:'5,000mAh · Magnetic wireless charging · USB-C',price:'Price not verified'}
  ],
  'smart-home-devices':[
   {name:'Amazon Echo Pop',image:'echo-pop.webp',alt:'Amazon Echo Pop smart speakers in several colors',verdict:'Best simple voice-control starting point',summary:'A compact smart speaker for timers, music, reminders and basic home routines.',specs:'Compact speaker · Alexa voice control · Physical microphone-off control',price:'$39.99 list · $24.99 sale (Oct 7, 2026)',usd:24.99},
   {name:'TP-Link Tapo C120',image:'tapo-c120.webp',alt:'TP-Link Tapo C120 compact indoor security camera',verdict:'Best compact indoor camera',summary:'A small indoor camera with local-storage support and app-based monitoring.',specs:'Indoor camera · Local-storage option · App alerts',price:'$39.99 list · ~$32 sale (Oct 7, 2026)',usd:32},
   {name:'Lockin V7 Max',image:'smart-locks-2026/lockin-v7-max.webp',alt:'Lockin V7 Max smart mortise lock',verdict:'Best ambitious all-in-one smart-lock concept (still unreleased)',summary:'A mortise-format lock combining biometric entry, video-doorbell hardware and an indoor optical charging base.',specs:'Mortise format · Finger-vein, palm-vein and 3D face recognition · Matter compatibility',price:'Price not announced'},
   {name:'Ultraloq Bolt Mission UWB',image:'smart-locks-2026/ultraloq-bolt-mission.webp',alt:'Ultraloq Bolt Mission UWB smart deadbolt with keypad and approach unlock',verdict:'Best hands-free deadbolt you can buy today',summary:'A standard-deadbolt smart lock that unlocks as your phone approaches — no hub, no keypad code, no digging for keys.',specs:'Deadbolt · Ultra-wideband approach unlock · PIN, Android NFC, key fob, Apple Watch, mechanical key · Matter over Thread',price:'$299.99',usd:299.99}
  ],
  'travel-gadgets':[
   {name:'Anker Prime 27,650mAh',image:'anker-prime.webp',alt:'Anker Prime 27,650mAh power bank with display',verdict:'Best for laptop-heavy travel',summary:'A high-capacity power bank for trips where a laptop and several smaller devices share one battery.',specs:'27,650mAh · Laptop-class output · Onboard charging display',price:'Price not verified'},
   {name:'UGREEN Nexode 25,000mAh',image:'ugreen-nexode-25000.webp',alt:'UGREEN Nexode 25,000mAh power bank',verdict:'Best high-output travel value',summary:'A 200W-class battery with enough capacity for demanding mobile gear and a clear status display.',specs:'25,000mAh · Up to 200W total output · Color display',price:'$89.99',usd:89.99},
   {name:'Sony WH-1000XM5',image:'sony-xm5.webp',alt:'Sony WH-1000XM5 noise-cancelling headphones',verdict:'Best for long noise-heavy journeys',summary:'Over-ear noise cancelling that prioritizes comfort and steady low-frequency noise reduction.',specs:'Over-ear ANC · Multipoint Bluetooth · Carry case',price:'$298.00',usd:298},
   {name:'Soundcore Liberty 4 NC',image:'earbuds-soundcore.webp',alt:'Soundcore Liberty 4 NC wireless earbuds and case',verdict:'Best compact noise-cancelling option',summary:'Compact true-wireless earbuds with active noise cancellation and a travel-friendly charging case.',specs:'True wireless · Active noise cancellation · Charging case',price:'$79.99',usd:79.99}
  ]
 };
 const products=guides[slug],body=document.querySelector('.gu-article-body');if(!products||!body)return;
 const imageDimensions={'anker-prime.webp':[1053,768],'clariwatt-duo.webp':[1552,873],'earbuds-soundcore.webp':[800,800],'echo-pop.webp':[1600,900],'keysmart.webp':[1600,986],'leatherman.webp':[600,600],'mx-master.webp':[1920,1920],'nitecore-nw5000.webp':[800,800],'nitecore.webp':[1074,711],'smart-locks-2026/lockin-v7-max.webp':[1600,900],'smart-locks-2026/ultraloq-bolt-mission.webp':[1106,1106],'smart-locks-2026/ultraloq-bolt-sense.webp':[1600,899],'sony-xm5.webp':[1074,711],'tapo-c120.webp':[1200,875],'ugreen-nexode-25000.webp':[1080,1080]};
 const sections=[...body.querySelectorAll(':scope > .gu-product')];sections.slice(products.length).forEach(section=>section.remove());
 const rating=(name,index)=>productRatingMarkup(name,index,slug);
 products.forEach((product,index)=>{let section=sections[index];if(!section){section=document.createElement('section');section.className='gu-product';body.insertBefore(section,body.querySelector('.gu-ending,.gu-disclosure'))}section.id=`item-${index+1}`;const priceAttr=product.usd?` data-usd="${product.usd}"`:'';const imageSize=imageDimensions[product.image];const dealMarkup=product.deal?`<section class="deal-box" aria-label="Current retailer deal for ${escapeHtml(product.name)}"><div class="deal-verified">${escapeHtml(product.deal.label)}</div><div class="deal-offers"><div class="deal-offer"><div class="deal-retailer"><span>${escapeHtml(product.deal.retailer)}</span><span class="deal-tag">${escapeHtml(product.deal.badge)}</span></div><div class="deal-price"><span data-usd="${product.usd}">${escapeHtml(product.deal.price)}</span><span class="deal-list">${escapeHtml(product.deal.comparison)}</span></div><p>${escapeHtml(product.deal.availability)}</p></div></div><p class="deal-note">${escapeHtml(product.deal.note)}</p></section>`:'';section.innerHTML=`<figure class="gu-product-media"><span class="gu-num">${String(index+1).padStart(2,'0')}</span><img src="${new URL(product.image,assetRoot).href}" alt="${escapeHtml(product.alt)}" loading="lazy" decoding="async" width="${imageSize[0]}" height="${imageSize[1]}"></figure><div class="gu-product-copy"><p class="gu-product-kicker">Pick ${index+1}</p><h2>${escapeHtml(product.name)}</h2><p class="gu-product-verdict">${escapeHtml(product.verdict)}</p>${rating(product.name,index)}<p>${escapeHtml(product.summary)}</p><dl class="gu-product-specs"><div><dt>Key specs</dt><dd>${escapeHtml(product.specs)}</dd></div><div><dt>Price snapshot</dt><dd${priceAttr}>${escapeHtml(product.price)}</dd></div></dl><div class="gu-proscons"><div><strong>Why it stands out</strong><p>${escapeHtml(index%2===0?'Focused features and a format suited to the job, without unnecessary bulk.':'A practical fit for its use case with clear hardware trade-offs.')}</p></div><div><strong>Watch for</strong><p>${escapeHtml(product.price.includes('not')||product.price.includes('varies')?'Retail pricing or availability was not verified for this guide.':'Price and availability can change; compare the final retailer listing before buying.')}</p></div></div><p class="gu-one-line"><strong>One-line verdict:</strong> ${escapeHtml(product.verdict)}.</p>${dealMarkup}</div>`});
 body.querySelector('.gu-guide-picks')?.remove();body.querySelector('.gu-comparison')?.remove();
 const anchor=body.querySelector('.gu-verdict');if(anchor){const picks=document.createElement('section');picks.className='gu-guide-picks picks-box';picks.innerHTML=`<div class="picks-head"><div><p class="gu-product-kicker">Shortlist</p><h2>Our picks</h2></div><p>Four products matched to distinct jobs</p></div><div class="picks-list">${products.map((p,i)=>`<a class="pick-row" href="#item-${i+1}"><span class="pick-index">${i+1}</span><span class="pick-copy"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.verdict)}</span></span><span class="gu-pick-price"${p.usd?` data-usd="${p.usd}"`:''}>${escapeHtml(p.price)}</span></a>`).join('')}</div>`;anchor.insertAdjacentElement('afterend',picks);const compare=document.createElement('section');compare.className='gu-comparison';compare.innerHTML=`<h2>Compare the shortlist</h2><table class="comparison-table"><thead><tr><th>Product</th><th>Best for</th><th>Price snapshot</th><th>Rating</th></tr></thead><tbody>${products.map((p,i)=>{const item=findProductScore(p.name,i,slug);return `<tr><td><a href="#item-${i+1}">${escapeHtml(p.name)}</a></td><td>${escapeHtml(p.verdict)}</td><td${p.usd?` data-usd="${p.usd}"`:''}>${escapeHtml(p.price)}</td><td>${item?`${item.score.toFixed(1)}/5`:'Not scored'}</td></tr>`}).join('')}</tbody></table>`;picks.insertAdjacentElement('afterend',compare)}
 const toc=document.querySelector('.gu-toc ol');if(toc){const productLinks=products.map((p,i)=>`<li><a href="#item-${i+1}">${i+1}. ${escapeHtml(p.name)}</a></li>`).join('');toc.innerHTML=slug==='travel-gadgets'?`<li><a href="#comparison">Compare the picks</a></li>${productLinks}<li><a href="#faq">FAQ</a></li>`:productLinks;}
}
function enhanceMobileToc(){const mq=matchMedia('(max-width:768px)');document.querySelectorAll('aside.sidebar').forEach(sidebar=>{const heading=sidebar.querySelector(':scope > h3');if(!heading||heading.dataset.tocReady)return;heading.dataset.tocReady='true';const btn=document.createElement('button');btn.type='button';btn.className='ga-toc-toggle';btn.setAttribute('aria-expanded','false');const label=document.createElement('span');label.className='ga-toc-toggle-label';const chev=document.createElement('span');chev.className='ga-toc-chevron';chev.setAttribute('aria-hidden','true');btn.append(label,chev);
let active=false;const toButton=()=>{if(active)return;while(heading.firstChild)label.append(heading.firstChild);heading.replaceWith(btn);sidebar.setAttribute('data-toc-collapsed','true');btn.setAttribute('aria-expanded','false');active=true};const toHeading=()=>{if(!active)return;while(label.firstChild)heading.append(label.firstChild);btn.replaceWith(heading);sidebar.removeAttribute('data-toc-collapsed');active=false};btn.addEventListener('click',()=>{const collapsed=sidebar.hasAttribute('data-toc-collapsed');if(collapsed){sidebar.removeAttribute('data-toc-collapsed');btn.setAttribute('aria-expanded','true')}else{sidebar.setAttribute('data-toc-collapsed','true');btn.setAttribute('aria-expanded','false')}});mq.addEventListener?.('change',()=>{mq.matches?toButton():toHeading()});if(mq.matches)toButton()})}
function neutralizeNetlifyBadge(){const badge=document.querySelector('#nl-badge-frame');if(!badge)return false;badge.setAttribute('tabindex','-1');badge.setAttribute('aria-hidden','true');return true}
function ensureSkipLink(){const main=document.querySelector('main');if(main&&!main.id)main.id='content';if(document.querySelector('.ga-skip-link,.skip-link'))return;const skip=document.createElement('a');skip.className='ga-skip-link';skip.href='#content';skip.textContent='Skip to main content';document.body.insertBefore(skip,document.body.firstChild)}
function init(){neutralizeNetlifyBadge();ensureSkipLink();const header=document.querySelector('header.ua-header,header.ga-site-header,body>header');if(header){header.className='ga-site-header';header.id='gaSiteHeader';header.innerHTML=headerMarkup}initCookieNotice();const mobileViewport=matchMedia('(max-width:900px)');document.body.classList.add('ga-shell-ready');const panel=document.querySelector('#gaNavPanel');const syncMobileVisibility=()=>{if(!panel)return;const concealed=mobileViewport.matches&&!panel.classList.contains('is-open');panel.inert=concealed;panel.toggleAttribute('hidden',concealed);if(concealed)panel.setAttribute('aria-hidden','true');else panel.removeAttribute('aria-hidden')};mobileViewport.addEventListener?.('change',syncMobileVisibility);syncMobileVisibility();const footer=document.querySelector('footer');if(footer){footer.className='ga-site-footer';footer.innerHTML=footerMarkup}setTheme();streamlineArticles();repairBreadcrumbHomes();enhanceSearchClear();const menu=document.querySelector('#gaMenu');const closeMobile=()=>{panel?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');document.body.style.overflow='';syncMobileVisibility();closeMenus()};menu?.addEventListener('click',()=>{const open=!panel.classList.contains('is-open');closeMenus();panel.classList.toggle('is-open',open);document.body.style.overflow=open?'hidden':'';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');syncMobileVisibility()});const desktopHover=matchMedia('(hover:hover) and (pointer:fine) and (min-width:901px)');const hoverSuppressedGroups=new Set();document.querySelectorAll('.ga-menu-group').forEach(group=>{const toggle=group.querySelector(':scope > .ga-nav-toggle');group.addEventListener('pointerenter',()=>{if(!desktopHover.matches||hoverSuppressedGroups.has(group))return;closeMenus(group);group.classList.add('is-hovered');toggle?.setAttribute('aria-expanded','true')});group.addEventListener('pointerleave',()=>{if(!desktopHover.matches)return;hoverSuppressedGroups.delete(group);group.classList.remove('is-hover-suppressed','is-hovered');if(!group.classList.contains('is-open'))toggle?.setAttribute('aria-expanded','false')})});let lastMenuTrigger=null;
document.querySelectorAll('.ga-nav-toggle,.ga-sub-toggle').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const group=button.parentElement,opening=!group.classList.contains('is-open');closeMenus(group);hoverSuppressedGroups.delete(group);group.classList.remove('is-hovered','is-hover-suppressed');group.classList.toggle('is-open',opening);button.setAttribute('aria-expanded',String(opening));if(opening)lastMenuTrigger=button}));
document.querySelector('.ga-primary-nav')?.addEventListener('keydown',event=>{const current=event.target.closest('a,button');if(!current)return;const group=current.closest('.ga-menu-group');if((event.key==='Enter'||event.key===' ')&&current.matches('.ga-nav-toggle,.ga-sub-toggle')){event.preventDefault();current.click();return}if(event.key==='ArrowDown'&&current.matches('.ga-nav-toggle')){event.preventDefault();if(current.getAttribute('aria-expanded')!=='true')current.click();current.parentElement.querySelector('.ga-menu-panel a,.ga-sub-toggle')?.focus();return}if(event.key==='ArrowRight'||event.key==='ArrowLeft'){const items=[...document.querySelectorAll('.ga-primary-nav>a,.ga-primary-nav>.ga-menu-group>.ga-nav-toggle')];const index=items.indexOf(current);if(index>-1){event.preventDefault();items[(index+(event.key==='ArrowRight'?1:-1)+items.length)%items.length].focus()}}if(event.key==='Tab'&&group?.classList.contains('is-open')){const focusables=[...group.querySelectorAll('a:not([hidden]),button:not([hidden])')];if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});const regionWrap=document.querySelector('.ga-region-wrap'),regionButton=document.querySelector('#gaRegion');regionButton?.addEventListener('click',event=>{event.stopPropagation();const opening=!regionWrap.classList.contains('is-open');closeMenus(regionWrap);regionWrap.classList.toggle('is-open',opening);regionButton.setAttribute('aria-expanded',String(opening))});document.querySelector('.ga-region-close')?.addEventListener('click',()=>closeMenus());document.querySelectorAll('.ga-region-toggle').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const group=button.closest('.ga-region-group'),countriesPanel=document.querySelector(`#${button.getAttribute('aria-controls')}`),opening=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(opening));group?.classList.toggle('is-open',opening);if(countriesPanel)countriesPanel.hidden=!opening}));document.querySelectorAll('.ga-country-button').forEach(button=>button.addEventListener('click',()=>{setCountry(button.dataset.country);closeMenus()}));document.querySelector('#gaMobileCountry')?.addEventListener('change',event=>setCountry(event.target.value));document.querySelector('#gaTheme')?.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';setTheme();commitPreferences()});document.addEventListener('click',event=>{if(!event.target.closest('.ga-menu-group,.ga-region-wrap'))closeMenus()});window.addEventListener('keydown',event=>{if(event.key!=='Escape')return;document.querySelectorAll('.ga-menu-group.is-open,.ga-menu-group.is-hovered').forEach(group=>{hoverSuppressedGroups.add(group);group.classList.add('is-hover-suppressed')});document.querySelectorAll('.ga-menu-group').forEach(group=>{group.classList.remove('is-open','is-hovered');group.querySelector(':scope > .ga-nav-toggle')?.setAttribute('aria-expanded','false')});document.querySelectorAll('.ga-subgroup.is-open').forEach(group=>{group.classList.remove('is-open');group.querySelector(':scope > .ga-sub-toggle')?.setAttribute('aria-expanded','false')});closeMobile();(lastMenuTrigger||document.querySelector('#gaMenu'))?.focus()},{capture:true});document.querySelectorAll('.ga-primary-nav a').forEach(a=>a.addEventListener('click',closeMobile));document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;try{const u=resolveInternalAnchor(a.getAttribute('href'));if(!u)return;u.searchParams.set('theme',theme);u.searchParams.set('edition',window.__GA_EDITION__||'us');u.searchParams.delete('region');u.searchParams.delete(CONSENT_STORAGE_KEY);a.href=u.href}catch{}},true);const current=location.pathname.replace(/\/$/,'/index.html');document.querySelectorAll('.ga-primary-nav>a').forEach(a=>{const path=new URL(a.href).pathname.replace(/\/$/,'/index.html');if(path===current)a.setAttribute('aria-current','page')});syncPreferenceLinks();setTimeout(syncPreferenceLinks,0);window.addEventListener('pageshow',refreshConsentState);window.addEventListener('popstate',refreshConsentState);const nativePushState=history.pushState.bind(history);history.pushState=(...args)=>{const result=nativePushState(...args);queueMicrotask(refreshConsentState);return result};let preferenceSyncQueued=false;new MutationObserver(records=>{if(preferenceSyncQueued||!records.some(record=>record.addedNodes.length))return;preferenceSyncQueued=true;requestAnimationFrame(()=>{preferenceSyncQueued=false;refreshConsentState()})}).observe(document.body,{childList:true,subtree:true});enhanceEvergreenGuides();enhanceTables();enhancePicksLinks();enhanceVideoFrames();repairEvidenceCount();enhanceNarration();enhanceMobileToc();enhanceRecentUpdates();enhanceSelectionMethodology();enhanceCopyFeedback();enhanceBackToTop();enhanceReviewCards();normalizeDealStatuses();enhanceProductCommerce();normalizeArticleNumbering();watchReviewCards();const finalizeArticleNumbering=()=>{enhanceProductCommerce();normalizeArticleNumbering()};requestAnimationFrame(finalizeArticleNumbering);setTimeout(finalizeArticleNumbering,250);window.addEventListener('load',finalizeArticleNumbering,{once:true});commitPreferences();convertPrices();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else init();
})();
(()=>{
'use strict';
if(window.__gaUpgrade)return;window.__gaUpgrade=true;
const scriptUrl=new URL(document.currentScript.src,document.baseURI),assetRoot=new URL('./',scriptUrl),siteRoot=new URL('../',assetRoot);
const href=path=>new URL(path,siteRoot).href;
const articles=[
['The 5 smart locks actually worth buying in 2026','Smart Home · Best picks','assets/best-smart-locks-2026/index.html','Palm-vein and 3D face unlock, Matter support, battery claims and the trade-offs.','smart lock door security palm vein face matter thread lockin ultraloq switchbot desloc'],
['5 wireless earbuds under $100 that punch above their price','Audio · Best picks','assets/best-wireless-earbuds-under-100/index.html','ANC, comfort, battery life and codec support under $100.','wireless earbuds audio anc budget soundcore sony earfun jlab nothing'],
['How to choose a power bank you can actually fly with','Power · How-to','assets/features/power-bank-airline-guide/index.html','Watt-hours, airline limits, output and battery size explained.','power bank flight plane airline travel battery charging usb c'],
['The three-tool rule for a lighter everyday carry','EDC · Guide','assets/features/edc-three-tool-rule/index.html','A practical system for reducing pocket bulk.','edc everyday carry small tools keysmart leatherman nitecore pocket'],
['7 crowdfunding red flags to check before you pledge','Crowdfunding · How-to','assets/features/crowdfunding-red-flags/index.html','Prototype proof, shipping math, certifications and creator history.','crowdfunding kickstarter risks scam pledge campaign'],
['Noise cancelling or comfort: what matters after hour three?','Audio · Face-Off','assets/features/noise-cancelling-fit-guide/index.html','How clamp, pads and travel change the buying decision.','headphones noise cancelling comfort anc sony travel fit'],
['A privacy-first checklist for adding a smart speaker','Smart Home · How-to','assets/features/smart-home-privacy-checklist/index.html','Permissions, mute controls, deletion settings and useful routines.','smart home speaker privacy voice assistant'],
['Five desk upgrades that remove friction, not space','Desk setups · Guide','assets/features/desk-setup-upgrades/index.html','Input, power and cable-flow improvements.','desk setup mouse keyboard productivity cable'],
['6 crowdfunding gadgets worth watching this month','Crowdfunding · Guide','assets/best-kickstarter-gadgets-september-2026/index.html','Six campaign products with risks and status disclosed.','crowdfunding kickstarter gadgets campaign'],
['4 crowdfunding gadgets worth watching','Crowdfunding · Guide','assets/crowdfunding-gadgets/index.html','Four unusual campaign products with delivery risk disclosed.','crowdfunding campaign ferra clariwatt'],
['4 power banks worth carrying','Power · Guide','assets/edc-power-banks/index.html','Four power formats matched to different jobs.','power bank travel laptop phone charging'],
['5 useful Amazon gadgets to compare','Buying guide · Product review','assets/amazon-essentials/index.html','Five practical gadgets for work, travel and home.','amazon gadgets desk travel home'],
['3 small tools that fix bulky pockets','EDC · Product review','assets/edc-upgrades/index.html','Compact tools that reduce everyday pocket bulk.','edc keysmart multitool flashlight'],
['The listening upgrade that matters most','Audio · Product review','assets/audio-upgrades/index.html','Fit, comfort and noise control for long listening sessions.','headphones audio comfort noise cancelling'],
['Power-bank Face-Off: four products, four jobs','Power · Face-Off','assets/face-offs/power-banks/index.html','A weighted decision framework with no fake measured winner.','power bank comparison travel laptop phone'],
['Everyday Carry Essentials You’ll Love to Carry','EDC · Evergreen guide','assets/everyday-carry-essentials/index.html','Four practical picks for quieter keys, lightweight repairs, reliable light and slim phone power.','edc everyday carry keysmart leatherman skeletool nitecore tini nw5000 power bank flashlight multi tool'],
['Desk Setup Upgrades That Are Actually Worth It','Desk setups · Evergreen guide','assets/desk-setup-upgrades/index.html','Four focused upgrades for desk control, mobile power, charging visibility and workspace monitoring.','desk setup logitech mx master anker prime clariwatt tapo c120 productivity charging camera'],
['Smart Home Devices That Make Life Easier','Smart Home · Evergreen guide','assets/smart-home-devices/index.html','Four connected picks spanning voice control, indoor monitoring and biometric entry.','smart home amazon echo pop tapo c120 lockin v7 max ultraloq bolt sense privacy camera smart lock'],
['Travel Gadgets You’ll Love to Pack','Travel · Evergreen guide','assets/travel-gadgets/index.html','Four travel-ready picks for laptop power, high-output charging and noise control.','travel anker prime ugreen nexode sony xm5 soundcore liberty power bank headphones earbuds noise cancelling'],
['Scoring rubric and evidence rules','Editorial standard','assets/how-we-rate/index.html','The five-star editorial bands and how evidence shapes each score.','rating score stars methodology evidence product review']
].map(([title,type,url,summary,tags])=>({title,type,url,summary,tags}));
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function init(){
 document.documentElement.classList.add('ga-enhanced');
 /* Root-cause fix (rAF-gated ready): the body must become visible even when
    requestAnimationFrame never fires on a hidden page. Redundant triggers. */
 const markReady=()=>document.body.classList.add('ga-page-ready');
 requestAnimationFrame(markReady);
 setTimeout(markReady,350);
 window.addEventListener('load',markReady,{once:true});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)markReady()});
 if(document.readyState==='complete')markReady();
 /* Root-cause fix (bfcache trap): Back navigation restores the page with
    ga-page-leaving still on the body -> permanently blank page. Pageshow
    always clears it. The 220ms fade-out on link click stays untouched. */
 window.addEventListener('pageshow',()=>document.body.classList.remove('ga-page-leaving'));
 initReveals();injectListingCards();initTransitions();initHeaderScroll();
}
function initHeaderScroll(){
 /* Header scroll state: the design builder owns the .scrolled CSS
    (solidify + shadow + smooth transition); this toggle is the JS side.
    Covers the homepage masthead (#gaSiteHeader) and article headers
    (.ua-header), plus documentElement/body fallbacks the CSS also targets. */
 const headers=[...document.querySelectorAll('#gaSiteHeader,.ga-site-header,.ua-header')];
 const sync=()=>{const on=window.scrollY>12;headers.forEach(h=>h.classList.toggle('scrolled',on));document.documentElement.classList.toggle('scrolled',on);if(document.body)document.body.classList.toggle('scrolled',on);};
 let ticking=false;
 window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{ticking=false;sync()})}},{passive:true});
 sync();
}
function initReveals(){
 const selector='.section-head,.signal-head,.article-header,.gu-article-header,.card,.article-tile,.ga-upgrade-card,.category,.signal-card,.score-card,.deal-card,.trust-grid article,.team-strip,.newsletter-box,.product,.gu-product,.hero img,.gu-hero,.verdict-box,.product-verdict-box,.final-verdict,.picks-box';
 const nodes=[...document.querySelectorAll(selector)];
 /* Stagger in sibling groups so grids/rows cascade: 85ms per item, capped
    after the 6th so long lists don't drag. Matches the CSS --gu-stagger. */
 const byParent=new Map();
 nodes.forEach(node=>{
  node.classList.add('ga-premium-reveal');
  const count=byParent.get(node.parentElement)||0;
  byParent.set(node.parentElement,count+1);
  node.style.setProperty('--gu-stagger',`${Math.min(count,6)*85}ms`);
 });
 const reduceMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
 if(reduceMotion||!('IntersectionObserver' in window)){
  /* Static when the user disables animation: no stagger, no motion. */
  nodes.forEach(n=>n.classList.add('ga-visible'));
  return;
 }
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('ga-visible');io.unobserve(entry.target)}}),{threshold:.3,rootMargin:'0px 0px -8px'});
 nodes.forEach(n=>io.observe(n));
 requestAnimationFrame(()=>nodes.filter(n=>n.getBoundingClientRect().top<innerHeight).forEach(n=>n.classList.add('ga-visible')));
 /* No blanket timeout fallback: revealing everything after N ms defeats
    scroll-gated animation (below-fold cards would animate before the user
    scrolls). IO + rAF + the reduced-motion/no-IO paths above cover all cases. */
}
function initTransitions(){
 document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.target||a.hasAttribute('download'))return;let u;try{u=new URL(a.href,location.href)}catch{return}if(u.origin!==location.origin||u.protocol!==location.protocol)return;if(u.pathname===location.pathname&&u.search===location.search)return;event.preventDefault();const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;if(!reduced)document.body.classList.add('ga-page-leaving');setTimeout(()=>location.href=u.href,reduced?0:220)});
}
function injectListingCards(){
 const path=location.pathname;let grid=document.querySelector('#categoryGrid');if(!grid)return;
 const defs=[
 {title:articles[15].title,type:'EDC',url:articles[15].url,summary:articles[15].summary,img:'assets/keysmart.webp',alt:'Compact key organizer for everyday carry',width:1600,height:986},
 {title:articles[16].title,type:'Guides',url:articles[16].url,summary:articles[16].summary,img:'assets/mx-master.webp',alt:'Ergonomic computer mouse on a desk',width:1920,height:1920},
 {title:articles[17].title,type:'Smart Home',url:articles[17].url,summary:articles[17].summary,img:'assets/echo-pop.webp',alt:'Compact smart speakers in several colors',width:1600,height:900},
 {title:articles[18].title,type:'Travel',url:articles[18].url,summary:articles[18].summary,img:'assets/power-banks-hero.webp',alt:'Portable power banks arranged for comparison',width:1600,height:900}
 ];
 const wanted=path.includes('/edc/')?[defs[0]]:path.includes('/smart-home/')?[defs[2]]:path.includes('/all-reviews/')?defs:[];
 wanted.reverse().forEach(d=>{if(grid.querySelector(`[href*="${d.url.split('/')[1]}"]`))return;grid.insertAdjacentHTML('afterbegin',`<a class="ga-upgrade-card" href="${href(d.url)}"><img src="${href(d.img)}" alt="${d.alt}" loading="lazy" decoding="async" width="${d.width}" height="${d.height}"><span class="ga-upgrade-card-copy"><small>${d.type} · Evergreen guide</small><h2>${d.title}</h2><p>${d.summary}</p><time datetime="2026-09-21">September 21, 2026</time></span></a>`)})
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
})();
(()=>{
'use strict';
function initAudioNarration(){
 /* 2026-10-10 narration fix — PROBE-BASED dispatch. The old hardcoded `files`
    allowlist plus the mp3Core/usMp3Extra/regionalMp3Extra gate Sets are gone:
    the existence of a narration MP3 on disk IS the gate. Any article with a
    file gets a working player in every edition; any article without one gets
    no player at all (never a dead button). */
 const normalizedPath=location.pathname.replace(/^\/+|\/+$/g,'').replace(/(?:^|\/)index\.html$/i,'').replace(/\/+$/,'');
 const segments=normalizedPath.split('/').filter(Boolean),finalSegment=segments[segments.length-1]||'';
 const scopedKey=segments.length>1?segments.slice(-2).join('/'):finalSegment;
 /* Candidate slugs, most specific first. Path slashes map to dashes to match
    the audio-narration file naming (face-offs/power-banks -> face-offs-power-banks.mp3). */
 const slugCandidates=[];[scopedKey,finalSegment].forEach(function(k){var s=String(k||'').replace(/\//g,'-');if(s&&slugCandidates.indexOf(s)<0)slugCandidates.push(s)});
 const key=slugCandidates[0]||'';
 const edition=String(window.__GA_EDITION__||'us').toLowerCase();
 /* Verified localized narration folders — transcription-verified 2026-10-10
    (the audio is genuinely in the folder's language; de-DE is excluded: its
    files are English/mixed-language audio, per the 2026-09-28 finding). */
 const editionLocales={es:'es-ES',br:'pt-BR',sa:'ar-SA',ae:'ar-SA',qa:'ar-SA',kw:'ar-SA',il:'he-IL',fr:'fr-FR',lu:'fr-FR'};
 const editionLocale=editionLocales[edition]||'';
 /* Editions whose UI locale is en-* (from the edition bootstrap locale map) —
    used only to label the English-audio fallback honestly, never to gate. */
 const englishLocaleEditions={us:1,ca:1,gb:1,ie:1,is:1,mt:1,bs:1,au:1,nz:1,sg:1};
 /* Shared with startNarrationPlayer below (its error handler reads these). */
 var useLocalizedMp3=false,englishAudioSrc='';
 const rootScript=[...document.scripts].find(s=>/site-shell\.js(?:\?|$)/.test(s.src));if(!rootScript)return;const assets=new URL('./',rootScript.src);
 const content=document.querySelector('.article-body,article.content,.content,.gu-article-body')||document.querySelector('main');if(!content)return;
 const legacyPlayer=document.querySelector('#articlePlayer,.article-audio');
 const guaranteedNarrationSlugs=new Set(['desk-setup-upgrades','everyday-carry-essentials','smart-home-devices','travel-gadgets','best-tech-deals-2026-10-07','crowdfunding-graduates-2026','faceless-youtube-creator-gear-2026']);
 const guaranteedNarrationSlug=slugCandidates.find(slug=>guaranteedNarrationSlugs.has(slug))||'';
 document.querySelectorAll('.audio-anchor').forEach(anchor=>anchor.remove());

 const startNarrationPlayer=function(audioSrc,audioLocale,allowEnglishFallback,detailOverride){
 let host=document.querySelector('#article-narration');if(!host){host=document.createElement('div');host.id='article-narration';host.dataset.articleSlug=key.replaceAll('/','-');const hero=document.querySelector('img.hero-img');const editorialHero=document.querySelector('main > .ga-hero');if(hero){hero.insertAdjacentElement('afterend',host);const picks=document.querySelector('.picks-box');if(picks)host.insertAdjacentElement('afterend',picks)}else if(legacyPlayer)legacyPlayer.insertAdjacentElement('beforebegin',host);else if(editorialHero)editorialHero.insertAdjacentElement('afterend',host);else content.prepend(host)}
 if(legacyPlayer)legacyPlayer.remove();
 content.querySelectorAll('.article-audio,.audio').forEach(old=>{if(old!==host&&(old.querySelector('audio')||/listen|narrat/i.test(old.textContent)))old.remove()});
 const fullArticleNarration=Boolean(guaranteedNarrationSlug);
 const narrationTitle=fullArticleNarration?'Listen to this article':'Audio overview';
 const narrationDetail=fullArticleNarration?'Studio narration · full article':'Studio narration · article overview';
 host.className=`ga-narration${content.matches('main')?' ga-narration--standalone':''}`;host.setAttribute('role','region');host.setAttribute('aria-label','Listen to this article');host.removeAttribute('aria-labelledby');host.innerHTML=`<audio preload="none" data-src="${audioSrc}"></audio><div class="ga-narration-top"><span class="ga-narration-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 14v-4a8 8 0 0 1 16 0v4"/><path d="M5 13H3v5a2 2 0 0 0 2 2h2v-7H5Zm14 0h2v5a2 2 0 0 1-2 2h-2v-7h2Z"/></svg></span><span class="ga-narration-copy"><h2 id="gaNarrationTitle">${narrationTitle}</h2><span>${narrationDetail}</span></span></div><div class="ga-narration-main"><button class="ga-audio-btn" type="button" data-skip="-15" aria-label="Skip back 15 seconds">−15</button><button class="ga-audio-btn ga-audio-btn--play" type="button" aria-label="Play narration" aria-pressed="false"><svg class="ga-play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button><button class="ga-audio-btn" type="button" data-skip="15" aria-label="Skip forward 15 seconds">+15</button><div class="ga-audio-track"><span class="ga-audio-range-wrap"><span class="ga-audio-buffer" aria-hidden="true"></span><input class="ga-audio-range" type="range" min="0" max="1000" value="0" step="1" aria-label="Narration progress" aria-valuetext="0:00 elapsed"></span><span class="ga-audio-time">0:00 / --:--</span></div></div><div class="ga-narration-tools"><label class="ga-speed">Speed <select aria-label="Playback speed"><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><label class="ga-volume-control"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg><span>Volume</span><input type="range" min="0" max="100" value="100" step="5" aria-label="Narration volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="100 percent"></label><button class="ga-mute-btn" type="button" aria-label="Mute narration" aria-pressed="false">Mute</button></div><span class="ga-visually-hidden" role="status" aria-live="polite" aria-atomic="true"></span>`;
 const audio=host.querySelector('audio'),play=host.querySelector('.ga-audio-btn--play'),progress=host.querySelector('.ga-audio-range'),buffer=host.querySelector('.ga-audio-buffer'),time=host.querySelector('.ga-audio-time'),speed=host.querySelector('select'),volume=host.querySelector('.ga-volume-control input'),mute=host.querySelector('.ga-mute-btn'),status=host.querySelector('[role="status"]'),detail=host.querySelector('.ga-narration-copy span');
 const fmt=n=>Number.isFinite(n)?`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`:'--:--';
 const defaultDetail=detailOverride||narrationDetail;
 if(detail)detail.textContent=defaultDetail;
 const audioLanguage=audioLocale?audioLocale.split('-')[0]:'en';
 const audioLabels={en:{play:'Play narration',pause:'Pause narration',replay:'Replay narration',playing:'Narration playing.',startError:'Narration could not start. Try again.',paused:'Narration paused.',back:(a,b)=>`Skipped back to ${a} of ${b}.`,forward:(a,b)=>`Skipped forward to ${a} of ${b}.`,seek:(a,b)=>`Moved to ${a} of ${b}.`,finished:'Finished',finishedStatus:'Narration finished.',stopped:'Narration stopped before the end.',unavailable:'Narration audio is unavailable.',unavailableShort:'Narration unavailable',elapsed:(a,b)=>`${a} elapsed of ${b}`,speed:v=>`Playback speed ${v}.`},pt:{play:'Reproduzir narração',pause:'Pausar narração',replay:'Reproduzir novamente',playing:'Narração em reprodução.',startError:'Não foi possível iniciar a narração. Tente novamente.',paused:'Narração pausada.',back:(a,b)=>`Retrocedeu para ${a} de ${b}.`,forward:(a,b)=>`Avançou para ${a} de ${b}.`,seek:(a,b)=>`Movido para ${a} de ${b}.`,finished:'Concluído',finishedStatus:'Narração concluída.',stopped:'A narração parou antes do fim.',unavailable:'O áudio da narração não está disponível.',unavailableShort:'Narração indisponível',elapsed:(a,b)=>`${a} decorridos de ${b}`,speed:v=>`Velocidade de reprodução ${v}.`},es:{play:'Reproducir narración',pause:'Pausar narración',replay:'Reproducir de nuevo',playing:'Narración en reproducción.',startError:'No se pudo iniciar la narración. Inténtalo de nuevo.',paused:'Narración en pausa.',back:(a,b)=>`Retrocediste hasta ${a} de ${b}.`,forward:(a,b)=>`Avanzaste hasta ${a} de ${b}.`,seek:(a,b)=>`Movido hasta ${a} de ${b}.`,finished:'Finalizado',finishedStatus:'Narración finalizada.',stopped:'La narración se detuvo antes del final.',unavailable:'El audio de la narración no está disponible.',unavailableShort:'Narración no disponible',elapsed:(a,b)=>`${a} transcurridos de ${b}`,speed:v=>`Velocidad de reproducción ${v}.`},de:{play:'Erzählung abspielen',pause:'Erzählung pausieren',replay:'Erneut abspielen',playing:'Erzählung wird abgespielt.',startError:'Die Erzählung konnte nicht gestartet werden. Bitte erneut versuchen.',paused:'Erzählung pausiert.',back:(a,b)=>`Zurück zu ${a} von ${b}.`,forward:(a,b)=>`Vorwärts zu ${a} von ${b}.`,seek:(a,b)=>`Zu ${a} von ${b} bewegt.`,finished:'Beendet',finishedStatus:'Erzählung beendet.',stopped:'Die Erzählung wurde vor dem Ende gestoppt.',unavailable:'Das Audio der Erzählung ist nicht verfügbar.',unavailableShort:'Erzählung nicht verfügbar',elapsed:(a,b)=>`${a} von ${b} vergangen`,speed:v=>`Wiedergabegeschwindigkeit ${v}.`}};
 const audioUi=audioLabels[audioLanguage]||audioLabels.en;let finished=false;
 const atTrueEnd=()=>Number.isFinite(audio.duration)&&audio.duration>0&&audio.currentTime>=audio.duration-.75;
 const resetFinished=()=>{if(finished&&!atTrueEnd()){finished=false;detail.textContent=defaultDetail}};
 const setPlay=()=>{const playing=!audio.paused&&!audio.ended;if(playing){finished=false;detail.textContent=defaultDetail}play.setAttribute('aria-pressed',String(playing));play.setAttribute('aria-label',playing?audioUi.pause:finished?audioUi.replay:audioUi.play);play.innerHTML=playing?'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>':'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'};
 const sync=()=>{resetFinished();const ratio=audio.duration?audio.currentTime/audio.duration:0;const value=Math.round(ratio*1000);progress.value=String(value);progress.style.setProperty('--played',`${ratio*100}%`);progress.setAttribute('aria-valuetext',audioUi.elapsed(fmt(audio.currentTime),fmt(audio.duration)));time.textContent=`${fmt(audio.currentTime)} / ${fmt(audio.duration)}`};
 const syncBuffer=()=>{if(!audio.duration||!audio.buffered.length)return;const end=audio.buffered.end(audio.buffered.length-1);buffer.style.setProperty('--buffered',`${Math.min(100,end/audio.duration*100)}%`)};
 const ensureMetadata=()=>new Promise((resolve,reject)=>{if(!audio.src){audio.src=audio.dataset.src||'';audio.load()}if(audio.readyState>=1&&Number.isFinite(audio.duration)&&audio.duration>0){resolve();return}const ready=()=>{cleanup();resolve()},failed=()=>{cleanup();reject(new Error('audio unavailable'))},cleanup=()=>{audio.removeEventListener('loadedmetadata',ready);audio.removeEventListener('error',failed)};audio.addEventListener('loadedmetadata',ready,{once:true});audio.addEventListener('error',failed,{once:true})});
 let seekRequest=0;
 const requestSeek=async(target,announcement)=>{const request=++seekRequest;try{await ensureMetadata()}catch{status.textContent=audioUi.unavailable;return false}if(request!==seekRequest)return false;if(!Number.isFinite(audio.duration)||audio.duration<=0){status.textContent=audioUi.unavailable;return false}const clamped=Math.max(0,Math.min(audio.duration,Number(target)));if(!Number.isFinite(clamped)){status.textContent=audioUi.unavailable;return false}try{audio.currentTime=clamped}catch{status.textContent=audioUi.unavailable;return false}const accepted=Math.abs(audio.currentTime-clamped)<=.75||(clamped===audio.duration&&atTrueEnd());if(!accepted){status.textContent=audioUi.unavailable;return false}resetFinished();setPlay();sync();if(typeof announcement==='function')status.textContent=announcement(fmt(audio.currentTime),fmt(audio.duration));else if(announcement)status.textContent=announcement;return true};
 let lastAudibleVolume=1;const syncVolume=()=>{const percent=Math.round(audio.volume*100);volume.value=String(percent);volume.setAttribute('aria-valuenow',String(percent));volume.setAttribute('aria-valuetext',`${percent} percent`)};const syncMute=()=>{const muted=audio.muted||audio.volume===0;mute.setAttribute('aria-pressed',String(muted));mute.setAttribute('aria-label',muted?'Unmute narration':'Mute narration');mute.textContent=muted?'Unmute':'Mute'};
 play.addEventListener('click',async()=>{if(audio.paused){if(!audio.src){audio.src=audio.dataset.src||'';audio.load()}if(finished){await requestSeek(0);finished=false;detail.textContent=defaultDetail;sync()}try{await audio.play();status.textContent=audioUi.playing}catch{status.textContent=audioUi.startError}}else{audio.pause();status.textContent=audioUi.paused}});
 host.querySelectorAll('[data-skip]').forEach(button=>button.addEventListener('click',async()=>{const seconds=Number(button.dataset.skip);await requestSeek(audio.currentTime+seconds,seconds<0?audioUi.back:audioUi.forward)}));
 progress.addEventListener('input',()=>{const ratio=Number(progress.value)/1000;if(Number.isFinite(audio.duration)&&audio.duration>0)requestSeek(audio.duration*ratio,audioUi.seek);else ensureMetadata().then(()=>requestSeek(audio.duration*ratio,audioUi.seek)).catch(()=>{status.textContent=audioUi.unavailable})});
 progress.addEventListener('keydown',event=>{const moves={ArrowLeft:-10,ArrowDown:-10,ArrowRight:10,ArrowUp:10,PageDown:-100,PageUp:100};let next;if(event.key==='Home')next=0;else if(event.key==='End')next=1000;else if(event.key in moves)next=Math.max(0,Math.min(1000,Number(progress.value)+moves[event.key]));else return;event.preventDefault();progress.value=String(next);const ratio=next/1000;if(Number.isFinite(audio.duration)&&audio.duration>0)requestSeek(audio.duration*ratio,audioUi.seek);else ensureMetadata().then(()=>requestSeek(audio.duration*ratio,audioUi.seek)).catch(()=>{status.textContent=audioUi.unavailable})});
 speed.addEventListener('change',()=>{audio.playbackRate=Number(speed.value);status.textContent=audioUi.speed(speed.options[speed.selectedIndex].text)});volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;if(audio.volume>0)lastAudibleVolume=audio.volume;audio.muted=false;syncVolume();syncMute()});volume.addEventListener('change',()=>{status.textContent=`Narration volume ${Math.round(audio.volume*100)} percent.`});mute.addEventListener('click',()=>{const shouldUnmute=audio.muted||audio.volume===0;if(shouldUnmute&&audio.volume===0)audio.volume=lastAudibleVolume;audio.muted=!shouldUnmute;syncVolume();syncMute();status.textContent=shouldUnmute?'Narration unmuted.':'Narration muted.'});
 audio.addEventListener('play',setPlay);audio.addEventListener('pause',setPlay);audio.addEventListener('volumechange',()=>{if(audio.volume>0)lastAudibleVolume=audio.volume;syncVolume();syncMute()});audio.addEventListener('ended',()=>{finished=atTrueEnd();detail.textContent=finished?audioUi.finished:defaultDetail;status.textContent=finished?audioUi.finishedStatus:audioUi.stopped;setPlay();sync()});audio.addEventListener('timeupdate',sync);audio.addEventListener('durationchange',sync);audio.addEventListener('progress',syncBuffer);audio.addEventListener('loadedmetadata',()=>{sync();syncBuffer()});let localizedFallbackTried=!allowEnglishFallback||!useLocalizedMp3;audio.addEventListener('error',()=>{if(!localizedFallbackTried){localizedFallbackTried=true;audio.pause();audio.removeAttribute('src');audio.dataset.src=englishAudioSrc;detail.textContent='English narration · fallback';status.textContent='Localized recording unavailable. English narration is ready.';return}status.textContent=audioUi.unavailable;detail.textContent=audioUi.unavailableShort;host.hidden=true;host.setAttribute('aria-hidden','true')});syncVolume();syncMute();
 };
  /* Probe chain: localized mp3 first (verified folders only), then the English
    mp3. On non-English editions the English audio carries an honest
    "English narration" label. The first file that actually exists wins;
    no file in any language -> no player. */
 const headProbe=function(url){try{return fetch(url,{method:'HEAD',credentials:'same-origin'}).then(function(res){if(!res||!res.ok)return{exists:false,size:0};var len=Number(res.headers.get('content-length'));return{exists:true,size:Number.isFinite(len)?len:0}},function(){return{exists:false,size:0}})}catch(e){return Promise.resolve({exists:false,size:0})}};
 const probePlan=[];
 if(editionLocale)slugCandidates.forEach(function(slug){probePlan.push({url:new URL('audio-narration/'+editionLocale+'/'+slug+'.mp3',assets).href,slug:slug,localized:true})});
 slugCandidates.forEach(function(slug){probePlan.push({url:new URL('audio-narration/'+slug+'.mp3',assets).href,slug:slug,localized:false})});
 /* These recordings are bundled by this artifact. Mount their controls without
    making visibility depend on a HEAD request, which some embedded webviews block. */
 if(guaranteedNarrationSlug){
  englishAudioSrc=new URL('audio-narration/'+guaranteedNarrationSlug+'.mp3',assets).href;
  if(!englishLocaleEditions[edition])startNarrationPlayer(englishAudioSrc,'',true,'English narration');
  else startNarrationPlayer(englishAudioSrc,'',true);
  return;
 }
 if(probePlan.length)(function probeNext(i){
  if(i>=probePlan.length)return;
  var plan=probePlan[i];
  headProbe(plan.url).then(function(found){
   if(!found.exists){probeNext(i+1);return}
   /* Localized teaser clips (<300KB, ~15s samples, not full narrations — e.g.
      es-ES/pt-BR) would end abruptly: skip them in favor of full English. */
   if(plan.localized&&found.size>0&&found.size<300000){probeNext(i+1);return}
   useLocalizedMp3=plan.localized;englishAudioSrc=new URL('audio-narration/'+plan.slug+'.mp3',assets).href;
   if(plan.localized)startNarrationPlayer(plan.url,editionLocale,false);
   else if(!englishLocaleEditions[edition])startNarrationPlayer(plan.url,'',true,'English narration');
   else startNarrationPlayer(plan.url,'',true);
  });
 })(0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAudioNarration,{once:true});else initAudioNarration();
})();


/* Article rank normalization is deliberately isolated from the rest of the shell.
   It still runs if an unrelated enhancement on an older article exits early. */
(()=>{
'use strict';
let scheduled=false;
function normalizeArticleRanks(){
 const products=[...document.querySelectorAll('.article-body .product,.gu-article-body .gu-product')];
 if(!products.length)return;
 const desired=[];
 products.forEach((product,index)=>{
  product.querySelectorAll('.product-media>.number,.gu-product-media>.gu-num,.gu-product-head>.gu-num').forEach(badge=>badge.remove());
  const heading=product.querySelector('.product-copy>h2,.gu-product-copy>h2,.gu-product-head h2,h2');
  if(!heading)return;
  const name=(heading.dataset.gaProductName||heading.textContent).replace(/^\s*\d+\.\s*/,'').trim();
  if(!name)return;
  heading.dataset.gaProductName=name;
  const numberedName=`${index+1}. ${name}`;
  if(heading.textContent!==numberedName)heading.textContent=numberedName;
  desired.push({href:`#${product.id||`product-${index+1}`}`,name});
 });
 document.querySelectorAll('.pick-row').forEach(row=>{
  if(!row.querySelector('.pick-index'))return;
  const name=row.querySelector('.pick-copy strong,strong');
  if(name){const cleanName=name.textContent.replace(/^\s*\d+\.\s*/,'').trim();if(name.textContent!==cleanName)name.textContent=cleanName;}
 });
 const toc=document.querySelector('#articleToc,.sidebar>ol,.gu-toc>ol');
 if(!toc||!desired.length)return;
 const links=[...toc.querySelectorAll('a[href]')];
 const productNames=new Map();
 const sectionLinks=[];
 links.forEach(anchor=>{
  let hash='';
  try{hash=new URL(anchor.getAttribute('href'),location.href).hash}catch{}
  const match=hash.match(/^#(?:product|item)-(\d+)$/);
  if(match)productNames.set(Number(match[1]),anchor.textContent.replace(/^\s*\d+\.\s*/,'').trim());
  else sectionLinks.push({href:anchor.getAttribute('href'),html:anchor.innerHTML});
 });
 const rows=desired.map((entry,index)=>({href:entry.href,name:productNames.get(index+1)||entry.name}));
 const current=links.map(anchor=>({href:new URL(anchor.getAttribute('href'),location.href).hash,name:anchor.textContent.replace(/^\s*\d+\.\s*/,'').trim()}));
 if(current.length!==rows.length||current.some((entry,index)=>entry.href!==rows[index].href||entry.name!==rows[index].name)){
  toc.replaceChildren(...rows.map(entry=>{const li=document.createElement('li'),a=document.createElement('a');a.href=entry.href;a.textContent=entry.name;li.append(a);return li}));
 }
 if(sectionLinks.length&&!toc.parentElement.querySelector('[data-ga-toc-sections]')){
  const nav=document.createElement('nav');
  nav.className='ga-toc-sections';
  nav.dataset.gaTocSections='true';
  nav.setAttribute('aria-label','Other review sections');
  sectionLinks.forEach(entry=>{const a=document.createElement('a');a.href=entry.href;a.innerHTML=entry.html;nav.append(a)});
  toc.insertAdjacentElement('afterend',nav);
 }
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;normalizeArticleRanks()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
window.addEventListener('load',normalizeArticleRanks,{once:true});
new MutationObserver(records=>{if(records.some(record=>record.addedNodes.length))schedule()}).observe(document.documentElement,{childList:true,subtree:true});
})();


/* Keep every editorial table scrollable on phones and label every official-video link descriptively. */
(()=>{
'use strict';
let queued=false;
const videoLabel=title=>{
 const clean=String(title||'Official product video').trim();
 const named=clean.match(/^Official product video:\s*(.+)$/i);
 if(named)return `Watch: official ${named[1]} product video`;
 if(/^Official\s+/i.test(clean))return `Watch: ${clean.replace(/^Official\s+/i,'official ')}`;
 return `Watch: ${clean}`;
};
function enhanceEditorialTables(){
 document.querySelectorAll('table').forEach(table=>{
  let wrap=table.closest('.ga-table-wrap');
  if(!wrap){wrap=document.createElement('div');wrap.className='ga-table-wrap';table.before(wrap);wrap.append(table)}
  wrap.classList.add('ga-table-scroll');
  if(!wrap.hasAttribute('tabindex'))wrap.tabIndex=0;
  if(!wrap.hasAttribute('role'))wrap.setAttribute('role','region');
  if(!wrap.hasAttribute('aria-label'))wrap.setAttribute('aria-label','Scrollable comparison table');
  let cue=wrap.previousElementSibling;
  if(!cue?.classList.contains('ga-table-cue')){
   cue=document.createElement('p');cue.className='ga-table-cue';cue.textContent='Swipe table sideways to compare all columns';cue.setAttribute('aria-hidden','true');wrap.before(cue);
  }
 });
}
function enhanceOfficialVideoLinks(){
 document.querySelectorAll('iframe[src*="youtube-nocookie.com"],iframe[data-src*="youtube-nocookie.com"]').forEach(iframe=>{
  const source=iframe.getAttribute('src')||iframe.getAttribute('data-src');
  if(!source)return;
  const section=iframe.closest('.ga-official-video,.product-video');
  if(!section)return;
  let caption=section.querySelector('.ga-video-caption,.video-caption');
  if(!caption){caption=document.createElement('p');caption.className=section.classList.contains('ga-official-video')?'ga-video-caption':'video-caption';section.append(caption)}
  let anchor=caption.querySelector('.ga-video-source-link');
  if(!anchor){anchor=document.createElement('a');anchor.className='ga-video-source-link';anchor.target='_blank';anchor.rel='noopener noreferrer';caption.append(document.createTextNode(caption.textContent.trim()?' ':''),anchor)}
  anchor.setAttribute('href',source);
  anchor.textContent=videoLabel(iframe.getAttribute('title'));
 });
}
function enhance(){queued=false;enhanceEditorialTables();enhanceOfficialVideoLinks()}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(enhance)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
window.addEventListener('load',enhance,{once:true});
new MutationObserver(records=>{if(records.some(record=>record.addedNodes.length))schedule()}).observe(document.documentElement,{childList:true,subtree:true});
})();
