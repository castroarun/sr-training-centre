/* =====================================================================
   SR Training Center — behaviour
   - Shared header, footer and floating WhatsApp/Call buttons
   - Fills lists from js/content.js
   - Motion (reveals, count-ups, drawing lines), gallery viewer, tabs
   - WhatsApp opens straight to a chat; email pop-up; call pop-up;
     registration form (both forms email SR through /api/enquiry)
   No libraries. Every fact comes from window.SR (content.js).
   ===================================================================== */
(function () {
  "use strict";
  const SR = window.SR;
  const C = SR.contact;
  const page = document.body.dataset.page || "home";
  const home = page === "home" ? "" : "index.html";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* "[...]" in content.js = not confirmed yet → yellow "to confirm" tag */
  const txt = (s) => esc(s).replace(/\[([^\]]*)\]/g, '<span class="todo" title="To confirm with SR">$1</span>');
  const isTodo = (s) => /\[.*\]/.test(s);
  const pic = (name, sizes, alt, cls = "", eager = false) =>
    `<img class="${cls}" src="img/${name}-960.webp" srcset="img/${name}-480.webp 480w, img/${name}-960.webp 960w, img/${name}-1600.webp 1600w" sizes="${sizes}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const waLink = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  const ICON = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>',
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.3-8-5.3ZM5.2 7 12 11.5 18.8 7H5.2Z"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2Z"/></svg>'
  };

  /* ---------- shared header ---------- */
  const navItems = [
    ["About", home + "#about"], ["Trades", home + "#trades"], ["How it works", home + "#process"],
    ["Gallery", home + "#gallery"], ["Manpower supply", "manpower-supply.html"], ["Contact", home + "#register"]
  ];
  const header = $("#site-header");
  if (header) {
    header.outerHTML = `
    <div class="topstrip"><div class="wrap">
      <span class="ts-addr"><span class="ts-track">${esc(C.addressLines.join(", "))}</span></span>
      <span>${C.phones.map((p) => `<a href="tel:${p.dial}">${esc(p.display)}</a>`).join(" · ")}<span class="ts-mail"> · <a href="mailto:${C.email}">${esc(C.email)}</a></span></span>
    </div></div>
    <header class="site-header" id="top-header"><div class="wrap">
      <a class="brand" href="${home || "#top"}" aria-label="SR Training Center home"><img src="img/sr-logo.svg" alt="SR Training Center" width="190" height="56"></a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="nav" id="site-nav" aria-label="Main">
        ${navItems.map(([l, h]) => `<a href="${h}"${page === "manpower" && h.startsWith("manpower") ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
        <a class="btn btn-red" href="${home}#register">Register now</a>
      </nav>
    </div></header>`;
    const nav = $("#site-nav"), tog = $(".menu-toggle");
    tog.addEventListener("click", () => { const o = nav.classList.toggle("open"); tog.setAttribute("aria-expanded", o); tog.textContent = o ? "Close" : "Menu"; });
    $$("a", nav).forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); tog.setAttribute("aria-expanded", "false"); tog.textContent = "Menu"; }));
    const hdr = $("#top-header");
    const onScroll = () => hdr.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------- shared footer ---------- */
  const footer = $("#site-footer");
  if (footer) {
    footer.outerHTML = `
    <footer class="site-footer"><div class="wrap">
      <div><img src="img/sr-logo-white.svg" alt="SR Training Center" width="150" height="44"><p style="margin-top:14px;max-width:34ch">Trade testing and hands-on skill training for overseas jobs, at our workshop in Sonallur, Chennai.</p></div>
      <div><h4>Visit</h4><p>${C.addressLines.map(esc).join("<br>")}</p><p style="margin-top:8px">${txt(C.hours)}</p></div>
      <div><h4>Links</h4>${navItems.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}</div>
      <p class="legal">© <span id="yr"></span> SR Training Center · Registered partnership firm No. 1512 of 2015, Chennai (South) · GSTIN ${esc(C.gstin)}</p>
    </div></footer>`;
    $("#yr").textContent = new Date().getFullYear();
  }

  /* ---------- top strip: full address, scrolls only when it doesn't fit ---------- */
  const tsBox = $(".ts-addr"), tsTrack = tsBox && tsBox.firstElementChild;
  if (tsBox && tsTrack) {
    const full = tsTrack.textContent;
    const fit = () => {
      tsBox.classList.remove("scroll"); tsTrack.textContent = full;
      if (reduce || tsTrack.scrollWidth <= tsBox.clientWidth + 1) return;
      tsTrack.innerHTML = `<span>${esc(full)}</span><span aria-hidden="true">${esc(full)}</span>`;
      tsTrack.style.setProperty("--ts-dur", Math.max(14, Math.round(full.length / 4)) + "s");
      tsBox.classList.add("scroll");
    };
    fit(); let tsT; window.addEventListener("resize", () => { clearTimeout(tsT); tsT = setTimeout(fit, 150); });
  }

  /* ---------- floating buttons + pop-ups ---------- */
  const MSG = SR.whatsappMessages;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="float">
      <a class="wa" href="${waLink(MSG.default)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${ICON.wa}</a>
      <button class="mail" type="button" aria-haspopup="dialog" aria-controls="mail-pop" aria-label="Send us an email">${ICON.mail}</button>
      <a class="call" href="tel:${C.phones[0].dial}" aria-label="Call SR Training Center">${ICON.call}</a>
    </div>
    <div class="pop mail-pop" id="mail-pop" role="dialog" aria-label="Send us a message" hidden>
      <button class="x" type="button" aria-label="Close">×</button>
      <h3>Send us a message</h3>
      <p>Our team reads every message and replies by phone or email.</p>
      <form id="mail-form" novalidate>
        <label class="sr-only" for="m-name">Your name</label><input id="m-name" name="name" type="text" placeholder="Your name *" required autocomplete="name" maxlength="80">
        <label class="sr-only" for="m-phone">Mobile / WhatsApp</label><input id="m-phone" name="phone" type="tel" placeholder="Mobile / WhatsApp *" required autocomplete="tel" inputmode="tel" maxlength="20">
        <label class="sr-only" for="m-email">Email (optional)</label><input id="m-email" name="email" type="email" placeholder="Email (optional)" autocomplete="email" maxlength="120">
        <label class="sr-only" for="m-who">I am a</label>
        <select id="m-who" name="who"><option value="candidate">I am a candidate</option><option value="employer">I am an employer / agency</option><option value="other">Other</option></select>
        <label class="sr-only" for="m-msg">Message</label><textarea id="m-msg" name="message" placeholder="Your message *" required maxlength="2000"></textarea>
        <input class="hp" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn-red" type="submit">Send <span class="arrow">→</span></button>
        <p class="status" role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="pop call-pop" id="call-pop" role="dialog" aria-label="Call us" hidden>
      <button class="x" type="button" aria-label="Close">×</button>
      <h3>Call us</h3>
      ${C.phones.map((p) => `<div class="call-row"><p class="who">${esc(p.name)} · ${esc(p.role)}</p><div class="num">${esc(p.display)}</div><button class="btn btn-blue copy-num" type="button" data-num="${esc(p.display)}">Copy number</button></div>`).join("")}
      <p>Dial from your phone. ${txt(C.hours)}</p>
    </div>`);
  const mailPop = $("#mail-pop"), callPop = $("#call-pop");
  const openPop = (p, other) => { other.hidden = true; p.hidden = !p.hidden; if (!p.hidden) (p.querySelector("input,button:not(.x)")).focus(); };
  $(".float .mail").addEventListener("click", () => openPop(mailPop, callPop));
  /* any element with data-mail opens the email pop-up */
  document.addEventListener("click", (e) => { const t = e.target.closest("[data-mail]"); if (!t) return; e.preventDefault(); callPop.hidden = true; mailPop.hidden = false; if (t.dataset.mail) $("#m-who").value = t.dataset.mail; $("#m-name").focus(); });
  /* links with data-wa="employer" etc. go straight to WhatsApp with that message */
  const wireWa = (root = document) => root && $$("[data-wa]", root).forEach((a) => { a.href = waLink(MSG[a.dataset.wa] || MSG.default); a.target = "_blank"; a.rel = "noopener"; });
  wireWa();
  /* Call: phones dial; computers (mouse pointer) see the number to copy */
  $(".float .call").addEventListener("click", (e) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) { e.preventDefault(); openPop(callPop, mailPop); }
  });
  $$(".copy-num").forEach((b) => b.addEventListener("click", () => {
    const done = () => { b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy number"), 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.num).then(done, () => {});
  }));
  $$(".pop .x").forEach((x) => x.addEventListener("click", () => (x.closest(".pop").hidden = true)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { mailPop.hidden = callPop.hidden = true; closeLb && closeLb(); } });

  /* Send an enquiry to /api/enquiry (Resend email). Returns true/false; never throws. */
  const sendEnquiry = async (data) => {
    try {
      const res = await fetch(SR.enquiry.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      return res.ok;
    } catch (_) { return false; }
  };
  const failNote = (lines) => `We couldn't send this right now. Please <a href="${waLink(lines)}" target="_blank" rel="noopener">send it on WhatsApp</a> or call ${esc(C.phones[0].display)}.`;
  $("#mail-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, st = $(".status", f), btn = $("button[type=submit]", f);
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(f).entries());
    btn.disabled = true; st.className = "status"; st.textContent = "Sending…";
    const ok = await sendEnquiry({ kind: "message", ...d, page: location.pathname });
    btn.disabled = false;
    if (ok) { st.className = "status ok"; st.textContent = "Sent. Thank you, our team will get back to you."; f.reset(); }
    else { st.className = "status err"; st.innerHTML = failNote(`Hi SR Training Center, I'm ${d.name} (${d.phone}). ${d.message}`); }
  });

  /* ---------- fill lists from content.js ---------- */
  const fill = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  fill("facts", SR.facts.map((f) => `
    <div class="fact rv" style="--d:${0}s">
      <div class="num ${f.todo ? "todo-num" : ""}" ${f.count ? `data-count="${f.count}" data-from="${f.from || 0}"` : ""}>${esc(f.value)}</div>
      <div class="rule draw"></div>
      <p>${esc(f.label)} ${f.todo ? '<span class="todo">to confirm</span>' : ""}</p>
    </div>`).join(""));

  const ribbonWords = SR.trades.map((t) => t.name).concat(["Trade testing", "Overseas jobs"]);
  fill("ribbon", `<div class="track" aria-hidden="true">${ribbonWords.concat(ribbonWords).concat(ribbonWords).concat(ribbonWords).map((w) => `<span>${esc(w)}</span>`).join("")}</div>`);

  fill("trade-list", SR.trades.map((t, i) => `
    <article class="trade rv" style="--d:${(i % 3) * 0.08}s">
      <div class="ph">${pic(t.photo, "(max-width:760px) 82vw, (max-width:1200px) 33vw, 400px", t.name + " training at SR Training Center")}<span class="tag">${esc(t.tag)}</span></div>
      <div class="body"><h3>${esc(t.name)}</h3><p>${esc(t.text)}</p><div class="use">${esc(t.usedFor)}</div></div>
    </article>`).join(""));
  fill("other-trades", `<span>Also:</span>${SR.otherTrades.map((t) => `<span class="chip">${txt(t)}</span>`).join("")}`);

  fill("steps", `<div class="rail draw" aria-hidden="true"><div class="fill"></div><div class="spark"></div></div>` +
    SR.steps.map((s, i) => `<li class="rv" style="--d:${i * 0.12}s"><span class="n">0${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join(""));

  fill("sector-list", SR.sectors.map((s, i) => `<div class="sector draw rv" style="--d:${i * 0.1}s"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></div>`).join(""));
  fill("countries", SR.countries.map((c) => `<span class="${isTodo(c) ? "unconfirmed" : ""}">${esc(c.replace(/[\[\]]/g, ""))}</span>`).join(""));

  /* registration + people */
  fill("reg-table", SR.registration.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${txt(v)}</td></tr>`).join("") +
    `<tr><th scope="row">Recruiting licence</th><td>Held by our associate SR Global Consultants (eMigrate RA ID RA5772306). <a href="manpower-supply.html">See details</a></td></tr>`);
  const initialsOf = (n) => n.replace(/\./g, "").split(/\s+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  fill("people", SR.people.map((p, i) => `
    <figure class="partner-quote" style="--d:${i * 0.12}s">
      <div class="pq-rule draw" aria-hidden="true"></div>
      <blockquote class="note-hand rv" style="--d:${i * 0.12}s">${txt(p.message)}</blockquote>
      <figcaption class="pq-by rv" style="--d:${0.15 + i * 0.12}s">
        <span class="avatar${i ? " alt" : ""}" aria-hidden="true">${esc(initialsOf(p.name))}</span>
        <span><strong>${esc(p.name)}</strong><span>${esc(p.role)}, ${esc(C.name)}</span></span>
      </figcaption>
    </figure>`).join(""));

  /* testimonials (two groups; honest empty state) */
  const T = SR.testimonials;
  const quoteHTML = (q, kind) => kind === "candidates"
    ? `<figure class="quote rv"><blockquote>${esc(q.quote)}</blockquote><figcaption><div class="who">${esc(q.name)}</div><div class="meta">${esc(q.trade)} · ${esc(q.job)} · ${esc(q.country)} ${q.year ? "· " + esc(q.year) : ""}</div></figcaption></figure>`
    : `<figure class="quote rv"><blockquote>${esc(q.quote)}</blockquote><figcaption><div class="who">${esc(q.name)}</div><div class="meta">${esc(q.designation)}, ${esc(q.company)} · ${esc(q.country)}</div></figcaption></figure>`;
  const emptyHTML = (kind) => `<div class="empty-note"><div class="big">0${kind === "candidates" ? 1 : 2}</div><div>
      <p>${kind === "candidates"
        ? "Stories from our candidates now working abroad will appear here, shared with their permission."
        : "Words from the employers and agencies who hire our candidates will appear here, shared with their permission."}</p>
      <a class="btn" href="#" data-wa="${kind === "candidates" ? "story" : "employer"}">${kind === "candidates" ? "Trained with us? Share your story" : "Hired our candidates? Tell us"}</a></div></div>`;
  const renderVoices = (kind) => {
    const list = T[kind] || [];
    fill("voices-body", list.length ? `<div class="quote-list swipe">${list.map((q) => quoteHTML(q, kind)).join("")}</div>` : emptyHTML(kind));
    wireWa($("#voices-body"));
    $$("#voices-body .rv").forEach((el) => el.classList.add("in"));
  };
  $$(".tabs button").forEach((b) => b.addEventListener("click", () => {
    $$(".tabs button").forEach((x) => x.setAttribute("aria-selected", x === b));
    renderVoices(b.dataset.tab);
  }));
  /* Testimonials: the whole section stays hidden until real ones are added in content.js */
  const vb = document.getElementById("voices-body");
  if (vb) {
    const kinds = page === "manpower" ? ["employers"] : ["candidates", "employers"];
    const filled = kinds.filter((k) => (T[k] || []).length);
    if (!filled.length) vb.closest("section").hidden = true;
    else {
      $$(".tabs button").forEach((b) => { if (!filled.includes(b.dataset.tab)) b.hidden = true; });
      if (filled.length < 2) { const t = $(".tabs"); if (t) t.hidden = true; }
      renderVoices(filled[0]);
    }
  }

  /* manpower page lists */
  const M = SR.manpower;
  fill("licence-table", M.licence.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${txt(v)}</td></tr>`).join(""));
  fill("mp-countries", M.countries.map((c) => `<span class="${isTodo(c) ? "unconfirmed" : ""}">${esc(c.replace(/[\[\]]/g, ""))}</span>`).join(""));
  fill("mp-categories", M.categories.map((c, i) => `<div class="cat rv" style="--d:${i * 0.1}s"><h3>${esc(c.name)}</h3><p>${txt(c.text)}</p></div>`).join(""));
  fill("mp-reasons", M.reasons.map((r, i) => `<div class="reason rv" style="--d:${i * 0.1}s"><div class="n">0${i + 1}</div><h3>${esc(r.title)}</h3><p>${txt(r.text)}</p></div>`).join(""));
  fill("mp-steps", `<div class="rail draw" aria-hidden="true"><div class="fill"></div><div class="spark"></div></div>` +
    M.steps.map((s, i) => `<li class="rv" style="--d:${i * 0.12}s"><span class="n">0${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join(""));
  fill("mp-companies", M.companies.length ? M.companies.map((c) => `<span class="chip">${esc(c)}</span>`).join("")
    : '<span class="todo">Companies we supply to — names shown only with their permission</span>');

  /* contact card */
  fill("contact-card", `
    <h3 style="font-size:1.7rem;font-weight:800;text-transform:uppercase">Visit or call</h3>
    <div><div class="k">Address</div><div class="v">${C.addressLines.map(esc).join("<br>")}</div></div>
    <div><div class="k">Phone</div><div class="v">${C.phones.map((p) => `<a href="tel:${p.dial}">${esc(p.display)}</a> <span class="ph-who">${esc(p.name)}, ${esc(p.role)}</span>`).join("<br>")}</div></div>
    <div><div class="k">WhatsApp</div><div class="v"><a href="#" data-wa="default">${esc(C.phones[0].display)}</a> <span class="ph-who">${esc(C.phones[0].name)}</span></div></div>
    <div><div class="k">Email</div><div class="v"><a href="mailto:${C.email}">${esc(C.email)}</a></div></div>
    <div><div class="k">Hours</div><div class="v">${txt(C.hours)}</div></div>
    <div class="row"><a class="btn btn-red" href="#" data-wa="default">${ICON.wa} WhatsApp us</a><button class="btn btn-line" type="button" data-mail="">${ICON.mail} Email us</button><a class="btn btn-line" href="${C.mapsLink}" target="_blank" rel="noopener">Directions <span class="arrow">→</span></a></div>`);
  wireWa($("#contact-card"));
  const map = document.getElementById("map");
  if (map) map.innerHTML = `<iframe title="Map to SR Training Center" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${C.mapsEmbed}"></iframe>`;

  /* ---------- gallery + viewer ---------- */
  const G = SR.gallery;
  let shown = G, idx = 0, closeLb = null;
  const grid = document.getElementById("gallery-grid");
  const renderGallery = (group) => {
    shown = group === "all" ? G : G.filter((g) => g.group === group);
    /* fill the last row: desktop 4 columns (first photo takes 4 cells), phone 2 columns */
    const n = shown.length, rem = (4 + n - 1) % 4, mrem = (n - 1) % 2;
    const cls = (i) => {
      if (i === 0) return "wide";
      const c = [];
      if (n > 1 && rem === 3 && i === n - 1) c.push("sd-2");
      if (n > 2 && rem === 2 && i >= n - 2) c.push("sd-2");
      if (n > 1 && rem === 1 && i === n - 1) c.push("sd-4");
      if (mrem === 1 && i === n - 1) c.push("sm-2");
      return c.join(" ");
    };
    grid.innerHTML = shown.map((g, i) => `<button type="button" class="${cls(i)}" data-i="${i}"><figure style="margin:0;height:100%">${pic(g.photo, "(max-width:820px) 50vw, 25vw", g.caption)}<figcaption>${esc(g.caption)}</figcaption></figure></button>`).join("");
    $$("button", grid).forEach((b) => b.addEventListener("click", () => openLb(+b.dataset.i)));
  };
  const lb = document.getElementById("lightbox");
  const openLb = (i, list) => {
    if (list) shown = list;
    idx = (i + shown.length) % shown.length;
    const g = shown[idx];
    $("#lb-img").src = `img/${g.photo}-1600.webp`; $("#lb-img").alt = g.caption; $("#lb-cap").textContent = g.caption;
    lb.hidden = false; $(".lb-close").focus();
  };
  if (lb) {
    closeLb = () => (lb.hidden = true);
    $(".lb-close").addEventListener("click", closeLb);
    $(".lb-prev").addEventListener("click", () => openLb(idx - 1));
    $(".lb-next").addEventListener("click", () => openLb(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", (e) => { if (lb.hidden) return; if (e.key === "ArrowLeft") openLb(idx - 1); if (e.key === "ArrowRight") openLb(idx + 1); });
  }
  if (grid) {
    renderGallery("all");
    $$(".filters button").forEach((b) => b.addEventListener("click", () => {
      $$(".filters button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      $$("button", grid).forEach((x) => x.classList.add("out"));
      setTimeout(() => renderGallery(b.dataset.f), reduce ? 0 : 280);
    }));
  }
  const certBtn = document.getElementById("cert-open");
  if (certBtn) certBtn.addEventListener("click", () => openLb(0, [{ photo: "registration-certificate", caption: "Registration certificate (Form C), 2015" }]));

  /* ---------- registration form ---------- */
  const form = document.getElementById("reg-form");
  if (form) {
    const params = new URLSearchParams(location.search);
    if (params.get("who") === "employer") form.querySelector('input[value="employer"]').checked = true;
    const sync = () => {
      const who = form.who.value;
      $$("[data-for]", form).forEach((el) => {
        const on = el.dataset.for.split(" ").includes(who);
        el.hidden = !on; $$("input,select,textarea", el).forEach((i) => (i.disabled = !on));
      });
      form.message.required = who !== "candidate";
    };
    $$('input[name="who"]', form).forEach((r) => r.addEventListener("change", sync)); sync();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const d = Object.fromEntries(new FormData(form).entries());
      const whoLabel = { candidate: "Candidate", employer: "Employer / agency", other: "Other" }[d.who];
      const lines = [`New enquiry from the website (${whoLabel})`, `Name: ${d.name}`, `Phone: ${d.phone}`];
      if (d.who === "candidate") lines.push(`Trade: ${d.trade}`, `Experience: ${d.experience}`, `Native place: ${d.place || "-"}`, `Passport: ${d.passport}`);
      if (d.who === "employer") lines.push(`Company & country: ${d.company}`, `Workers needed: ${d.workers || "-"}`);
      if (d.message) lines.push(`Message: ${d.message}`);
      const btn = $("button[type=submit]", form), st = $("#form-ok");
      btn.disabled = true; st.hidden = false; st.className = "ok"; st.textContent = "Sending your details…";
      sendEnquiry({ kind: "registration", ...d, page: location.pathname }).then((ok) => {
        btn.disabled = false;
        if (ok) { st.textContent = "Thank you. Your details have reached our team; we will call you back."; form.reset(); sync(); }
        else { st.className = "ok err"; st.innerHTML = failNote(lines.join("\n")); }
        st.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
      });
    });
  }

  /* ---------- motion ---------- */
  const hero = $(".hero");
  if (hero) requestAnimationFrame(() => setTimeout(() => hero.classList.add("ready"), 80));
  const countUp = (el) => {
    const to = +el.dataset.count, from = +el.dataset.from, t0 = performance.now(), dur = 1400;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); };
    if (reduce) el.textContent = to; else requestAnimationFrame(step);
  };
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("[data-count]", en.target).forEach(countUp);
      if (en.target.matches("[data-count]")) countUp(en.target);
      if (en.target.classList.contains("swipe")) en.target.classList.add("tug");
      io.unobserve(en.target);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }) : null;
  const watch = () => $$(".rv,.rv-x,.draw,.swipe").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  watch();
  /* swipe strips: stop the tug hint as soon as someone swipes sideways */
  $$(".swipe").forEach((s) => s.addEventListener("scroll", () => { s.classList.remove("tug"); s.style.animation = "none"; }, { once: true, passive: true }));
})();
