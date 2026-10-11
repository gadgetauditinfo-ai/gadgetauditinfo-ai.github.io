(function () {
  'use strict';

  var config = window.gaOfficialMedia;
  if (!config) return;

  function addStyles() {
    if (document.getElementById('ga-official-media-styles')) return;
    var style = document.createElement('style');
    style.id = 'ga-official-media-styles';
    style.textContent = [
      '.ga-guide-media{margin:18px 0 22px;overflow:hidden;border-radius:12px;background:var(--gas-soft,var(--surface-2,#eef3f0))}',
      '.ga-guide-media img{display:block;width:100%;height:auto;max-height:520px;object-fit:contain;background:var(--gas-soft,var(--surface-2,#eef3f0))}',
      '.ga-official-video{margin:24px 0;overflow:hidden;border:1px solid var(--gas-line,var(--line,#d8e2dc));border-radius:12px;background:var(--gas-paper,var(--surface,#fff));color:var(--gas-ink,var(--ink,#101713))}',
      '.ga-video-header{display:flex!important;width:100%;min-height:54px;margin:0!important;padding:11px 14px!important;align-items:center;justify-content:space-between;gap:14px;border:0!important;border-bottom:1px solid var(--gas-line,var(--line,#d8e2dc))!important;border-radius:0!important;background:var(--gas-paper,var(--surface,#fff))!important;color:inherit!important;text-align:left;box-shadow:none!important;filter:none!important;transform:none!important}',
      '.ga-video-header strong{font:800 1.02rem/1.25 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}',
      '.ga-video-frame{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;background:#080b09}',
      '.ga-video-frame iframe,.ga-video-frame video{position:absolute;inset:0;display:block;width:100%;height:100%;border:0}',
      '.ga-video-frame video{object-fit:contain;background:#080b09}',
      '.ga-video-poster{position:absolute!important;inset:0;display:block!important;width:100%;height:100%;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:#080b09!important;overflow:hidden;box-shadow:none!important;filter:none!important;transform:none!important;cursor:pointer}',
      '.ga-video-poster:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(3,9,6,.03),rgba(3,9,6,.42));pointer-events:none}',
      '.ga-video-poster img{display:block!important;width:100%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:#e8edf2!important;object-fit:cover!important;filter:none!important;transform:none!important}',
      '.ga-video-poster span{position:absolute;z-index:1;left:50%;top:50%;translate:-50% -50%;padding:10px 15px;background:#fff;color:#07110b;font:800 .88rem/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}',
      '.ga-video-caption{margin:0!important;padding:11px 14px;color:var(--gas-muted,var(--muted,#526158));font-size:.8rem;line-height:1.5}',
      '.ga-video-transcript{margin:0!important;padding:0 14px 12px;color:var(--gas-muted,var(--muted,#526158));font-size:.8rem;line-height:1.5}',
      '.ga-video-transcript strong{color:var(--gas-ink,var(--ink,#101713))}',
      '.ga-official-video.is-unavailable{padding:18px;background:var(--gas-soft,var(--surface-2,#edf3ef))}',
      '.ga-official-video.is-unavailable h3{margin:0;font:800 1.02rem/1.25 inherit;color:inherit}',
      '.ga-official-video.is-unavailable .ga-video-caption{margin-top:7px!important;padding:0}',
      '@media(max-width:640px){.ga-guide-media{margin:14px 0 18px}.ga-video-header{min-height:52px;padding:10px 12px!important}.ga-video-caption{padding:10px 12px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function localizeCaption(text) {
    var T = window.GA_T || function (s) { return s; };
    if (!text) return text;
    var m = text.match(/^Official (.+) product video for the (.+)\.$/);
    if (m) {
      var t = T('Official {brand} product video for the {product}.');
      if (t.indexOf('{brand}') !== -1) return t.split('{brand}').join(m[1]).split('{product}').join(m[2]);
      return t;
    }
    var m2 = text.match(/^No verified official (.+) product video for the (.+) is currently available\.$/);
    if (m2) {
      var t2 = T('No verified official {brand} product video for the {product} is currently available.');
      if (t2.indexOf('{brand}') !== -1) return t2.split('{brand}').join(m2[1]).split('{product}').join(m2[2]);
      return t2;
    }
    return T(text);
  }

  function buildEmbed(item, product) {
    var section = document.createElement('section');
    section.className = 'ga-official-video';
    section.dataset.mediaId = item.provider + ':' + item.id;
    section.setAttribute('aria-label', 'Official product video');

    var header = document.createElement('div');
    header.className = 'ga-video-header';
    var heading = document.createElement('strong');
    heading.textContent = 'Official product video';
    header.appendChild(heading);
    section.appendChild(header);

    var frame = document.createElement('div');
    frame.className = 'ga-video-frame';
    var posterFrame = document.createElement('div');
    posterFrame.className = 'ga-video-poster';
    posterFrame.setAttribute('aria-hidden', 'true');
    var sourceImage = product.querySelector('.product-media img, .gu-guide-media img, .gu-product-media img, img');
    if (sourceImage) {
      var poster = document.createElement('img');
      poster.src = sourceImage.currentSrc || sourceImage.src;
      poster.alt = '';
      poster.loading = 'lazy';
      poster.decoding = 'async';
      posterFrame.appendChild(poster);
    }
    frame.appendChild(posterFrame);
    section.appendChild(frame);

    var caption = document.createElement('p');
    caption.className = 'ga-video-caption';
    caption.textContent = localizeCaption(item.caption);
    section.appendChild(caption);
    if (item.textAlternative) {
      var alternative = document.createElement('p');
      alternative.className = 'ga-video-transcript';
      var alternativeLabel = document.createElement('strong');
      alternativeLabel.textContent = 'Text alternative: ';
      alternative.appendChild(alternativeLabel);
      alternative.appendChild(document.createTextNode(item.textAlternative));
      section.appendChild(alternative);
    }

    var loaded = false;
    function loadVideo() {
      if (loaded) return;
      loaded = true;
      var iframe = document.createElement('iframe');
      iframe.title = item.title || 'Official product video';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.setAttribute('allowfullscreen', '');
      iframe.src = item.provider === 'vimeo'
        ? 'https://player.vimeo.com/video/' + item.id
        : 'https://www.youtube-nocookie.com/embed/' + item.id + '?rel=0&playsinline=1&cc_load_policy=1';
      frame.replaceChildren(iframe);
      section.classList.add('is-loaded');
      section.removeAttribute('aria-busy');
    }
    section.setAttribute('aria-busy', 'true');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        observer.disconnect();
        loadVideo();
      }, { rootMargin: '320px 0px', threshold: 0.01 });
      observer.observe(section);
    } else loadVideo();
    return section;
  }

  function captionPathFor(videoPath) {
    var clean = String(videoPath || '').split(/[?#]/)[0];
    var file = clean.slice(clean.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '.vtt');
    return 'assets/captions/' + file;
  }

  function buildNative(item, product) {
    var section = document.createElement('section');
    section.className = 'ga-official-video';
    section.dataset.mediaId = 'native:' + item.nativeVideo;
    section.setAttribute('aria-label', 'Official product video');

    var header = document.createElement('div');
    header.className = 'ga-video-header';
    var heading = document.createElement('strong');
    heading.textContent = 'Official product video';
    header.appendChild(heading);
    section.appendChild(header);

    var frame = document.createElement('div');
    frame.className = 'ga-video-frame';
    var posterFrame = document.createElement('div');
    posterFrame.className = 'ga-video-poster';
    posterFrame.setAttribute('aria-hidden', 'true');
    var sourceImage = product.querySelector('.product-media img, .gu-guide-media img, .gu-product-media img, img');
    if (sourceImage) {
      var poster = document.createElement('img');
      poster.src = sourceImage.currentSrc || sourceImage.src;
      poster.alt = '';
      poster.loading = 'lazy';
      poster.decoding = 'async';
      posterFrame.appendChild(poster);
    }
    frame.appendChild(posterFrame);
    section.appendChild(frame);

    var caption = document.createElement('p');
    caption.className = 'ga-video-caption';
    caption.textContent = localizeCaption(item.caption);
    section.appendChild(caption);
    if (item.textAlternative) {
      var alternative = document.createElement('p');
      alternative.className = 'ga-video-transcript';
      var alternativeLabel = document.createElement('strong');
      alternativeLabel.textContent = 'Text alternative: ';
      alternative.appendChild(alternativeLabel);
      alternative.appendChild(document.createTextNode(item.textAlternative));
      section.appendChild(alternative);
    }

    var loaded = false;
    function loadVideo() {
      if (loaded) return;
      loaded = true;
      var video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.crossOrigin = 'anonymous';
      video.setAttribute('aria-label', item.title || 'Official product video');
      var source = document.createElement('source');
      source.src = item.nativeVideo;
      source.type = 'video/mp4';
      video.appendChild(source);
      var track = document.createElement('track');
      track.kind = 'captions';
      track.srclang = 'en';
      track.label = 'English';
      track.src = item.captions || captionPathFor(item.nativeVideo);
      video.appendChild(track);
      frame.replaceChildren(video);
      section.classList.add('is-loaded');
      section.removeAttribute('aria-busy');
    }
    section.setAttribute('aria-busy', 'true');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        observer.disconnect();
        loadVideo();
      }, { rootMargin: '320px 0px', threshold: 0.01 });
      observer.observe(section);
    } else loadVideo();
    return section;
  }

  function buildUnavailable(item) {
    var section = document.createElement('section');
    section.className = 'ga-official-video is-unavailable';
    section.setAttribute('aria-label', 'Official product video unavailable');
    var heading = document.createElement('h3');
    heading.textContent = 'Official product video unavailable';
    var caption = document.createElement('p');
    caption.className = 'ga-video-caption';
    caption.textContent = localizeCaption(item.caption) || localizeCaption('No verified manufacturer, campaign, or official product upload is currently available.');
    section.appendChild(heading);
    section.appendChild(caption);
    return section;
  }

  function insertVideo(item) {
    var product = document.querySelector(item.selector);
    if (!product) return;
    var existing = product.querySelector('.ga-official-video, .product-video');
    var mediaId = item.nativeVideo ? 'native:' + item.nativeVideo : (item.provider && item.id ? item.provider + ':' + item.id : '');
    if (existing && existing.classList.contains('ga-official-video') && existing.dataset.mediaId === mediaId) return;
    if (item.unavailable && existing) return;
    if (existing) existing.remove();

    var media = item.unavailable ? buildUnavailable(item) : (item.nativeVideo ? buildNative(item, product) : buildEmbed(item, product));
    var copy = product.querySelector('.product-copy') || product;
    var anchor = copy.querySelector('.product-verdict-box, .deal-box, .gu-proscons');
    if (anchor && copy.contains(anchor)) anchor.insertAdjacentElement('beforebegin', media);
    if (!media.parentNode) copy.appendChild(media);
  }

  function insertImage(item) {
    var product = document.querySelector(item.selector);
    if (!product || product.querySelector('.ga-guide-media')) return;
    var figure = document.createElement('figure');
    figure.className = 'ga-guide-media';
    var image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    if (item.width) image.width = item.width;
    if (item.height) image.height = item.height;
    figure.appendChild(image);
    var head = product.querySelector('.gu-product-head, h2');
    if (head && head.parentNode === product) head.insertAdjacentElement('afterend', figure);
    if (figure.parentNode !== product) product.prepend(figure);
  }

  var nativeTextAlternatives = {
    'cybopal-landing.mp4': 'No spoken narration. Visual demo: a person adjusts and reclines in the CyboPal ONE chair at a desk.',
    'harnds-sidekick-campaign.mp4': 'No spoken narration. Visual demo: the Harnds Sidekick compact multitool is opened and used as a knife, bottle opener, and portable pocket tool.',
    'hexforme-dice-campaign.mp4': 'No spoken narration. Visual demo: the modular HEXFORME DICE set combines multiple dice, connects magnetically, and can be swiped together or used vertically.',
    'frost-titan-core-plate-campaign.mp4': 'No spoken narration. Visual demo: Frost Titan Core is compared with bulkier ice packs, shown freezing in 60 minutes, fitting a lunch box, and storing flat in a freezer.',
    'qrov-x2-neo-campaign.mp4': 'No spoken narration. Visual product demonstration of the QROV X2 NEO.',
    'punkt-mp02-launch.mp4': 'No spoken narration. Visual film: people step away from smartphones and spend time outdoors, ending with the Punkt. MP02.',
    'bose-sport-open-product.mp4': 'No spoken narration. Visual product film for the Bose Sport Open earbuds.',
    'ventyra-r1-campaign.mp4': 'No intelligible spoken narration. Visual product demonstration of the VENTYRA R1.',
    'whisprompt-home-demo.mp4': 'No spoken narration. Brief visual demonstration of WhisPrompt in use.',
    'zens-duo-charger-pro-2.mp4': 'No spoken narration. Visual product film showing the Zens Duo Charger Pro 2.',
    'noomdot-n2-campaign.mp4': 'No spoken narration. Visual product demonstration of the NOOMDOT N2 power bank.'
  };

  function ensureNativeCaptionTracks(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('video'), function (video) {
      var source = video.querySelector('source');
      var videoPath = source && (source.getAttribute('src') || source.getAttribute('data-src'));
      if (!videoPath) return;
      var file = String(videoPath).split(/[?#]/)[0].split('/').pop();
      if (!video.querySelector('track[kind="captions"]')) {
        var track = document.createElement('track');
        track.kind = 'captions';
        track.srclang = 'en';
        track.label = 'English';
        track.src = 'assets/captions/' + file.replace(/\.[^.]+$/, '.vtt');
        video.appendChild(track);
      }
      video.crossOrigin = 'anonymous';
      var alternativeText = nativeTextAlternatives[file];
      var container = video.closest('.ga-official-video, .product-video');
      if (!alternativeText || !container || container.querySelector('.ga-video-transcript')) return;
      var alternative = document.createElement('p');
      alternative.className = 'ga-video-transcript';
      var label = document.createElement('strong');
      label.textContent = 'Text alternative: ';
      alternative.appendChild(label);
      alternative.appendChild(document.createTextNode(alternativeText));
      container.appendChild(alternative);
    });
  }

  function observeDeferredMedia() {
    ensureNativeCaptionTracks(document);
    var targets = Array.prototype.slice.call(document.querySelectorAll('.product-video iframe[data-src], .product-video video[data-campaign-video]'));
    if (!targets.length) return;
    function load(media) {
      if (media.dataset.gaVideoLoaded === 'true') return;
      ensureNativeCaptionTracks(media.closest('.product-video') || document);
      media.dataset.gaVideoLoaded = 'true';
      media.hidden = false;
      var frame = media.closest('.video-frame');
      if (frame) frame.querySelectorAll('.video-fallback:not(.video-error)').forEach(function (fallback) { fallback.remove(); });
      if (media.tagName === 'IFRAME') media.src = media.dataset.src;
      else {
        var source = media.querySelector('source[data-src]');
        if (source) source.src = source.dataset.src;
        media.load();
      }
    }
    if (!('IntersectionObserver' in window)) {
      targets.forEach(load);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        load(entry.target);
      });
    }, { rootMargin: '320px 0px', threshold: 0.01 });
    targets.forEach(function (media) { observer.observe(media); });
  }

  function mount() {
    addStyles();
    (config.images || []).forEach(insertImage);
    (config.videos || []).forEach(insertVideo);
    observeDeferredMedia();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
  window.addEventListener('load', mount, { once: true });
}());
