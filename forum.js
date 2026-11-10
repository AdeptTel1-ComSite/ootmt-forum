/* ==========================================================
   The Order of the Machine Tower - forum behavior
   Draws the board list and topic pages from forum_data.js,
   loads giscus for a topic, and handles the Theme A/B/C buttons.
   You should not need to edit this file.
   ========================================================== */
(function () {
  'use strict';

  var DATA = window.FORUM;
  var hashMode = !!window.OOTMT_HASH_MODE; // used only by the preview
  var page = document.body.getAttribute('data-page');
  var view = document.getElementById('view');
  var side = document.getElementById('side');

  /* ---------- tiny DOM helper (text is always set as text, never HTML) ---------- */
  function h(tag, cls, kids) {
    var el = document.createElement(tag);
    if (cls) { el.className = cls; }
    (kids || []).forEach(function (k) {
      if (k === null || k === undefined) { return; }
      el.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    });
    return el;
  }
  function link(href, text, cls) {
    var a = h('a', cls, [text]);
    a.setAttribute('href', href);
    return a;
  }

  /* ---------- addresses ---------- */
  function homeUrl() { return hashMode ? '#' : 'index.html'; }
  function topicUrl(slug) { return hashMode ? '#' + slug : 'topic.html?t=' + encodeURIComponent(slug); }

  function boardById(id) {
    for (var i = 0; i < DATA.boards.length; i++) {
      if (DATA.boards[i].id === id) { return DATA.boards[i]; }
    }
    return null;
  }
  function topicBySlug(slug) {
    for (var i = 0; i < DATA.topics.length; i++) {
      if (DATA.topics[i].slug === slug) { return DATA.topics[i]; }
    }
    return null;
  }
  function topicsIn(boardId) {
    var list = DATA.topics.filter(function (t) { return t.board === boardId; });
    // pinned first, otherwise keep the order written in forum_data.js
    return list.filter(function (t) { return t.pinned; }).concat(list.filter(function (t) { return !t.pinned; }));
  }

  /* ---------- windows ---------- */
  function win(title, bodyKids, extraCls) {
    return h('section', 'win' + (extraCls ? ' ' + extraCls : ''), [
      h('div', 'win__bar', [title]),
      h('div', 'win__body', bodyKids)
    ]);
  }

  function topicRow(t) {
    var a = link(topicUrl(t.slug), '', 'trow');
    var tag = h('span', 'trow__tag' + (t.pinned ? ' trow__tag--pin' : ''), [t.pinned ? '[PIN]' : '<TXT>']);
    var main = h('span', 'trow__main', [
      h('span', 'trow__title', [t.title]),
      h('span', 'trow__blurb', [t.blurb || ''])
    ]);
    var date = h('span', 'trow__date', [t.date || '']);
    a.appendChild(tag);
    a.appendChild(main);
    a.appendChild(date);
    return a;
  }

  /* ---------- sidebar ---------- */
  function renderSide(extra) {
    side.textContent = '';
    side.appendChild(h('div', 'win', [
      h('div', 'win__bar', ['SYSOP.LOG']),
      h('div', 'sysop', [
        '> board: ONLINE', h('br'),
        '> topics: SYSOP ONLY', h('br'),
        '> replies: OPEN', h('br'),
        '> login: GITHUB', h('br'),
        '> mode: MODERATED'
      ])
    ]));
    if (extra) { side.appendChild(extra); }
    side.appendChild(h('div', 'sidenote', ['A GitHub account is required to post a reply.']));
  }

  /* ---------- home ---------- */
  function renderHome() {
    document.title = 'The Order of the Machine Tower Forum';
    renderSide(null);
    view.textContent = '';

    view.appendChild(win('C:\\FORUM\\RULES.TXT', [
      h('p', null, ['Please do not submit illegal content, spam, illicit content, or links to said content.']),
      h('p', null, ['A GitHub account is required to use this forum. Users who violate these rules will be reported and removed.']),
      h('p', 'thanks', ['Thank you.'])
    ], 'win--rules'));

    DATA.boards.forEach(function (b, i) {
      var list = topicsIn(b.id);
      var rows = list.length
        ? list.map(topicRow)
        : [h('p', 'empty', ['No topics here yet.'])];
      var box = win('C:\\FORUM\\' + b.name.replace(/^THE /, '') + '\\> DIR', [
        h('p', 'board__blurb', [b.blurb || '']),
        h('div', 'tlist', rows)
      ], i % 2 === 1 ? 'win--alt' : '');
      box.id = 'board-' + b.id;
      view.appendChild(box);
    });
  }

  /* ---------- topic ---------- */
  // In the preview only: a stand-in where the comment box goes
  function previewReplies(t) {
    return win('REPLIES.LOG', [
      h('p', 'replies__note', ['Sign in with GitHub to reply. Replies appear below.']),
      h('div', 'placeholder', [
        h('div', 'placeholder__head', ['[ COMMENT BOX ]']),
        h('p', null, ['On your live forum the giscus comment box loads here. This preview cannot load it.']),
        h('p', null, ['Thread id: ' + t.slug])
      ])
    ], 'win--alt');
  }

  function renderNotFound() {
    document.title = 'Topic Not Found';
    renderSide(null);
    view.textContent = '';
    var rows = DATA.topics.map(topicRow);
    view.appendChild(win('ERROR 404', [
      h('p', 'bigerr', ['TOPIC NOT FOUND']),
      h('p', null, ['That topic does not exist or was moved. Pick one from the list.']),
      h('div', 'tlist', rows)
    ], 'win--rules'));
  }

  function renderTopic(slug) {
    var t = topicBySlug(slug);
    if (!t) { renderNotFound(); return; }
    var board = boardById(t.board);

    document.title = t.title + ' - The Order of the Machine Tower Forum';

    // sidebar: other topics in the same board
    var others = topicsIn(t.board).filter(function (o) { return o.slug !== t.slug; });
    var extra = null;
    if (others.length) {
      var items = others.map(function (o) {
        return h('li', null, [link(topicUrl(o.slug), o.title)]);
      });
      extra = h('div', 'win', [
        h('div', 'win__bar', ['SAME BOARD']),
        h('ul', 'sidelist', items)
      ]);
    }
    renderSide(extra);

    view.textContent = '';

    var crumbs = h('nav', 'crumbs', [
      link(homeUrl(), 'FORUM'), ' \\ ',
      link(homeUrl(), board ? board.name : 'BOARD'), ' \\ ',
      h('span', null, [t.slug])
    ]);
    crumbs.setAttribute('aria-label', 'Breadcrumb');
    view.appendChild(crumbs);

    view.appendChild(win('C:\\FORUM\\' + (board ? board.name.replace(/^THE /, '') : 'BOARD') + '\\' + t.slug.toUpperCase() + '.TXT', [
      h('h2', 'topic__title', [t.title]),
      h('p', 'topic__blurb', [t.blurb || '']),
      h('p', 'topic__meta', ['OPENED ' + (t.date || '') + (t.pinned ? '   [PINNED]' : '')])
    ]));

    // On the live site the comment box and back button are written in topic.html
    if (hashMode) {
      view.appendChild(previewReplies(t));
      view.appendChild(h('div', 'actions', [
        link(homeUrl(), '< BACK TO ALL TOPICS', 'btn-forum')
      ]));
    }
  }

  /* ---------- routing ---------- */
  function currentSlug() {
    if (hashMode) { return window.location.hash.replace('#', ''); }
    if (page === 'topic') {
      try { return new URLSearchParams(window.location.search).get('t') || ''; } catch (e) { return ''; }
    }
    return null;
  }
  function render() {
    var slug = currentSlug();
    var wantTopic = hashMode ? !!slug : page === 'topic';
    if (wantTopic) { renderTopic(slug); } else { renderHome(); }
    updateLinks();
  }

  /* ---------- links that depend on the page ---------- */
  function currentTheme() { return document.documentElement.getAttribute('data-theme') || 'A'; }
  function updateLinks() {
    var homes = document.querySelectorAll('[data-link="home"]');
    for (var i = 0; i < homes.length; i++) { homes[i].setAttribute('href', homeUrl()); }
    // The main site is on another address, so the theme travels in the link
    var mains = document.querySelectorAll('[data-link="main"]');
    for (var j = 0; j < mains.length; j++) {
      mains[j].setAttribute('href', DATA.config.mainSite + '?theme=' + currentTheme());
    }
  }

  /* ---------- theme buttons ---------- */
  (function () {
    var buttons = document.querySelectorAll('[data-set-theme]');
    function mark(t) {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-set-theme') === t ? 'true' : 'false');
      }
    }
    mark(currentTheme());
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var t = this.getAttribute('data-set-theme');
        document.documentElement.setAttribute('data-theme', t);
        mark(t);
        try { window.localStorage.setItem('ootmt-theme', t); } catch (e) {}
        if (!hashMode) {
          try {
            var u = new URL(window.location.href);
            u.searchParams.set('theme', t);
            window.history.replaceState(null, '', u.toString());
          } catch (e) {}
        }
        updateLinks();
      });
    }
  })();

  if (hashMode) { window.addEventListener('hashchange', function () { render(); window.scrollTo(0, 0); }); }
  render();
})();
