/* =============================================
   LOOMO FINTECH APP - INTERACTIVE PROTOTYPE
   ============================================= */

'use strict';

// =============================================
// STATE
// =============================================
const state = {
  currentScreen: 'splash',
  onboardingSlide: 0,
  selectedRecipient: null,
  sendAmount: '0',
  sendCurrency: 'USD',
  sendStep: 'recipient', // recipient | amount | confirm | success
  kycStep: 1,
  cardFrozen: false,
  toggle2FA: true,
  toggleNotifs: true,
  toggleBiometric: true,
  history: [] // for back navigation
};

// =============================================
// DUMMY DATA
// =============================================
const data = {
  user: {
    name: 'Alan Shah',
    initials: 'AS',
    id: 'LMO-2847391',
    email: 'alan.shah@gmail.com',
    phone: '+212 6XX XXX XXX',
    joinDate: 'March 2024',
    kycVerified: true,
  },
  balances: {
    MAD: { amount: '24,850.00', flag: '🇲🇦', name: 'Moroccan Dirham' },
    USD: { amount: '2,341.85', flag: '🇺🇸', name: 'US Dollar' },
    EUR: { amount: '1,890.40', flag: '🇪🇺', name: 'Euro' },
    GBP: { amount: '1,120.75', flag: '🇬🇧', name: 'British Pound' },
  },
  totalUSD: '5,812.30',
  recipients: [
    { id: 1, name: 'Sara Benali', iban: 'MA64 0110 0013 0030 0855 7400 06', avatar: 'SB', color: 'green', country: '🇲🇦' },
    { id: 2, name: 'James Thornton', iban: 'GB29 NWBK 6016 1331 9268 19', avatar: 'JT', color: 'blue', country: '🇬🇧' },
    { id: 3, name: 'Amina Ouali', iban: 'FR76 3000 4000 0300 0300 0634 3XXX', avatar: 'AO', color: 'purple', country: '🇫🇷' },
    { id: 4, name: 'Mohammed Al-Rashid', iban: 'AE07 0331 2345 6789 0123 456', avatar: 'MR', color: 'orange', country: '🇦🇪' },
  ],
  exchangeRates: {
    'USD→MAD': { rate: '10.05', label: '1 USD = 10.05 MAD' },
    'EUR→MAD': { rate: '10.89', label: '1 EUR = 10.89 MAD' },
    'GBP→MAD': { rate: '12.71', label: '1 GBP = 12.71 MAD' },
    'MAD→USD': { rate: '0.0995', label: '1 MAD = 0.0995 USD' },
    'USD→EUR': { rate: '0.921', label: '1 USD = 0.921 EUR' },
    'EUR→USD': { rate: '1.086', label: '1 EUR = 1.086 USD' },
  },
  transactions: [
    { id: 1, name: 'Sara Benali', type: 'sent', amount: '-$350.00', date: 'Today, 10:24 AM', status: 'completed', avatar: 'SB', color: 'green', ref: 'LMO-TXN-28471', desc: 'Family support', currency: 'USD→MAD' },
    { id: 2, name: 'Salary - TechCorp', type: 'received', amount: '+$2,450.00', date: 'Jul 28, 09:00 AM', status: 'completed', avatar: '💼', color: 'blue', ref: 'LMO-TXN-28469', desc: 'Monthly salary', currency: 'USD' },
    { id: 3, name: 'James Thornton', type: 'sent', amount: '-£120.00', date: 'Jul 26, 3:15 PM', status: 'pending', avatar: 'JT', color: 'orange', ref: 'LMO-TXN-28462', desc: 'Shared expenses', currency: 'GBP' },
    { id: 4, name: 'Amina Ouali', type: 'received', amount: '+€400.00', date: 'Jul 24, 11:40 AM', status: 'completed', avatar: 'AO', color: 'purple', ref: 'LMO-TXN-28455', desc: 'Rent split', currency: 'EUR' },
    { id: 5, name: 'Mohammed Al-Rashid', type: 'sent', amount: '-$75.00', date: 'Jul 22, 2:30 PM', status: 'failed', avatar: 'MR', color: 'blue', ref: 'LMO-TXN-28449', desc: 'Invoice payment', currency: 'USD' },
    { id: 6, name: 'Netflix International', type: 'sent', amount: '-$15.99', date: 'Jul 20, 12:00 AM', status: 'completed', avatar: '📺', color: 'pink', ref: 'LMO-TXN-28440', desc: 'Subscription', currency: 'USD' },
    { id: 7, name: 'Salary - TechCorp', type: 'received', amount: '+$2,450.00', date: 'Jun 28, 09:00 AM', status: 'completed', avatar: '💼', color: 'blue', ref: 'LMO-TXN-28411', desc: 'Monthly salary', currency: 'USD' },
    { id: 8, name: 'Sara Benali', type: 'sent', amount: '-$200.00', date: 'Jun 25, 4:10 PM', status: 'completed', avatar: 'SB', color: 'green', ref: 'LMO-TXN-28405', desc: 'Gift', currency: 'USD→MAD' },
  ],
  card: {
    number: '•••• •••• •••• 4821',
    holder: 'ALAN SHAH',
    expiry: '09/28',
    cvv: '•••',
    type: 'Virtual',
    network: 'Mastercard',
    limit: '$5,000',
    spent: '$1,284.50',
  },
  accountDetails: {
    MAD: { iban: 'MA64 0110 0013 0030 0855 7400 06', swift: 'BKAMMAMC', bank: 'Loomo Bank SA' },
    USD: { iban: 'US92 LOOMO 0211 9904 1484', swift: 'LOOMOUS33', bank: 'Loomo Financial Inc.' },
    EUR: { iban: 'DE89 3704 0044 0532 0130 00', swift: 'LOOMODEFF', bank: 'Loomo Europe GmbH' },
    GBP: { iban: 'GB29 LOOMO 6016 1331 9268 19', swift: 'LOOMOGB2L', bank: 'Loomo UK Ltd.' },
  }
};

