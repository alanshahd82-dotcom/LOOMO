/* =============================================
   LOOMO — INTERACTIVE PROTOTYPE v2
   ============================================= */

'use strict';

// ─── STATE ────────────────────────────────────
const S = {
  screen: 'splash',
  history: [],
  obSlide: 0,
  recipient: null,
  amount: '0',
  kycStep: 1,
  cardFrozen: false,
  t2fa: true, tbio: true, tnotif: true,
  receiveCur: 'MAD',
  txFilter: 'all',
};

// ─── DATA ─────────────────────────────────────
const LOGO_SRC = 'assets/logo.jpeg';

const RECIPIENTS = [
  { id:1, name:'Sara Benali',        flag:'🇲🇦', iban:'MA64 0110 ···· 0855 7400 06', col:'ava-green',  init:'SB', country:'MA' },
  { id:2, name:'James Thornton',     flag:'🇬🇧', iban:'GB29 NWBK ···· ···· 9268 19', col:'ava-blue',   init:'JT', country:'GB' },
  { id:3, name:'Amina Ouali',        flag:'🇫🇷', iban:'FR76 3000 ···· ···· 0634 3XX', col:'ava-purple', init:'AO', country:'FR' },
  { id:4, name:'Mohammed Al-Rashid', flag:'🇦🇪', iban:'AE07 0331 ···· ···· 0123 456', col:'ava-orange', init:'MR', country:'AE' },
];

const TXNS = [
  { id:1, name:'Sara Benali',        sub:'Today, 10:24 AM · USD→MAD', amount:'-$350.00', positive:false, status:'completed', init:'SB', col:'ava-green',  ref:'LMO-TXN-28471', desc:'Family support',   cur:'USD→MAD', fee:'$8.75', rate:'1 USD = 10.05 MAD', date:'Jul 30, 2026 10:24 AM' },
  { id:2, name:'Salary — TechCorp',  sub:'Jul 28, 09:00 AM · USD',    amount:'+$2,450.00',positive:true,  status:'completed', init:'💼', col:'ava-blue',   ref:'LMO-TXN-28469', desc:'Monthly salary',  cur:'USD',     fee:'$0.00', rate:'—',                   date:'Jul 28, 2026 09:00 AM' },
  { id:3, name:'James Thornton',     sub:'Jul 26, 3:15 PM · GBP',     amount:'-£120.00', positive:false, status:'pending',   init:'JT', col:'ava-orange', ref:'LMO-TXN-28462', desc:'Shared expenses', cur:'GBP',     fee:'£3.00', rate:'—',                   date:'Jul 26, 2026 03:15 PM' },
  { id:4, name:'Amina Ouali',        sub:'Jul 24, 11:40 AM · EUR',    amount:'+€400.00', positive:true,  status:'completed', init:'AO', col:'ava-purple', ref:'LMO-TXN-28455', desc:'Rent split',      cur:'EUR',     fee:'€0.00', rate:'—',                   date:'Jul 24, 2026 11:40 AM' },
  { id:5, name:'Mohammed Al-Rashid', sub:'Jul 22, 2:30 PM · USD',     amount:'-$75.00',  positive:false, status:'failed',    init:'MR', col:'ava-blue',   ref:'LMO-TXN-28449', desc:'Invoice payment', cur:'USD',     fee:'$1.88', rate:'—',                   date:'Jul 22, 2026 02:30 PM' },
  { id:6, name:'Netflix Intl.',      sub:'Jul 20, 12:00 AM · USD',    amount:'-$15.99',  positive:false, status:'completed', init:'📺', col:'ava-pink',   ref:'LMO-TXN-28440', desc:'Subscription',   cur:'USD',     fee:'$0.00', rate:'—',                   date:'Jul 20, 2026 12:00 AM' },
  { id:7, name:'Salary — TechCorp',  sub:'Jun 28, 09:00 AM · USD',    amount:'+$2,450.00',positive:true, status:'completed', init:'💼', col:'ava-blue',   ref:'LMO-TXN-28411', desc:'Monthly salary',  cur:'USD',     fee:'$0.00', rate:'—',                   date:'Jun 28, 2026 09:00 AM' },
  { id:8, name:'Sara Benali',        sub:'Jun 25, 4:10 PM · USD→MAD', amount:'-$200.00', positive:false, status:'completed', init:'SB', col:'ava-green',  ref:'LMO-TXN-28405', desc:'Gift',            cur:'USD→MAD', fee:'$5.00', rate:'1 USD = 10.05 MAD', date:'Jun 25, 2026 04:10 PM' },
];

