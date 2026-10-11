const root = document.documentElement;
const systemTheme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
const suppliedTheme = new URLSearchParams(location.search).get('theme') || new URLSearchParams(location.hash.slice(1)).get('theme');
let storedTheme = null;
try { storedTheme = localStorage.getItem('ga-theme'); } catch {}
root.dataset.theme = suppliedTheme === 'dark' || suppliedTheme === 'light' ? suppliedTheme : (storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : systemTheme);
if (suppliedTheme === 'dark' || suppliedTheme === 'light') try { localStorage.setItem('ga-theme', suppliedTheme); } catch {}

function syncThemeLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.href.startsWith('mailto:')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
    url.searchParams.set('theme', root.dataset.theme);
    if (/^#theme=(?:light|dark)$/.test(url.hash)) url.hash = '';
    link.href = url.href;
  });
}

const themeButton = document.querySelector('#theme');
themeButton.onclick = () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('ga-theme', root.dataset.theme); } catch {}
  const url = new URL(location.href);
  url.searchParams.set('theme', root.dataset.theme);
  if (url.hash.startsWith('#theme=')) url.hash = '';
  history.replaceState(null, '', url);
  syncThemeLinks();
};
syncThemeLinks();

const menuButton = document.querySelector('#menu');
const nav = document.querySelector('#nav');
function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}
menuButton.onclick = () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
};
nav.addEventListener('click', closeMenu);
addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

// Article narration is provided by the shared custom MP3 player in site-shell.js.

// Native campaign footage degrades to an honest fallback when its local file is not yet available.
document.querySelectorAll('.frame video').forEach(video => {
  const showFallback = () => {
    video.hidden = true;
    let fallback = video.parentElement.querySelector('.video-fallback');
    if (!fallback) {
      fallback = document.createElement('div');
      fallback.className = 'video-fallback';
      fallback.innerHTML = '<strong>Video unavailable</strong><p>The campaign video couldn’t load here.</p>';
      video.insertAdjacentElement('afterend', fallback);
    }
    fallback.hidden = false;
  };
  video.addEventListener('error', showFallback, { once: true });
  video.querySelector('source')?.addEventListener('error', showFallback, { once: true });
});

// External video bytes load only after a deliberate click. Loading does not auto-play.
document.querySelectorAll('[data-youtube]').forEach(consent => {
  const button = consent.querySelector('button');
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${consent.dataset.youtube}?rel=0&playsinline=1`;
    frame.title = consent.dataset.title || 'Official YouTube video';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'encrypted-media; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    consent.replaceChildren(frame);
  }, { once: true });
});

