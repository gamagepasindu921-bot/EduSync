# EduSync | Full Clickable Application Prototype (All 5 Modules)

This folder contains the complete, interactive, and clickable **Application Prototype** for the EduSync platform. Unlike the marketing landing page, this prototype represents the actual software platform itself, covering all 5 team members' modules, role-based dashboards, and hardware kiosks.

---

## 🚀 What Is Included in This Clickable Prototype

1. **Screen 1: Overview Dashboard**:
   - Executive metrics (Today's taps: 1,428, Fees: LKR 3.2M, Splits: LKR 2.56M, SMS rate: 99.8%).
   - Direct launchpad cards into all 5 member modules.

2. **Screen 2: Member 1 (Finance & Wallet)**:
   - 3D Virtual NFC Smart Card with live balance display (`LKR 12,500.00`).
   - Working **"+ Top-Up Wallet"** modal (reloads balance with visual feedback & logs entry).
   - Automated **80% Tutor / 20% Institute** revenue split visual calculation bar.
   - Real-time searchable financial audit ledger.

3. **Screen 3: Member 2 (NFC Attendance Gate & Timetable)**:
   - Hardware NFC reader simulator with sub-600ms latency verification & green gate LED.
   - Dynamic Fallback QR Code generator with 60-second expiration for students without cards.
   - **Simulate 15-Minute Absenteeism Alert**: Triggers live parent SMS push notification!
   - Live gate check-in stream.

4. **Screen 4: Member 3 (LMS Video & Anti-Piracy DRM)**:
   - Protected 16:9 lesson video player with **dynamic floating watermark** (`STU-9402 • PASINDU NETHSARA • 192.168.1.104`) constantly moving in pseudo-random coordinates to neutralize screen piracy!
   - Hardware Device Binding status indicator (`MacBookAir10,1`).
   - Real-time **80% Online Attendance Rule Tracker** with ticking watch-time accumulator.

5. **Screen 5: Member 4 (Quizzes & Gamification)**:
   - Interactive timed MCQ Quiz Engine with instant grading and XP rewards.
   - Student digital achievement badges ("Top Scorer", "100% Attendance Streak", "Speed Finisher").
   - Live class chat & doubt clearing portal.

6. **Screen 6: Member 5 (Multi-Child Parent & Payroll)**:
   - Sibling switcher: Toggle between Child 1 (Pasindu - Grade 13 A/L) and Child 2 (Dinuka - Grade 11 O/L).
   - Real-time attendance schedule and wallet status per child.
   - Daily Closing Summary Report generator and teacher payroll management.

7. **Screen 7: Auth & Roles**:
   - Role authentication switcher (Student, Parent, Teacher, Institute Admin, Gate Kiosk) with device binding enforcement.

---

## 🛠️ How to Run Locally

You can serve this clickable prototype on any port (for example, port `5050` or `3000`):

```bash
cd "/Users/pasindunethsara/Documents/group Priogect/clickable_prototype"
python3 -m http.server 5050
```

Then open in your browser:
👉 **`http://localhost:5050`**

---

## 🎨 How to Import Directly into Figma (In Under 60 Seconds!)

You can turn all these HTML screens into **100% native, fully editable Figma Frames, Layers, and Components**:

1. Open your **Figma** file in Firefox or Chrome.
2. In Figma, open the **Plugins** menu (press `Shift + I` > Plugins).
3. Search for **`html.to.design`** (Free official community plugin) and click **Run**.
4. In the plugin, enter the local URL: **`http://localhost:5050`**.
5. Select the viewports you want (e.g. **Desktop 1440px**).
6. Click **Import**!

Figma will instantly generate all screens with:
- Native Figma Auto-Layout Frames
- Exact typography (`Plus Jakarta Sans` & `JetBrains Mono`)
- All color styles & tokens
- Editable vector icons and buttons!
