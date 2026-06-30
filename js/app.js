(function () {
  'use strict';

  function isStopPage() {
    return window.location.pathname.includes('/pages/');
  }

  function getCurrentStopId() {
    return document.body.dataset.page || null;
  }

  /* ─────────────────────────────────────────────────────────
     TOP NAVIGATION  (injected before <main>)
  ───────────────────────────────────────────────────────── */
  function renderTopNav() {
    var currentId = getCurrentStopId();
    var onPage    = isStopPage();
    var homeHref  = onPage ? '../index.html' : 'index.html';
    var prefix    = onPage ? '' : 'pages/';

    /* ── Top bar ── */
    var nav = document.createElement('header');
    nav.className = 'top-nav';
    nav.id = 'topNav';
    nav.innerHTML =
      '<a href="' + homeHref + '" class="top-nav-brand">'
      + '<span class="top-nav-flag">🇳🇴</span>'
      + '<span class="top-nav-title">Norwegen 2026</span>'
      + '</a>'
      + '<button class="top-nav-toggle" id="topNavToggle" '
      + 'aria-label="Navigation öffnen" aria-expanded="false">'
      + '☰ <span>Stopps</span>'
      + '</button>';

    document.body.insertBefore(nav, document.body.firstChild);

    /* ── Stop list for dropdown ── */
    var stopItems = '';
    STOPS.forEach(function (stop, i) {
      var href     = prefix + stop.file;
      var isActive = stop.id === currentId;
      stopItems +=
        '<li><a href="' + href + '"'
        + (isActive ? ' class="active" aria-current="page"' : '') + '>'
        + '<span class="nd-num">' + (i + 1) + '</span>'
        + '<span class="nd-emoji">' + stop.emoji + '</span>'
        + '<span class="nd-info">'
        + '<span class="nd-name">' + stop.name + '</span>'
        + '<span class="nd-days">' + stop.days + ' · ' + stop.dates + '</span>'
        + '</span>'
        + '</a></li>';
    });

    /* ── Utility links for dropdown footer ── */
    var util = [
      { id: 'praktisches',  href: prefix + 'praktisches.html',  label: '📋 Praktische Infos' },
      { id: 'ki-prompts',   href: prefix + 'ki-prompts.html',   label: '🤖 KI-Prompt-Liste'  },
      { id: 'essen',        href: prefix + 'essen.html',        label: '🍳 Essen unterwegs'  },
      { id: 'einkaufsliste',href: prefix + 'einkaufsliste.html',label: '🛒 Einkaufsliste'    }
    ];

    var footerLinks = '';
    util.forEach(function (u) {
      footerLinks +=
        '<a href="' + u.href + '"'
        + (currentId === u.id ? ' class="active"' : '') + '>'
        + u.label + '</a>';
    });

    /* ── Dropdown panel ── */
    var dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';
    dropdown.id = 'navDropdown';
    dropdown.setAttribute('aria-hidden', 'true');
    dropdown.innerHTML =
      '<div class="nd-header">'
      + '<span class="nd-title">Route &amp; Stopps</span>'
      + '<button class="nd-close" id="ndClose" aria-label="Menü schließen">✕</button>'
      + '</div>'
      + '<ul class="nd-list">' + stopItems + '</ul>'
      + '<div class="nd-footer">' + footerLinks + '</div>';

    document.body.insertBefore(dropdown, document.body.children[1]);

    /* ── Overlay ── */
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'navOverlay';
    document.body.insertBefore(overlay, document.body.children[2]);
  }

  function setupNavDropdown() {
    var toggleBtn = document.getElementById('topNavToggle');
    var dropdown  = document.getElementById('navDropdown');
    var closeBtn  = document.getElementById('ndClose');
    var overlay   = document.getElementById('navOverlay');

    function open() {
      if (!dropdown) return;
      dropdown.classList.add('open');
      if (overlay)   overlay.classList.add('active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      if (!dropdown) return;
      dropdown.classList.remove('open');
      if (overlay)   overlay.classList.remove('active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (toggleBtn) toggleBtn.focus();
    }

    if (toggleBtn) toggleBtn.addEventListener('click', open);
    if (closeBtn)  closeBtn.addEventListener('click', close);
    if (overlay)   overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown && dropdown.classList.contains('open')) {
        close();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     BREADCRUMB  (injected before .page-hero on stop pages)
  ───────────────────────────────────────────────────────── */
  function renderBreadcrumb() {
    if (!isStopPage()) return;

    var currentId = getCurrentStopId();
    var stop = null;
    STOPS.forEach(function (s) { if (s.id === currentId) stop = s; });

    /* Derive display name */
    var name = stop ? stop.name : '';
    if (!name) {
      var titleEl = document.querySelector('.page-hero-title');
      if (titleEl) {
        /* Strip leading emoji characters */
        name = titleEl.textContent.trim().replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}︀-️\s]+/u, '').split('&')[0].trim();
        if (!name) name = titleEl.textContent.trim();
      }
    }

    var crumb = document.createElement('nav');
    crumb.className = 'breadcrumb';
    crumb.setAttribute('aria-label', 'Breadcrumb');
    crumb.innerHTML =
      '<a href="../index.html">Startseite</a>'
      + '<span class="bc-sep" aria-hidden="true">›</span>'
      + '<span aria-current="page">' + (name || 'Stopp') + '</span>';

    var main = document.getElementById('main') || document.querySelector('main.main');
    if (!main) return;

    var hero = main.querySelector('.page-hero');
    main.insertBefore(crumb, hero || main.firstChild);
  }

  /* ─────────────────────────────────────────────────────────
     VERTICAL TIMELINE  (index page)
  ───────────────────────────────────────────────────────── */
  function renderTimeline() {
    var container = document.getElementById('timeline');
    if (!container) return;

    container.className = 'tl-list';

    STOPS.forEach(function (stop, index) {
      var item = document.createElement('div');
      item.className = 'tl-item';

      /* Make entire row clickable */
      item.addEventListener('click', function () {
        window.location.href = 'pages/' + stop.file;
      });

      item.innerHTML =
        '<span class="tl-dot">' + (index + 1) + '</span>'
        + '<div class="tl-content">'
        + '<div class="tl-left">'
        + '<div class="tl-dates">' + stop.days + ' &nbsp;·&nbsp; ' + stop.dates + '</div>'
        + '<div class="tl-name">' + stop.emoji + ' ' + stop.name + '</div>'
        + '<div class="tl-sub">' + stop.subtitle + '</div>'
        + '</div>'
        + '<a href="pages/' + stop.file + '" class="tl-link" tabindex="-1" '
        + 'aria-hidden="true">→</a>'
        + '</div>';

      container.appendChild(item);
    });
  }

  /* ─────────────────────────────────────────────────────────
     PAGE NAV  (prev / next — top AND bottom)
  ───────────────────────────────────────────────────────── */
  function renderPageNav() {
    var currentId = getCurrentStopId();
    var currentIndex = -1;
    STOPS.forEach(function (s, i) { if (s.id === currentId) currentIndex = i; });
    if (currentIndex === -1) return;

    function buildHTML() {
      var html = '';
      if (currentIndex > 0) {
        var prev = STOPS[currentIndex - 1];
        html += '<a href="' + prev.file + '" class="page-nav-btn prev">'
          + prev.emoji + ' ' + prev.name + '</a>';
      }
      if (currentIndex < STOPS.length - 1) {
        var next = STOPS[currentIndex + 1];
        html += '<a href="' + next.file + '" class="page-nav-btn next">'
          + next.emoji + ' ' + next.name + '</a>';
      }
      return html;
    }

    var html = buildHTML();
    if (!html) return;

    /* Top nav (already in HTML via #pageNav) */
    var topNav = document.getElementById('pageNav');
    if (topNav) topNav.innerHTML = html;

    /* Bottom nav — inject after .page-sections */
    var sections = document.querySelector('.page-sections');
    if (sections) {
      var bottomNav = document.createElement('nav');
      bottomNav.className = 'page-nav page-nav--bottom';
      bottomNav.setAttribute('aria-label', 'Zwischen Stopps navigieren');
      bottomNav.innerHTML = html;
      sections.parentNode.insertBefore(bottomNav, sections.nextSibling);
    }
  }

  /* ─────────────────────────────────────────────────────────
     ACCORDION HELPERS
  ───────────────────────────────────────────────────────── */

  /* Open targeted accordion when a section-tab is clicked */
  function setupAccordionLinks() {
    document.querySelectorAll('.section-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var hash   = this.getAttribute('href');
        if (!hash || hash[0] !== '#') return;
        var target = document.getElementById(hash.slice(1));
        if (target && target.tagName === 'DETAILS') target.open = true;
      });
    });

    /* Also handle initial page load with a hash */
    if (window.location.hash) {
      var id     = window.location.hash.slice(1);
      var target = document.getElementById(id);
      if (target && target.tagName === 'DETAILS') target.open = true;
    }
  }

  /* Smooth close animation for accordions */
  function setupAccordionAnimation() {
    document.querySelectorAll('details.accordion').forEach(function (details) {
      var summary = details.querySelector('summary');
      if (!summary) return;

      summary.addEventListener('click', function (e) {
        if (!details.open) return; /* opening: let browser handle natively */
        e.preventDefault();

        var body = details.querySelector('.accordion-body');
        if (!body) { details.open = false; return; }

        var startH = body.scrollHeight;
        body.style.overflow   = 'hidden';
        body.style.height     = startH + 'px';
        body.offsetHeight;    /* force reflow */
        body.style.transition = 'height 0.22s ease, opacity 0.18s ease';
        body.style.height     = '0';
        body.style.opacity    = '0';

        body.addEventListener('transitionend', function done() {
          body.removeEventListener('transitionend', done);
          details.open = false;
          body.style.cssText = '';
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     BOOT
  ───────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    renderTopNav();
    setupNavDropdown();
    renderBreadcrumb();
    renderTimeline();
    renderPageNav();
    setupAccordionLinks();
    setupAccordionAnimation();
  });

})();
