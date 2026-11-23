/**
 * EduSync Interactive Engine - Clean Blue & White Edition
 * Integrated with Anime.js, Web Audio API, Role-Aware Placeholder Switching,
 * Smooth Back-to-Top Controller, and Interactive WhatsApp Business Bot Handover.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Synthesize High-Tech NFC & Chat Beep Sound using Web Audio API
  function playBeep(freq = 1760, duration = 0.15) {
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

  const heroTapBtn = document.getElementById('hero-tap-card-btn');
  if (heroTapBtn) {
    heroTapBtn.addEventListener('click', () => {
      playBeep(1760, 0.15);
      if (window.triggerCardTapAnimation) {
        window.triggerCardTapAnimation();
      }
    });
  }

  // 3. Navbar Glass Scrolled Effect & Back-to-Top
  const navbar = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-slate-200/80');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-white/95', 'shadow-sm', 'border-slate-200/80');
      navbar.classList.add('bg-transparent');
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (window.anime) {
          window.anime({
            targets: mobileMenu,
            opacity: [0, 1],
            translateY: [-8, 0],
            duration: 250,
            easing: 'easeOutQuad'
          });
        }
      } else {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // 4. Hero Kinetic Typography Entrance with Anime.js
  if (window.anime) {
    window.anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '#hero-badge',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 600,
        delay: 150
      })
      .add({
        targets: '#hero-title',
        opacity: [0, 1],
        translateY: [25, 0],
        duration: 750,
      }, '-=350')
      .add({
        targets: '#hero-desc',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 750,
      }, '-=450')
      .add({
        targets: '#hero-actions',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 750,
      }, '-=450')
      .add({
        targets: '#hero-stats > div',
        opacity: [0, 1],
        translateY: [15, 0],
        delay: window.anime.stagger(80),
        duration: 600
      }, '-=350');
  }

  // 5. Scroll-Driven Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-item');
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Interactive Live NFC & Ledger Simulation Sandbox
  let currentBalance = 12500;
  const simTapBtn = document.getElementById('sim-tap-btn');
  const simBalanceEl = document.getElementById('sim-balance');
  const simLatencyEl = document.getElementById('sim-latency');
  const simStatusEl = document.getElementById('sim-status');
  const simHistoryContainer = document.getElementById('sim-history');
  const simSmsToast = document.getElementById('sim-sms-toast');
  const simSmsMsg = document.getElementById('sim-sms-msg');

  if (simTapBtn) {
    simTapBtn.addEventListener('click', () => {
      const classSelect = document.getElementById('sim-class-select');
      const fee = parseInt(classSelect.value, 10) || 2500;
      const className = classSelect.options[classSelect.selectedIndex].text;

      if (currentBalance < fee) {
        alert('Insufficient wallet balance! Please reload wallet via parent portal.');
        return;
      }

      simTapBtn.disabled = true;
      simTapBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Contacting NFC Reader...`;

      const startTime = performance.now();
      playBeep(1800, 0.12);

      setTimeout(() => {
        const elapsed = Math.round(performance.now() - startTime);
        currentBalance -= fee;

        if (simBalanceEl) {
          simBalanceEl.innerText = `LKR ${currentBalance.toLocaleString()}`;
        }
        if (simLatencyEl) {
          simLatencyEl.innerText = `${elapsed}ms`;
        }

        simStatusEl.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
        simStatusEl.innerText = 'VERIFIED & DEDUCTED';

        const teacherShare = fee * 0.8;
        const instituteShare = fee * 0.2;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const historyRow = document.createElement('div');
        historyRow.className = 'p-3 bg-white border border-slate-200 rounded-xl text-xs flex justify-between items-center shadow-sm';
        historyRow.innerHTML = `
          <div>
            <div class="font-bold text-slate-900">${className}</div>
            <div class="text-slate-500 text-[10px]">Split: LKR ${teacherShare.toLocaleString()} (80% Tutor) • LKR ${instituteShare.toLocaleString()} (20% Institute)</div>
          </div>
          <div class="text-right">
            <span class="text-rose-600 font-mono font-bold">- LKR ${fee.toLocaleString()}</span>
            <div class="text-slate-400 text-[10px]">${now}</div>
          </div>
        `;

        if (simHistoryContainer) {
          simHistoryContainer.insertBefore(historyRow, simHistoryContainer.firstChild);
        }

        // Show Instant SMS Toast
        if (simSmsToast && simSmsMsg) {
          simSmsMsg.innerText = `EduSync Alert: Pasindu tapped in for ${className}. Fee LKR ${fee} deducted. New Balance: LKR ${currentBalance.toLocaleString()}.`;
          simSmsToast.classList.remove('hidden');

          if (window.anime) {
            window.anime({
              targets: simSmsToast,
              translateY: [15, 0],
              opacity: [0, 1],
              duration: 350,
              easing: 'easeOutQuad'
            });
          }

          setTimeout(() => {
            if (window.anime) {
              window.anime({
                targets: simSmsToast,
                opacity: [1, 0],
                duration: 350,
                complete: () => simSmsToast.classList.add('hidden')
              });
            } else {
              simSmsToast.classList.add('hidden');
            }
          }, 6000);
        }

        simTapBtn.disabled = false;
        simTapBtn.innerHTML = `
          <i data-lucide="zap" class="w-4 h-4 mr-1.5 text-amber-300"></i>
          Simulate NFC Entrance Tap
        `;
        if (window.lucide) window.lucide.createIcons();

      }, 420);
    });
  }

  // 7. Interactive Preview Tabs
  const previewTabBtns = document.querySelectorAll('.preview-tab-btn');
  const previewScreens = document.querySelectorAll('.preview-screen-item');

  previewTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      previewTabBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('text-slate-600', 'bg-white', 'hover:bg-slate-50', 'border', 'border-slate-200');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('text-slate-600', 'bg-white', 'hover:bg-slate-50', 'border-slate-200');

      previewScreens.forEach(screen => {
        if (screen.id === targetId) {
          screen.classList.remove('hidden');
          if (window.anime) {
            window.anime({
              targets: screen,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 300,
              easing: 'easeOutQuad'
            });
          }
        } else {
          screen.classList.add('hidden');
        }
      });
    });
  });

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answerEl) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answerEl.classList.contains('hidden');

        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAnswer && !otherAnswer.classList.contains('hidden')) {
            otherAnswer.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        if (!isOpen) {
          answerEl.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
          if (window.anime) {
            window.anime({
              targets: answerEl,
              opacity: [0, 1],
              translateY: [-6, 0],
              duration: 220,
              easing: 'easeOutQuad'
            });
          }
        }
      });
    }
  });

  // 9. Role-Aware Dynamic Placeholder for Contact Form
  const roleSelect = document.getElementById('role');
  const messageTextarea = document.getElementById('message');

  const rolePlaceholders = {
    'Institute Administrator': 'e.g. Total student capacity, hall setup, gate hardware inquiries, and timetable scheduling requirements...',
    'Tuition Teacher': 'e.g. Subjects taught, typical class size, commission split calculations, and anti-piracy video DRM inquiries...',
    'Parent': 'e.g. Sibling count, questions regarding virtual wallet reload methods, or automated attendance SMS alerts...',
    'Student': 'e.g. Your A/L batch, queries regarding NFC card tap-in, lost card fallback QR codes, or quiz access...',
    'Academic Researcher': 'e.g. Research collaboration, SDGP evaluation, architecture inquiries, or pilot data queries...'
  };

  if (roleSelect && messageTextarea) {
    roleSelect.addEventListener('change', () => {
      const selectedRole = roleSelect.value;
      if (rolePlaceholders[selectedRole]) {
        messageTextarea.placeholder = rolePlaceholders[selectedRole];
        if (window.anime) {
          window.anime({
            targets: messageTextarea,
            opacity: [0.6, 1],
            duration: 250,
            easing: 'easeOutQuad'
          });
        }
      } else {
        messageTextarea.placeholder = 'Tell us about your institute capacity or queries...';
      }
    });
  }

  // 10. Contact / Interest Registration Form Handler (Netlify Ready)
  const interestForm = document.getElementById('interest-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (interestForm) {
    interestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = interestForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Submitting Registration...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        interestForm.reset();

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('hidden');
          if (window.anime) {
            window.anime({
              targets: formSuccessAlert,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 350,
              easing: 'easeOutBack'
            });
          }
        }

        if (window.confetti) {
          window.confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#1d4ed8', '#2563eb', '#38bdf8', '#10b981']
          });
        }
      }, 800);
    });
  }

  // ========================================================
  // 11. INTERACTIVE WHATSAPP BOT WIDGET CONTROLLER (+94 77 129 6697)
  // ========================================================
  const waTriggerBtn = document.getElementById('wa-trigger-btn');
  const waChatWindow = document.getElementById('wa-chat-window');
  const waCloseBtn = document.getElementById('wa-close-btn');
  const waPromptPill = document.getElementById('wa-prompt-pill');
  const waStep1Chips = document.getElementById('wa-step-1-chips');
  const waDynamicMessages = document.getElementById('wa-dynamic-messages');
  const waResetBtn = document.getElementById('wa-reset-btn');
  const waChatBody = document.getElementById('wa-chat-body');

  const WA_PHONE_NUMBER = '94771296697';
  let waState = {
    role: '',
    topic: '',
    name: ''
  };

  // Toggle Chat Window
  function toggleWaChat() {
    if (!waChatWindow) return;
    const isHidden = waChatWindow.classList.contains('hidden');

    if (isHidden) {
      waChatWindow.classList.remove('hidden');
      if (waPromptPill) waPromptPill.classList.add('hidden');
      playBeep(1200, 0.08);

      if (window.anime) {
        window.anime({
          targets: waChatWindow,
          opacity: [0, 1],
          translateY: [15, 0],
          scale: [0.95, 1],
          duration: 280,
          easing: 'easeOutQuad'
        });
      }
      if (window.lucide) window.lucide.createIcons();
    } else {
      if (window.anime) {
        window.anime({
          targets: waChatWindow,
          opacity: [1, 0],
          translateY: [0, 15],
          scale: [1, 0.95],
          duration: 200,
          easing: 'easeInQuad',
          complete: () => {
            waChatWindow.classList.add('hidden');
          }
        });
      } else {
        waChatWindow.classList.add('hidden');
      }
    }
  }

  if (waTriggerBtn) waTriggerBtn.addEventListener('click', toggleWaChat);
  if (waCloseBtn) waCloseBtn.addEventListener('click', toggleWaChat);

  // Scroll chat body to bottom
  function scrollWaBottom() {
    if (waChatBody) {
      setTimeout(() => {
        waChatBody.scrollTop = waChatBody.scrollHeight;
      }, 50);
    }
  }

  // Topic Options mapping by role
  const roleTopics = {
    'Institute Administrator': [
      '💳 NFC Smart Cards & Gate Readers',
      '💰 Automated Revenue Splitting',
      '📅 Room & Timetable Scheduling',
      '🚀 Schedule Live Institute Demo'
    ],
    'Tuition Teacher': [
      '💰 Instant Tutor Commission Ledger',
      '🎥 Video Anti-Piracy DRM & Watermarks',
      '📝 Online MCQ Quizzes & 80% Rule',
      '💬 General Tutor Inquiries'
    ],
    'Parent / Guardian': [
      '📱 Multi-Child Unified Portal',
      '💳 Virtual Wallet Top-Up Inquiries',
      '📩 15-Minute Absent SMS Alerts',
      '💬 General Guardian Assistance'
    ],
    'Student': [
      '💳 NFC Student Smart Pass Activation',
      '📲 Lost Card QR Code Fallback',
      '📚 LMS Notes, Past Papers & Badges',
      '💬 Student Assistance'
    ]
  };

  // Step 1: Role Click Handler
  if (waStep1Chips) {
    const roleBtns = waStep1Chips.querySelectorAll('button[data-role]');
    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        waState.role = btn.getAttribute('data-role');
        playBeep(1400, 0.08);

        // Hide Step 1 chips
        waStep1Chips.classList.add('hidden');

        // User bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'flex justify-end';
        userBubble.innerHTML = `
          <div class="wa-bubble-user p-2.5 shadow-sm max-w-[80%] font-medium">
            I am a <strong>${waState.role}</strong>
          </div>
        `;
        waDynamicMessages.appendChild(userBubble);
        scrollWaBottom();

        // Bot responds with topics
        setTimeout(() => {
          playBeep(1600, 0.1);
          const botBubble = document.createElement('div');
          botBubble.className = 'flex flex-col items-start space-y-1 animate-fadeIn';

          const topics = roleTopics[waState.role] || [
            '💳 NFC Smart Cards',
            '💰 Virtual Wallet Top-Up',
            '🚀 Request a Live Demo',
            '💬 General Questions'
          ];

          let topicChipsHtml = topics.map(t => `
            <button class="wa-chip-btn w-full p-2 rounded-xl text-left font-semibold text-[11px] mb-1.5" data-topic="${t}">
              ${t}
            </button>
          `).join('');

          botBubble.innerHTML = `
            <div class="wa-bubble-bot p-3 shadow-sm max-w-[85%] text-slate-800 leading-relaxed">
              Great! Which feature would you like to inquire about?
            </div>
            <div class="w-full pt-1.5">
              ${topicChipsHtml}
            </div>
          `;
          waDynamicMessages.appendChild(botBubble);
          scrollWaBottom();

          // Bind topic buttons
          botBubble.querySelectorAll('button[data-topic]').forEach(topicBtn => {
            topicBtn.addEventListener('click', () => {
              waState.topic = topicBtn.getAttribute('data-topic');
              handleTopicSelected(topicBtn.parentElement);
            });
          });
        }, 350);
      });
    });
  }

  // Step 2: Topic Selected Handler
  function handleTopicSelected(parentContainer) {
    playBeep(1500, 0.08);
    if (parentContainer) parentContainer.classList.add('hidden');

    const userBubble = document.createElement('div');
    userBubble.className = 'flex justify-end';
    userBubble.innerHTML = `
      <div class="wa-bubble-user p-2.5 shadow-sm max-w-[80%] font-medium">
        ${waState.topic}
      </div>
    `;
    waDynamicMessages.appendChild(userBubble);
    scrollWaBottom();

    // Bot asks for name and shows WhatsApp CTA
    setTimeout(() => {
      playBeep(1700, 0.1);
      const botFinalBubble = document.createElement('div');
      botFinalBubble.className = 'flex flex-col items-start space-y-2 w-full animate-fadeIn';
      botFinalBubble.innerHTML = `
        <div class="wa-bubble-bot p-3 shadow-sm max-w-[88%] text-slate-800 leading-relaxed">
          Perfect! Enter your name below to connect directly with our engineering team on WhatsApp:
        </div>
        <div class="w-full bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <input type="text" id="wa-user-name" placeholder="Your Name (Optional)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500">
          <button id="wa-send-final-btn" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95">
            <i data-lucide="message-square" class="w-4 h-4"></i>
            <span>Start WhatsApp Chat</span>
          </button>
        </div>
      `;
      waDynamicMessages.appendChild(botFinalBubble);
      if (window.lucide) window.lucide.createIcons();
      scrollWaBottom();

      const sendBtn = botFinalBubble.querySelector('#wa-send-final-btn');
      const nameInput = botFinalBubble.querySelector('#wa-user-name');

      if (sendBtn) {
        sendBtn.addEventListener('click', () => {
          waState.name = (nameInput && nameInput.value.trim()) || 'Interested Visitor';
          launchWhatsApp();
        });
      }
    }, 350);
  }

  // Step 3: Launch WhatsApp with Formatted Text
  function launchWhatsApp() {
    const message = `Hello EduSync Team! 👋\n\nI visited your landing page and would like to inquire about your platform:\n• Role: ${waState.role}\n• Topic: ${waState.topic}\n• Name: ${waState.name}\n\nCould you please share more details? Thank you!`;
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encoded}`;

    // Confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#25D366', '#128C7E', '#3b82f6']
      });
    }

    // Success response bubble in bot
    const successBubble = document.createElement('div');
    successBubble.className = 'wa-bubble-bot p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-2';
    successBubble.innerHTML = `
      <i data-lucide="check" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
      <span>Opening WhatsApp! Our team will assist you shortly.</span>
    `;
    waDynamicMessages.appendChild(successBubble);
    if (window.lucide) window.lucide.createIcons();
    scrollWaBottom();

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  }

  // Reset Conversation
  if (waResetBtn) {
    waResetBtn.addEventListener('click', () => {
      waState = { role: '', topic: '', name: '' };
      waDynamicMessages.innerHTML = '';
      if (waStep1Chips) waStep1Chips.classList.remove('hidden');
      scrollWaBottom();
    });
  }
});
