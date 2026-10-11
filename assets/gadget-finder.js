/* Gadget Finder — guided conversational product finder (2026-10-11).
 *
 * Rule-based, NOT an AI chat: it asks four questions, scores every product in
 * window.GA_ARTICLE_INVENTORY against the answers, and shows its working
 * ("Why this pick") under every recommendation. Facts (names, verdicts,
 * prices, URLs, images) are used exactly as they appear in the inventory.
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-gf]');
  if (!root) return;
  var chat = root.querySelector('#gfChat');
  var chips = root.querySelector('#gfChips');
  var stepLabel = root.querySelector('#gfStepLabel');
  var progress = root.querySelector('#gfProgress');
  var restartBtn = root.querySelector('#gfRestart');

  var INV = (window.GA_ARTICLE_INVENTORY || []).filter(function (a) {
    return a && a.products && a.products.length;
  });

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- inventory helpers (never alter inventory facts) ---------- */

  function productText(a) {
    return a.products.map(function (p) {
      return [p.name, p.verdict, (p.pros || []).join(' ')].join(' ');
    }).join(' ');
  }

  function priceUSD(p) {
    if (!p || !p.price) return null;
    var m = String(p.price).match(/\$(\d[\d,]*\.?\d*)/);
    return m ? parseFloat(m[1].replace(/,/g, '')) : null;
  }

  function isCrowd(a) { return a.category === 'crowdfunding'; }

  function looksInStock(p) {
    var s = String((p && p.availability) || '');
    if (/kickstarter|campaign|pledge|coming soon|preview|watch and wait|unverified|unannounced|not verified|launching|pre-?order|back the|early-?bird/i.test(s)) return false;
    return /in stock|limited stock|shipping now|retail|on sale|amazon|direct|store|buy it|ships/i.test(s);
  }

  /* A crowdfunding pick the user would have to wait for. Graduates that are
     on retail shelves pass as buyable. */
  function isCampaignWait(a, p) { return isCrowd(a) && !looksInStock(p); }

  /* ---------- question data ---------- */

  var CATS = [
    { id: 'edc', label: 'Everyday carry', sub: 'pocket tools, lights & phones',
      match: function (a) { return a.category === 'edc'; } },
    { id: 'audio', label: 'Audio', sub: 'earbuds, IEMs & headphones',
      match: function (a) { return a.category === 'audio'; } },
    { id: 'power', label: 'Portable power', sub: 'chargers & power banks',
      match: function (a) { return a.category === 'power' || /power[- ]bank|gan|charging/i.test(a.slug + ' ' + a.title); } },
    { id: 'smart-home', label: 'Smart home', sub: 'locks, speakers & security',
      match: function (a) { return a.category === 'smart-home'; } },
    { id: 'desk', label: 'Desk setup', sub: 'docks & creator gear',
      match: function (a) { return /desk|monitor|keyboard|mouse|dock|workspace/i.test(a.slug + ' ' + a.title + ' ' + a.dek); } },
    { id: 'travel', label: 'Travel', sub: 'fly-ready power & audio',
      match: function (a) { return /travel|flight|airline|packing|carry-on/i.test(a.slug + ' ' + a.title + ' ' + a.dek + ' ' + productText(a)); } },
    { id: 'crowdfunding', label: 'Crowdfunding', sub: 'campaigns worth backing',
      match: function (a) { return isCrowd(a); } },
    { id: 'any', label: 'Surprise me', sub: 'anything in the index',
      match: function () { return true; } }
  ];

  var BUDGETS = [
    { id: 'under50', label: 'Under $50', cap: 50 },
    { id: 'under100', label: 'Under $100', cap: 100 },
    { id: 'under250', label: 'Under $250', cap: 250 },
    { id: 'any', label: 'Any budget', cap: null }
  ];

  var PRIS = [
    { id: 'value', label: 'Best value', kw: /value|budget|cheap|under \$|deal|save|affordable|cost/i },
    { id: 'portability', label: 'Portable', kw: /portable|compact|slim|pocket|lightweight|magnetic|ultrathin|carry/i },
    { id: 'comfort', label: 'Comfort', kw: /comfort|ergonomic|fit|clamp|wear/i },
    { id: 'privacy', label: 'Privacy', kw: /privacy|local|offline|on-device|mute|private/i },
    { id: 'performance', label: 'Performance', kw: /perform|output|anc|noise|biometric|thunderbolt|fast|powerful|watt|codec|battery life|soundstage/i }
  ];

  var DBS = [
    { id: 'buy-now', label: 'Buy-it-now only', sub: 'no crowdfunding waits' },
    { id: 'in-stock', label: 'In stock only', sub: 'nothing on backorder' },
    { id: 'cf-fan', label: 'I like crowdfunding', sub: 'show live campaigns' },
    { id: 'none', label: 'No deal-breakers', sub: 'show everything' }
  ];

  function catCount(cat) {
    return INV.filter(cat.match).length;
  }

  /* ---------- state & rendering ---------- */

  var state = null;

  function bubble(html, who) {
    var d = document.createElement('div');
    d.className = 'gf-msg gf-msg-' + who;
    d.innerHTML = html;
    chat.appendChild(d);
    chat.scrollTo({ top: chat.scrollHeight, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function setStep(text, pct) {
    stepLabel.textContent = text;
    progress.style.width = pct + '%';
  }

  function clearChips(label) {
    chips.innerHTML = '';
    chips.setAttribute('aria-label', label || 'Choose an answer');
  }

  function chipButton(opt) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'gf-chip';
    b.innerHTML = esc(opt.label) +
      (opt.sub ? ' <span class="gf-sub">' + esc(opt.sub) + '</span>' : '') +
      (opt.count != null ? ' <span class="gf-count">' + opt.count + '</span>' : '');
    if (opt.onClick) b.addEventListener('click', function () { opt.onClick(b); });
    return b;
  }

  function answerBubble(text) {
    bubble(esc(text), 'user');
  }

  /* ---------- scoring ---------- */

  function scoreProduct(a, p) {
    var reasons = [];
    var s = 0;
    var cat = state.category;

    if (cat.id !== 'any') {
      if (!cat.match(a)) return null; /* hard category filter */
      s += 40;
      reasons.push('In our "' + cat.label + '" coverage');
    }

    var cap = state.budget.cap;
    var price = priceUSD(p);
    if (cap != null) {
      if (price != null && price <= cap) {
        s += 25;
        reasons.push('Priced ' + p.price + ' — under your ' + state.budget.label + ' budget');
      } else if (price == null) {
        s -= 8;
        reasons.push('Price unconfirmed in the published guide');
      } else {
        return null; /* over budget */
      }
    }

    var blob = ((p.pros || []).join(' ') + ' ' + p.verdict + ' ' + p.name + ' ' + (a.tag || '')).toLowerCase();
    state.priorities.forEach(function (pr) {
      if (pr.kw.test(blob)) {
        s += 10;
        reasons.push('Matches your "' + pr.label.toLowerCase() + '" priority');
      }
    });

    var db = state.dealbreaker;
    var wait = isCampaignWait(a, p);
    if (db.id === 'buy-now') {
      if (wait) return null;
      s += 6;
      if (isCrowd(a) && looksInStock(p)) reasons.push('A crowdfunding graduate — on retail shelves now');
      else reasons.push('Buyable now — no campaign wait');
    } else if (db.id === 'in-stock') {
      if (!looksInStock(p)) return null;
      s += 6;
      reasons.push('Listed as available in the guide');
    } else if (db.id === 'cf-fan' && isCrowd(a)) {
      s += 10;
      reasons.push('A live campaign — your kind of thing');
    }

    if (!wait) s += 5; /* prefer buy-it-now over crowdfunding by default */

    return { score: s, reasons: reasons };
  }

  function computeResults() {
    var all = [];
    INV.forEach(function (a) {
      a.products.forEach(function (p) {
        var r = scoreProduct(a, p);
        if (r) all.push({ a: a, p: p, score: r.score, reasons: r.reasons });
      });
    });
    all.sort(function (x, y) { return y.score - x.score || x.p.name.localeCompare(y.p.name); });
    var picked = [];
    var used = {};
    all.forEach(function (it) { /* one product per guide for variety */
      if (picked.length >= 3 || used[it.a.slug]) return;
      used[it.a.slug] = true;
      picked.push(it);
    });
    all.forEach(function (it) { /* fill any remaining slots */
      if (picked.length < 3 && picked.indexOf(it) === -1) picked.push(it);
    });
    return picked;
  }

  /* ---------- flow ---------- */

  function askCategory() {
    setStep('Question 1 of 4', 15);
    bubble('<b>What are you shopping for?</b>', 'bot');
    clearChips('Choose a category');
    CATS.forEach(function (cat) {
      chips.appendChild(chipButton({
        label: cat.label, sub: cat.sub, count: catCount(cat) + ' guides',
        onClick: function () {
          state.category = cat;
          answerBubble(cat.label);
          askBudget();
        }
      }));
    });
  }

  function askBudget() {
    setStep('Question 2 of 4', 38);
    bubble('<b>What\'s your budget?</b><br><span class="gf-note">Picks priced above it are filtered out.</span>', 'bot');
    clearChips('Choose a budget');
    BUDGETS.forEach(function (b) {
      chips.appendChild(chipButton({
        label: b.label,
        onClick: function () {
          state.budget = b;
          answerBubble(b.label);
          askPriorities();
        }
      }));
    });
  }

  function askPriorities() {
    setStep('Question 3 of 4', 62);
    bubble('<b>What matters most?</b><br><span class="gf-note">Pick one or two — tap a chip again to undo.</span>', 'bot');
    clearChips('Choose up to two priorities');
    PRIS.forEach(function (pr) {
      chips.appendChild(chipButton({
        label: pr.label,
        onClick: function (btn) {
          var i = state.priorities.indexOf(pr);
          if (i > -1) {
            state.priorities.splice(i, 1);
            btn.classList.remove('is-on');
            btn.setAttribute('aria-pressed', 'false');
          } else if (state.priorities.length < 2) {
            state.priorities.push(pr);
            btn.classList.add('is-on');
            btn.setAttribute('aria-pressed', 'true');
          }
          var done = chips.querySelector('#gfDone');
          if (done) done.disabled = state.priorities.length === 0;
        }
      }));
    });
    var done = document.createElement('button');
    done.type = 'button';
    done.id = 'gfDone';
    done.className = 'gf-chip gf-done';
    done.disabled = true;
    done.textContent = 'Show my shortlist →';
    done.addEventListener('click', function () {
      answerBubble(state.priorities.map(function (p) { return p.label; }).join(' + '));
      askDealbreaker();
    });
    chips.appendChild(done);
  }

  function askDealbreaker() {
    setStep('Question 4 of 4', 85);
    bubble('<b>Any deal-breakers?</b>', 'bot');
    clearChips('Choose a deal-breaker');
    DBS.forEach(function (d) {
      chips.appendChild(chipButton({
        label: d.label, sub: d.sub,
        onClick: function () {
          state.dealbreaker = d;
          answerBubble(d.label);
          showResults();
        }
      }));
    });
  }

  function showResults() {
    setStep('Your shortlist', 100);
    var picked = computeResults();
    var relaxed = false;
    if (!picked.length && state.dealbreaker.id !== 'none') {
      /* relax the deal-breaker rather than dead-ending */
      var saved = state.dealbreaker;
      state.dealbreaker = DBS[3];
      picked = computeResults();
      state.dealbreaker = saved;
      relaxed = picked.length > 0;
    }
    if (!picked.length) {
      bubble('No exact match yet — that combination isn\'t covered by our published reviews. Try widening the budget or dropping a deal-breaker.', 'bot');
    } else {
      var summary = state.category.label + ' · ' + state.budget.label + ' · ' +
        state.priorities.map(function (p) { return p.label; }).join(' + ') + ' · ' + state.dealbreaker.label;
      bubble('<b>Your shortlist</b><br><span class="gf-summary">' + esc(summary) + '</span>', 'bot');
      if (relaxed) {
        bubble('<span class="gf-note">Nothing matched every rule, so I relaxed your deal-breaker — closest picks below.</span>', 'bot');
      }
      renderResults(picked);
      bubble('<span class="gf-note">Prices and availability come from the published guide — recheck the retailer before buying.</span>', 'bot');
    }
    clearChips('Results shown');
    restartBtn.hidden = false;
    restartBtn.focus();
  }

  function renderResults(picked) {
    var wrap = document.createElement('div');
    wrap.className = 'gf-results';
    wrap.innerHTML = picked.map(function (it) {
      var p = it.p, a = it.a;
      var img = p.image || a.hero;
      var url = a.url;
      var reasons = it.reasons.slice(0, 3).map(function (r) {
        return '<li>' + esc(r) + '</li>';
      }).join('');
      return '<article class="gf-card">' +
        '<a class="gf-card-media" href="' + esc(url) + '" aria-label="' + esc(p.name) + ' — open the guide">' +
        '<img src="' + esc(img) + '" alt="' + esc(p.alt || p.name) + '" loading="lazy" decoding="async"></a>' +
        '<div class="gf-card-body">' +
        '<span class="gf-card-tag">' + esc(a.tag || a.category) + '</span>' +
        '<h4><a href="' + esc(url) + '">' + esc(p.name) + '</a></h4>' +
        (p.verdict ? '<p class="gf-verdict">' + esc(p.verdict) + '</p>' : '') +
        '<p class="gf-price">' + esc(p.price || 'Price in guide') + '</p>' +
        '<p class="gf-why">Why this pick</p><ul class="gf-reasons">' + reasons + '</ul>' +
        '<a class="gf-card-link" href="' + esc(url) + '">Read the guide <span aria-hidden="true">→</span></a>' +
        '</div></article>';
    }).join('');
    chat.appendChild(wrap);
    chat.scrollTo({ top: chat.scrollHeight, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function start() {
    state = { category: null, budget: null, priorities: [], dealbreaker: null };
    chat.innerHTML = '';
    restartBtn.hidden = true;
    bubble('<b>Let\'s find your gadget.</b><br>Four quick questions — then I\'ll shortlist from our published reviews and show my working under every pick. This isn\'t an AI chat; it applies the same published rules to every answer.', 'bot');
    askCategory();
  }

  restartBtn.addEventListener('click', start);

  if (!INV.length) {
    bubble('The review index didn\'t load, so the finder can\'t run right now. Try the search panel instead.', 'bot');
    clearChips('Finder unavailable');
    return;
  }
  start();
})();
