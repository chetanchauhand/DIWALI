/* ===== Diwali Website – script.js ===== */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Images: remote photo source + local-first override + fallback ---------- */
// Photos come from loremflickr (keyword-based Flickr photos). To use your own,
// place files in assets/images/ and replace the URL in the data below.
const photo = (keywords, lock) => `https://loremflickr.com/800/560/${keywords}?lock=${lock}`;
// Inline SVG fallback used whenever an image fails to load.
const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560"><defs><radialGradient id="g" cx="50%" cy="60%" r="70%"><stop offset="0" stop-color="#ff8a2b"/><stop offset=".5" stop-color="#4b2a7b"/><stop offset="1" stop-color="#0b1030"/></radialGradient></defs><rect width="800" height="560" fill="url(#g)"/><text x="400" y="320" font-size="140" text-anchor="middle">🪔</text></svg>`);
// Error events do not bubble, so listen in the capture phase (one listener for all images).
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && t.src !== FALLBACK) t.src = FALLBACK;
}, true);
const img = (src, alt, cls = '') => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;

/* ---------- Data ---------- */
const carouselData = [
  ['diwali,diyas,lamps', 'Rows of glowing diyas'],
  ['rangoli,colorful', 'Colourful rangoli at the doorstep'],
  ['fireworks,night', 'Fireworks lighting the night sky'],
  ['indian,sweets', 'Festive Indian sweets'],
  ['india,temple,lights', 'Temples lit for the festival']
];
const sweets = [
  ['Gulab Jamun', 'North India', 'Soft milk-solid dumplings soaked in rose-scented sugar syrup.', 'Made from khoya, deep-fried gently and served warm — a centrepiece of every festive thali.', 'gulab,jamun'],
  ['Rasgulla', 'Odisha / West Bengal', 'Spongy cottage-cheese balls in light sugar syrup.', 'Made from chhena; both Odisha and Bengal cherish it, and it is served chilled.', 'rasgulla,sweet'],
  ['Jalebi', 'Across India', 'Crisp saffron-orange spirals dipped in syrup.', 'Fermented batter fried in coils; best eaten hot, often with rabri.', 'jalebi'],
  ['Kaju Katli', 'North India', 'Diamond-shaped cashew fudge with silver leaf.', 'Ground cashews, sugar and ghee — a favourite gift during Diwali.', 'cashew,barfi,sweet'],
  ['Motichoor Laddu', 'Rajasthan / Uttar Pradesh', 'Tiny boondi pearls pressed into golden laddus.', 'Often offered in prayers and associated with auspicious occasions.', 'laddu,sweet'],
  ['Soan Papdi', 'Uttar Pradesh / Maharashtra', 'Flaky, thread-like gram-flour sweet.', 'Layered strands of besan, ghee and sugar that melt in the mouth.', 'indian,sweet,flaky'],
  ['Peda', 'Mathura, Uttar Pradesh', 'Soft, fudgy milk sweet flavoured with cardamom.', 'Slow-cooked milk and sugar; Mathura and Dharwad peda are famous.', 'peda,indian,sweet'],
  ['Mysore Pak', 'Mysuru, Karnataka', 'Rich, ghee-laden besan sweet.', 'Born in the royal kitchens of Mysore, it is porous and melts instantly.', 'mysore,pak,sweet'],
  ['Rasmalai', 'West Bengal', 'Soft chhena discs in saffron-cardamom milk.', 'Served chilled and topped with pistachios — creamy and delicate.', 'rasmalai,dessert'],
  ['Gujiya', 'Uttar Pradesh / Bihar', 'Crescent pastry filled with khoya and dry fruits.', 'Traditionally made for Holi and Diwali; fried until crisp and golden.', 'gujiya,pastry,indian'],
  ['Besan Laddu', 'Across India', 'Roasted gram-flour laddus with ghee and nuts.', 'Slow roasting gives a nutty aroma; a household classic.', 'laddu,besan'],
  ['Barfi', 'Across India', 'Dense milk fudge in squares, often with pistachio.', 'Variations include kaju, pista, coconut and chocolate barfi.', 'barfi,indian,sweet']
].map((s, i) => ({ name: s[0], origin: s[1], desc: s[2], more: s[3], src: photo(s[4], 10 + i) }));

