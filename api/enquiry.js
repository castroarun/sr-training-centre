/* =====================================================================
   POST /api/enquiry — emails a website enquiry to SR through Resend.
   Runs on Vercel as a serverless function (no extra packages needed).

   Settings (Vercel → Project → Settings → Environment Variables):
     RESEND_API_KEY  required. From resend.com → API Keys.
     TO_EMAILS       required. Who receives enquiries, comma-separated
                     (one or two addresses), e.g. "office1@x.com, office2@x.com".
     FROM_EMAIL      optional. Default "SR Training Center <onboarding@resend.dev>".
                     Resend's test sender only delivers to the email address
                     the Resend account was created with. To send to anyone
                     else, verify SR's domain in Resend and set e.g.
                     "SR Training Center <enquiry@srtrainingcenter.in>".
     ALLOWED_ORIGIN  optional. e.g. "https://srtrainingcenter.in" to refuse
                     posts from other sites.
   ===================================================================== */

const LIMITS = { name: 80, phone: 20, email: 120, message: 2000, short: 120 };
const WHO = { candidate: "Candidate", employer: "Employer / agency", other: "Other" };

const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
const html = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false }); }

  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed && req.headers.origin && req.headers.origin !== allowed) return res.status(403).json({ ok: false });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = {}; } }
  body = body || {};

  // Spam trap: real people never fill the hidden field. Pretend success.
  if (body.company_website) return res.status(200).json({ ok: true });

  const d = {
    kind: body.kind === "registration" ? "registration" : "message",
    who: WHO[body.who] ? body.who : "other",
    name: clean(body.name, LIMITS.name),
    phone: clean(body.phone, LIMITS.phone),
    email: clean(body.email, LIMITS.email),
    trade: clean(body.trade, LIMITS.short),
    experience: clean(body.experience, LIMITS.short),
    place: clean(body.place, LIMITS.short),
    passport: clean(body.passport, LIMITS.short),
    company: clean(body.company, LIMITS.short),
    workers: clean(body.workers, 10),
    message: clean(body.message, LIMITS.message),
    page: clean(body.page, LIMITS.short)
  };
  if (!d.name || !/^[+\d][\d\s-]{6,19}$/.test(d.phone)) return res.status(400).json({ ok: false, error: "Name and a valid phone number are needed." });
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) d.email = "";

  const to = (process.env.TO_EMAILS || "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 2);
  const key = process.env.RESEND_API_KEY;
  if (!key || !to.length) return res.status(500).json({ ok: false, error: "Email is not set up yet." });

  const rows = [
    ["Type", d.kind === "registration" ? "Registration form" : "Message pop-up"],
    ["I am a", WHO[d.who]],
    ["Name", d.name],
    ["Phone / WhatsApp", d.phone],
    ["Email", d.email],
    ["Trade", d.trade],
    ["Experience", d.experience],
    ["Native place", d.place],
    ["Passport", d.passport],
    ["Company & country", d.company],
    ["Workers needed", d.workers],
    ["Message", d.message],
    ["Sent from page", d.page]
  ].filter(([, v]) => v);

  const subject = `Website ${d.kind === "registration" ? "registration" : "enquiry"}: ${d.name} (${WHO[d.who]})`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const htmlBody = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#15192b">
    <h2 style="margin:0 0 12px;color:#0f2468">New ${d.kind === "registration" ? "registration" : "enquiry"} from the website</h2>
    <table cellpadding="8" style="border-collapse:collapse">${rows.map(([k, v]) =>
      `<tr><td style="border-bottom:1px solid #dfe3ee;color:#545b72;width:170px;vertical-align:top">${html(k)}</td><td style="border-bottom:1px solid #dfe3ee;white-space:pre-wrap">${html(v)}</td></tr>`).join("")}</table>
    <p style="color:#545b72;font-size:13px;margin-top:16px">Reply on WhatsApp: https://wa.me/${d.phone.replace(/\D/g, "")}</p></div>`;

  const payload = {
    from: process.env.FROM_EMAIL || "SR Training Center <onboarding@resend.dev>",
    to, subject, text, html: htmlBody
  };
  if (d.email) payload.reply_to = d.email;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!r.ok) { console.error("Resend error", r.status, await r.text()); return res.status(502).json({ ok: false }); }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend request failed", err);
    return res.status(502).json({ ok: false });
  }
};
