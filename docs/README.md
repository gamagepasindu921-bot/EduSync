# EduSync Platform | Official Marketing Landing Page

Welcome to the official landing page for **EduSync (Tuition Management & NFC Smart Card Ecosystem)**, developed for the Software Development Group Project (SDGP) 2026.

---

## 🚀 Features & Architecture

This landing page is engineered to fulfill all 10 mandated sections from the project specification, using clean, production-grade web technologies without build bloat:

- **Clean Blue & White Design System**: High-contrast, accessibility-focused UI designed with royal blue (#1D4ED8) accents, white cards, and navy typography.
- **3D Interactive WebGL NFC Card (Three.js)**: A physically rendered 3D contactless smart card with gold EMV chip, student balance pill, real-time mouse tracking, and tap animations.
- **Interactive Live NFC Sandbox**: Live simulation demonstrating sub-600ms entrance card taps, atomic balance deductions, 80/20 tutor commission calculations, and parent SMS alerts.
- **High-Fidelity Prototype Previews**: Interactive tab switcher for Institute Admin Console, Parent Multi-Child Portal, and Teacher Revenue Ledger with Dynamic Anti-Piracy Watermark.
- **Netlify-Ready Interest Registration Form**: Fully functional with Netlify Forms integration (`data-netlify="true"`), role selector, and celebratory feedback.
- **Full SEO & Social Sharing Ready**: Includes SVG Favicon, Schema.org JSON-LD Structured Data, and OpenGraph/Twitter card images.

---

## 📁 File Structure

```text
edusync-site/
├── assets/
│   ├── favicon.svg             # Modern vector app icon / browser favicon
│   └── images/
│       ├── og-preview.png      # 1200x630 social share thumbnail (WhatsApp/LinkedIn)
│       ├── pasindu.jpeg        # Photo 1 (Pasindu Nethsara)
│       ├── samuditha.png       # Photo 2 (Samuditha)
│       ├── member3.jpeg        # Member 3 Photo
│       ├── member4.png         # Member 4 Photo
│       └── member5.jpeg        # Member 5 Photo
├── index.html                  # Semantic single-page structure (All 10 Sections)
├── style.css                   # Blue & White custom styling, shadows & animations
├── three-card.js               # Three.js 3D NFC Card, lighting, shadow & particles
├── main.js                     # Anime.js kinetics, audio chime, live sandbox simulator
├── netlify.toml                # Netlify deployment headers, security & caching
└── README.md                   # Documentation & submission guide
```

---

## 🛠️ Local Development & Testing

To run and preview the website locally on your computer:

```bash
# Navigate to the site folder
cd "landing page/edusync-site"

# Launch Python local HTTP server
python3 -m http.server 8080
```

Then open your browser and navigate to:
👉 **`http://localhost:8080`**