// =============================================
// NAVIGATION
// =============================================
function navigate(screenId, addToHistory = true) {
  const current = document.getElementById('screen-' + state.currentScreen);
  const next = document.getElementById('screen-' + screenId);
  if (!next) { console.warn('Screen not found:', screenId); return; }

  if (addToHistory && state.currentScreen !== screenId) {
    state.history.push(state.currentScreen);
  }

  if (current && current !== next) {
    current.classList.add('slide-out');
    setTimeout(() => {
      current.classList.remove('active', 'slide-out');
    }, 350);
  }

  next.scrollTop = 0;
  next.classList.remove('slide-out');
  next.classList.add('active');
  state.currentScreen = screenId;

  // Update bottom nav active state
  updateBottomNav(screenId);
}

function goBack() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    navigate(prev, false);
  }
}

function updateBottomNav(screenId) {
  const navMap = {
    'home': 'nav-home',
    'history': 'nav-history',
    'card': 'nav-card',
    'settings': 'nav-settings',
  };

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNavId = navMap[screenId];
  if (activeNavId) {
    const el = document.getElementById(activeNavId);
    if (el) el.classList.add('active');
  }
}

// =============================================
// ONBOARDING
// =============================================
const slides = [
  {
    icon: '🌍',
    title: 'Send Money Worldwide',
    desc: 'Transfer to 50+ countries in seconds. Real exchange rates, transparent fees, zero surprises.'
  },
  {
    icon: '💎',
    title: 'Multi-Currency Wallet',
    desc: 'Hold MAD, USD, EUR, GBP and more in one place. Switch currencies with a tap.'
  },
  {
    icon: '🔒',
    title: 'Bank-Grade Security',
    desc: 'Your money is protected by 256-bit encryption, biometric auth, and 2FA — always.'
  }
];

function renderOnboarding() {
  const slide = slides[state.onboardingSlide];
  const icon = document.getElementById('ob-icon');
  const title = document.getElementById('ob-title');
  const desc = document.getElementById('ob-desc');
  const dots = document.querySelectorAll('.dot');

  if (icon) icon.textContent = slide.icon;
  if (title) title.textContent = slide.title;
  if (desc) desc.textContent = slide.desc;
  dots.forEach((d, i) => d.classList.toggle('active', i === state.onboardingSlide));
}

function nextSlide() {
  if (state.onboardingSlide < slides.length - 1) {
    state.onboardingSlide++;
    renderOnboarding();
  } else {
    navigate('auth');
  }
}

function prevSlide() {
  if (state.onboardingSlide > 0) {
    state.onboardingSlide--;
    renderOnboarding();
  }
}

// =============================================
// SEND MONEY FLOW
// =============================================
function selectRecipient(id) {
  state.selectedRecipient = data.recipients.find(r => r.id === id);
  document.querySelectorAll('.recipient-item').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById('recipient-' + id);
  if (el) el.classList.add('selected');
}

function proceedToAmount() {
  if (!state.selectedRecipient) {
    alert('Please select a recipient first.');
    return;
  }
  state.sendAmount = '0';
  state.sendStep = 'amount';
  updateAmountDisplay();
  navigate('send-amount');
}

function numpadPress(val) {
  if (val === '⌫') {
    if (state.sendAmount.length > 1) {
      state.sendAmount = state.sendAmount.slice(0, -1);
    } else {
      state.sendAmount = '0';
    }
  } else if (val === '.') {
    if (!state.sendAmount.includes('.')) {
      state.sendAmount += '.';
    }
  } else {
    if (state.sendAmount === '0') {
      state.sendAmount = val;
    } else if (state.sendAmount.length < 8) {
      state.sendAmount += val;
    }
  }
  updateAmountDisplay();
}

