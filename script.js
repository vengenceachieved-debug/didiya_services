document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Scroll-triggered reveal for elements marked class="reveal" (cards, list
  // items, steps, testimonials). Falls back to showing everything instantly
  // if IntersectionObserver isn't available, or if the visitor has reduced
  // motion turned on at the OS level.
  var revealEls = document.querySelectorAll('.reveal');
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealEls.length && 'IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Crossfading background slideshows — any .slideshow container with 2+
  // .slideshow-slide children cycles automatically. Skipped for visitors
  // with reduced motion set (first slide just stays put).
  if (!reducedMotion) {
    document.querySelectorAll('.slideshow').forEach(function (box) {
      var slides = box.querySelectorAll('.slideshow-slide');
      if (slides.length < 2) return;
      var current = 0;
      setInterval(function () {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 4500);
    });
  }

  var form = document.getElementById('quoteForm');
  var success = document.getElementById('formSuccess');
  // Posts to the Formspree endpoint set in contact.html's form action="" —
  // that's live now (Didiya Quote Requests). First real submission triggers
  // a one-time confirmation email from Formspree that needs to be clicked
  // before the form starts delivering to the inbox.
  // For a no-login way to see requests as they come in, connect the same
  // Formspree form to a Google Sheet via Zapier or Make (both have free tiers).
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('.submit-btn');
      if (submitBtn) submitBtn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          if (success) success.style.display = 'block';
          form.reset();
        } else {
          alert('Something went wrong sending your request — please call or email us directly.');
        }
      }).catch(function () {
        alert('Something went wrong sending your request — please call or email us directly.');
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
});

/* ---------------------------------------------------------------------
   LIVE CHAT (Tawk.to) — free live chat widget, shows on every page.
   1. Create a free account at https://www.tawk.to
   2. Add a property, grab your Property ID and Widget ID from
      Admin > Channels > Chat Widget > Widget Settings
   3. Replace YOUR_PROPERTY_ID and YOUR_WIDGET_ID below.
   Until replaced, this script is inactive (Tawk.to will just ignore the
   placeholder IDs), so it's safe to leave in while testing.
--------------------------------------------------------------------- */
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();
