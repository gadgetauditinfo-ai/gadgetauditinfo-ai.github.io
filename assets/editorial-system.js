(()=>{
  const scriptRoot=new URL('.',document.currentScript.src);
  const root=document.documentElement;
  const qs=new URLSearchParams(location.search);
  const system=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  const requested=qs.get('theme');
  const initial=['dark','light'].includes(requested)?requested:system;
  const applyTheme=theme=>{
    root.dataset.theme=theme;
    document.querySelectorAll('[data-ga-theme],#themeToggle,#theme').forEach(button=>{
      button.setAttribute('role','switch');
      button.setAttribute('aria-label','Dark mode');
      button.setAttribute('aria-checked',String(theme==='dark'));
      button.removeAttribute('aria-pressed');
    });
  };
  applyTheme(initial);

  const menu=document.querySelector('[data-ga-menu]');
  const nav=document.querySelector('[data-ga-nav]');
  if(menu&&nav){
    const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰'};
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰'});
    nav.addEventListener('click',close);
    addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  }

  document.querySelector('[data-ga-theme]')?.addEventListener('click',()=>{
    const theme=root.dataset.theme==='dark'?'light':'dark';
    applyTheme(theme);
    const url=new URL(location.href);
    url.searchParams.set('theme',theme);
    history.replaceState(null,'',url);
    sync();
  });

  function sync(){
    document.querySelectorAll('a[href]').forEach(anchor=>{
      if(anchor.href.startsWith('mailto:'))return;
      const url=new URL(anchor.href,location.href);
      if(url.origin!==location.origin)return;
      url.searchParams.set('theme',root.dataset.theme);
      anchor.href=url.href;
    });
  }
  sync();

  document.querySelectorAll('[data-sort-table]').forEach(table=>{
    const body=table.tBodies[0];
    if(!body)return;
    table.querySelectorAll('th').forEach((heading,index)=>{
      const label=heading.textContent;
      const button=document.createElement('button');
      button.type='button';
      button.className='ga-btn alt';
      button.style.cssText='min-height:34px;padding:0 8px';
      button.textContent=label+' ↕';
      heading.textContent='';
      heading.append(button);
      let direction=1;
      button.addEventListener('click',()=>{
        [...body.rows].sort((a,b)=>a.cells[index].textContent.trim().localeCompare(b.cells[index].textContent.trim(),undefined,{numeric:true})*direction).forEach(row=>body.append(row));
        direction*=-1;
        button.textContent=label+(direction===-1?' ↑':' ↓');
      });
    });
  });

  const legalFooter=document.querySelector('.ga-footer');
  if(legalFooter&&!legalFooter.querySelector('.ga-footer-legal'))legalFooter.querySelector('.ga-shell')?.insertAdjacentHTML('beforeend','<p class="ga-footer-legal">Some approved buying links may earn Gadget Audit a commission at no extra cost to you. We never sell prominence.</p>');
  const disclosure=document.querySelector('.ga-money-note,.ga-revenue-disclosure');
  const header=document.querySelector('.ga-top,.top');
  if(disclosure&&header&&disclosure.previousElementSibling!==header)header.insertAdjacentElement('afterend',disclosure);
  if(nav){
    const labels=[...nav.querySelectorAll('a')].map(anchor=>anchor.textContent.trim().toLowerCase());
    if(!labels.includes('deals')){const anchor=document.createElement('a');anchor.href=new URL('deals/index.html',scriptRoot).href;anchor.textContent='Deals';nav.append(anchor)}
    if(!labels.includes('search')){const anchor=document.createElement('a');anchor.href=new URL('search/index.html',scriptRoot).href;anchor.textContent='Search';nav.append(anchor)}
    if(!labels.includes('gadget finder')){const anchor=document.createElement('a');anchor.href=new URL('../index.html#finder',scriptRoot).href;anchor.textContent='Gadget Finder';nav.append(anchor)}
  }
})();