function updateAmountDisplay() {
  const el = document.getElementById('big-amount-display');
  if (el) el.textContent = state.sendAmount;
  updateFeeBreakdown();
}

function updateFeeBreakdown() {
  const amount = parseFloat(state.sendAmount) || 0;
  const isInternational = state.selectedRecipient && state.selectedRecipient.country !== '🇺🇸';
  const fee = isInternational ? (amount * 0.025).toFixed(2) : '3.00';
  const feeNum = parseFloat(fee);
  const total = (amount + feeNum).toFixed(2);
  const converted = (amount * 10.05).toFixed(2);

  const feeEl = document.getElementById('fee-amount');
  const totalEl = document.getElementById('total-amount');
  const convertedEl = document.getElementById('converted-amount');

  if (feeEl) feeEl.textContent = `$${fee}`;
  if (totalEl) totalEl.textContent = `$${total}`;
  if (convertedEl) convertedEl.textContent = `${converted} MAD`;
}

function proceedToConfirm() {
  const amount = parseFloat(state.sendAmount) || 0;
  if (amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }
  updateConfirmScreen();
  navigate('send-confirm');
}

function updateConfirmScreen() {
  const amount = parseFloat(state.sendAmount) || 0;
  const isInternational = state.selectedRecipient && state.selectedRecipient.country !== '🇺🇸';
  const fee = isInternational ? (amount * 0.025).toFixed(2) : '3.00';
  const total = (amount + parseFloat(fee)).toFixed(2);
  const converted = (amount * 10.05).toFixed(2);

  setText('confirm-recipient', state.selectedRecipient?.name || '—');
  setText('confirm-amount', `$${parseFloat(state.sendAmount).toFixed(2)}`);
  setText('confirm-currency', state.sendCurrency);
  setText('confirm-fee', `$${fee} (${isInternational ? '2.5% intl' : '$3 domestic'})`);
  setText('confirm-total', `$${total}`);
  setText('confirm-converted', `≈ ${converted} MAD`);
  setText('confirm-delivery', 'Within 1-2 business days');
  setText('confirm-ref', `LMO-TXN-${Math.floor(Math.random()*90000+10000)}`);
}

function confirmSend() {
  navigate('send-success');
  // Reset state after viewing success
  setTimeout(() => {
    state.sendAmount = '0';
    state.selectedRecipient = null;
    state.sendStep = 'recipient';
  }, 2000);
}

// =============================================
// KYC FLOW
// =============================================
function kycNext() {
  if (state.kycStep < 3) {
    state.kycStep++;
    renderKycStep();
    navigate('kyc-step');
  } else {
    navigate('kyc-done');
  }
}

function renderKycStep() {
  const steps = [
    { title: 'Upload ID Document', icon: '🪪', sub: 'Passport, National ID, or Driver\'s License', action: 'Upload Document' },
    { title: 'Take a Selfie', icon: '🤳', sub: 'Look directly at the camera in a well-lit area', action: 'Open Camera' },
    { title: 'Review & Submit', icon: '✅', sub: 'Check your information is correct before submitting', action: 'Submit for Review' },
  ];

  const step = steps[state.kycStep - 1];
  setText('kyc-step-title', step.title);
  setText('kyc-step-icon', step.icon);
  setText('kyc-step-sub', step.sub);
  setText('kyc-step-btn', step.action);

  // Update indicators
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`kyc-circle-${i}`);
    const line = document.getElementById(`kyc-line-${i}`);
    if (circle) {
      circle.className = 'kyc-step-circle ' + (i < state.kycStep ? 'done' : i === state.kycStep ? 'active' : 'pending');
      circle.textContent = i < state.kycStep ? '✓' : i;
    }
    if (line && i < 3) {
      line.className = 'kyc-step-line ' + (i < state.kycStep ? 'done' : '');
    }
  }
}

