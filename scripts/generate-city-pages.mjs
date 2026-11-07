import { writeFileSync } from "node:fs";

const cities = [
  {
    "slug": "lombard-garage-door-service",
    "name": "Lombard",
    "region": "IL",
    "postal": "60148",
    "intro": "Alpha One Garage Door Service is based in Lombard and serves local homes and businesses with garage door installation, repair, opener, maintenance, and 24/7 emergency service.",
    "localNote": "Lombard is our home base. Call for help with a stuck door, broken spring, opener problem, planned replacement, or commercial overhead door.",
    "guidanceTitle": "Garage door help from our Lombard base",
    "guidanceHtml": "<p>Alpha One is based at 1311 S Addison Ave, Lombard, IL 60148. For a stuck door, broken spring, or urgent repair, <a href=\"tel:+16308350008\">call (630) 835-0008</a>. You can also <a href=\"sms:+16308350008\">text a photo</a> and describe what the door is doing.</p><p>Planning a replacement or commercial project? Use the <a href=\"contact.html\">written-estimate form</a> to share the type of work you need. Our <a href=\"installation.html\">installation page</a> explains the consultation, measurements, door selection, and installation process.</p>",
    "faqs": [
      [
        "Where is Alpha One based?",
        "Alpha One Garage Door Service is based at 1311 S Addison Ave, Lombard, IL 60148, and serves homes and businesses across Lombard and the western suburbs."
      ]
    ]
  },
  {
    "slug": "glen-ellyn-garage-door-service",
    "name": "Glen Ellyn",
    "region": "IL",
    "postal": "60137 and 60138",
    "intro": "Alpha One Garage Door Service serves Glen Ellyn homes and businesses with garage door installation, repair, opener, maintenance, and 24/7 emergency service.",
    "localNote": "From planned door replacements to urgent repairs, Glen Ellyn customers can call one local team for residential and commercial garage door work.",
    "guidanceTitle": "Plan your Glen Ellyn repair or replacement",
    "guidanceHtml": "<p>Glen Ellyn service coverage includes ZIP codes 60137 and 60138. Share your ZIP code and whether you need a repair, replacement, opener, or commercial service when you <a href=\"contact.html\">request an estimate</a>.</p><p>For a new door, compare the available <a href=\"installation.html\">materials, insulation, styles, and installation process</a>. A new door can also be paired with a compatible <a href=\"openers.html\">garage door opener</a>. For a door that will not open or close, call rather than waiting for a written estimate.</p>",
    "faqs": [
      [
        "Can you install a door and opener together in Glen Ellyn?",
        "Yes. Alpha One can pair a new garage door with a matched opener and install the related hardware and safety sensors. The process starts with a consultation and measurements."
      ]
    ]
  },
  {
    "slug": "wheaton-garage-door-service",
    "name": "Wheaton",
    "region": "IL",
    "postal": "60187 and 60189",
    "intro": "Alpha One Garage Door Service serves Wheaton homes and businesses with garage door installation, repair, opener, maintenance, and 24/7 emergency service.",
    "localNote": "Wheaton customers can call for broken springs, off-track doors, opener issues, preventive maintenance, new doors, and commercial garage door service.",
    "guidanceTitle": "Compare repair and replacement in Wheaton",
    "guidanceHtml": "<p>Wheaton service coverage includes ZIP codes 60187 and 60189. If a single component has failed and the door is otherwise sound, a <a href=\"repair.html\">garage door repair</a> may be worth considering. Significant door damage or several failing components may make <a href=\"installation.html\">replacement</a> worth discussing.</p><p>Read our <a href=\"blog-repair-or-replace.html\">repair-or-replace guide</a>, then <a href=\"contact.html\">request an assessment or estimate</a> for your door. For urgent trouble, call (630) 835-0008 and describe what is happening. Availability depends on the location and type of work.</p>",
    "faqs": [
      [
        "How do I decide between repair and replacement in Wheaton?",
        "Consider the condition of the door and whether the problem is one component or several. A technician can inspect the system and explain the repair and replacement options before you approve work."
      ]
    ]
  }
];

const services = [
  ["installation.html", "Installation & Replacement", "New and replacement residential or commercial garage doors, measured and installed for the property."],
  ["repair.html", "Garage Door Repair", "Broken springs, off-track doors, damaged panels, noisy operation, and doors that will not open or close."],
  ["openers.html", "Garage Door Openers", "Opener diagnosis, repair, replacement, remotes, keypads, safety sensors, and modern access options."],
  ["maintenance.html", "Maintenance & Tune-Ups", "Inspection, lubrication, balance checks, hardware adjustments, and safety-system testing."],
  ["commercial.html", "Commercial Garage Doors", "Installation, repair, operators, and preventive maintenance for shops, warehouses, and other facilities."],
];

