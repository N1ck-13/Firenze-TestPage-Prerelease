// FIRENZE — shared site behaviour
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- header scroll state ---------- */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40){ header.classList.add('is-scrolled'); }
    else { header.classList.remove('is-scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal, .reveal-scale, .stitch-divider');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- staggered reveal index ---------- */
  document.querySelectorAll('.stagger').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--i', i);
    });
  });

  /* ---------- prefill "what are you looking for" from ?item= ---------- */
  var params = new URLSearchParams(window.location.search);
  var item = params.get('item');
  var interestField = document.querySelector('#interest');
  if (item && interestField) {
    var match = Array.prototype.find.call(interestField.options, function (o) {
      return o.value.toLowerCase() === item.toLowerCase();
    });
    if (match) { interestField.value = match.value; }
  }

  /* ---------- contact form: front-end only ----------
     No backend is wired up yet. This simply confirms
     submission in the UI — connect a form handler or
     email service before launch. */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('#form-success');
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }

  /* ---------- newsletter: front-end only ---------- */
  var newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button');
      var input = newsletterForm.querySelector('input');
      if (btn) { btn.textContent = 'Subscribed ✓'; }
      if (input) { input.value = ''; input.placeholder = 'Thank you — welcome to FIRENZE'; }
    });
  }

});
