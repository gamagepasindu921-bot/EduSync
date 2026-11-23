/**
 * Three.js 3D NFC Smart Card - Ultra-Luxury Executive Edition
 * Features rounded bevel geometry, planar UV mapping, iridescent holographic foil,
 * photorealistic EMV gold chip, dynamic lighting, and tactile depth.
 */

(function () {
  const container = document.getElementById('hero-3d-container');
  if (!container) return;

  let scene, camera, renderer, cardMesh, particlesMesh, shadowMesh;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let isTapping = false;

  function init() {
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 520;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Studio Lighting for Luxurious Specular Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light - Crisp White
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Rim Light - Royal Blue Accent
    const rimLight = new THREE.DirectionalLight(0x2563eb, 3.0);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    // Front Soft Fill - Cyan Accent
    const fillLight = new THREE.PointLight(0x38bdf8, 2.0, 15);
    fillLight.position.set(0, 2, 5);
    scene.add(fillLight);

    // Create 3D Rounded Card with Realistic Bevels
    createNFCCard();

    // Create Contact Drop Shadow
    createContactShadow();

    // Create Ambient Floating Particles
    createParticles();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    const tapBtn = document.getElementById('hero-tap-card-btn');
    if (tapBtn) {
      tapBtn.addEventListener('click', triggerCardTap);
    }

    animate();
  }

  // Generate Ultra-High-Res Procedural Executive Card Texture (2048 x 1296)
  function createCardTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1296; // 85.6mm x 53.98mm credit card standard ratio
    const ctx = canvas.getContext('2d');

    // 1. Deep Royal Navy & Cobalt Gradient Base
    const bgGrad = ctx.createLinearGradient(0, 0, 2048, 1296);
    bgGrad.addColorStop(0, '#0a1a3a');   // Midnight Cobalt
    bgGrad.addColorStop(0.35, '#123270'); // Royal Blue
    bgGrad.addColorStop(0.7, '#1d4ed8');  // Electric Sapphire
    bgGrad.addColorStop(1, '#07152b');   // Deep Obsidian Blue
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 2048, 1296);

    // 2. Micro Guilloche / Geometric Security Waves
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(1700, 300, 300 + i * 45, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.arc(300, 1100, 200 + i * 50, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Diagonal Iridescent Holographic Ribbon
    ctx.save();
    const holoRibbon = ctx.createLinearGradient(0, 300, 2048, 900);
    holoRibbon.addColorStop(0, 'rgba(56, 189, 248, 0.0)');
    holoRibbon.addColorStop(0.25, 'rgba(99, 102, 241, 0.18)');
    holoRibbon.addColorStop(0.45, 'rgba(236, 72, 153, 0.22)');
    holoRibbon.addColorStop(0.6, 'rgba(251, 191, 36, 0.18)');
    holoRibbon.addColorStop(0.75, 'rgba(52, 211, 153, 0.15)');
    holoRibbon.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
    ctx.fillStyle = holoRibbon;
    ctx.fillRect(0, 380, 2048, 320);
    ctx.restore();

    // 4. Glossy Specular Curved Arc
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(2048, 0);
    ctx.lineTo(2048, 380);
    ctx.bezierCurveTo(1400, 700, 600, 250, 0, 600);
    ctx.closePath();
    const glossGrad = ctx.createLinearGradient(0, 0, 2048, 600);
    glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.26)');
    glossGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.03)');
    glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = glossGrad;
    ctx.fill();
    ctx.restore();

    // 5. Silver Foil Circuit Trace Accents
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(160, 290);
    ctx.lineTo(460, 290);
    ctx.lineTo(580, 410);
    ctx.lineTo(1100, 410);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1880, 950);
    ctx.lineTo(1520, 950);
    ctx.lineTo(1400, 830);
    ctx.lineTo(950, 830);
    ctx.stroke();

    // 6. Header: EduSync Logo & NFC Wave Icon
    // Logo Pill
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 96px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('EduSync', 160, 220);

    // Glowing Dot beside logo
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(600, 180, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '700 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SMART CAMPUS PASS', 160, 280);

    // High-Tech Contactless Arcs (Top Right)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    for (let r = 1; r <= 3; r++) {
      ctx.beginPath();
      ctx.arc(1780, 220, r * 30, -0.6 * Math.PI, 0.6 * Math.PI, false);
      ctx.stroke();
    }
    ctx.fillStyle = '#93c5fd';
    ctx.font = '600 28px "JetBrains Mono", monospace';
    ctx.fillText('RFID / NFC', 1690, 360);

    // 7. Photorealistic EMV Gold Chip
    const chipX = 160;
    const chipY = 440;
    const chipW = 270;
    const chipH = 205;

    // Chip Base with gold gradient
    const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, '#fde68a');
    chipGrad.addColorStop(0.3, '#fbbf24');
    chipGrad.addColorStop(0.7, '#d97706');
    chipGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = chipGrad;
    if (ctx.roundRect) ctx.roundRect(chipX, chipY, chipW, chipH, 24);
    else ctx.rect(chipX, chipY, chipW, chipH);
    ctx.fill();

    // Chip Rim
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Internal circuit lines
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(chipX + 70, chipY, 130, chipH);
    ctx.beginPath();
    ctx.moveTo(chipX, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW, chipY + chipH / 2);
    ctx.stroke();

    // 8. Card UID (Smart Card Number)
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 48px "JetBrains Mono", monospace';
    ctx.fillText('NFC UID: 04:A3:8C:F2:19', 160, 780);

    // 9. Cardholder Details
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '700 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CARDHOLDER', 160, 930);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PASINDU NETHSARA', 160, 1010);

    ctx.fillStyle = '#67e8f9';
    ctx.font = '700 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('STUDENT ID: STU-9402 • A/L 2026', 160, 1075);

    // 10. Luxury Frosted White Glass Balance Tag (Bottom Right)
    const pillX = 1240;
    const pillY = 860;
    const pillW = 640;
    const pillH = 220;

    // Glass backdrop
    ctx.fillStyle = '#ffffff';
    if (ctx.roundRect) ctx.roundRect(pillX, pillY, pillW, pillH, 36);
    else ctx.rect(pillX, pillY, pillW, pillH);
    ctx.fill();

    // Subtle blue accent border
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Pulse indicator dot inside pill
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(pillX + 55, pillY + 70, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#475569';
    ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('VIRTUAL WALLET BALANCE', pillX + 85, pillY + 80);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 72px "JetBrains Mono", monospace';
    ctx.fillText('LKR 12,500', pillX + 50, pillY + 165);

    // 11. Holographic Anti-Counterfeit Security Hologram Seal (Center Right)
    ctx.save();
    const holoSealGrad = ctx.createRadialGradient(1620, 560, 10, 1620, 560, 80);
    holoSealGrad.addColorStop(0, '#fef08a');
    holoSealGrad.addColorStop(0.3, '#a7f3d0');
    holoSealGrad.addColorStop(0.6, '#bae6fd');
    holoSealGrad.addColorStop(0.85, '#ddd6fe');
    holoSealGrad.addColorStop(1, '#fbcfe8');
    ctx.fillStyle = holoSealGrad;
    ctx.beginPath();
    ctx.arc(1620, 560, 75, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('EDUSYNC', 1620, 555);
    ctx.fillText('SECURE', 1620, 580);
    ctx.textAlign = 'start';
    ctx.restore();

    return new THREE.CanvasTexture(canvas);
  }

  // Create Smooth 3D Card with Rounded Corners & Planar UV Mapping
  function createNFCCard() {
    const cardW = 4.3;
    const cardH = 2.72;
    const radius = 0.22;
    const cardDepth = 0.08;

    // Construct 2D Rounded Rectangle Shape
    const shape = new THREE.Shape();
    const x = -cardW / 2;
    const y = -cardH / 2;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + cardW - radius, y);
    shape.quadraticCurveTo(x + cardW, y, x + cardW, y + radius);
    shape.lineTo(x + cardW, y + cardH - radius);
    shape.quadraticCurveTo(x + cardW, y + cardH, x + cardW - radius, y + cardH);
    shape.lineTo(x + radius, y + cardH);
    shape.quadraticCurveTo(x, y + cardH, x, y + cardH - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    // Extrude with realistic beveled rim
    const extrudeSettings = {
      depth: cardDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Compute Planar UV coordinates for front and back faces
    const pos = geometry.attributes.position;
    const uvs = [];
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + cardW / 2) / cardW;
      const v = (pos.getY(i) + cardH / 2) / cardH;
      uvs.push(u, v);
    }
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    const cardTexture = createCardTexture();
    cardTexture.anisotropy = 16;

    // Front/Side Material with high-end gloss and metallic depth
    const material = new THREE.MeshStandardMaterial({
      map: cardTexture,
      roughness: 0.18,
      metalness: 0.45,
    });

    cardMesh = new THREE.Mesh(geometry, material);
    cardMesh.position.set(0, 0, 0);
    cardMesh.rotation.y = -0.15;
    cardMesh.rotation.x = 0.1;
    scene.add(cardMesh);
  }

  // Soft Contact Drop Shadow Plane
  function createContactShadow() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 115);
    grad.addColorStop(0, 'rgba(29, 78, 216, 0.28)');
    grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.14)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowGeo = new THREE.PlaneGeometry(5.2, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      depthWrite: false,
    });

    shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.85, -0.4);
    shadowMesh.rotation.x = -Math.PI / 2.3;
    scene.add(shadowMesh);
  }

  // Floating Ambient Blue Particles
  function createParticles() {
    const count = 90;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x2563eb); // Royal Blue
    const color2 = new THREE.Color(0x38bdf8); // Sky Cyan

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
  }

  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    targetRotationY = (x / rect.width) * 0.65;
    targetRotationX = (y / rect.height) * -0.45;
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // 3D Card Tap Interaction
  function triggerCardTap() {
    if (isTapping || !cardMesh) return;
    isTapping = true;

    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.45 },
        colors: ['#1d4ed8', '#3b82f6', '#38bdf8', '#10b981']
      });
    }

    if (window.anime) {
      window.anime({
        targets: cardMesh.position,
        z: [0, 1.4, 0],
        y: [0, 0.35, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .5)',
        complete: () => {
          isTapping = false;
        }
      });

      window.anime({
        targets: cardMesh.rotation,
        y: [cardMesh.rotation.y, cardMesh.rotation.y + Math.PI * 2],
        duration: 1100,
        easing: 'easeInOutCubic',
      });
    } else {
      setTimeout(() => {
        isTapping = false;
      }, 1000);
    }
  }

  window.triggerCardTapAnimation = triggerCardTap;

  function animate() {
    requestAnimationFrame(animate);

    currentRotationX += (targetRotationX - currentRotationX) * 0.06;
    currentRotationY += (targetRotationY - currentRotationY) * 0.06;

    if (!isTapping && cardMesh) {
      const time = Date.now() * 0.0015;
      cardMesh.rotation.x = currentRotationX + Math.sin(time) * 0.04;
      cardMesh.rotation.y = currentRotationY + Math.cos(time * 0.8) * 0.07;
      cardMesh.position.y = Math.sin(time * 1.5) * 0.1;

      if (shadowMesh) {
        shadowMesh.scale.x = 1 + Math.sin(time * 1.5) * 0.08;
      }
    }

    if (particlesMesh) {
      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0004;
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