const serviceCards = services.map(([href, title, text]) => `
        <a href="${href}" style="text-decoration:none;color:inherit;background:#fff;border:2px solid var(--color-ink-900);border-radius:4px;box-shadow:4px 4px 0 var(--color-ink-900);padding:28px;display:block;">
          <h3 style="font-family:var(--font-display);font-weight:800;text-transform:uppercase;font-size:21px;margin:0 0 8px;">${title}</h3>
          <p style="font-family:var(--font-body);font-size:15px;line-height:1.55;color:var(--color-steel-500);margin:0 0 14px;">${text}</p>
          <span class="link">View service</span>
        </a>`).join("");

const footer = `
  <footer class="footer">
    <div class="container" style="max-width:1240px;">
      <div class="footer__grid">
        <div class="footer__brand">
          <img src="assets/logo-b-640.webp" width="640" height="164" alt="Alpha One Garage Door Service" loading="lazy" style="height:40px;width:auto;">
          <p>Locally owned garage door installation and repair for homes and businesses — residential &amp; commercial. Proudly serving Lombard, IL and the Chicagoland Area since 2003.</p>
          <div class="footer__badges"><span class="badge badge--outline-light">Licensed</span><span class="badge badge--outline-light">Insured</span></div>
          <div class="footer__social" style="display:flex;gap:10px;margin-top:16px;">
            <a href="https://instagram.com/alphaonegrp" aria-label="Instagram" target="_blank" rel="noopener" style="color:#fff;">Instagram</a>
            <a href="https://facebook.com/alphaonegrp" aria-label="Facebook" target="_blank" rel="noopener" style="color:#fff;">Facebook</a>
            <a href="https://tiktok.com/@alphaonegrp" aria-label="TikTok" target="_blank" rel="noopener" style="color:#fff;">TikTok</a>
          </div>
        </div>
        <div class="footer__col"><h3>Services</h3><ul><li><a href="installation.html">Installation &amp; Replacement</a></li><li><a href="repair.html">Repair</a></li><li><a href="openers.html">Openers</a></li><li><a href="maintenance.html">Maintenance</a></li><li><a href="commercial.html">Commercial</a></li></ul></div>
        <div class="footer__col"><h3>Company</h3><ul><li><a href="about.html">About</a></li><li><a href="service-area.html">Service Area</a></li><li><a href="blog.html">Blog</a></li><li><a href="contact.html">Contact</a></li></ul></div>
        <div class="footer__col"><h3>Get In Touch</h3><div class="footer__contact"><strong><a href="tel:+16308350008" style="text-decoration:none;">(630) 835-0008</a></strong><br><a href="mailto:info@alphaonegarage.com" style="text-decoration:none;">info@alphaonegarage.com</a><br><a href="https://www.google.com/maps/search/?api=1&amp;query=Alpha+One+Garage+Door+Service+1311+S+Addison+Ave+Lombard+IL+60148" target="_blank" rel="noopener" style="text-decoration:none;">1311 S Addison Ave<br>Lombard, IL 60148</a><br><strong>Open 24/7</strong></div></div>
      </div>
      <div class="footer__bottom"><small>© 2026 Alpha One Garage Door Service · All rights reserved</small><small><a href="sitemap.xml" style="color:inherit;">Sitemap</a></small></div>
    </div>
  </footer>`;

