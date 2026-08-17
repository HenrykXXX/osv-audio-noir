/* OSV Audio — Noir. Small, dependency-free. */
(function () {
  'use strict';

  /* --- sticky header hairline --- */
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- mobile navigation --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* --- reveal on scroll --- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- graceful image fallbacks -------------------------------------
     Any <img> that fails is replaced by a labelled placeholder block,
     so a missing or not-yet-shot photograph never breaks the layout.
     The wordmark falls back to letterspaced type.                     */
  function fallback(im) {
    if (im.dataset.fb) return;
    im.dataset.fb = '1';
    if (im.closest('.brandmark')) {
      var s = document.createElement('span');
      s.className = 'fallback';
      s.textContent = 'OSV Audio';
      im.replaceWith(s);
      return;
    }
    var d = document.createElement('div');
    d.className = 'photo-ph';
    d.textContent = im.getAttribute('data-ph') || im.alt || 'photograph';
    im.replaceWith(d);
  }
  function sweep() {
    document.querySelectorAll('img').forEach(function (im) {
      if (im.complete && im.naturalWidth === 0) fallback(im);
    });
  }
  document.querySelectorAll('img').forEach(function (im) {
    im.addEventListener('error', function () { fallback(im); });
  });
  sweep();
  window.addEventListener('load', sweep);

  /* --- contact form: front-end validation only ---------------------
     There is no back end here. Point the <form action> at your own
     handler (Formspree, Netlify Forms, or a PHP script) before going
     live — see README.md.                                            */
  var form = document.querySelector('form[data-osv-form]');
  if (form) {
    form.addEventListener('submit', function (ev) {
      var email = form.querySelector('#email');
      var repeat = form.querySelector('#email2');
      var out = form.querySelector('.form-status');
      if (email && repeat && email.value !== repeat.value) {
        ev.preventDefault();
        if (out) { out.textContent = 'The two e-mail addresses do not match.'; out.style.color = '#c08f4e'; }
        return;
      }
      if (!form.getAttribute('action')) {
        ev.preventDefault();
        if (out) {
          out.textContent = 'Demo only — connect this form to a handler before going live.';
          out.style.color = '#9a9da4';
        }
      }
    });
  }
})();
