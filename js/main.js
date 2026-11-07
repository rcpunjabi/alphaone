/* Alpha One Garage Door Service — native links and mobile navigation. */
(function () {
  "use strict";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // Service cards and CTAs are native anchors. Do not intercept navigation.
  var drawer = $("[data-drawer]");
  var drawerOpeners = $all("[data-drawer-open]");
  var returnFocus = null;
  var previousOverflow = "";

  function drawerIsOpen() { return drawer && drawer.classList.contains("is-open"); }
  function drawerFocusables() {
    return drawer ? $all('a[href], button:not([disabled]), [tabindex="0"]', drawer).filter(function (element) {
      return element.getClientRects().length > 0;
    }) : [];
  }
  function openDrawer(event) {
    if (!drawer || drawerIsOpen()) return;
    returnFocus = event && event.currentTarget ? event.currentTarget : document.activeElement;
    previousOverflow = document.body.style.overflow;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    drawerOpeners.forEach(function (button) { button.setAttribute("aria-expanded", "true"); });
    document.body.style.overflow = "hidden";
    var focusables = drawerFocusables();
    (focusables[0] || drawer).focus();
  }
  function closeDrawer(restoreFocus) {
    if (!drawerIsOpen()) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    drawerOpeners.forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    document.body.style.overflow = previousOverflow;
    if (restoreFocus !== false && returnFocus && returnFocus.focus) returnFocus.focus();
  }
  drawerOpeners.forEach(function (button) { button.addEventListener("click", openDrawer); });
  $all("[data-drawer-close]").forEach(function (control) {
    control.addEventListener("click", function () { closeDrawer(control.tagName !== "A"); });
  });

  document.addEventListener("keydown", function (event) {
    if (!drawerIsOpen()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
    } else if (event.key === "Tab") {
      var focusables = drawerFocusables();
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (!first) { event.preventDefault(); drawer.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    }
  });

  // Keep the same high-intent Call/Text actions available on every mobile page.
  if (!$('.mobile-action-bar')) {
    var quickContact = document.createElement("nav");
    quickContact.className = "mobile-action-bar";
    quickContact.setAttribute("aria-label", "Quick contact");
    quickContact.innerHTML = '<a class="mobile-action-bar__call" href="tel:+16308350008">Call Now</a><a class="mobile-action-bar__text" href="sms:+16308350008">Text a Photo</a>';
    document.body.appendChild(quickContact);
  }

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
