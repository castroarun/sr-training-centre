# SR Training Centre website

Plain HTML, CSS and JavaScript. No build step, no packages. Built by AS Groups.

- `index.html`: home page (12 sections)
- `manpower-supply.html`: Manpower Supply page for employers and agencies
- `404.html`: page-not-found
- `api/enquiry.js`: emails enquiries to SR through Resend (runs on Vercel)

## Where do I change X?

| Change | File | What to edit |
| --- | --- | --- |
| Phone, email, address, hours, map | `js/content.js` | `contact` |
| WhatsApp number | `js/content.js` | `contact.whatsapp` (country code, no +). Now SR's office number 98849 54330. |
| Ready-typed WhatsApp messages | `js/content.js` | `whatsappMessages` |
| Key facts (2015, 6 trades, …) | `js/content.js` | `facts` |
| Trades, their text and photos | `js/content.js` | `trades`, `otherTrades` |
| How it works steps | `js/content.js` | `steps` |
| Industries and countries | `js/content.js` | `sectors`, `countries` |
| Gallery photos and captions | `js/content.js` | `gallery` (+ photo files in `img/`) |
| Partner name, photo, message | `js/content.js` | `partner` |
| Registration details | `js/content.js` | `registration` |
| Testimonials (real, with permission) | `js/content.js` | `testimonials.candidates` / `testimonials.employers` |
| Manpower page: licence, countries, companies, categories, reasons, steps | `js/content.js` | `manpower` |
| Who receives email enquiries | Vercel setting | `TO_EMAILS` (one or two addresses, comma-separated) |
| Colours, fonts, spacing, corner radius | `css/styles.css` | `:root` tokens at the top |
| Headings and paragraph wording | `index.html`, `manpower-supply.html` | the section's HTML |
| Menu, header, footer, floating buttons, pop-ups | `js/main.js` | top part ("shared header / footer / floating buttons") |
| Logo | `img/sr-logo.svg` (colour), `img/sr-logo-white.svg` (footer) | replace the file, keep the name |

Text in **[square brackets]** in `content.js` is not confirmed by SR. It shows on the site as a yellow "to confirm" tag. Replace it with the real value and remove the brackets.

## Photos

Each photo is in `img/` in three widths: `name-480.webp`, `name-960.webp`, `name-1600.webp`. To add or replace one, export the three sizes as WebP (quality about 78) with the same name pattern, then list it in `content.js`.

## Email enquiries (Resend)

Both the registration form and the "Send us a message" pop-up post to `/api/enquiry`, which emails SR through [Resend](https://resend.com).

1. Create a Resend account (free plan: 100 emails a day) and an API key.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = the key
   - `TO_EMAILS` = for now `arun.castromin@gmail.com`; later SR's one or two office addresses
   - optional `FROM_EMAIL` and `ALLOWED_ORIGIN` (see the comments in `api/enquiry.js`)
3. Redeploy.

Until SR's domain is verified in Resend, the sender is Resend's test address, and Resend only delivers to the email the Resend account was opened with. So open the Resend account with the address in `TO_EMAILS`, or verify the domain (add the DNS records Resend gives) and set `FROM_EMAIL`.

If email fails, the visitor sees a message with a WhatsApp link and the phone number, so no enquiry is lost.

## Run it on your computer

Any static server works, e.g. `npx serve .` or VS Code "Live Server". The email function only runs on Vercel (or with `vercel dev`).

## Deploy (Vercel)

Import the GitHub repo into Vercel, framework "Other", no build command, output = root. Every push to `main` deploys.
