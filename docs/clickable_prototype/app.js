/**
 * EduSync Clickable Platform Prototype - Master Interactive Controller
 * Connects all 5 Member Modules + Auth + Gate Kiosk into a seamless clickable demo.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Web Audio Chime Generator
  function playChime(freq = 1760, duration = 0.15) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio waiting for interaction:', e);
    }
  }

  // 3. Screen / Module Switching Engine
  const navPills = document.querySelectorAll('.proto-nav-pill');
  const moduleScreens = document.querySelectorAll('.proto-screen');

  window.showModule = function (screenId) {
    moduleScreens.forEach(screen => {
      if (screen.id === screenId) {
        screen.classList.remove('hidden');
        if (window.anime) {
          window.anime({
            targets: screen,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 250,
            easing: 'easeOutQuad'
          });
        }
      } else {
        screen.classList.add('hidden');
      }
    });

    navPills.forEach(pill => {
      if (pill.getAttribute('data-target') === screenId) {
        pill.classList.add('nav-pill-active', 'bg-blue-600', 'text-white');
        pill.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      } else {
        pill.classList.remove('nav-pill-active', 'bg-blue-600', 'text-white');
        pill.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
  };

  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.getAttribute('data-target');
      window.showModule(target);
    });
  });

  // 4. Role Switcher Dropdown (Top Header)
  const roleSelect = document.getElementById('proto-role-select');
  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      const selected = roleSelect.value;
      if (selected === 'student') window.showModule('screen-m1');
      else if (selected === 'parent') window.showModule('screen-m5');
      else if (selected === 'teacher') window.showModule('screen-m3');
      else if (selected === 'admin') window.showModule('screen-overview');
      else if (selected === 'kiosk') window.showModule('screen-m2');
    });
  }

  // ========================================================
  // MODULE 1: VIRTUAL WALLET & REVENUE SPLIT (MEMBER 1)
  // ========================================================
  let walletBalance = 12500;
  const walletBalanceEl = document.getElementById('wallet-display-balance');
  const topUpModal = document.getElementById('topup-modal');
  const topUpForm = document.getElementById('topup-form');

  window.openTopUpModal = function () {
    if (topUpModal) topUpModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  };
  window.closeTopUpModal = function () {
    if (topUpModal) topUpModal.classList.add('hidden');
  };

  if (topUpForm) {
    topUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amountInput = document.getElementById('topup-amount-input');
      const amount = parseInt(amountInput.value, 10) || 5000;

      walletBalance += amount;
      if (walletBalanceEl) walletBalanceEl.innerText = `LKR ${walletBalance.toLocaleString()}`;

      // Add to transaction ledger
      const ledgerContainer = document.getElementById('m1-ledger-stream');
      if (ledgerContainer) {
        const item = document.createElement('div');
        item.className = 'p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm';
        item.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <div class="font-bold text-slate-900 text-xs">Parent Online Wallet Top-Up</div>
              <div class="text-[10px] text-slate-400">Via PayHere / Visa Gateway • Approved</div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-emerald-600 font-mono font-bold text-xs">+ LKR ${amount.toLocaleString()}</span>
            <div class="text-[10px] text-slate-400">Just now</div>
          </div>
        `;
        ledgerContainer.insertBefore(item, ledgerContainer.firstChild);
      }

      window.closeTopUpModal();
      playChime(1900, 0.2);

      if (window.confetti) {
        window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    });
  }

  // ========================================================
  // MODULE 2: NFC ATTENDANCE GATE & SMS ALERTS (MEMBER 2)
  // ========================================================
  const kioskTapBtn = document.getElementById('kiosk-tap-btn');
  const kioskLed = document.getElementById('kiosk-led');
  const kioskStatus = document.getElementById('kiosk-status');
  const kioskLogStream = document.getElementById('kiosk-log-stream');
  const absentSmsToast = document.getElementById('absent-sms-toast');

  if (kioskTapBtn) {
    kioskTapBtn.addEventListener('click', () => {
      kioskTapBtn.disabled = true;
      kioskStatus.innerText = 'READING NFC UID...';
      kioskLed.className = 'w-4 h-4 rounded-full bg-amber-400 animate-ping';
      playChime(1760, 0.1);

      setTimeout(() => {
        kioskTapBtn.disabled = false;
        kioskStatus.innerText = 'ACCESS GRANTED • ENTRANCE LOGGED';
        kioskLed.className = 'w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-400/50';

        const row = document.createElement('div');
        row.className = 'p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm';
        row.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <div>
              <div class="font-bold text-slate-900 text-xs">Pasindu Nethsara (STU-9402)</div>
              <div class="text-[10px] text-slate-500">Hall B • Pure Maths (Prof. Gamage)</div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-mono font-bold text-emerald-600">418ms Tap-In</span>
            <div class="text-[10px] text-slate-400">${new Date().toLocaleTimeString()}</div>
          </div>
        `;
        if (kioskLogStream) kioskLogStream.insertBefore(row, kioskLogStream.firstChild);
        playChime(2100, 0.15);
      }, 420);
    });
  }

  // 15-Minute Absenteeism Alert Trigger
  window.trigger15MinAbsentCheck = function () {
    playChime(1200, 0.2);
    if (absentSmsToast) {
      absentSmsToast.classList.remove('hidden');
      if (window.anime) {
        window.anime({
          targets: absentSmsToast,
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 350,
          easing: 'easeOutBack'
        });
      }
      setTimeout(() => {
        absentSmsToast.classList.add('hidden');
      }, 7000);
    }
  };

  // ========================================================
  // MODULE 3: LMS VIDEO & ANTI-PIRACY DRM WATERMARK (MEMBER 3)
  // ========================================================
  let isVideoPlaying = false;
  let videoSeconds = 48;
  const videoPlayBtn = document.getElementById('drm-play-btn');
  const videoTimerEl = document.getElementById('drm-timer');
  const videoProgressEl = document.getElementById('drm-progress');
  const videoRuleStatus = document.getElementById('drm-rule-status');
  let videoInterval = null;

  if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', () => {
      isVideoPlaying = !isVideoPlaying;
      if (isVideoPlaying) {
        videoPlayBtn.innerHTML = `<i data-lucide="pause" class="w-4 h-4"></i> Pause Lesson Stream`;
        videoInterval = setInterval(() => {
          videoSeconds++;
          const mins = Math.floor(videoSeconds / 60);
          const secs = videoSeconds % 60;
          if (videoTimerEl) videoTimerEl.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

          // Calculate percentage towards 60 seconds (1 minute mock class)
          const pct = Math.min(100, Math.round((videoSeconds / 60) * 100));
          if (videoProgressEl) videoProgressEl.style.width = `${pct}%`;

          if (pct >= 80 && videoRuleStatus) {
            videoRuleStatus.className = 'px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200';
            videoRuleStatus.innerText = '80% RULE MET: PRESENT (VERIFIED)';
          }
        }, 1000);
      } else {
        videoPlayBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Resume Lesson Stream`;
        clearInterval(videoInterval);
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // ========================================================
  // MODULE 4: TIMED MCQ QUIZ & GAMIFICATION BADGES (MEMBER 4)
  // ========================================================
  const quizForm = document.getElementById('mcq-quiz-form');
  const quizResultBox = document.getElementById('quiz-result-box');
  const quizScoreEl = document.getElementById('quiz-score-display');

  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q1 = document.querySelector('input[name="q1"]:checked')?.value;
      const q2 = document.querySelector('input[name="q2"]:checked')?.value;

      let score = 0;
      if (q1 === 'b') score += 50;
      if (q2 === 'c') score += 50;

      if (quizScoreEl) quizScoreEl.innerText = `${score}% (Grade: ${score >= 50 ? 'Distinction' : 'Pass'})`;
      if (quizResultBox) quizResultBox.classList.remove('hidden');

      playChime(2200, 0.25);
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }
    });
  }

  // ========================================================
  // MODULE 5: MULTI-CHILD SIBLING SWITCHER (MEMBER 5)
  // ========================================================
  window.switchSibling = function (siblingNum) {
    const child1View = document.getElementById('sibling-1-details');
    const child2View = document.getElementById('sibling-2-details');
    const tab1 = document.getElementById('tab-sibling-1');
    const tab2 = document.getElementById('tab-sibling-2');

    if (siblingNum === 1) {
      if (child1View) child1View.classList.remove('hidden');
      if (child2View) child2View.classList.add('hidden');
      if (tab1) tab1.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm';
      if (tab2) tab2.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50';
    } else {
      if (child1View) child1View.classList.add('hidden');
      if (child2View) child2View.classList.remove('hidden');
      if (tab2) tab2.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm';
      if (tab1) tab1.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50';
    }
  };

  // ========================================================
  // FIGMA TOKENS SPEC MODAL
  // ========================================================
  const tokensModal = document.getElementById('tokens-modal');
  window.toggleTokensModal = function () {
    if (tokensModal) tokensModal.classList.toggle('hidden');
    if (window.lucide) window.lucide.createIcons();
  };
});