// =============================================
// QR CODE GENERATOR (simple SVG-based)
// =============================================
function generateQR(containerId, text) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Generate a simple pixel-art QR-like pattern
  const size = 25;
  const cellSize = 6;
  const totalSize = size * cellSize;

  // Create a deterministic pattern from the text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">`;
  svg += `<rect width="${totalSize}" height="${totalSize}" fill="white"/>`;

  // Corner squares (QR finder patterns)
  const drawFinder = (x, y) => {
    svg += `<rect x="${x}" y="${y}" width="${7*cellSize}" height="${7*cellSize}" fill="#0F172A"/>`;
    svg += `<rect x="${x+cellSize}" y="${y+cellSize}" width="${5*cellSize}" height="${5*cellSize}" fill="white"/>`;
    svg += `<rect x="${x+2*cellSize}" y="${y+2*cellSize}" width="${3*cellSize}" height="${3*cellSize}" fill="#0F172A"/>`;
  };

  drawFinder(0, 0);
  drawFinder((size-7)*cellSize, 0);
  drawFinder(0, (size-7)*cellSize);

  // Fill data area with pseudo-random pattern
  let seed = Math.abs(hash);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder pattern areas
      if ((r < 8 && c < 8) || (r < 8 && c >= size-8) || (r >= size-8 && c < 8)) continue;
      seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF;
      if (seed % 3 === 0) {
        svg += `<rect x="${c*cellSize}" y="${r*cellSize}" width="${cellSize}" height="${cellSize}" fill="#0F172A"/>`;
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < size-8; i++) {
    if (i % 2 === 0) {
      svg += `<rect x="${i*cellSize}" y="${6*cellSize}" width="${cellSize}" height="${cellSize}" fill="#0F172A"/>`;
      svg += `<rect x="${6*cellSize}" y="${i*cellSize}" width="${cellSize}" height="${cellSize}" fill="#0F172A"/>`;
    }
  }

  svg += '</svg>';
  container.innerHTML = svg;
}

// =============================================
// CARD SCREEN
// =============================================
function toggleCardFreeze() {
  state.cardFrozen = !state.cardFrozen;
  const btn = document.getElementById('freeze-btn');
  if (btn) {
    if (state.cardFrozen) {
      btn.textContent = '❄️ Unfreeze Card';
      btn.classList.remove('btn-blue');
      btn.classList.add('btn-danger');
      document.getElementById('card-status-badge').textContent = '❄️ Frozen';
      document.getElementById('card-status-badge').style.background = '#DBEAFE';
      document.getElementById('card-status-badge').style.color = '#1D4ED8';
    } else {
      btn.innerHTML = '<span>❄️</span> Freeze Card';
      btn.classList.add('btn-blue');
      btn.classList.remove('btn-danger');
      document.getElementById('card-status-badge').textContent = '✅ Active';
      document.getElementById('card-status-badge').style.background = '#D1FAE5';
      document.getElementById('card-status-badge').style.color = '#065F46';
    }
  }
}

// =============================================
// SETTINGS TOGGLES
// =============================================
function toggle(id, key) {
  state[key] = !state[key];
  const el = document.getElementById(id);
  if (el) el.classList.toggle('off', !state[key]);
}

// =============================================
// TRANSACTION DETAIL
// =============================================
let selectedTx = null;

function viewTxDetail(id) {
  selectedTx = data.transactions.find(t => t.id === id);
  if (!selectedTx) return;

  setText('tx-detail-icon-inner', selectedTx.avatar);
  setText('tx-detail-amount', selectedTx.amount);
  setText('tx-detail-name', selectedTx.name);
  setText('tx-d-ref', selectedTx.ref);
  setText('tx-d-desc', selectedTx.desc);
  setText('tx-d-currency', selectedTx.currency);
  setText('tx-d-date', selectedTx.date);

  const statusEl = document.getElementById('tx-d-status');
  if (statusEl) {
    statusEl.textContent = selectedTx.status.charAt(0).toUpperCase() + selectedTx.status.slice(1);
    statusEl.className = 'badge badge-' + selectedTx.status;
  }

  navigate('tx-detail');
}

// =============================================
// RECEIVE SCREEN
// =============================================
let activeCurrency = 'MAD';

function switchReceiveCurrency(cur) {
  activeCurrency = cur;
  document.querySelectorAll('.currency-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.cur === cur);
  });

  const details = data.accountDetails[cur];
  setText('receive-iban', details.iban);
  setText('receive-swift', details.swift);
  setText('receive-bank', details.bank);
  setText('receive-currency', cur);
  generateQR('qr-container', details.iban);
}

// =============================================
// COPY TO CLIPBOARD SIMULATION
// =============================================
function copyToClipboard(text, el) {
  // Visual feedback
  if (el) {
    el.textContent = '✅';
    setTimeout(() => { el.textContent = '📋'; }, 1500);
  }
}

// =============================================
// UTILITY
// =============================================
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// =============================================
// INIT
// =============================================
window.addEventListener('DOMContentLoaded', () => {
  // Splash screen auto-advance
  setTimeout(() => {
    navigate('onboarding', false);
    renderOnboarding();
  }, 2200);

  // Init receive screen
  setTimeout(() => {
    switchReceiveCurrency('MAD');
  }, 500);

  // Keyboard/swipe events for onboarding
  let touchStartX = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (state.currentScreen === 'onboarding') {
      if (diff > 50) nextSlide();
      else if (diff < -50) prevSlide();
    }
  });

  // Init KYC step display
  renderKycStep();

  // Init exchange rate display
  updateFeeBreakdown();
});
