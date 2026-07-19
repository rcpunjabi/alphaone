/* Alpha One Garage Door Service — site interactions
   Ported from the brand design system's component logic. */
(function () {
  "use strict";

  // ---- Service modal content (from the design system) ----
  var SERVICES = {
    install: {
      title: "Garage Door Installation and Replacement",
      mediaClass: "media-installation",
      body: "Looking to upgrade your home or business with a new or replacement garage door? We offer a wide selection of garage doors to fit every need and aesthetic. Choose from a diverse range of sizes, colors, and styles to perfectly complement your property. Whether you're seeking enhanced curb appeal for your home or a durable, functional solution for your business, we have the ideal garage door for you."
    },
    repair: {
      title: "Garage Door Repair",
      mediaClass: "media-repair",
      body: "Is your garage door acting up? Whether it's stuck closed, refusing to open, or a spring has snapped, a broken garage door can be a major inconvenience and a safety concern. To ensure safe and reliable operation, both your garage door and opener require periodic inspection and maintenance. We're here to handle all your garage door repair needs, big or small. Don't risk your personal safety by attempting a DIY fix — contact us today for professional and prompt service!"
    },
    opener: {
      title: "Garage Door Openers",
      mediaClass: "media-openers",
      body: "A modern opener should be reliable, secure, and easy to use. We service and install belt, chain, screw-drive, and smart openers, then show you exactly how everything works before we leave."
    }
  };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // ---- Service modal ----
  var modal = $("[data-modal]");
  var modalTitle = $("[data-modal-title]");
  var modalBody = $("[data-modal-body]");
  var modalPhoto = $("[data-modal-photo]");

  function openModal(key) {
    var svc = SERVICES[key];
    if (!svc || !modal) return;
    modalTitle.textContent = svc.title;
    modalBody.textContent = svc.body;
    if (modalPhoto) {
      modalPhoto.className = "photo-slot modal__photo media-image " + svc.mediaClass;
    }
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  $all("[data-service]").forEach(function (card) {
    card.addEventListener("click", function () { openModal(card.getAttribute("data-service")); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card.getAttribute("data-service")); }
    });
  });
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    $all("[data-modal-close]").forEach(function (b) { b.addEventListener("click", closeModal); });
  }

  // ---- Mobile drawer ----
  var drawer = $("[data-drawer]");
  function openDrawer() { if (drawer) { drawer.classList.add("is-open"); document.body.style.overflow = "hidden"; } }
  function closeDrawer() { if (drawer) { drawer.classList.remove("is-open"); document.body.style.overflow = ""; } }
  $all("[data-drawer-open]").forEach(function (b) { b.addEventListener("click", openDrawer); });
  $all("[data-drawer-close]").forEach(function (b) { b.addEventListener("click", closeDrawer); });

  // ---- Esc closes overlays ----
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeDrawer(); }
  });

  // ---- Quote forms ----
  // NOTE: there is no backend wired up yet. On submit we show the success
  // state from the design. To actually deliver leads, point `action` at an
  // email/form endpoint (e.g. Formspree, Netlify Forms, or your own handler)
  // and remove the preventDefault() below.
  function handleQuote(form, successEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (successEl) { successEl.hidden = false; }
      form.querySelectorAll(".field, .mini-field").forEach(function (f) {
        if (f.tagName !== "SELECT") f.value = "";
      });
      if (successEl) { successEl.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }

  var quoteForm = $("[data-quote-form]");
  if (quoteForm) handleQuote(quoteForm, $("[data-quote-success]", quoteForm));

  // hero quick form: hand off to the main contact form
  var quick = $("[data-quick-form]");
  if (quick) {
    quick.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!quick.checkValidity()) { quick.reportValidity(); return; }
      var main = $("[data-quote-form]");
      var contact = document.getElementById("contact");
      if (main) {
        var n = quick.querySelector('[name="name"]');
        var p = quick.querySelector('[name="phone"]');
        var s = quick.querySelector('[name="service"]');
        if (n) { var mn = main.querySelector('[name="name"]'); if (mn) mn.value = n.value; }
        if (p) { var mp = main.querySelector('[name="phone"]'); if (mp) mp.value = p.value; }
      }
      if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ---- GoHighLevel forms ----
  // Defer third-party form frames until a visitor approaches them. The fixed
  // wrapper height is reserved in CSS so loading the form does not move content.
  function activateGhlForm(frame) {
    var source = frame.getAttribute("data-src");
    if (!source || frame.getAttribute("src")) return;
    var wrap = frame.closest ? frame.closest(".ghl-form-wrap") : null;
    frame.addEventListener("load", function () {
      // The GHL frame loads Roboto/Inter after its document arrives. Keep the
      // reserved frame hidden briefly so those internal font swaps cannot
      // contribute to the parent page's visible layout-shift score.
      window.setTimeout(function () {
        if (wrap) wrap.classList.add("is-loaded");
      }, 1200);
    }, { once: true });
    frame.setAttribute("src", source);
  }

  var ghlForms = $all("iframe[data-ghl-lazy]");
  if (ghlForms.length) {
    if ("IntersectionObserver" in window) {
      var formObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          activateGhlForm(entry.target);
          formObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px", threshold: 0.15 });
      ghlForms.forEach(function (frame) { formObserver.observe(frame); });
    } else {
      ghlForms.forEach(activateGhlForm);
    }
  }
})();