const chapters = [
  ['Birth of Lord Rama', 'श्री राम का जन्म',
   'In the kingdom of Kosala, King Dasharatha of Ayodhya performed a sacred yajna seeking children. Prince Rama was born to Queen Kaushalya, with brothers Bharata, Lakshmana and Shatrughna. Rama grew up admired for his compassion, humility and devotion to dharma.',
   'अयोध्या के राजा दशरथ ने पुत्र प्राप्ति के लिए यज्ञ किया। रानी कौशल्या से श्री राम का जन्म हुआ, और भरत, लक्ष्मण तथा शत्रुघ्न उनके भाई थे। राम अपनी करुणा, विनम्रता और धर्म-निष्ठा के लिए प्रसिद्ध हुए।', 'ayodhya,temple', 'ram,temple'],
  ['Sita Swayamvar', 'सीता स्वयंवर',
   'In Mithila, King Janaka announced that Princess Sita would wed whoever could string the mighty bow of Shiva. Many princes failed. Rama lifted and strung the bow, and it broke. Rama and Sita were married in a joyous ceremony.',
   'मिथिला में राजा जनक ने घोषणा की कि जो शिव-धनुष पर प्रत्यंचा चढ़ाएगा, वही सीता से विवाह करेगा। राम ने धनुष उठाया और प्रत्यंचा चढ़ाते समय वह टूट गया। राम और सीता का विवाह हुआ।', 'wedding,india,tradition', 'mithila,bow'],
  ['Fourteen Years of Exile', 'चौदह वर्ष का वनवास',
   'Because of a promise King Dasharatha had made to Queen Kaikeyi, Rama was sent to the forest for fourteen years. Rama accepted this with grace, honouring his father\'s word. Sita and Lakshmana chose to accompany him.',
   'राजा दशरथ के वचन के कारण राम को चौदह वर्ष का वनवास मिला। उन्होंने पिता की आज्ञा सहर्ष स्वीकार की। सीता और लक्ष्मण भी उनके साथ वन गए।', 'forest,india,river', 'forest,path'],
  ['Search for Sita', 'सीता की खोज',
   'Ravana, king of Lanka, abducted Sita. Rama and Lakshmana searched the forests and met Hanuman and Sugriva, the Vanara king. Hanuman\'s devotion and courage became legendary; he found Sita in Lanka and carried Rama\'s message to her.',
   'लंका के राजा रावण ने सीता का हरण किया। राम और लक्ष्मण ने वन में खोज की और उन्हें हनुमान व सुग्रीव मिले। हनुमान ने लंका में सीता को खोजा और राम का संदेश पहुँचाया।', 'mountain,india,monkey', 'hanuman,statue'],
  ['Journey to Lanka', 'लंका की यात्रा',
   'With an army of Vanaras, Rama reached the southern shore. A bridge, Ram Setu, was built across the sea with the help of Nala and Nila. The army crossed to Lanka, ready for a righteous battle.',
   'वानर सेना के साथ राम समुद्र तट पहुँचे। नल और नील की सहायता से समुद्र पर राम सेतु बना। सेना लंका पहुँची और धर्मयुद्ध की तैयारी हुई।', 'sea,bridge,sunset', 'ocean,bridge'],
  ['Victory over Ravana', 'रावण पर विजय',
   'After a great war, Rama defeated Ravana, symbolising the victory of good over evil. This triumph is celebrated as Dussehra, twenty days before Diwali. Sita was freed and Ravana\'s brother Vibhishana was crowned king of Lanka.',
   'भीषण युद्ध के बाद राम ने रावण का वध किया — बुराई पर अच्छाई की विजय। यही दशहरा के रूप में मनाया जाता है। सीता मुक्त हुईं और विभीषण लंका के राजा बने।', 'dussehra,effigy,india', 'dussehra'],
  ['Return to Ayodhya', 'अयोध्या वापसी',
   'After fourteen years, Rama, Sita and Lakshmana returned to Ayodhya. On the new-moon night, the citizens lit rows of earthen lamps to welcome them. This is the tradition many communities remember each Diwali by lighting diyas.',
   'चौदह वर्ष बाद राम, सीता और लक्ष्मण अयोध्या लौटे। अमावस्या की रात नगरवासियों ने दीपक जलाकर उनका स्वागत किया। इसी स्मृति में दीपावली पर दीप जलाए जाते हैं।', 'diwali,diyas,lamps', 'diya,festival']
].map((c, i) => ({ title: c[0], hi: c[1], en: c[2], hiText: c[3], src: photo(c[4], 30 + i) }));