const ACCT = {
  MAD: { iban:'MA64 0110 0013 0030 0855 7400 06', swift:'BKAMMAMC', bank:'Loomo Bank SA',         bal:'24,850' },
  USD: { iban:'US92 LOOMO 0211 9904 1484 XXXX',   swift:'LOOMOUS33', bank:'Loomo Financial Inc.', bal:'2,341'  },
  EUR: { iban:'DE89 3704 0044 0532 0130 0000',     swift:'LOOMODEFF', bank:'Loomo Europe GmbH',    bal:'1,890'  },
  GBP: { iban:'GB29 LOOMO 6016 1331 9268 19',      swift:'LOOMOGB2L', bank:'Loomo UK Ltd.',        bal:'1,120'  },
};

// ─── NAVIGATION ────────────────────────────────
function go(id, push = true) {
  const cur = document.getElementById('s-' + S.screen);
  const nxt = document.getElementById('s-' + id);
  if (!nxt || id === S.screen) return;
  if (push) S.history.push(S.screen);
  if (cur) { cur.classList.add('exit-left'); setTimeout(() => cur.classList.remove('active','exit-left'), 350); }
  nxt.scrollTop = 0;
  nxt.classList.remove('exit-left');
  nxt.classList.add('active');
  S.screen = id;
  syncNav(id);
}

function back() {
  if (S.history.length) go(S.history.pop(), false);
}

function syncNav(id) {
  const map = { home:'nav-home', history:'nav-hist', card:'nav-card', settings:'nav-set' };
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  if (map[id]) { const el = document.getElementById(map[id]); if (el) el.classList.add('active'); }
}

// ─── ONBOARDING ────────────────────────────────
const SLIDES = [
  { icon:'🌍', title:'Send Money Worldwide', desc:'Transfer to 50+ countries in seconds. Real-time rates, zero hidden fees, total transparency.' },
  { icon:'💎', title:'Multi-Currency Wallet', desc:'Hold MAD, USD, EUR, GBP and more in one place. Swap currencies instantly at live rates.' },
  { icon:'🔒', title:'Bank-Grade Security',   desc:'256-bit encryption, biometric login, and 2FA protection — your money is always safe.' },
];

function renderSlide() {
  const s = SLIDES[S.obSlide];
  setText('ob-icon', s.icon); setText('ob-title', s.title); setText('ob-desc', s.desc);
  document.querySelectorAll('.ob-dot').forEach((d,i) => d.classList.toggle('active', i === S.obSlide));
}

function nextSlide() {
  if (S.obSlide < SLIDES.length - 1) { S.obSlide++; renderSlide(); } else { go('auth'); }
}
function prevSlide() {
  if (S.obSlide > 0) { S.obSlide--; renderSlide(); }
}

// ─── SEND FLOW ─────────────────────────────────
function selectRecipient(id) {
  S.recipient = RECIPIENTS.find(r => r.id === id);
  document.querySelectorAll('.recipient-item').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById('rec-' + id); if (el) el.classList.add('selected');
}

function toAmount() {
  if (!S.recipient) { showToast('Please select a recipient first'); return; }
  S.amount = '0';
  setText('send-to-name', S.recipient.name + ' ' + S.recipient.flag);
  updateAmount();
  go('send-amount');
}

function numkey(v) {
  if (v === '⌫') { S.amount = S.amount.length > 1 ? S.amount.slice(0,-1) : '0'; }
  else if (v === '.') { if (!S.amount.includes('.')) S.amount += '.'; }
  else { S.amount = S.amount === '0' ? v : (S.amount.length < 9 ? S.amount + v : S.amount); }
  updateAmount();
}

function updateAmount() {
  setText('big-num-val', S.amount);
  const n = parseFloat(S.amount) || 0;
  const intl = S.recipient && S.recipient.country !== 'US';
  const fee = intl ? (n * 0.025) : 3;
  const feeFixed = n === 0 ? 0 : fee;
  const total = n + feeFixed;
  const converted = (n * 10.05).toFixed(2);
  setText('fee-val', n === 0 ? '$0.00' : '$' + feeFixed.toFixed(2));
  setText('fee-total-val', n === 0 ? '$0.00' : '$' + total.toFixed(2));
  setText('fee-converted', n === 0 ? '0.00 MAD' : converted + ' MAD');
  const feeType = intl ? '(2.5% intl)' : '($3 domestic)';
  setText('fee-type-label', 'Transfer fee ' + feeType);
}

