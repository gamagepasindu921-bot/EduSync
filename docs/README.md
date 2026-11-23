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

---

## 🌐 Deploying to Netlify (Free & Instant)

You can deploy this site in under 60 seconds:

### Method A: Drag & Drop (Fastest)
1. Log in to [Netlify](https://app.netlify.com).
2. Go to **Sites** and drag the `landing page/edusync-site` folder directly into the Netlify drop zone.
3. Netlify will deploy it instantly and provide you with a live URL (e.g., `https://edusync-portal.netlify.app`).
4. Go to **Forms** in the Netlify dashboard to view enquiries submitted through the form!

### Method B: Git Continuous Deployment
1. Push this folder to your team's GitHub repository.
2. In Netlify, click **Add new site** > **Import an existing project** from GitHub.
3. Set the base directory to `landing page/edusync-site` and publish directory to `.`.
4. Every time you push changes to Git, Netlify will auto-deploy the site!

---

## ✏️ How to Update Team Members & Figma Link

When you have the names, links, and Figma prototype ready:

1. **Team Members (Names & LinkedIn)**:
   - Open `index.html` and scroll to `<section id="team">`.
   - Update `Team Member 3`, `Team Member 4`, and `Team Member 5` with their actual names and LinkedIn URLs.

2. **Figma Prototype URL**:
   - In `index.html`, find `id="figma-prototype-btn"`.
   - Replace `href="https://www.figma.com"` with your actual team Figma prototype URL.

---

## 📋 Coursework Checklist Verification

- [x] Product name, logo, value proposition
- [x] Problem, solution, and 6 core features
- [x] How it works 4-stage pipeline
- [x] High-fidelity prototype preview with live interactive sandbox
- [x] Benefits broken down by all 4 stakeholders
- [x] Team section with 5 members, photos, and roles
- [x] Accessible 5-question FAQ accordion
- [x] Working Netlify interest registration form
- [x] Responsive layout (mobile, tablet, desktop)
- [x] SVG Favicon and 1200x630 Social Preview Image (OG)
- [x] Direct contact email, phone helpline, and IIT/UoW campus attribution
- [x] Netlify configuration file (`netlify.toml`) with security headers