const deepotsav = [['ayodhya,diyas', 'Lakhs of diyas on the ghats'], ['saryu,river,lamps', 'Saryu riverbank aglow'], ['diwali,celebration,lights', 'Festival of lights'], ['temple,lights,india', 'Temple illuminations']]
  .map((d, i) => ({ src: photo(d[0], 50 + i), alt: d[1] }));

const traditions = [
  ['Lighting Diyas', 'Small clay lamps filled with oil or ghee are lit at dusk to invite light, wisdom and prosperity into the home, symbolising the victory over darkness.', 'diya,clay,lamp'],
  ['Rangoli', 'Intricate patterns made with coloured powder, rice flour or flower petals decorate entrances to welcome guests and Goddess Lakshmi.', 'rangoli,design'],
  ['Lakshmi Puja', 'On Diwali evening families worship Goddess Lakshmi, the giver of wealth and well-being, with prayers, aarti, flowers and offerings, often alongside Lord Ganesha.', 'lakshmi,puja,india'],
  ['Cleaning & Decoration', 'Homes are cleaned and painted, and decorated with marigold garlands, torans and lights. A clean home is believed to welcome blessings.', 'marigold,decoration,india'],
  ['Sharing Sweets', 'Boxes of mithai and dry fruits are exchanged with neighbours, friends and relatives, spreading sweetness and goodwill.', 'indian,sweets,gift'],
  ['Family Celebrations', 'Families gather for prayers, a festive meal, new clothes and games. It is a time of reunion, gratitude and forgiveness.', 'family,celebration,india']
].map((t, i) => ({ title: t[0], desc: t[1], src: photo(t[2], 70 + i) }));

/* ---------- State ---------- */
let visitorName = '';

/* ---------- Background golden particles (always-on, lightweight) ---------- */
(function bgParticles() {
  const c = $('#bgParticles'), ctx = c.getContext('2d');
  let w, h, ps = [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  resize(); addEventListener('resize', resize);
  const count = () => Math.min(70, Math.floor(innerWidth / 18));
  for (let i = 0; i < count(); i++) ps.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 2 + .5, v: Math.random() * .4 + .15, a: Math.random() * Math.PI * 2 });
  (function loop() {
    ctx.clearRect(0, 0, w, h);
    ps.forEach(p => {
      p.y -= p.v; p.a += .02; p.x += Math.sin(p.a) * .3;
      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = `rgba(243,217,139,${.35 + Math.sin(p.a) * .3})`; ctx.shadowColor = '#ffb347'; ctx.shadowBlur = 8; ctx.fill();
    });
    if (!reduce) requestAnimationFrame(loop);
  })();
})();

/* ---------- Welcome form ---------- */
const nameInput = $('#visitorName'), nameError = $('#nameError');
$('#nameForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim().replace(/\s+/g, ' ');
  if (!name) { nameError.hidden = false; nameInput.focus(); return; }
  nameError.hidden = true;
  visitorName = name;
  $$('.vname').forEach(el => { el.textContent = name; });          // textContent => safe from HTML injection
  $('#wishText').value = `Happy Diwali from ${name}! 🪔\nMay this festival of lights bring you joy, health and prosperity. Shubh Deepavali!`;
  const wel = $('#welcome');
  wel.classList.add('leaving');
  setTimeout(() => { wel.hidden = true; $('#app').hidden = false; startCarousel(); scrollTo(0, 0); }, 750);
});
nameInput.addEventListener('input', () => { nameError.hidden = true; });

/* ---------- Tab navigation (no page reload) ---------- */
const nav = $('#nav'), menuBtn = $('#menuBtn');
function showTab(id) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.id === 'tab-' + id));
  $$('.nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false');
  scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'fireworks') requestAnimationFrame(sizeCanvas); else if (game.running) endGame();
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tab]');
  if (t) { e.preventDefault(); showTab(t.dataset.tab); }
});
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