function toConfirm() {
  const n = parseFloat(S.amount) || 0;
  if (n <= 0) { showToast('Enter an amount greater than $0'); return; }
  const intl = S.recipient && S.recipient.country !== 'US';
  const fee = intl ? (n * 0.025).toFixed(2) : '3.00';
  const total = (n + parseFloat(fee)).toFixed(2);
  const converted = (n * 10.05).toFixed(2);
  setText('conf-amount', '$' + parseFloat(S.amount).toFixed(2));
  setText('conf-converted', '≈ ' + converted + ' MAD');
  setText('conf-recipient', S.recipient.name);
  setText('conf-fee', '$' + fee + ' (' + (intl ? '2.5% intl' : '$3 domestic') + ')');
  setText('conf-total', '$' + total);
  setText('conf-btn-amount', parseFloat(S.amount).toFixed(2));
  go('send-confirm');
}

function confirmSend() {
  go('send-success');
  setTimeout(() => { S.amount = '0'; S.recipient = null; }, 3000);
}

// ─── KYC ───────────────────────────────────────
const KYC_STEPS = [
  { icon:'🪪', title:'Upload ID Document', sub:"Passport, National ID, or Driver's License", btn:'Upload Document' },
  { icon:'🤳', title:'Take a Selfie',       sub:'Look directly at the camera in a well-lit area', btn:'Open Camera' },
  { icon:'✅', title:'Review & Submit',      sub:'Verify your information is correct before submitting', btn:'Submit for Verification' },
];

function renderKyc() {
  const s = KYC_STEPS[S.kycStep - 1];
  setText('kyc-icon', s.icon); setText('kyc-title', s.title); setText('kyc-sub', s.sub); setText('kyc-btn', s.btn);
  for (let i = 1; i <= 3; i++) {
    const c = document.getElementById('kc' + i);
    if (c) { c.className = 'kyc-circle ' + (i < S.kycStep ? 'done' : i === S.kycStep ? 'active' : 'next'); c.textContent = i < S.kycStep ? '✓' : i; }
    if (i < 3) { const l = document.getElementById('kl' + i); if (l) l.className = 'kyc-connector ' + (i < S.kycStep ? 'done' : ''); }
  }
}

function kycNext() {
  if (S.kycStep < 3) { S.kycStep++; renderKyc(); } else { go('kyc-done'); }
}

// ─── RECEIVE ───────────────────────────────────
function switchCur(cur) {
  S.receiveCur = cur;
  document.querySelectorAll('.cur-tab').forEach(el => el.classList.toggle('active', el.dataset.cur === cur));
  const a = ACCT[cur];
  setText('recv-iban', a.iban); setText('recv-swift', a.swift); setText('recv-bank', a.bank);
  setText('recv-cur-label', cur + ' Account — ' + a.bank);
  generateQR('qr-box', a.iban);
}

// ─── QR GENERATOR ──────────────────────────────
function generateQR(containerId, text) {
  const el = document.getElementById(containerId); if (!el) return;
  const SIZE = 25, CELL = 6, TOTAL = SIZE * CELL;
  let hash = 0;
  for (let i = 0; i < text.length; i++) { hash = ((hash << 5) - hash) + text.charCodeAt(i); hash |= 0; }
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TOTAL}" height="${TOTAL}" viewBox="0 0 ${TOTAL} ${TOTAL}"><rect width="${TOTAL}" height="${TOTAL}" fill="white"/>`;
  const finder = (x, y) => {
    svg += `<rect x="${x}" y="${y}" width="${7*CELL}" height="${7*CELL}" fill="#0F172A"/>`;
    svg += `<rect x="${x+CELL}" y="${y+CELL}" width="${5*CELL}" height="${5*CELL}" fill="white"/>`;
    svg += `<rect x="${x+2*CELL}" y="${y+2*CELL}" width="${3*CELL}" height="${3*CELL}" fill="#0F172A"/>`;
  };
  finder(0,0); finder((SIZE-7)*CELL,0); finder(0,(SIZE-7)*CELL);
  let seed = Math.abs(hash);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if ((r<8&&c<8)||(r<8&&c>=SIZE-8)||(r>=SIZE-8&&c<8)) continue;
      seed = (seed*1664525+1013904223)&0xFFFFFFFF;
      if (seed%3===0) svg += `<rect x="${c*CELL}" y="${r*CELL}" width="${CELL}" height="${CELL}" fill="#0F172A"/>`;
    }
  }
  for (let i=8;i<SIZE-8;i++) {
    if(i%2===0){svg+=`<rect x="${i*CELL}" y="${6*CELL}" width="${CELL}" height="${CELL}" fill="#0F172A"/>`;svg+=`<rect x="${6*CELL}" y="${i*CELL}" width="${CELL}" height="${CELL}" fill="#0F172A"/>`;}
  }
  svg += '</svg>';
  el.innerHTML = svg;
}

