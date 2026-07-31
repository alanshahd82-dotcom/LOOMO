# LOOMO — Fintech App Interactive Prototype

> A highly professional, fully interactive mobile app prototype for **Loomo**, a multi-currency fintech application.

![Loomo Preview](https://img.shields.io/badge/Loomo-Fintech%20Prototype-2563EB?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHBhdGggZD0iTTQwIDE0QzMwIDE0IDIyIDIyIDIyIDMyQzIyIDM4IDI1IDQzIDMwIDQ2QzI1IDQ5IDIyIDU0IDIyIDYwQzIyIDcwIDMwIDc2IDQwIDc2IiBzdHJva2U9IiNFOEVDRjQiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)

## 🚀 Live Demo

Open `index.html` in any modern browser — no build step, no server required.

## 📱 Screens Included

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Splash / Onboarding** | Animated logo + 3-slide value proposition |
| 2 | **Sign In / Sign Up** | Email + social auth (Google, Apple) |
| 3 | **KYC Verification** | 3-step flow: ID → Selfie → Review |
| 4 | **Home Dashboard** | Multi-currency balances (MAD, USD, EUR, GBP) |
| 5 | **Send Money** | Recipient select → Amount (live numpad) → Fee breakdown → Confirm |
| 6 | **Receive Money** | Per-currency IBAN + live SVG QR code |
| 7 | **Transaction History** | Filterable list with status badges |
| 8 | **Transaction Detail** | Full breakdown with receipt download |
| 9 | **Virtual Card** | Mastercard design, freeze toggle, spend tracker |
| 10 | **Settings / Profile** | Security (2FA, biometrics), limits, support |

## 🎨 Design System

- **Primary:** Deep blue gradient `#1E3A8A → #2563EB`
- **Accent:** Silver/white metallic `#C0C8D8 / #E8ECF4`
- **Typography:** Inter (Google Fonts)
- **Radius:** 8 / 16 / 24 / 32px scale
- **Shadows:** Layered blue-tinted shadows throughout

## 💡 Features

- ✅ Fully interactive — every button navigates
- ✅ Live numpad for amount entry with real-time fee calculation
- ✅ Recipient selection with visual active state
- ✅ QR code generated on the fly (SVG, no external lib)
- ✅ Copy-to-clipboard on account details
- ✅ Card freeze toggle with live state
- ✅ 2FA / biometrics toggles
- ✅ Transaction filter chips
- ✅ Animated splash screen + success states
- ✅ Realistic dummy data throughout (no real PII)
- ✅ Back navigation history stack
- ✅ Mobile-first device frame for desktop presentation

## 📂 File Structure

```
LOOMO/
├── index.html      # All screens and layout
├── style.css       # Complete design system + component styles
├── app.js          # Navigation, interactions, data, QR generator
└── README.md       # This file
```

## 🔧 How to Use

1. Clone the repo or download the files
2. Open `index.html` in Chrome, Firefox, Safari, or Edge
3. Click through screens — no install required

## 💸 Fee Structure (Prototype Logic)

| Transfer Type | Fee |
|---------------|-----|
| International | 2.5% of amount |
| Domestic (USD) | $3.00 flat |

Exchange rates are hardcoded realistic approximations:
- 1 USD = 10.05 MAD
- 1 EUR = 10.89 MAD
- 1 GBP = 12.71 MAD

## ⚠️ Disclaimer

All data in this prototype is **entirely fictional and for demonstration purposes only**. Names, amounts, IBANs, and transaction references are fake and do not represent real financial information.

---

Built for **Loomo Financial Technologies** · Prototype v1.0 · 2026
