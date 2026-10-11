(() => {
  const scriptUrl = document.currentScript ? new URL(document.currentScript.src, location.href) : new URL('assets/trust-layer.js', location.href);
  const siteRoot = new URL('../', scriptUrl);
  const reviews = [
    ['How to choose a power bank you can actually fly with','Power banks · How-to','assets/features/power-bank-airline-guide/index.html','UGREEN Nexode NOOMDOT N2 Baseus Nitecore'],
    ['The three-tool rule for a lighter everyday carry','EDC · Best picks','assets/features/edc-three-tool-rule/index.html','KeySmart Leatherman Skeletool Nitecore TINI 2'],
    ['7 crowdfunding red flags to check before you pledge','Crowdfunding · How-to','assets/features/crowdfunding-red-flags/index.html','Kickstarter Indiegogo campaign scam'],
    ['Noise cancelling or comfort: what matters after hour three?','Audio · Face-off','assets/features/noise-cancelling-fit-guide/index.html','Sony WH-1000XM5 headphones'],
    ['A privacy-first checklist for adding a smart speaker','Smart home · How-to','assets/features/smart-home-privacy-checklist/index.html','Amazon Echo Pop privacy'],
    ['Five desk upgrades that remove friction, not space','Desk setups · Best picks','assets/features/desk-setup-upgrades/index.html','Logitech MX Master 3S desk'],
    ['6 crowdfunding gadgets worth watching this month (September 2026)','Crowdfunding guide','assets/best-kickstarter-gadgets-september-2026/index.html','PexarBolt HOVERAir Versa Sond Dreambuds UGREEN HomeAgent Zens Snapmaker U1'],
    ['4 crowdfunding gadgets worth watching','Crowdfunding guide','assets/crowdfunding-gadgets/index.html','Amiiba Ferra ClariWatt Duo HEXFORME DICE Raymoto A1'],
    ['4 power banks worth carrying in 2026','EDC guide','assets/edc-power-banks/index.html','Nitecore NW5000 Baseus Picogo UGREEN Nexode NOOMDOT N2'],
    ['3 small tools that fix bulky pockets','EDC guide','assets/edc-upgrades/index.html','KeySmart Leatherman Skeletool CX Nitecore TINI 2'],
    ['The listening upgrade that matters most','Audio guide','assets/audio-upgrades/index.html','Sony WH-1000XM5 headphones'],
    ['5 Amazon gadgets we’d actually keep','Buying guide','assets/amazon-essentials/index.html','Logitech MX Master 3S Anker Prime Echo Pop Tapo C120 Kindle Paperwhite']
  ];
  reviews.push(
    ['Power-bank Face-Off: four products, four jobs','Power · Face-Off','assets/face-offs/power-banks/index.html','Nitecore Baseus UGREEN NOOMDOT weighted comparison'],
    ['Power methodology, version 1.1','Power · Methodology','assets/methodologies/power/index.html','battery charging capacity safety travel score types'],
    ['Crowdfunding methodology, version 1.1','Crowdfunding · Methodology','assets/methodologies/crowdfunding/index.html','campaign shipping refund creator record score types'],
    ['EDC methodology, version 1.1','EDC · Methodology','assets/methodologies/edc/index.html','carry comfort durability tools score types'],
    ['Smart Home methodology, version 1.1','Smart Home · Methodology','assets/methodologies/smart-home/index.html','privacy cloud permissions reliability score types'],
    ['Audio methodology, version 1.1','Audio · Methodology','assets/methodologies/audio/index.html','fit codecs battery noise control score types'],
    ['Scoring rubric','Review standards','assets/scoring-rubric/index.html','design features value battery direct'],
    ['Public testing queue','Transparency','assets/transparency/testing-queue/index.html','on the bench up next'],
    ['Refused-review log','Transparency','assets/transparency/refused-reviews/index.html','brand approval sponsorship criticism'],
    ['Weekly vetted-deals letter','Deals · Policy','assets/newsletters/vetted-deals/index.html','no-send not tested price only'],
    ['Disclosed-AI policy','Editorial standards','assets/disclosed-ai-policy/index.html','AI assistant tested products research only Maggie']
  );
  const toUrl = path => {
    let p = String(path || '');
    const m = p.match(/^assets\/(.+?)\/(?:index\.html)?([?#].*)?$/);
    if (m) p = '/' + m[1] + '/' + (m[2] || '');
    else if (/^index\.html(?=[?#]|$)/i.test(p)) p = p.replace(/^index\.html/i, '/');
    return new URL(p, siteRoot).href;
  };
  const T = s => (window.GA_T ? window.GA_T(s) : s);
  const escapeHtml = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  document.querySelectorAll('[data-ga-review-search]').forEach(widget => {
    const input = widget.querySelector('input');
    const results = widget.querySelector('.ga-search-results');
    if (!input || !results) return;
    const close = () => { results.hidden = true; results.innerHTML = ''; input.setAttribute('aria-expanded','false'); };
    const render = () => {
      const term = input.value.trim().toLowerCase();
      if (!term) { close(); return; }
      const matches = reviews.filter(item => item.join(' ').toLowerCase().includes(term)).slice(0,6);
      results.innerHTML = matches.length ? matches.map(item => `<a href="${toUrl(item[2])}"><strong>${escapeHtml(item[0])}</strong><small>${escapeHtml(item[1])}</small></a>`).join('') : '<div class="ga-search-empty">No review matches that search.</div>';
      results.hidden = false;
      input.setAttribute('aria-expanded','true');
    };
    input.addEventListener('input', render);
    input.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); input.focus(); } });
    document.addEventListener('click', event => { if (!widget.contains(event.target)) close(); });
  });

  document.querySelectorAll('iframe[data-src*="youtube-nocookie.com/embed/"]').forEach(frame => {
    if (frame.dataset.gated === 'true') return;
    frame.dataset.gated = 'true';
    frame.hidden = true;
    const load = document.createElement('button');
    load.type = 'button';
    load.className = 'ga-video-load';
    load.innerHTML = '<strong>Official product video</strong><span>Load video</span>';
    load.addEventListener('click', () => {
      frame.src = frame.dataset.src;
      frame.hidden = false;
      load.remove();
    }, {once:true});
    frame.insertAdjacentElement('beforebegin', load);
  });
  document.querySelectorAll('video').forEach(video => { video.preload = 'metadata'; video.autoplay = false; });



  if (document.body.dataset.route === 'article/best-kickstarter-gadgets-september-2026') {
    document.querySelectorAll('.article-header, .headline').forEach(header => {
      if (header.querySelector('.ga-updates')) return;
      const updates = document.createElement('section');
      updates.className = 'ga-updates';
      const headingId = `gaUpdates-${Math.random().toString(36).slice(2)}`;
      updates.setAttribute('aria-labelledby', headingId);
      updates.innerHTML = `<h2 id="${headingId}">Recent update</h2><p><time datetime="2026-09-19">September 19, 2026</time> — Corrected the Sond Dreambuds section to state that the Kickstarter was funded in June 2026 and the campaign is now closed. The verdict now says to watch, not back, until a retail launch.</p>`;
      const anchor = header.querySelector('.audio-anchor, .article-audio');
      if (anchor) anchor.insertAdjacentElement('beforebegin', updates);
      else header.append(updates);
    });
  }

  const sortTable = table => {
    if (!table || table.dataset.sortable === 'true') return;
    table.dataset.sortable = 'true';
    const body = table.tBodies[0];
    const headers = [...table.querySelectorAll('thead th')];
    if (!body || !headers.length) return;
    const directions = headers.map(() => 1);
    const sortBy = index => {
      const direction = directions[index];
      const rows = [...body.rows];
      rows.sort((a,b) => a.cells[index].textContent.trim().localeCompare(b.cells[index].textContent.trim(),undefined,{numeric:true,sensitivity:'base'}) * direction);
      rows.forEach(row => body.append(row));
      directions[index] *= -1;
      return direction;
    };
    const bar = document.createElement('div');
    bar.className = 'ga-sortbar';
    bar.innerHTML = `<label>Sort matrix</label><select aria-label="Sort matrix by column">${headers.map((th,index) => `<option value="${index}">${escapeHtml(th.textContent.trim())}</option>`).join('')}</select><button type="button">Sort A–Z</button>`;
    const liveRegion = document.createElement('div');
    liveRegion.className = 'ga-visually-hidden';
    liveRegion.setAttribute('role','status');
    liveRegion.setAttribute('aria-live','polite');
    bar.append(liveRegion);
    table.parentElement.insertAdjacentElement('beforebegin',bar);
    const select = bar.querySelector('select');
    const mobileButton = bar.querySelector('button');
    mobileButton.addEventListener('click', () => {
      const index = Number(select.value);
      const direction = sortBy(index);
      mobileButton.textContent = direction === 1 ? T('Sort Z–A') : T('Sort A–Z');
      liveRegion.textContent = `${T('Sorted by')} ${select.options[index].textContent.trim()}, ${T(direction === 1 ? 'ascending' : 'descending')}.`;
    });
    headers.forEach((th,index) => {
      const label = th.textContent.trim();
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'ga-sort';
      button.innerHTML = `<span>${escapeHtml(label)}</span><span class="ga-arrow" aria-hidden="true">↕</span>`;
      const setSortAria=()=>button.setAttribute('aria-label',`${T('Sort by')} ${T(label)}`);
      setSortAria();
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setSortAria);
      th.textContent = '';
      th.append(button);
      button.addEventListener('click', () => {
        [...table.querySelectorAll('.ga-sort')].forEach(other => { if (other !== button) other.querySelector('.ga-arrow').textContent = '↕'; });
        const direction = sortBy(index);
        button.querySelector('.ga-arrow').textContent = direction === 1 ? '↑' : '↓';
        button.setAttribute('aria-label',`${T('Sort by')} ${T(label)}, ${T(direction === 1 ? 'descending' : 'ascending')}`);
        liveRegion.textContent = `${T('Sorted by')} ${T(label)}, ${T(direction === 1 ? 'ascending' : 'descending')}.`;
      });
    });
  };

  const articleBody = document.querySelector('.article-body, article.content');
  const products = [...document.querySelectorAll('.article-body .product')];
  if (articleBody && products.length > 1) {
    let section = articleBody.querySelector('.comparison-section');
    if (!section) {
      section = document.createElement('section');
      section.className = 'comparison-section ga-comparison';
      section.id = 'comparison';
      section.innerHTML = `<h2>Compare the products</h2><p class="ga-comparison-note">Select any column heading to reorder the matrix.</p><div class="comparison-wrap"><table class="comparison-table"><thead><tr><th>Product</th><th>Coverage</th><th>Verdict</th><th>Guide order</th></tr></thead><tbody>${products.map((product,index) => { const name=(product.querySelector('.product-copy h2, h2')?.textContent||`Product ${index+1}`).replace(/^\d+\.\s*/, ''); const verdict=product.querySelector('.verdict')?.textContent||'See review'; return `<tr><td data-label="Product">${escapeHtml(name)}</td><td data-label="Coverage">Product review · Not direct</td><td data-label="Verdict">${escapeHtml(verdict)}</td><td data-label="Guide order">${index+1}</td></tr>`; }).join('')}</tbody></table></div>`;
      const methodology = articleBody.querySelector('.methodology');
      const disclosure = articleBody.querySelector('.disclosure');
      (methodology || disclosure)?.insertAdjacentElement(methodology ? 'beforebegin' : 'afterend', section);
    } else {
      section.classList.add('ga-comparison');
      if (!section.querySelector('.ga-comparison-note')) section.querySelector('h2')?.insertAdjacentHTML('afterend','<p class="ga-comparison-note">Select any column heading to reorder the matrix.</p>');
    }
    sortTable(section.querySelector('table'));
  }
  document.querySelectorAll('.compare').forEach(sortTable);

  document.querySelectorAll('.product').forEach(product=>{
    const name=(product.querySelector('.product-copy h2,h2')?.textContent||'').trim();
    if(name==='Amazon Echo Pop'&&!product.querySelector('.ga-tracking-paused'))product.querySelector('.product-copy h2,h2')?.insertAdjacentHTML('afterend','<p class="ga-tracking-paused">Tracking paused — standard model delisted; no retail listing</p>');
    if(name==='KeySmart'&&!product.querySelector('.ga-tracking-paused'))product.querySelector('.product-copy h2,h2')?.insertAdjacentHTML('afterend','<p class="ga-tracking-paused">Tracking paused — KeySmart Pro discontinued; used offers only</p>');
  });

  const route=(document.body.dataset.route||'').replace(/^category\//,'');
  if(route && ['crowdfunding','edc','smart-home','audio'].includes(route)){
    const head=document.querySelector('.page-head');
    if(head&&!document.querySelector('.ga-bucket-nav')){
      const nav=document.createElement('nav');nav.className='ga-bucket-nav';nav.setAttribute('aria-label','Browse this category');
      nav.innerHTML=['best-picks','reviews','face-offs','how-tos','deals','news'].map((slug,i)=>`<a href="${toUrl(`assets/${route}/${slug}/index.html`)}">${['Best Picks','Reviews','Face-Offs','How-Tos','Deals','News'][i]}</a>`).join('');
      head.insertAdjacentElement('afterend',nav);
    }
  }

  document.querySelectorAll('nav').forEach(nav=>{
    if([...nav.querySelectorAll('a')].some(a=>a.textContent.trim()==='Power'))return;
    const smart=[...nav.querySelectorAll('a')].find(a=>a.textContent.trim()==='Smart Home');
    if(smart){const a=document.createElement('a');a.href=toUrl('assets/power/index.html');a.textContent='Power';smart.insertAdjacentElement('beforebegin',a)}
  });
  document.querySelectorAll('[data-ga-review-search] label').forEach(label=>label.textContent='Search guides and standards');
  const revenue=document.querySelector('body > .ga-revenue-disclosure .ga-inner, body > .disclosure .shell');
  if(revenue&&!revenue.querySelector('.ga-free'))revenue.insertAdjacentHTML('beforeend','<b class="ga-free">Free forever. No article cap.</b>');

  if(articleBody&&!articleBody.querySelector('.product')&&!articleBody.querySelector('.ga-dont-buy')){
    const flaws=articleBody.querySelector('.flaws,.pros-cons,#flaws');
    const note=document.createElement('p');note.className='ga-dont-buy';note.innerHTML='<strong>Don’t buy it if…</strong> you need direct proof today; a polished spec sheet is not a bench test wearing a nicer jacket.';
    (flaws||articleBody.lastElementChild)?.insertAdjacentElement(flaws?'afterend':'beforebegin',note);
  }

  const smartLockCaveats={
    'product-1':'you need a confirmed price and a shipping date instead of a CES showpiece.',
    'product-2':'you need a confirmed retail price and availability before you commit.',
    'product-3':'you need live Aliro wallet-key support rather than future-facing hardware.',
    'product-5':'you need Matter support or a keypad in the box.'
  };
  document.querySelectorAll('.product').forEach(product=>{
    if(product.querySelector('.ga-dont-buy'))return;
    const isSmartLockArticle=document.body.dataset.route==='article/best-smart-locks-2026';
    if(isSmartLockArticle&&product.id==='product-4')return;
    const caveat=isSmartLockArticle?smartLockCaveats[product.id]:'the spec sheet is doing all the convincing and you need a Gadget Audit bench result today.';
    const verdict=product.querySelector('.product-verdict-box,.verdict');
    const note=document.createElement('p');note.className='ga-dont-buy';note.innerHTML=`<strong>Don’t buy it if…</strong> ${caveat}`;
    (verdict||product.querySelector('.product-copy')||product).insertAdjacentElement('afterend',note);
  });

  const legalFooter = document.querySelector('footer');
  if (legalFooter && !legalFooter.querySelector('.ga-footer-legal') && !legalFooter.querySelector('.footlegal')) {
    const footerInner = legalFooter.querySelector('.ga-shell, .shell, .footer-inner');
    footerInner?.insertAdjacentHTML('beforeend','<p class="ga-footer-legal">Some approved buying links may earn Gadget Audit a commission at no extra cost to you. We never sell prominence.</p>');
  }

  if (!document.querySelector('.ga-newsletter')) {
    const footer = document.querySelector('footer');
    if (footer) footer.insertAdjacentHTML('beforebegin',`<section class="ga-newsletter" aria-labelledby="gaNewsletterTitle"><div class="ga-newsletter__inner"><div><h2 id="gaNewsletterTitle">Weekly vetted deals—with a public no-send rule</h2><p>No post without direct evidence or “not tested — price only.” Deal cards are never sponsored. If price history cannot support Genuine drop, Normal fluctuation or Marketing, the issue does not send.</p></div><a href="${toUrl('assets/newsletters/vetted-deals/index.html')}">Read the rules</a></div></section>`);
  }

  if (!document.querySelector('.ga-course')) {
    const footer = document.querySelector('footer');
    if (footer) footer.insertAdjacentHTML('beforebegin',`<section class="ga-course" aria-labelledby="gaCourseTitle"><div class="ga-course__inner"><div><h2 id="gaCourseTitle">5 days to spot crowdfunding scams</h2><p>One short lesson a day on prototype proof, shipping math, certifications, creator history and refund risk. Joining opens your email app—there is no hidden form or automatic enrollment.</p></div><a href="mailto:gadgetauditinfo@gmail.com?subject=Join%20the%205-day%20crowdfunding%20scam%20course&body=Please%20add%20me%20to%20the%20next%205-day%20crowdfunding%20scam%20course.">Join by email</a></div></section>`);
  }

  const disclosure = document.querySelector('body > .ga-revenue-disclosure, body > .disclosure');
  const header = document.querySelector('body > .top, body > .ga-top');
  if (disclosure && header && disclosure.previousElementSibling !== header) header.insertAdjacentElement('afterend', disclosure);
  document.querySelectorAll('nav').forEach(primary => {
    const labels = [...primary.querySelectorAll('a')].map(a => a.textContent.trim().toLowerCase());
    if (!labels.includes('deals')) primary.insertAdjacentHTML('beforeend', `<a href="${toUrl('assets/deals/index.html')}">Deals</a>`);
    if (!labels.includes('search')) primary.insertAdjacentHTML('beforeend', `<a href="${toUrl('assets/search/index.html')}">Search</a>`);
    if (!labels.includes('gadget finder')) primary.insertAdjacentHTML('beforeend', `<a href="${toUrl('index.html#finder')}">Gadget Finder</a>`);
  });
})();