// ─── TX DETAIL ─────────────────────────────────
function viewTx(id) {
  const t = TXNS.find(x => x.id === id); if (!t) return;
  setText('txd-icon-inner', t.init);
  setText('txd-amount', t.amount);
  setText('txd-name', t.name);
  const sb = document.getElementById('txd-status');
  if (sb) { sb.textContent = t.status.charAt(0).toUpperCase() + t.status.slice(1); sb.className = 'badge badge-' + t.status; }
  setText('txd-date', t.date); setText('txd-desc', t.desc); setText('txd-cur', t.cur);
  setText('txd-fee', t.fee); setText('txd-rate', t.rate || '—'); setText('txd-ref', t.ref);
  go('tx-detail');
}

// ─── CARD ──────────────────────────────────────
function toggleFreeze() {
  S.cardFrozen = !S.cardFrozen;
  const btn = document.getElementById('freeze-btn');
  const badge = document.getElementById('card-badge');
  if (S.cardFrozen) {
    if (btn) { btn.textContent = '🔥 Unfreeze Card'; btn.className = 'btn btn-danger-soft'; }
    if (badge) { badge.textContent = '❄️ Frozen'; badge.style.background='#DBEAFE'; badge.style.color='#1E40AF'; }
  } else {
    if (btn) { btn.innerHTML = '<span>❄️</span> Freeze Card'; btn.className = 'btn btn-primary'; }
    if (badge) { badge.textContent = '✅ Active'; badge.style.background='#D1FAE5'; badge.style.color='#065F46'; }
  }
}

// ─── TOGGLES ───────────────────────────────────
function toggleSetting(elId, key) {
  S[key] = !S[key];
  const el = document.getElementById(elId); if (el) el.classList.toggle('off', !S[key]);
}

// ─── COPY ──────────────────────────────────────
function copyText(text, iconEl) {
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(()=>{});
  if (iconEl) { iconEl.textContent = '✅'; setTimeout(() => iconEl.textContent = '📋', 1500); }
  showToast('Copied to clipboard');
}

// ─── TOAST ─────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.9);color:white;font-size:13px;font-weight:600;padding:10px 20px;border-radius:24px;z-index:9999;backdrop-filter:blur(10px);white-space:nowrap;transition:opacity 0.3s;pointer-events:none;'; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._timer); t._timer = setTimeout(() => t.style.opacity = '0', 2200);
}

// ─── UTILS ─────────────────────────────────────
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

// ─── FILTER CHIPS ──────────────────────────────
function setFilter(filter) {
  S.txFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(el => el.classList.toggle('active', el.dataset.filter === filter));
  const show = {
    all:      [1,2,3,4,5,6,7,8],
    sent:     [1,3,5,6,8],
    received: [2,4,7],
    pending:  [3],
    failed:   [5],
  }[filter] || [];
  document.querySelectorAll('.tx-row').forEach(el => {
    el.style.display = show.includes(parseInt(el.dataset.id)) ? '' : 'none';
  });
}

// ─── INIT ──────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Splash → onboarding
  setTimeout(() => { go('onboarding', false); renderSlide(); }, 2400);

  // Init screens
  setTimeout(() => {
    switchCur('MAD');
    renderKyc();
    updateAmount();
  }, 400);

  // Swipe for onboarding
  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive:true });
  document.addEventListener('touchend', e => {
    if (S.screen !== 'onboarding') return;
    const diff = tx - e.changedTouches[0].screenX;
    if (diff > 50) nextSlide(); else if (diff < -50) prevSlide();
  });

  // Set all logo images
  document.querySelectorAll('img[data-logo]').forEach(img => { img.src = LOGO_SRC; });
});
