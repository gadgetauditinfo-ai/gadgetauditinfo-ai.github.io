/* ============================================================
   Gadget Audit — Motion System v2 (2026-10-16)
   Entrance choreography, scroll reveals, header state, logo
   lockup upgrade, theme persistence. Idempotent; respects
   prefers-reduced-motion. Design layer only — no content,
   language, or narration logic touched.
   ============================================================ */
(function(){
'use strict';
if(window.__gaMotionV2)return;
window.__gaMotionV2=true;

var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var root=document.documentElement;

/* ---------- Logo lockup: crisp inline SVG (shield + wordmark) ---------- */
var SHIELD_SVG='<svg class="ga-mark" viewBox="0 0 64 64" role="img" aria-label="Gadget Audit shield" focusable="false">'
+'<defs><linearGradient id="gaShieldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a9e93"/><stop offset=".52" stop-color="#4ade80"/><stop offset="1" stop-color="#b7f995"/></linearGradient></defs>'
+'<path d="M32 3 55 11v19c0 16-10.5 26.5-23 31C19.5 56.5 9 46 9 30V11Z" fill="#0a1410" stroke="url(#gaShieldG)" stroke-width="4" stroke-linejoin="round"/>'
+'<g stroke="#4ade80" stroke-width="1.6" opacity=".75" fill="none" stroke-linecap="round">'
+'<path d="M20 18v8m0 0h6m-6 0-3 3v6"/><circle cx="20" cy="18" r="1.8" fill="#4ade80" stroke="none"/>'
+'<path d="M32 16v10m0 0 7 7v8"/><circle cx="32" cy="16" r="1.8" fill="#4ade80" stroke="none"/>'
+'<path d="M44 20v6m0 0-5 5"/><circle cx="44" cy="20" r="1.8" fill="#4ade80" stroke="none"/>'
+'<path d="M24 44v6m14-8v8"/><circle cx="24" cy="52" r="1.6" fill="#4ade80" stroke="none"/><circle cx="38" cy="52" r="1.6" fill="#4ade80" stroke="none"/>'
+'</g>'
+'<path d="M21 32.5 28.5 40 43 23.5" fill="none" stroke="url(#gaShieldG)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
+'</svg>';

function upgradeBrand(){
  /* NOTE: site-shell.js rebuilds the header at runtime as .ga-site-header;
     the .ua-header source markup never survives. Target the REAL header. */
  document.querySelectorAll('.ga-site-header .ga-brand').forEach(function(brand){
    if(brand.querySelector('.ga-lockup'))return;
    var img=brand.querySelector('img');
    if(img&&/gadget-audit-shield/.test(img.getAttribute('src')||'')){img.remove();}
    else if(img){return;}
    var word=brand.querySelector('.ga-brand-wordmark');
    if(word)word.remove();
    var lock=document.createElement('span');
    lock.className='ga-lockup';
    lock.setAttribute('aria-hidden','true');
    lock.innerHTML=SHIELD_SVG+'<span class="ga-wordmark">Gadget <em>Audit</em></span>';
    brand.prepend(lock);
  });
  /* footer brand image, if present (shield webp or official webp) */
  document.querySelectorAll('.ga-footer-brand img, .ga-footer-logo img').forEach(function(img){
    if(/gadget-audit-(shield|official)/.test(img.getAttribute('src')||'')&&!img.closest('.ga-lockup')){
      var lock=document.createElement('span');
      lock.className='ga-lockup';
      lock.innerHTML=SHIELD_SVG+'<span class="ga-wordmark">Gadget <em>Audit</em></span>';
      img.replaceWith(lock);
    }
  });
}

/* ---------- Favicon ---------- */
function ensureFavicon(){
  if(document.querySelector('link[rel="icon"][href*="favicon.svg"]'))return;
  var l=document.createElement('link');
  l.rel='icon';l.type='image/svg+xml';l.href='assets/favicon.svg';
  document.head.appendChild(l);
}

/* ---------- Hero line-mask prep ---------- */
function prepHeroLines(){
  document.querySelectorAll('.hero-intro h1 .hero-line').forEach(function(line){
    if(line.querySelector('.ga-line-inner'))return;
    var inner=document.createElement('span');
    inner.className='ga-line-inner';
    while(line.firstChild)inner.appendChild(line.firstChild);
    line.appendChild(inner);
  });
}

/* ---------- Entrance choreography ---------- */
function tagEntrance(){
  var seq=[
    ['.hero .kicker',0],['.hero-summary p',2],['.lead-actions',3],
    ['.feature-stage',4],['.hero-foot',5],['.story-ticker',5]
  ];
  seq.forEach(function(pair){
    document.querySelectorAll(pair[0]).forEach(function(el){
      if(el.classList.contains('ga-enter'))return;
      el.classList.add('ga-enter');
      el.style.setProperty('--ga-d',pair[1]);
    });
  });
}

/* ---------- Scroll reveals ---------- */
function tagReveals(){
  var groups=[
    '.signal-grid > *','.latest-grid > *','.proofgrid > *',
    '.categories > *','.trust-grid > *','.finder-console > *',
    '.section-head','.finder-mast','.newsletter-box',
    '.deal-card','.score-card','.article-header'
  ];
  groups.forEach(function(sel){
    try{
      document.querySelectorAll(sel).forEach(function(el,i){
        if(el.hasAttribute('data-ga-reveal')||el.closest('[data-ga-reveal]'))return;
        el.setAttribute('data-ga-reveal','');
        el.style.setProperty('--ga-ri',Math.min(i,8));
      });
    }catch(e){/* selector unsupported — skip */}
  });
}
function watchReveals(){
  var els=document.querySelectorAll('[data-ga-reveal]:not(.is-in)');
  if(!els.length||reduced){els.forEach(function(el){el.classList.add('is-in')});return;}
  if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('is-in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){io.observe(el)});
}

/* ---------- Header scrolled state ---------- */
function headerState(){
  var header=document.querySelector('.ga-site-header');
  if(!header)return;
  var onScroll=function(){header.classList.toggle('ga-scrolled',window.scrollY>10);};
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
}

/* ---------- Theme persistence (bootstrap reads ga-theme; toggle never wrote it) ---------- */
function persistTheme(){
  document.querySelectorAll('.ua-theme').forEach(function(btn){
    btn.addEventListener('click',function(){
      try{localStorage.setItem('ga-theme',root.dataset.theme==='light'?'light':'dark');}catch(e){}
    });
  });
}

/* ---------- Boot ---------- */
function bootHeaderBits(){
  upgradeBrand();
  headerState();
}
function boot(){
  ensureFavicon();
  prepHeroLines();
  tagEntrance();
  tagReveals();
  persistTheme();
  watchReveals();
  bootHeaderBits();
  /* site-shell.js is injected dynamically (async) and may rebuild the
     header AFTER us — retry the header-dependent bits until it lands. */
  var tries=0;
  var timer=setInterval(function(){
    tries++;
    bootHeaderBits();
    if(document.querySelector('.ga-site-header .ga-brand .ga-lockup')||tries>20)clearInterval(timer);
  },250);
  /* trigger entrance on next frame so initial styles apply first */
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    root.classList.add('ga-ready');
  });});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();