/* ---------- Home: carousel ---------- */
const slidesEl = $('#slides'), dotsEl = $('#dots');
let cur = 0, timer = null;
slidesEl.innerHTML = carouselData.map((c, i) => `<div class="slide${i ? '' : ' on'}">${img(photo(c[0], i + 1), c[1])}<span>${c[1]}</span></div>`).join('');
dotsEl.innerHTML = carouselData.map((_, i) => `<button aria-label="Go to slide ${i + 1}" class="${i ? '' : 'on'}"></button>`).join('');
function goSlide(n) {
  cur = (n + carouselData.length) % carouselData.length;
  $$('.slide').forEach((s, i) => s.classList.toggle('on', i === cur));
  $$('button', dotsEl).forEach((d, i) => d.classList.toggle('on', i === cur));
}
function startCarousel() { clearInterval(timer); timer = setInterval(() => goSlide(cur + 1), 5000); }
$('#prevSlide').addEventListener('click', () => { goSlide(cur - 1); startCarousel(); });
$('#nextSlide').addEventListener('click', () => { goSlide(cur + 1); startCarousel(); });
dotsEl.addEventListener('click', e => { const i = $$('button', dotsEl).indexOf(e.target); if (i > -1) { goSlide(i); startCarousel(); } });

// Home section cards that link to other tabs
const links = [['mithai', '🍬', 'Mithai Mahal', 'Explore 12 famous Indian sweets.'], ['ramayana', '📜', 'Ramayana', 'Seven chapters of the story behind Diwali.'], ['fireworks', '🎆', 'Firecracker Zone', 'Play a safe, digital fireworks game.'], ['traditions', '🪔', 'Diwali Traditions', 'Diyas, rangoli, puja and more.'], ['wishes', '💌', 'Wishes', 'Create and share your own greeting.']];
$('#homeLinks').innerHTML = links.map(l => `<button class="card" data-tab="${l[0]}"><div class="body"><h4>${l[1]} ${l[2]}</h4><p>${l[3]}</p></div></button>`).join('');

/* ---------- Music player ---------- */
const audio = $('#bgMusic'), playBtn = $('#playBtn'), note = $('#audioNote');
audio.volume = 0.5;
function audioProblem() {
  note.textContent = 'Music file not found. Add a licensed or royalty-free MP3 at assets/audio/diwali-music.mp3.';
  note.hidden = false; playBtn.textContent = '▶';
}
audio.querySelector('source').addEventListener('error', audioProblem);
audio.addEventListener('error', audioProblem);
playBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', 'Pause music'); note.hidden = true; }
    catch (err) { audioProblem(); }
  } else { audio.pause(); playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'Play music'); }
});
$('#volume').addEventListener('input', e => { audio.volume = +e.target.value; });

/* ---------- Mithai Mahal ---------- */
const grid = $('#sweetGrid'), modal = $('#modal');
function renderSweets(list) {
  grid.innerHTML = list.map(s => `<button class="card" data-name="${s.name}">${img(s.src, s.name)}<div class="body"><h4>${s.name}</h4><small>${s.origin}</small><p>${s.desc}</p></div></button>`).join('');
  $('#noSweets').hidden = list.length > 0;
}
function applySweetFilter() {
  const q = $('#sweetSearch').value.trim().toLowerCase();
  renderSweets(sweets.filter(s => (s.name + s.origin + s.desc + s.more).toLowerCase().includes(q)));
}
applySweetFilter();
$('#sweetSearch').addEventListener('input', applySweetFilter);

/* Real sweet photos: fetched from Wikipedia's official REST API (CORS-enabled, CC-licensed images).
   Order of fallbacks: Wikipedia photo -> keyword photo set above -> built-in diya illustration. */
