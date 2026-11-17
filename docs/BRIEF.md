# SR Training Centre: brief (copy for the code repo)

The full, current brief lives in the Claude project "Client · SR Training Centre". Key build decisions:

- Site: one long home page (12 sections) + Manpower Supply page + 404. Plain HTML/CSS/JS; facts in `js/content.js`.
- Design: SR blue #1d3fa6 / deep #0f2468, red #e1262d, helmet-yellow #f6b800 as the single highlight; Barlow Condensed (light + extra-bold italic accents) with Hind body; near-square corners; motion in every section, reduced-motion respected.
- Photos: restored with Nano Banana from the Trade Testing PDF and checked against the originals (13 Nov 2026). Certificate cleaned without AI; never run it through AI.
- Enquiries (13 Nov 2026): WhatsApp button opens a chat directly with a default message (temporary number 99410 22034, Arun's); email pop-up + registration form send through Resend (`/api/enquiry`) to `TO_EMAILS` (now Arun's address). SMS parked.
- Testimonials: two groups (placed candidates, employers), real and with permission only; empty state until then.
- Hosting: Vercel (serverless function needed for Resend).
