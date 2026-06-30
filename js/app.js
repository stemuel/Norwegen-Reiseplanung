(function () {
  'use strict';

  function isStopPage() {
    return window.location.pathname.includes('/pages/');
  }

  function getCurrentStopId() {
    return document.body.dataset.page || null;
  }

  function renderSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var currentId = getCurrentStopId();
    var onPage = isStopPage();
    var homeHref = onPage ? '../index.html' : 'index.html';
    var linkPrefix = onPage ? '' : 'pages/';

    var html = '<div class="sidebar-header">'
      + '<a href="' + homeHref + '" class="sidebar-brand">'
      + '<span class="sidebar-brand-emoji">🇳🇴</span>'
      + '<span class="sidebar-brand-text">Norwegen 2026</span>'
      + '</a>'
      + '<button class="close-btn" id="closeBtn" aria-label="Menü schließen">✕</button>'
      + '</div>'
      + '<div class="sidebar-meta">'
      + '<p>🚐 Camper-Tour</p>'
      + '<p>11. Aug – 11. Sept 2026</p>'
      + '<p>31 Tage · Hamburg → MOD</p>'
      + '</div>'
      + '<ul class="nav-stops">';

    STOPS.forEach(function (stop) {
      var isActive = stop.id === currentId;
      var href = linkPrefix + stop.file;
      html += '<li><a href="' + href + '"'
        + (isActive ? ' class="active" aria-current="page"' : '')
        + '>'
        + '<span class="nav-stop-emoji">' + stop.emoji + '</span>'
        + '<span class="nav-stop-info">'
        + '<span class="nav-stop-name">' + stop.name + '</span>'
        + '<span class="nav-stop-days">' + stop.days + ' · ' + stop.dates + '</span>'
        + '</span>'
        + '</a></li>';
    });

    html += '</ul>'
      + '<div class="sidebar-util">'
      + '<p class="sidebar-util-label">ℹ️ Infos &amp; Planung</p>'
      + '<ul class="nav-util">'
      + '<li><a href="' + linkPrefix + 'praktisches.html"'
      + (currentId === 'praktisches' ? ' class="active" aria-current="page"' : '') + '>'
      + '📋 Praktische Infos</a></li>'
      + '<li><a href="' + linkPrefix + 'ki-prompts.html"'
      + (currentId === 'ki-prompts' ? ' class="active" aria-current="page"' : '') + '>'
      + '🤖 KI-Prompt-Liste</a></li>'
      + '</ul>'
      + '</div>';
    sidebar.innerHTML = html;
  }

  function setupMenu() {
    var menuBtn = document.getElementById('menuBtn');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      var closeBtn = document.getElementById('closeBtn');
      if (closeBtn) closeBtn.focus();
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (menuBtn) menuBtn.focus();
    }

    if (menuBtn) menuBtn.addEventListener('click', openSidebar);

    document.addEventListener('click', function (e) {
      var closeBtn = document.getElementById('closeBtn');
      if (closeBtn && closeBtn.contains(e.target)) closeSidebar();
      if (overlay && overlay.contains(e.target)) closeSidebar();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });
  }

  function renderTimeline() {
    var timeline = document.getElementById('timeline');
    if (!timeline) return;

    STOPS.forEach(function (stop, index) {
      var item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = '<div class="timeline-dot" aria-hidden="true">' + (index + 1) + '</div>'
        + '<div class="stop-card">'
        + '<div class="stop-emoji" aria-hidden="true">' + stop.emoji + '</div>'
        + '<div class="stop-info">'
        + '<div class="stop-meta">' + stop.days + ' &nbsp;·&nbsp; ' + stop.dates + '</div>'
        + '<div class="stop-name">' + stop.name + '</div>'
        + '<div class="stop-subtitle">' + stop.subtitle + '</div>'
        + '</div>'
        + '<a href="pages/' + stop.file + '" class="stop-link">Mehr erfahren</a>'
        + '</div>';
      timeline.appendChild(item);
    });
  }

  function renderPageNav() {
    var navEl = document.getElementById('pageNav');
    if (!navEl) return;

    var currentId = getCurrentStopId();
    var currentIndex = -1;
    STOPS.forEach(function (s, i) { if (s.id === currentId) currentIndex = i; });
    if (currentIndex === -1) return;

    var html = '';

    if (currentIndex > 0) {
      var prev = STOPS[currentIndex - 1];
      html += '<a href="' + prev.file + '" class="page-nav-btn prev">'
        + prev.emoji + ' ' + prev.name
        + '</a>';
    }

    if (currentIndex < STOPS.length - 1) {
      var next = STOPS[currentIndex + 1];
      html += '<a href="' + next.file + '" class="page-nav-btn next">'
        + next.emoji + ' ' + next.name
        + '</a>';
    }

    navEl.innerHTML = html;
    if (!html) navEl.style.display = 'none';
  }

  // Open the targeted accordion when a section-tab link is clicked
  function setupAccordionLinks() {
    document.querySelectorAll('.section-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = this.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (target && target.tagName === 'DETAILS') {
          target.open = true;
        }
      });
    });
    // Also open on initial hash load
    if (window.location.hash) {
      var target = document.querySelector(window.location.hash);
      if (target && target.tagName === 'DETAILS') target.open = true;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSidebar();
    setupMenu();
    renderTimeline();
    renderPageNav();
    setupAccordionLinks();
  });

})();