const WIKI = {
  'Gulab Jamun': 'Gulab_jamun', 'Rasgulla': 'Rasgulla', 'Jalebi': 'Jalebi', 'Kaju Katli': 'Kaju_katli',
  'Motichoor Laddu': 'Motichoor_ladoo', 'Soan Papdi': 'Soan_papdi', 'Peda': 'Peda', 'Mysore Pak': 'Mysore_pak',
  'Rasmalai': 'Ras_malai', 'Gujiya': 'Gujia', 'Besan Laddu': 'Besan_ladoo', 'Barfi': 'Barfi'
};
// Wikimedia thumbnail URLs contain "/500px-"; swap the width for card (500) or modal (960) size.
const sizeUrl = (u, w) => u.replace(/\/(\d+)px-/, `/${w}px-`);
async function loadSweetImages() {
  await Promise.all(sweets.map(async s => {
    try {
      const key = 'sweetimg_' + s.name;
      let url = null;
      try { url = sessionStorage.getItem(key); } catch { /* storage blocked */ }
      if (!url) {
        const res = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + WIKI[s.name]);
        if (!res.ok) throw new Error('no page');
        const data = await res.json();
        url = data.thumbnail && data.thumbnail.source;
        if (!url) throw new Error('no image');
        try { sessionStorage.setItem(key, url); } catch { /* ignore */ }
      }
      s.src = sizeUrl(url, 500); s.big = sizeUrl(url, 960);
    } catch { /* keep the fallback image for this sweet */ }
  }));
  applySweetFilter();   // re-render with the real photos
}
loadSweetImages();
let lastFocus = null;
grid.addEventListener('click', e => {
  const card = e.target.closest('.card'); if (!card) return;
  const s = sweets.find(x => x.name === card.dataset.name);
  $('#mImg').src = s.big || s.src; $('#mImg').alt = s.name;
  $('#mTitle').textContent = s.name; $('#mOrigin').textContent = 'Origin: ' + s.origin;
  $('#mDesc').textContent = s.desc; $('#mMore').textContent = s.more;
  lastFocus = card; modal.hidden = false; $('#modalClose').focus();
});
function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

/* ---------- Ramayana ---------- */
let ch = 0;
$('#chNav').innerHTML = chapters.map((c, i) => `<button data-i="${i}">${i + 1}. ${c.title}</button>`).join('');
function showChapter(i) {
  ch = Math.max(0, Math.min(chapters.length - 1, i));
  const c = chapters[ch];
  $('#chImg').src = c.src; $('#chImg').alt = c.title;
  $('#chCount').textContent = `Chapter ${ch + 1} of ${chapters.length} · ${c.hi}`;
  $('#chTitle').textContent = c.title; $('#chEn').textContent = c.en; $('#chHi').textContent = c.hiText;
  $$('#chNav button').forEach((b, k) => { b.classList.toggle('active', k === ch); if (k === ch) b.scrollIntoView({ block: 'nearest', inline: 'center' }); });
  $('#chProgress').style.width = ((ch + 1) / chapters.length * 100) + '%';
  $('#chPrev').disabled = ch === 0; $('#chNext').disabled = ch === chapters.length - 1;
}
$('#chNav').addEventListener('click', e => { const b = e.target.closest('button'); if (b) showChapter(+b.dataset.i); });
$('#chPrev').addEventListener('click', () => showChapter(ch - 1));
$('#chNext').addEventListener('click', () => showChapter(ch + 1));
showChapter(0);
$('#deepGallery').innerHTML = deepotsav.map(d => img(d.src, d.alt)).join('');

/* ---------- Traditions ---------- */
$('#traditionGrid').innerHTML = traditions.map(t => `<article class="card">${img(t.src, t.title)}<div class="body"><h4>${t.title}</h4><p>${t.desc}</p></div></article>`).join('');

/* ---------- Firecracker Zone (digital fireworks) ---------- */
const arena = $('#arena'), cv = $('#fwCanvas'), cctx = cv.getContext('2d');
const game = { running: false, score: 0, time: 30, tick: null };
let bursts = [], soundOn = false, actx = null, W = 0, H = 0, fwLoopOn = false;
const COLORS = ['#ff4d6d', '#ffd166', '#06d6a0', '#4cc9f0', '#f72585', '#ff9e00', '#b388ff', '#fff'];
const getBest = () => { try { return +localStorage.getItem('diwaliBest') || 0; } catch { return 0; } };
const setBest = v => { try { localStorage.setItem('diwaliBest', v); } catch { /* storage unavailable */ } };
$('#best').textContent = getBest();

function sizeCanvas() {
  const r = arena.getBoundingClientRect(), d = devicePixelRatio || 1;
  W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; cctx.setTransform(d, 0, 0, d, 0, 0);
}
addEventListener('resize', sizeCanvas);