function page(city) {
  const otherCities = cities.filter((item) => item.slug !== city.slug).map((item) => `<a class="btn btn--ghost" href="${item.slug}.html"><span>${item.name}</span></a>`).join("\n        ");
  const faqs = [
    [`What garage door services do you provide in ${city.name}?`, `Alpha One provides garage door installation and replacement, repair, opener service, maintenance and tune-ups, commercial garage door service, and 24/7 emergency service in ${city.name}.`],
    [`Do you offer emergency garage door service in ${city.name}?`, `Yes. Alpha One provides 24/7 emergency garage door service. Call (630) 835-0008 when a door cannot wait.`],
    ["Can I request a free estimate?", "Yes. You can book a free estimate online or call (630) 835-0008 to discuss the door, opener, repair, or replacement you need."],
    ["Do you work on residential and commercial garage doors?", "Yes. Alpha One installs, repairs, and maintains garage doors for both homes and businesses."],
    ...city.faqs,
  ];
  const faqJson = faqs.map(([question, answer]) => ({"@type": "Question", name: question, acceptedAnswer: {"@type": "Answer", text: answer}}));
  const faqHtml = faqs.map(([question, answer]) => `
        <details style="background:#fff;border:1px solid var(--border-default);border-radius:4px;padding:20px 22px;">
          <summary style="font-family:var(--font-display);font-weight:800;text-transform:uppercase;font-size:17px;cursor:pointer;">${question}</summary>
          <p style="font-family:var(--font-body);font-size:16px;line-height:1.6;color:var(--color-steel-500);margin:14px 0 0;">${answer}</p>
        </details>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://www.alphaonegarage.com/${city.slug}.html#service`,
        name: `Garage door service in ${city.name}, Illinois`,
        serviceType: "Garage door installation, repair, openers, maintenance, and emergency service",
        url: `https://www.alphaonegarage.com/${city.slug}.html`,
        provider: {"@id": "https://www.alphaonegarage.com/#business"},
        areaServed: {"@type": "City", name: city.name, containedInPlace: {"@type": "State", name: "Illinois"}},
      },
      {"@type": "FAQPage", "@id": `https://www.alphaonegarage.com/${city.slug}.html#faq`, mainEntity: faqJson},
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {"@type": "ListItem", position: 1, name: "Home", item: "https://www.alphaonegarage.com/"},
          {"@type": "ListItem", position: 2, name: "Service Area", item: "https://www.alphaonegarage.com/service-area.html"},
          {"@type": "ListItem", position: 3, name: city.name, item: `https://www.alphaonegarage.com/${city.slug}.html`},
        ],
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-TL54H6R2');</script>
  <!-- End Google Tag Manager -->
  <meta charset="utf-8">
  <meta name="site-release" content="20261107-seo-aeo">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Garage Door Service in ${city.name}, IL | Alpha One Garage Door Service</title>
  <meta name="description" content="Garage door installation, repair, openers, maintenance, commercial service, and 24/7 emergency help in ${city.name}, IL. Call Alpha One at (630) 835-0008.">
  <link rel="canonical" href="https://www.alphaonegarage.com/${city.slug}.html">
  <meta name="theme-color" content="#0B0B0C">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Garage Door Service in ${city.name}, IL | Alpha One Garage Door Service">
  <meta property="og:description" content="Residential and commercial garage door installation, repair, openers, maintenance, and emergency service in ${city.name}.">
  <meta property="og:url" content="https://www.alphaonegarage.com/${city.slug}.html">
  <meta property="og:image" content="https://www.alphaonegarage.com/assets/logo-a-640.webp">
  <link rel="icon" type="image/png" href="assets/logo-a.png">
  <link rel="stylesheet" href="css/site.min.css?v=20260830-performance">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
