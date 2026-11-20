/* =====================================================================
   SR Training Center — every fact, number, list and contact detail.
   Change wording here; the pages read from this file.
   Anything in [square brackets] is NOT confirmed by SR yet and shows
   on the site as a yellow "to confirm" tag. Replace it with the real
   value (and remove the brackets) when SR sends it.
   ===================================================================== */
window.SR = {

  /* ---------- Contact ---------- */
  contact: {
    name: "SR Training Center",
    addressLines: ["SF.No. 47/1C, Patta No: 109", "Polachery Main Road, Sonallur", "Chengalpattu District, Chennai – 600 127"],   // from SR's board, 17 Nov 2026
    gstin: "33ACXFS1407J1ZU",   // from SR's board, 17 Nov 2026
    // Numbers shown on the site (from Arun, 17 Nov 2026). The first one is the main number:
    // the floating Call button and error notes use it.
    phones: [
      { name: "Rajendran B", role: "Managing Partner",           display: "+91 98849 34330", dial: "+919884934330" },   // calls go here (Arun, 18 Nov 2026, 1:37 pm)
      { name: "A. Ramanan",  role: "Founder & Managing Partner", display: "+91 97891 04330", dial: "+919789104330" }
    ],
    whatsapp: "919789104330",            // Ramanan's number: all WhatsApp buttons open a chat here (Arun, 18 Nov 2026)
    whatsappDisplay: "+91 97891 04330",
    whatsappName: "A. Ramanan",
    email: "srtrainingcenter@gmail.com",
    hours: "Monday to Saturday, 7:00 am to 7:00 pm",   // from Arun, 18 Nov 2026
    mapsLink: "https://www.google.com/maps/search/?api=1&query=12.840047%2C80.177766",   // plot SF.No. 47/1C, Sonallur (TN land map centroid, 20 Nov 2026)
    mapsEmbed: "https://www.google.com/maps?q=12.840047,80.177766&z=17&output=embed"
  },

  /* ---------- Ready-typed WhatsApp messages (wording to confirm with SR) ---------- */
  whatsappMessages: {
    default:  "Hi SR Training Center, I would like to know more about training and overseas jobs.",
    employer: "Hello SR Training Center, we are an employer / agency looking for trained workers.",
    story:    "Hi SR Training Center, I trained with you and would like to share my story."
  },

  /* ---------- Email enquiries (sent by the /api/enquiry function through Resend).
     Who receives them is set on the server (Vercel setting TO_EMAILS), not here. ---------- */
  enquiry: { endpoint: "/api/enquiry" },

  /* ---------- Key facts (only true numbers; brackets = to confirm) ---------- */
  facts: [   // from SR, 16 Nov 2026
    { value: "2014", count: 2014, from: 1990, label: "Training candidates since" },
    { value: "50+",  count: 50,   from: 0, suffix: "+", label: "Candidates trained every month" },   // "more than 50", Arun 18 Nov 2026
    { value: "10",   count: 10,   from: 0,    label: "Trades with full-size practice bays" },
    { value: "3",    count: 3,    from: 0,    label: "Regions: Singapore, Malaysia and the Middle East" }
  ],

  /* ---------- Trades (photo = file name in /img without size) ---------- */
  trades: [
    { name: "Aluminium formwork", group: "construction", tag: "Construction", photo: "aluminium-formwork",
      text: "Assembling, aligning and bracing aluminium wall and slab panels that shape concrete on site.",
      usedFor: "High-rise and repeat-floor building sites" },
    { name: "Timber formwork", group: "construction", tag: "Construction", photo: "timber-formwork",
      text: "Building timber shuttering, props and supports to hold concrete for columns, beams and walls.",
      usedFor: "Columns, beams and walls in concrete structures" },
    { name: "Steel reinforcement", group: "construction", tag: "Construction", photo: "steel-reinforcement",
      text: "Reading bar schedules, then cutting, bending and tying rebar to the drawing.",
      usedFor: "RCC columns, beams and slabs" },
    { name: "Plastering", group: "construction", tag: "Finishing", photo: "plastering",
      text: "Mixing mortar, then applying and levelling plaster on walls, corners and steps to a clean finish.",
      usedFor: "Building finishing works" },
    { name: "Pipe fitting", group: "mep", tag: "MEP · Oil & gas", photo: "pipe-fitting",
      text: "Measuring, cutting, grinding and joining pipe, and testing the joints for leaks.",
      usedFor: "Plumbing, drainage, oil & gas lines" },
    { name: "Electrical wiring", group: "mep", tag: "MEP", photo: "electrical-wiring",
      text: "Running conduit, fixing boxes and pulling wires to standard in a full-size practice room.",
      usedFor: "Building electrical installation" }
  ],
  otherTrades: ["Welding", "Thermal insulation", "Scaffolding", "Masonry"], // confirmed by Arun, 13 Nov 2026

  /* ---------- How it works ---------- */
  steps: [
    { title: "Register",        text: "Send your details on the form or WhatsApp, or walk in to the center." },
    { title: "Train",           text: "Practise your trade in our workshop bays with experienced trainers." },
    { title: "Trade test",      text: "Take the practical test the overseas employer asks for." },
    { title: "Documents & visa",text: "Your recruiting agency handles the offer, visa and emigration clearance." },
    { title: "Fly & work",      text: "Join your employer abroad, ready for the job from day one." }
  ],

  /* ---------- Industries and countries ---------- */
  sectors: [
    { name: "Construction", text: "Formwork, rebar, masonry, finishing" },
    { name: "Oil & gas",    text: "Pipe fitting, steel and structural work" },
    { name: "Shipyard",     text: "Marine mechanical, electrical and piping" },
    { name: "Hospitality",  text: "Hotels, restaurants and facility services" }
  ],
  countries: ["Singapore", "Malaysia", "Middle East (Gulf countries)"], // from SR, 16 Nov 2026

  /* ---------- Gallery (filter groups: construction, mep, center) ---------- */
  gallery: [
    { photo: "hero-facility-building", caption: "Our workshop, Sonallur", group: "center" },
    { photo: "aluminium-formwork",     caption: "Aluminium formwork bay",  group: "construction" },
    { photo: "pipe-fitting",           caption: "Pipe fitting bay",        group: "mep" },
    { photo: "timber-formwork",        caption: "Timber formwork",         group: "construction" },
    { photo: "electrical-wiring",      caption: "Electrical wiring rooms", group: "mep" },
    { photo: "steel-reinforcement",    caption: "Steel reinforcement",     group: "construction" },
    { photo: "plastering",             caption: "Plastering practice",     group: "construction" }
  ],

  /* ---------- People and registration ---------- */
  /* People shown on the home page (no photos: initials badges only) */
  people: [
    { name: "A. Ramanan", role: "Founder & Managing Partner",   // title from Arun, 18 Nov 2026; name as on the MEA licence
      message: "At SR Training Center, every candidate practises on full-size bays built like the sites they will work on abroad. Our trainers check each skill hands-on before anyone is put forward for a trade test, so employers receive workers who are ready to start, not just ready to pass. We keep onboarding clean and simple: clear information, documents checked at each step, and steady guidance for candidates and their families from registration to departure." },
    { name: "Rajendran B", role: "Managing Partner",
      message: "Every day at the center, we make sure the bays are ready, the trainers are on the floor and every batch is tested properly. Candidates and agencies are welcome to visit the workshop and see the training for themselves." }
  ],
  registration: [
    ["Firm", "SR Training Center (partnership firm)"],
    ["Registration", "No. 1512 of 2015, Registrar of Firms, Chennai (South)"],
    ["Under", "Indian Partnership Act, 1932"],
    ["Registered on", "10 August 2015"],
    ["GSTIN", "33ACXFS1407J1ZU"]
  ],

  /* ---------- Testimonials: ONLY real people, with their permission ----------
     candidate: { quote, name, trade, job, country, year, photo }
     employer:  { quote, name, designation, company, country, workers }
     While a list is empty, the site shows an honest "coming soon" note.      */
  testimonials: {
    candidates: [],
    employers: []
  },

  /* ---------- Manpower Supply page (SR Global Consultants, Ramanan sir) ---------- */
  manpower: {
    licence: [   // from the MEA Registration Certificate (Form V), seen 13 Nov 2026
      ["Licence holder", "M/s SR Global Consultants (Proprietor: Angamuthu Ramanan)"],
      ["Registration certificate no.", "B-1912/TN/PER/100/5/10314/2023"],
      ["eMigrate RA ID", "RA5772306 (status: Active on the government list, 13 Nov 2026)"],
      ["Issued by", "Protector General of Emigrants, Ministry of External Affairs, Government of India, under the Emigration Act, 1983"],
      ["Valid", "10 May 2023 to 30 March 2028"]
    ],
    countries: ["Singapore", "Malaysia", "Middle East (Gulf countries)"],   // from SR, 16 Nov 2026
    companies: [],                  // names or logos, only with their permission
    categories: [
      { name: "Skilled trades", text: "Formwork carpenters (aluminium and timber), steel fixers, plasterers, pipe fitters, electricians, welders, insulators, scaffolders and masons" },
      { name: "Semi-skilled",   text: "Helpers and site workers, trained on our practice bays" },
      { name: "Hospitality & services", text: "Hotel, restaurant and facility staff" }
    ],
    reasons: [
      { title: "Trained on our own bays", text: "Workers practise and are trade-tested at our Sonallur workshop before they are put forward." },
      { title: "Documents handled", text: "Offer letters, visa and emigration paperwork are followed through for you." },
      { title: "Steady supply", text: "We train more than 50 candidates every month, so we can put forward trained workers on a regular basis." }
    ],
    steps: [
      { title: "Send your requirement", text: "Trades, numbers, country and start date." },
      { title: "We shortlist and test",  text: "Candidates are trade-tested on our bays to your standard." },
      { title: "Your interview",         text: "Meet the shortlist online or at the center." },
      { title: "Visa & emigration",      text: "Paperwork followed through until clearance." },
      { title: "Deployment",             text: "Workers travel and report to your site." }
    ]
  }
};