function boom() {                         // short synthesized pop (no audio files needed)
  if (!soundOn) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const len = actx.sampleRate * .25, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = actx.createBufferSource(), g = actx.createGain(); g.gain.value = .25; src.buffer = buf; src.connect(g).connect(actx.destination); src.start();
  } catch { /* audio unsupported */ }
}
function burst(x, y) {
  const color = COLORS[Math.random() * COLORS.length | 0], n = 46;
  const parts = Array.from({ length: n }, (_, i) => {
    const a = i / n * Math.PI * 2 + Math.random() * .2, sp = Math.random() * 4 + 1.5;
    return { x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, c: Math.random() < .3 ? '#fff' : color };
  });
  bursts.push(...parts); boom();
  if (!fwLoopOn) { fwLoopOn = true; requestAnimationFrame(fwLoop); }
}
function fwLoop() {
  cctx.fillStyle = 'rgba(3,4,15,.22)'; cctx.fillRect(0, 0, W, H);   // trail effect
  bursts = bursts.filter(p => p.life > 0);
  bursts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += .05; p.vx *= .985; p.life -= .014;
    cctx.globalAlpha = Math.max(p.life, 0); cctx.fillStyle = p.c; cctx.shadowColor = p.c; cctx.shadowBlur = 8;
    cctx.beginPath(); cctx.arc(p.x, p.y, 2.2, 0, 7); cctx.fill();
  });
  cctx.globalAlpha = 1; cctx.shadowBlur = 0;
  if (bursts.length) requestAnimationFrame(fwLoop);
  else { fwLoopOn = false; cctx.clearRect(0, 0, W, H); }
}
function startGame() {
  clearInterval(game.tick);
  Object.assign(game, { running: true, score: 0, time: 30 });
  $('#score').textContent = 0; $('#time').textContent = 30; $('#arenaMsg').hidden = true;
  game.tick = setInterval(() => {
    game.time--; $('#time').textContent = game.time;
    if (game.time <= 0) endGame();
  }, 1000);
}
function endGame() {
  clearInterval(game.tick); game.running = false;
  let msg = `Time's up! Score: ${game.score}`;
  if (game.score > getBest()) { setBest(game.score); $('#best').textContent = game.score; msg += ' 🎉 New best!'; }
  $('#arenaText').textContent = msg;
  $('#startBtn').textContent = 'Play Again';
  $('#arenaMsg').hidden = false;
}
$('#startBtn').addEventListener('click', e => { e.stopPropagation(); startGame(); });
arena.addEventListener('pointerdown', e => {
  if (e.target.closest('.arena-msg') && !$('#arenaMsg').hidden) return;
  const r = arena.getBoundingClientRect();
  burst(e.clientX - r.left, e.clientY - r.top);
  if (game.running) { game.score += 10; $('#score').textContent = game.score; }
});
$('#soundBtn').addEventListener('click', e => {
  soundOn = !soundOn;
  e.currentTarget.textContent = soundOn ? '🔊 Sound on' : '🔇 Sound off';
  e.currentTarget.setAttribute('aria-pressed', String(soundOn));
});

/* ---------- Wishes: copy & share ---------- */
const wishText = $('#wishText'), status = $('#wishStatus');
function say(msg, ok) { status.textContent = msg; status.className = 'status ' + (ok ? 'ok' : 'bad'); clearTimeout(say.t); say.t = setTimeout(() => { status.textContent = ''; }, 4000); }
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return; }
  // Fallback for non-secure contexts / older browsers
  const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta); ta.select();
  const ok = document.execCommand('copy'); ta.remove();
  if (!ok) throw new Error('copy failed');
}
$('#copyBtn').addEventListener('click', async () => {
  const t = wishText.value.trim();
  if (!t) return say('Please write a message first.', false);
  try { await copyText(t); say('Message copied to clipboard! ✅', true); }
  catch { say('Could not copy. Please select the text and copy manually.', false); }
});
$('#shareBtn').addEventListener('click', async () => {
  const t = wishText.value.trim();
  if (!t) return say('Please write a message first.', false);
  if (navigator.share) {
    try { await navigator.share({ title: 'Happy Diwali!', text: t }); say('Shared successfully! 🪔', true); }
    catch (err) { if (err.name !== 'AbortError') say('Sharing failed. Try Copy Message instead.', false); }
  } else {
    try { await copyText(t); say('Sharing is not supported here, so the message was copied instead. ✅', true); }
    catch { say('Sharing and copying are unavailable in this browser.', false); }
  }
});
})();