</head>
<body id="top">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TL54H6R2"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <div>
    <div class="emerg">
      <span class="emerg__pulse"></span>
      <span class="emerg__lede"><span class="accent">24/7</span>Emergency Garage Door Service · Chicagoland</span>
      <span class="emerg__spacer"></span>
      <a class="emerg__phone" href="tel:+16308350008">(630) 835-0008</a>
    </div>
    <div class="hazard-stripe emerg__stripe" style="height:6px;"></div>
  </div>

  <header class="header">
    <div class="header__inner">
      <a class="header__logo" href="index.html#top"><img src="assets/logo-a-640.webp" width="640" height="164" alt="Alpha One Garage Door Service" fetchpriority="high" style="height:38px;width:auto;"></a>
      <nav class="header__nav"><a href="index.html#top">Home</a><a href="index.html#services">Services</a><a href="commercial.html">Commercial</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>
      <div class="header__cta">
        <a class="header__phone" href="tel:+16308350008"><div><span class="header__phone-label">Call 24/7</span><span>(630) 835-0008</span></div></a>
        <a class="btn btn--primary btn--sm" href="https://calendly.com/alphaonegrp/service" target="_blank" rel="noopener"><span>Book Online</span></a>
        <button class="nav-toggle" aria-label="Open menu" data-drawer-open><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16"></path><path d="M4 6h16"></path><path d="M4 18h16"></path></svg></button>
      </div>
    </div>
  </header>

  <main>
    <section class="hero" style="background:var(--color-ink-900);color:#fff;min-height:440px;">
      <div class="hero__copy" style="padding:64px 56px;">
        <div style="font-family:var(--font-display);font-weight:700;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8A8F95;margin-bottom:20px;"><a href="index.html" style="color:#8A8F95;text-decoration:none;">Home</a> / <a href="service-area.html" style="color:#8A8F95;text-decoration:none;">Service Area</a> / <span style="color:#fff;">${city.name}</span></div>
        <span class="badge badge--emergency" style="align-self:flex-start;margin-bottom:18px;">Service area · ${city.name}</span>
        <h1 style="font-family:var(--font-display);font-weight:800;font-size:clamp(40px,6vw,64px);line-height:.95;letter-spacing:-0.015em;text-transform:uppercase;margin:0 0 18px;">Garage Door Service in ${city.name}, Illinois</h1>
        <p style="font-family:var(--font-body);font-size:19px;line-height:1.5;color:#D8DADD;max-width:52ch;margin:0 0 30px;">${city.intro}</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <a class="btn btn--primary" href="contact.html"><span>Request Free Estimate</span></a>
          <a class="btn btn--ghost-light" href="tel:+16308350008"><span>Call (630) 835-0008</span></a>
        </div>
      </div>
      <div class="hero__media"><div class="photo-slot media-image media-hero" style="position:absolute;inset:0;"></div></div>
    </section>

    <section class="section section--bone" style="padding:80px 0;">
      <div class="container" style="max-width:1240px;">
        <div class="section-head"><span class="eyebrow">Garage Door Services</span><h2>One local team for the whole door</h2><p>${city.localNote}</p></div>
        <div class="services__grid">${serviceCards}
        </div>
      </div>
    </section>

    <section class="section section--bone" style="padding:64px 0;">
      <div class="container" style="max-width:920px;">
        <div class="section-head"><span class="eyebrow">Plan Your Service</span><h2>${city.guidanceTitle}</h2></div>
        <div style="font-family:var(--font-body);font-size:17px;line-height:1.7;">${city.guidanceHtml}</div>
      </div>
    </section>

    <section class="section" style="padding:80px 0;">
      <div class="container" style="max-width:920px;">
        <div class="section-head"><span class="eyebrow">${city.name} FAQ</span><h2>Common questions, clear answers</h2><p>Find the right service and the best way to reach us for your door.</p></div>
        <div style="display:grid;gap:14px;">${faqHtml}
        </div>
      </div>
    </section>

    <section class="section section--bone" style="padding:64px 0;">
      <div class="container" style="max-width:920px;text-align:center;">
        <span class="eyebrow" style="justify-content:center;">Nearby Service Areas</span>
        <h2 style="margin-bottom:12px;">Based in Lombard, serving the western suburbs</h2>
        <p style="margin:0 auto 24px;max-width:680px;">We serve ${city.name} ZIP codes ${city.postal}. See the full coverage list or explore another core service area.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a class="btn btn--ghost" href="service-area.html"><span>Full service area</span></a>
          ${otherCities}
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-band__inner" style="max-width:1240px;">
        <div><span class="badge badge--ink">Free estimate · No obligation</span><h2 style="margin-top:16px;">Need garage door help in ${city.name}?</h2><p>Call to discuss the problem or book a free estimate online.</p></div>
        <div class="phone-block"><span class="l">Call us now</span><a class="n" href="tel:+16308350008">(630) 835-0008</a><a class="btn btn--ghost-light" href="https://calendly.com/alphaonegrp/service" target="_blank" rel="noopener"><span>Book online</span></a></div>
      </div>
    </section>
  </main>

${footer}

  <div class="drawer" data-drawer>
    <div class="drawer__top"><img src="assets/logo-b-640.webp" width="640" height="164" alt="Alpha One Garage Door Service" loading="lazy"><button class="drawer__close" aria-label="Close menu" data-drawer-close>×</button></div>
    <nav><a href="index.html#top" data-drawer-close>Home</a><a href="index.html#services" data-drawer-close>Services</a><a href="commercial.html" data-drawer-close>Commercial</a><a href="service-area.html" data-drawer-close>Service Area</a><a href="about.html" data-drawer-close>About</a><a href="blog.html" data-drawer-close>Blog</a><a href="contact.html" data-drawer-close>Contact</a></nav>
    <div class="drawer__foot"><a class="btn btn--primary" href="tel:+16308350008" style="width:100%;justify-content:center;"><span>Call (630) 835-0008</span></a></div>
  </div>

  <script src="js/main.min.js?v=20260830-performance"></script>
</body>
</html>
`;
}

for (const city of cities) {
  writeFileSync(new URL(`../${city.slug}.html`, import.meta.url), page(city), "utf8");
}
