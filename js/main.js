/* Alpha One Garage Door Service — site interactions
   Ported from the brand design system's component logic. */
(function () {
  "use strict";

  // ---- Service modal content (from the design system) ----
  var SERVICES = {
    install: {
      title: "Garage Door Installation and Replacement",
      mediaClass: "media-installation",
      body: "Looking to upgrade your home or business with a new or replacement garage door? We offer a wide selection of garage doors to fit every need and aesthetic. Choose from a diverse range of sizes, colors, and styles to perfectly complement your property. Whether you're seeking enhanced curb appeal for your home or a durable, functional solution for your business, we have the ideal garage door for you.",
      primaryHref: "contact.html",
      primaryLabel: "Request Estimate",
      detailsHref: "installation.html",
      detailsLabel: "View Installation Details"
    },
    repair: {
      title: "Garage Door Repair",
      mediaClass: "media-repair",
      body: "Is your garage door acting up? Whether it's stuck closed, refusing to open, or a spring has snapped, a broken garage door can be a major inconvenience and a safety concern. To ensure safe and reliable operation, both your garage door and opener require periodic inspection and maintenance. We're here to handle all your garage door repair needs, big or small. Don't risk your personal safety by attempting a DIY fix — contact us today for professional and prompt service!",
      primaryHref: "tel:+16308350008",
      primaryLabel: "Call for Repair",
      detailsHref: "repair.html",
      detailsLabel: "View Repair Details"
    },
    opener: {
      title: "Garage Door Openers",
      mediaClass: "media-openers",
      body: "A modern opener should be reliable, secure, and easy to use. We service and install belt, chain, screw-drive, and smart openers, then show you exactly how everything works before we leave.",
      primaryHref: "tel:+16308350008",
      primaryLabel: "Call About an Opener",
      detailsHref: "openers.html",
      detailsLabel: "View Opener Details"
    }
  };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // ---- Service modal ----
  var modal = $("[data-modal]");
  var modalTitle = $("[data-modal-title]");
  var modalBody = $("[data-modal-body]");
  var modalPhoto = $("[data-modal-photo]");
  var modalPrimary = $("[data-modal-primary]");
  var modalPrimaryLabel = $("[data-modal-primary-label]");
  var modalDetails = $("[data-modal-details]");
  var modalDetailsLabel = $("[data-modal-details-label]");

  function openModal(key) {
    var svc = SERVICES[key];
    if (!svc || !modal) return;
    modalTitle.textContent = svc.title;
    modalBody.textContent = svc.body;
    if (modalPhoto) {
      modalPhoto.className = "photo-slot modal__photo media-image " + svc.mediaClass;
    }
    if (modalPrimary) modalPrimary.setAttribute("href", svc.primaryHref);
    if (modalPrimaryLabel) modalPrimaryLabel.textContent = svc.primaryLabel;
    if (modalDetails) modalDetails.setAttribute("href", svc.detailsHref);
    if (modalDetailsLabel) modalDetailsLabel.textContent = svc.detailsLabel;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  $all("[data-service-open]").forEach(function (button) {
    button.addEventListener("click", function () { openModal(button.getAttribute("data-service-open")); });
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

  // Keep the same high-intent Call/Text actions available on every mobile page.
  if (!$('.mobile-action-bar')) {
    var quickContact = document.createElement("nav");
    quickContact.className = "mobile-action-bar";
    quickContact.setAttribute("aria-label", "Quick contact");
    quickContact.innerHTML = '<a class="mobile-action-bar__call" href="tel:+16308350008">Call Now</a><a class="mobile-action-bar__text" href="sms:+16308350008">Text a Photo</a>';
    document.body.appendChild(quickContact);
  }

  // ---- Esc closes overlays ----
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeDrawer(); }
  });

  // ---- GoHighLevel forms ----
  // The single primary form loads eagerly. A visible Call/Text fallback remains
  // available even when a privacy tool blocks the third-party iframe.
  function prepareGhlForm(frame) {
    var wrap = frame.closest ? frame.closest(".ghl-form-wrap") : null;
    frame.addEventListener("load", function () {
      window.setTimeout(function () {
        if (wrap) wrap.classList.add("is-loaded");
      }, 500);
    }, { once: true });
    window.setTimeout(function () {
      if (wrap) wrap.classList.add("is-loaded");
    }, 4000);
  }

  $all("iframe[data-ghl-form]").forEach(prepareGhlForm);
})();
