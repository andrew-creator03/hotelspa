(function(){
'use strict';

const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ============ DATA ============ */
const ROOMS = [
  {
    id: 'alpine-suite',
    name: 'The Alpine Suite',
    tag: 'SIGNATURE',
    desc: 'A private corner of the hotel with a terrace facing the eastern range. Handcrafted furniture, deep oak, and a fireplace.',
    size: '62 m²',
    guests: '2 Guests',
    price: '€740',
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=85',
    full: 'The Alpine Suite is our signature room — an entire private wing of the hotel, with a stone fireplace, a hand-selected library, and a glass-walled bathroom facing the eastern mountain range. In summer, the terrace is where you will find yourself at sunrise.',
    features: ['Private terrace', 'Fireplace', 'Mountain view', 'King bed', 'Bathtub with view', 'Butler service'],
  },
  {
    id: 'panorama-room',
    name: 'The Panorama Room',
    tag: 'MOUNTAIN VIEW',
    desc: 'Full-width windows framing the valley. Designed around a single view: the entire alpine range.',
    size: '48 m²',
    guests: '2 Guests',
    price: '€580',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=85',
    full: 'The Panorama Room is the room we would choose ourselves. Full-width windows wrap around two sides of the space, so that from bed to bathtub, the mountain is always visible. Soundproofed, climate-controlled, and finished in warm oak and wool.',
    features: ['Full-width windows', 'Valley view', 'King bed', 'Reading nook', 'Deep soaking tub', 'Daily turndown'],
  },
  {
    id: 'forest-suite',
    name: 'The Forest Suite',
    tag: 'FOREST VIEW',
    desc: 'Tucked into the tree line. A quiet suite with a private balcony facing the old pine forest.',
    size: '54 m²',
    guests: '2 Guests',
    price: '€640',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85',
    full: 'The Forest Suite is deliberately quieter than the rest of the hotel. Its balcony opens directly into the treeline, and at night the only sound is wind in the pines. The suite is designed for those who come to the mountains to disappear for a while.',
    features: ['Private balcony', 'Forest view', 'King bed', 'Fireplace', 'Deep bathtub', 'Morning tea service'],
  },
  {
    id: 'presidential-suite',
    name: 'The Presidential Suite',
    tag: 'PRIVATE WING',
    desc: 'The largest suite in the hotel. Two bedrooms, a private SPA bathroom, and a sunken living room.',
    size: '120 m²',
    guests: '4 Guests',
    price: '€1,480',
    img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    full: 'The Presidential Suite occupies an entire top floor. Two bedrooms, a sunken living room, a private SPA bathroom with a cold plunge, and a wrap-around terrace large enough to host a private dinner. Reserved for guests who want the hotel without the hotel.',
    features: ['2 bedrooms', 'Private SPA bath', 'Wrap-around terrace', 'Sunken living room', 'Dedicated butler', 'Private dining available'],
  },
];

const SPA_SERVICES = [
  {
    name: 'Signature Massage',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Thermal Ritual',
    duration: '120 min',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Private Sauna',
    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Ice Bath',
    duration: '30 min',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Couples Treatment',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Morning Wellness',
    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=85',
  },
];

const EXPERIENCES = [
  {
    id: 'sunrise-hike',
    name: 'Mountain Sunrise',
    desc: 'A guided walk to the eastern ridge, timed for first light. Coffee on arrival at the summit.',
    duration: '120 min',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85',
    category: 'nature',
    moods: ['adventure','wellness'],
    times: ['morning'],
  },
  {
    id: 'forest-dinner',
    name: 'Private Forest Dinner',
    desc: 'A table for two, deep in the pines. Seven courses, lit by lanterns, cooked on fire.',
    duration: '180 min',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85',
    category: 'dining',
    moods: ['romantic','adventure'],
    times: ['evening'],
  },
  {
    id: 'wine-tasting',
    name: 'Alpine Wine Tasting',
    desc: 'Six wines from small alpine producers, guided by our sommelier in the cellar room.',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85',
    category: 'dining',
    moods: ['relax','romantic'],
    times: ['afternoon','evening'],
  },
  {
    id: 'midnight-sauna',
    name: 'Midnight Sauna',
    desc: 'The sauna opens to the sky. Cold plunge, warm stone, and only the sound of the forest.',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85',
    category: 'spa',
    moods: ['relax','romantic'],
    times: ['evening'],
  },
  {
    id: 'guided-hike',
    name: 'Guided Hiking',
    desc: 'A half-day route through the high alpine trails, with a mountain guide and a packed lunch.',
    duration: '240 min',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85',
    category: 'nature',
    moods: ['adventure'],
    times: ['morning','afternoon'],
  },
  {
    id: 'private-cinema',
    name: 'Private Cinema',
    desc: 'A forty-seat screening room, reserved for two. Your film, your wine, your evening.',
    duration: '120 min',
    img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85',
    category: 'hotel',
    moods: ['romantic','relax'],
    times: ['evening'],
  },
  // Additional experiences for concierge (not shown in grid)
  {
    id: 'signature-massage',
    name: 'Signature Massage',
    desc: 'Ninety minutes of deep tissue work, using warm alpine oils.',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85',
    category: 'spa',
    moods: ['relax','wellness'],
    times: ['morning','afternoon','evening'],
  },
  {
    id: 'thermal-ritual',
    name: 'Thermal Ritual',
    desc: 'A guided circuit of heat and cold — steam, sauna, ice plunge, rest.',
    duration: '120 min',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
    category: 'spa',
    moods: ['relax','wellness'],
    times: ['morning','afternoon','evening'],
  },
  {
    id: 'ice-bath',
    name: 'Ice Bath',
    desc: 'A carefully guided cold plunge, followed by thirty minutes of warming rest.',
    duration: '30 min',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85',
    category: 'spa',
    moods: ['wellness','adventure'],
    times: ['morning'],
  },
  {
    id: 'couples-treatment',
    name: 'Couples Treatment',
    desc: 'A treatment room for two. Side-by-side massage, followed by tea on the terrace.',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85',
    category: 'spa',
    moods: ['romantic','relax'],
    times: ['afternoon','evening'],
  },
  {
    id: 'aurora-dinner',
    name: 'Dinner at Aurora Restaurant',
    desc: "A four-course menu built around what the mountain gives us each season.",
    duration: '120 min',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85',
    category: 'dining',
    moods: ['romantic','relax'],
    times: ['evening'],
  },
  {
    id: 'chefs-tasting',
    name: "Chef's Tasting Menu",
    desc: 'A seven-course tasting, cooked in front of you at the kitchen counter.',
    duration: '180 min',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85',
    category: 'dining',
    moods: ['romantic','relax','wellness'],
    times: ['evening'],
  },
  {
    id: 'lake-swim',
    name: 'Wild Lake Swim',
    desc: 'A short walk to the glacial lake, a guided swim, and warm towels on the shore.',
    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85',
    category: 'nature',
    moods: ['adventure','wellness'],
    times: ['morning','afternoon'],
  },
  {
    id: 'forest-bathing',
    name: 'Forest Bathing',
    desc: 'A slow, silent walk in the old pines, guided by breath and nothing else.',
    duration: '90 min',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85',
    category: 'nature',
    moods: ['relax','wellness'],
    times: ['morning','afternoon'],
  },
  {
    id: 'night-tea',
    name: 'Night Tea on the Terrace',
    desc: 'A quiet end to the evening — herbal tea, blankets, and the mountain at night.',
    duration: '45 min',
    img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85',
    category: 'hotel',
    moods: ['relax','romantic'],
    times: ['evening'],
  },
  {
    id: 'champagne-terrace',
    name: 'Champagne on the Terrace',
    desc: 'A bottle of alpine champagne, two glasses, and the view.',
    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=900&q=85',
    category: 'hotel',
    moods: ['romantic'],
    times: ['afternoon','evening'],
  },
  {
    id: 'library-reading',
    name: 'Library Reading Hour',
    desc: 'A private hour in the library, with a book from our curated collection and a pot of tea.',
    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85',
    category: 'hotel',
    moods: ['relax','wellness'],
    times: ['afternoon'],
  },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=85',
];

/* ============ RENDER: ROOMS ============ */
function renderRooms(){
  const grid = $('#roomsGrid');
  grid.innerHTML = ROOMS.map(r => `
    <div class="room-card" data-room-id="${r.id}">
      <div class="room-image">
        <span class="room-tag">${r.tag}</span>
        <img src="${r.img}" alt="${r.name}" loading="lazy">
      </div>
      <div class="room-info">
        <h3 class="room-name">${r.name}</h3>
        <p class="room-desc">${r.desc}</p>
        <div class="room-meta">
          <span>${r.size}</span>
          <span>${r.guests}</span>
        </div>
        <div class="room-price">${r.price}<span>/ night</span></div>
        <div class="room-actions">
          <button class="room-link" data-view-room="${r.id}">VIEW ROOM</button>
          <button class="room-link" data-book-room="${r.id}">BOOK ROOM</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-view-room]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openRoomModal(btn.dataset.viewRoom);
    });
  });
  grid.querySelectorAll('[data-book-room]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      selectRoomAndScroll(btn.dataset.bookRoom);
    });
  });

  // Add rooms to booking select
  const roomSel = $('#roomSelect');
  ROOMS.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = `${r.name} — ${r.price}/night`;
    roomSel.appendChild(opt);
  });
}

/* ============ ROOM MODAL ============ */
function openRoomModal(id){
  const room = ROOMS.find(r => r.id === id);
  if (!room) return;
  $('#roomModalContent').innerHTML = `
    <img src="${room.img}" alt="${room.name}">
    <div class="room-modal-body">
      <h2>${room.name}</h2>
      <p>${room.full}</p>
      <div class="room-modal-meta">
        <div><span>Size</span><strong>${room.size}</strong></div>
        <div><span>Guests</span><strong>${room.guests}</strong></div>
        <div><span>From</span><strong>${room.price} / night</strong></div>
      </div>
      <div class="room-modal-meta">
        ${room.features.map(f => `<div><span>—</span><strong>${f}</strong></div>`).join('')}
      </div>
      <button class="btn btn-solid-dark" style="width:100%;margin-top:1rem" onclick="window.__bookRoom('${room.id}')">BOOK THIS ROOM</button>
    </div>
  `;
  $('#roomModal').classList.add('open');
  $('#roomModal').setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeRoomModal(){
  $('#roomModal').classList.remove('open');
  $('#roomModal').setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
window.__bookRoom = function(id){ closeRoomModal(); selectRoomAndScroll(id); };

function selectRoomAndScroll(roomId){
  const sel = $('#roomSelect');
  sel.value = roomId;
  document.getElementById('booking').scrollIntoView({ behavior:'smooth' });
  showToast('Room selected — check availability below');
}

/* ============ RENDER: SPA ============ */
function renderSpa(){
  const track = $('#spaTrack');
  track.innerHTML = SPA_SERVICES.map(s => `
    <div class="spa-card">
      <div class="spa-card-image">
        <img src="${s.img}" alt="${s.name}" loading="lazy">
      </div>
      <div class="spa-card-name">${s.name}</div>
      <div class="spa-card-duration">${s.duration}</div>
    </div>
  `).join('');

  const prev = $('#spaPrev');
  const next = $('#spaNext');
  const scrollAmt = () => {
    const card = track.querySelector('.spa-card');
    return card ? card.offsetWidth + 24 : 300;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmt(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmt(), behavior: 'smooth' }));
}

/* ============ RENDER: EXPERIENCES ============ */
function renderExperiences(){
  const grid = $('#expGrid');
  // Show only the 6 primary ones (not concierge-only)
  const primary = EXPERIENCES.slice(0, 6);
  grid.innerHTML = primary.map(e => `
    <div class="exp-card">
      <div class="exp-image">
        <img src="${e.img}" alt="${e.name}" loading="lazy">
        <span class="exp-duration">${e.duration}</span>
      </div>
      <h3 class="exp-name">${e.name}</h3>
      <p class="exp-desc">${e.desc}</p>
    </div>
  `).join('');
}

/* ============ RENDER: GALLERY ============ */
function renderGallery(){
  const grid = $('#galleryMasonry');
  grid.innerHTML = GALLERY_IMAGES.map((src, i) => `
    <div class="gallery-item" data-gallery-index="${i}">
      <img src="${src}" alt="Nova Alpine gallery ${i+1}" loading="lazy">
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(parseInt(item.dataset.galleryIndex));
    });
  });
}

/* ============ LIGHTBOX ============ */
let lightboxIndex = 0;
function openLightbox(i){
  lightboxIndex = i;
  $('#lightboxImg').src = GALLERY_IMAGES[i];
  $('#lightbox').classList.add('open');
  $('#lightbox').setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  $('#lightbox').classList.remove('open');
  $('#lightbox').setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
function navLightbox(delta){
  lightboxIndex = (lightboxIndex + delta + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  $('#lightboxImg').src = GALLERY_IMAGES[lightboxIndex];
}

/* ============ BOOKING ============ */
function initBooking(){
  const checkIn = $('#checkIn');
  const checkOut = $('#checkOut');
  const today = new Date().toISOString().split('T')[0];
  checkIn.min = today;
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  checkOut.min = tomorrow;

  checkIn.addEventListener('change', () => {
    if (checkIn.value){
      const next = new Date(checkIn.value);
      next.setDate(next.getDate() + 1);
      const nextStr = next.toISOString().split('T')[0];
      checkOut.min = nextStr;
      if (checkOut.value && checkOut.value <= checkIn.value){
        checkOut.value = nextStr;
      }
    }
  });

  $('#bookingForm').addEventListener('submit', e => {
    e.preventDefault();
    const ci = checkIn.value;
    const co = checkOut.value;
    if (!ci || !co){
      showToast('Please select check-in and check-out dates');
      return;
    }
    if (co <= ci){
      showToast('Check-out must be after check-in');
      return;
    }
    const nights = Math.round((new Date(co) - new Date(ci)) / 86400000);
    const roomId = $('#roomSelect').value;
    const guests = $('#guests').value;
    const room = roomId === 'any' ? ROOMS[0] : ROOMS.find(r => r.id === roomId);
    const roomPriceNum = parseInt(room.price.replace(/[^\d]/g,''), 10);
    const total = roomPriceNum * nights;

    const result = $('#bookingResult');
    result.innerHTML = `
      <h3>Your stay is available.</h3>
      <p>${room.name} is available for your dates. We have held this room provisionally for the next two hours.</p>
      <div class="booking-result-meta">
        <div>Check-in <strong>${formatDate(ci)}</strong></div>
        <div>Check-out <strong>${formatDate(co)}</strong></div>
        <div>Nights <strong>${nights}</strong></div>
        <div>Guests <strong>${guests}</strong></div>
        <div>Total <strong>€${total.toLocaleString()}</strong></div>
      </div>
    `;
    result.classList.add('show');
    showToast('Availability confirmed — demo only');
  });
}

function formatDate(str){
  const d = new Date(str);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

/* ============ AI CONCIERGE ============ */
const conciergeState = {
  step: 'greeting', // greeting, mood, time, experience, thinking, itinerary, confirm
  mood: null,
  time: null,
  category: null,
  itinerary: [],
};

const MOODS = [
  { key: 'relax', name: 'Relax', desc: 'Slow, quiet, warm' },
  { key: 'romantic', name: 'Romantic', desc: 'For two, quietly' },
  { key: 'adventure', name: 'Adventure', desc: 'Movement, air, altitude' },
  { key: 'wellness', name: 'Wellness', desc: 'Body, breath, repair' },
];
const TIMES = [
  { key: 'morning', name: 'Morning', desc: 'Start before the sun' },
  { key: 'afternoon', name: 'Afternoon', desc: 'Long, warm, unhurried' },
  { key: 'evening', name: 'Evening', desc: 'Dusk into night' },
];
const CATEGORIES = [
  { key: 'spa', name: 'SPA', desc: 'Heat, water, treatment' },
  { key: 'dining', name: 'Dining', desc: 'The table, slowly' },
  { key: 'nature', name: 'Nature', desc: 'Mountains and air' },
  { key: 'hotel', name: 'Hotel', desc: 'Inside the walls' },
];

const QUICK_ACTIONS = [
  { id: 'room', label: 'Find my perfect room', preset: {} },
  { id: 'spa', label: 'Build my SPA evening', preset: { time: 'evening', category: 'spa' } },
  { id: 'day', label: 'Plan my day', preset: { time: 'morning', category: 'nature' } },
  { id: 'nearby', label: 'Discover nearby', preset: { category: 'nature' } },
  { id: 'surprise', label: 'Surprise me', preset: 'random' },
];

function openConcierge(){
  $('#conciergeModal').classList.add('open');
  $('#conciergeModal').setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  if (conciergeState.step === 'greeting') renderConciergeStep();
}
function closeConcierge(){
  $('#conciergeModal').classList.remove('open');
  $('#conciergeModal').setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

function resetConcierge(){
  conciergeState.step = 'greeting';
  conciergeState.mood = null;
  conciergeState.time = null;
  conciergeState.category = null;
  conciergeState.itinerary = [];
  renderConciergeStep();
}

function renderConciergeStep(){
  const body = $('#conciergeBody');
  const s = conciergeState;
  if (s.step === 'greeting') body.innerHTML = conciergeGreetingHTML();
  else if (s.step === 'mood') body.innerHTML = conciergeMoodHTML();
  else if (s.step === 'time') body.innerHTML = conciergeTimeHTML();
  else if (s.step === 'experience') body.innerHTML = conciergeExperienceHTML();
  else if (s.step === 'thinking') body.innerHTML = conciergeThinkingHTML();
  else if (s.step === 'itinerary') body.innerHTML = conciergeItineraryHTML();
  else if (s.step === 'confirm') body.innerHTML = conciergeConfirmHTML();

  bindConciergeEvents();
}

function conciergeGreetingHTML(){
  return `
    <div class="concierge-greeting">
      <h3>Good evening.<br>How can I make your stay unforgettable?</h3>
      <p>Create your perfect stay — I'll arrange everything.</p>
      <div class="concierge-quick">
        ${QUICK_ACTIONS.map(a => `<button class="quick-btn" data-quick="${a.id}">${a.label}</button>`).join('')}
      </div>
    </div>
  `;
}

function conciergeMoodHTML(){
  return `
    <div class="concierge-step">
      <h4>What's the mood?</h4>
      <p>Choose the feeling you're after.</p>
      <div class="step-options">
        ${MOODS.map(m => `
          <button class="step-option ${conciergeState.mood===m.key?'selected':''}" data-mood="${m.key}">
            <span class="step-option-name">${m.name}</span>
            <span class="step-option-desc">${m.desc}</span>
          </button>
        `).join('')}
      </div>
      <div class="concierge-nav">
        <button class="concierge-nav-btn" data-back="greeting">← Back</button>
        <button class="concierge-nav-btn" data-reset>Start over</button>
      </div>
    </div>
  `;
}

function conciergeTimeHTML(){
  return `
    <div class="concierge-step">
      <h4>When would you like to begin?</h4>
      <p>I'll arrange everything around it.</p>
      <div class="step-options">
        ${TIMES.map(t => `
          <button class="step-option ${conciergeState.time===t.key?'selected':''}" data-time="${t.key}">
            <span class="step-option-name">${t.name}</span>
            <span class="step-option-desc">${t.desc}</span>
          </button>
        `).join('')}
      </div>
      <div class="concierge-nav">
        <button class="concierge-nav-btn" data-back="mood">← Back</button>
        <button class="concierge-nav-btn" data-reset>Start over</button>
      </div>
    </div>
  `;
}

function conciergeExperienceHTML(){
  return `
    <div class="concierge-step">
      <h4>What's your focus?</h4>
      <p>Where should the day (or evening) spend its time?</p>
      <div class="step-options">
        ${CATEGORIES.map(c => `
          <button class="step-option ${conciergeState.category===c.key?'selected':''}" data-category="${c.key}">
            <span class="step-option-name">${c.name}</span>
            <span class="step-option-desc">${c.desc}</span>
          </button>
        `).join('')}
      </div>
      <div class="concierge-nav">
        <button class="concierge-nav-btn" data-back="time">← Back</button>
        <button class="concierge-nav-btn" data-reset>Start over</button>
      </div>
    </div>
  `;
}

function conciergeThinkingHTML(){
  return `
    <div class="concierge-thinking">
      <div class="thinking-orb"></div>
      <div class="thinking-text">
        Composing your ${conciergeState.time || 'stay'}
        <span class="thinking-dots"><span></span><span></span><span></span></span>
      </div>
    </div>
  `;
}

function conciergeItineraryHTML(){
  const titleTime = {
    morning: 'YOUR PERFECT MORNING',
    afternoon: 'YOUR PERFECT AFTERNOON',
    evening: 'YOUR PERFECT EVENING',
  }[conciergeState.time] || 'YOUR PERFECT STAY';
  return `
    <div class="itinerary-head">
      <div class="itinerary-title">${titleTime}</div>
      <div class="itinerary-subtitle">Curated by Aria, for you.</div>
    </div>
    <div class="itinerary-items">
      ${conciergeState.itinerary.map(item => `
        <div class="itinerary-item">
          <div class="itinerary-time">${item.time}</div>
          <div class="itinerary-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="itinerary-info">
            <span class="itinerary-name">${item.name}</span>
            <span class="itinerary-duration">${item.duration}</span>
            <button class="itinerary-view" data-view-exp="${item.id}">VIEW EXPERIENCE →</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="itinerary-footer">
      <div class="itinerary-perfect">Looks perfect?</div>
      <button class="itinerary-add" data-add-stay>ADD TO MY STAY</button>
      <div class="itinerary-actions">
        <button data-reset>Start over</button>
        <button data-customize>Customize</button>
      </div>
    </div>
  `;
}

function conciergeConfirmHTML(){
  return `
    <div class="concierge-confirm">
      <div class="confirm-check">
        <svg viewBox="0 0 30 30"><polyline points="6,15 12,21 24,9"/></svg>
      </div>
      <h4>Your ${conciergeState.time || 'stay'} has been added to your stay.</h4>
      <p>We've saved this itinerary. When you book, our team will confirm every detail personally.</p>
      <button class="itinerary-add" data-reset style="margin-top:.5rem">PLAN ANOTHER</button>
    </div>
  `;
}

function generateItinerary(mood, time, category){
  const primary = EXPERIENCES.filter(e =>
    e.category === category && e.moods.includes(mood) && e.times.includes(time)
  );
  const byCategory = EXPERIENCES.filter(e => e.category === category && e.times.includes(time));
  const byMood = EXPERIENCES.filter(e => e.moods.includes(mood) && e.times.includes(time));
  const byTime = EXPERIENCES.filter(e => e.times.includes(time));

  const seen = new Set();
  const ordered = [];
  [...primary, ...byCategory, ...byMood, ...byTime, ...EXPERIENCES].forEach(e => {
    if (!seen.has(e.id) && ordered.length < 4){
      seen.add(e.id);
      ordered.push(e);
    }
  });

  const timeSlots = {
    morning: ['08:00', '10:30', '13:00', '15:30'],
    afternoon: ['14:00', '16:00', '18:00', '20:00'],
    evening: ['18:00', '19:30', '21:00', '22:30'],
  }[time] || ['10:00', '13:00', '16:00', '19:00'];

  return ordered.slice(0, 4).map((e, i) => ({
    ...e,
    time: timeSlots[i] || '19:00',
  }));
}

function bindConciergeEvents(){
  const body = $('#conciergeBody');

  body.querySelectorAll('[data-quick]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = QUICK_ACTIONS.find(a => a.id === btn.dataset.quick);
      if (!action) return;
      if (action.preset === 'random'){
        // Randomize and go straight to thinking
        const moods = MOODS.map(m => m.key);
        const times = TIMES.map(t => t.key);
        const cats = CATEGORIES.map(c => c.key);
        conciergeState.mood = moods[Math.floor(Math.random()*moods.length)];
        conciergeState.time = times[Math.floor(Math.random()*times.length)];
        conciergeState.category = cats[Math.floor(Math.random()*cats.length)];
        goToThinking();
        return;
      }
      // Apply preset
      if (action.preset.time) conciergeState.time = action.preset.time;
      if (action.preset.category) conciergeState.category = action.preset.category;
      // Go to next unanswered step
      if (!conciergeState.mood) conciergeState.step = 'mood';
      else if (!conciergeState.time) conciergeState.step = 'time';
      else if (!conciergeState.category) conciergeState.step = 'experience';
      else { goToThinking(); return; }
      renderConciergeStep();
    });
  });

  body.querySelectorAll('[data-mood]').forEach(btn => {
    btn.addEventListener('click', () => {
      conciergeState.mood = btn.dataset.mood;
      if (!conciergeState.time) conciergeState.step = 'time';
      else if (!conciergeState.category) conciergeState.step = 'experience';
      else { goToThinking(); return; }
      renderConciergeStep();
    });
  });

  body.querySelectorAll('[data-time]').forEach(btn => {
    btn.addEventListener('click', () => {
      conciergeState.time = btn.dataset.time;
      if (!conciergeState.category) conciergeState.step = 'experience';
      else { goToThinking(); return; }
      renderConciergeStep();
    });
  });

  body.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      conciergeState.category = btn.dataset.category;
      goToThinking();
    });
  });

  body.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      conciergeState.step = btn.dataset.back;
      renderConciergeStep();
    });
  });

  body.querySelectorAll('[data-reset]').forEach(btn => {
    btn.addEventListener('click', resetConcierge);
  });

  body.querySelectorAll('[data-customize]').forEach(btn => {
    btn.addEventListener('click', () => {
      conciergeState.step = 'mood';
      renderConciergeStep();
    });
  });

  body.querySelectorAll('[data-add-stay]').forEach(btn => {
    btn.addEventListener('click', () => {
      conciergeState.step = 'confirm';
      renderConciergeStep();
    });
  });

  body.querySelectorAll('[data-view-exp]').forEach(btn => {
    btn.addEventListener('click', () => {
      const exp = EXPERIENCES.find(e => e.id === btn.dataset.viewExp);
      if (exp){
        showToast(`${exp.name} — ${exp.duration}`);
      }
    });
  });
}

function goToThinking(){
  conciergeState.step = 'thinking';
  renderConciergeStep();
  setTimeout(() => {
    conciergeState.itinerary = generateItinerary(
      conciergeState.mood,
      conciergeState.time,
      conciergeState.category
    );
    conciergeState.step = 'itinerary';
    renderConciergeStep();
  }, 1600);
}

/* ============ NAVBAR / MOBILE MENU ============ */
function initNav(){
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive:true });

  const ham = $('#hamburger');
  const menu = $('#mobileMenu');
  const close = $('#mobileClose');
  ham.addEventListener('click', () => {
    menu.classList.toggle('open');
    ham.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  close.addEventListener('click', () => {
    menu.classList.remove('open');
    ham.classList.remove('open');
    document.body.style.overflow = '';
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      ham.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============ SMOOTH SCROLL ============ */
function initSmoothScroll(){
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (target){
      e.preventDefault();
      const offset = 60;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior:'smooth' });
    }
  });
}

/* ============ REVEAL ============ */
function initReveal(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting){
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });
  $$('.reveal').forEach(el => obs.observe(el));
}

/* ============ TOAST ============ */
let toastTimer = null;
function showToast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  renderRooms();
  renderSpa();
  renderExperiences();
  renderGallery();
  initBooking();
  initNav();
  initSmoothScroll();
  initReveal();

  // Concierge
  $('#conciergeTrigger').addEventListener('click', openConcierge);
  $('#conciergeClose').addEventListener('click', closeConcierge);
  $('#conciergeBackdrop').addEventListener('click', closeConcierge);

  // Lightbox
  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightboxPrev').addEventListener('click', () => navLightbox(-1));
  $('#lightboxNext').addEventListener('click', () => navLightbox(1));
  $('#lightbox').addEventListener('click', e => {
    if (e.target === $('#lightbox')) closeLightbox();
  });

  // Room modal
  $('#roomModalClose').addEventListener('click', closeRoomModal);
  $('#roomModalBackdrop').addEventListener('click', closeRoomModal);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
      if ($('#lightbox').classList.contains('open')) closeLightbox();
      if ($('#conciergeModal').classList.contains('open')) closeConcierge();
      if ($('#roomModal').classList.contains('open')) closeRoomModal();
    }
    if ($('#lightbox').classList.contains('open')){
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });

  // Initialize concierge greeting
  renderConciergeStep();
});

})();