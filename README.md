<div align="center">

# Neev · नींव · नीव

**The foundation a first-time entrepreneur is missing — what to build, what it costs, and which government scheme actually pays for it.**

[![Smart India Hackathon](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-FF6B35?style=for-the-badge)](#-problem-statement)
[![Stack](https://img.shields.io/badge/React%2019-TypeScript-1B2A41?style=for-the-badge&logo=react)](#-tech-stack)
[![Languages](https://img.shields.io/badge/Languages-10-4B7F52?style=for-the-badge)](#-genuinely-multilingual)
[![License: MIT](https://img.shields.io/badge/License-MIT-C68A2E?style=for-the-badge)](#-license)

[Live Demo](#-live-demo) · [What it does](#-what-neev-does) · [Run it locally](#-running-it-locally) · [Architecture](#-architecture) · [Demonstration scope](#-demonstration-scope--whats-real) · [Roadmap](#-roadmap)

</div>

---

## Overview

Government schemes for rural micro-entrepreneurs already solve the capital problem: contribute 10% margin money, get up to 90% back as a concessional loan. **The money exists. The analysis that should happen before someone borrows it doesn't.**

First-time entrepreneurs pick business categories on anecdotal success rather than local demand, and have no way to calculate their own capital requirement or scheme eligibility. **Neev** is a hyperlocal business feasibility and financial-structuring assistant that closes that gap — a beneficiary describes their idea, location, and available capital in plain language, and Neev turns that into a localized feasibility study *and* a precise, formula-backed loan structuring plan: exact scheme, exact EMI, exact moratorium, in a spreadsheet that keeps working long after the app conversation ends.

The name is the Hindi/Marathi word for **foundation** — deliberately literal. Neev is the foundation-laying step before a loan application, not a bookkeeping tool for a business that already exists.

## 🏛 Problem Statement

> **AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs**
> *Smart India Hackathon 2026*

Beneficiaries of concessional-credit schemes contribute a 10% margin and receive the remaining 90% as a loan across two tiers:

| Tier | Project cost | Loan share | Interest | Tenure | Moratorium |
|---|---|---|---|---|---|
| **Micro Finance Scheme** | Up to ₹1.40 lakh | Up to 90% (max ₹1.25L) | 6.5% p.a. | 3 years | 3 months |
| **Term Loan Scheme** | ₹1.40 lakh – ₹50 lakh | Up to 90% (max ₹45L) | 8% p.a. | 7 years | 6 months |

Despite available capital, first-time rural entrepreneurs face high stagnation because they lack formal, hyperlocal market research and financial literacy about margin requirements, scheme routing, and repayment structuring. The challenge: build an **NLP-powered, multilingual AI assistant** — with an accompanying **Smart Scheme Calculator** — that walks a beneficiary through a full feasibility study and financial structuring plan *before* they apply for funding, from three inputs: **Location**, **Available Margin Capital**, and **Business Category**.

<details>
<summary><b>Expected Solution — both required modules, in full</b></summary>

**Module 1 — Hyper-Local Business Feasibility Report**
1. Market Reach — consumer base within 5–10 km, primary distribution channels
2. Opportunity Analysis — underserved niches in the local economy
3. General SWOT scoped to a micro-enterprise budget
4. Threats — supply chain, seasonality, single-buyer dependency
5. Competitor Mapping using local demographic/economic data
6. Product Market Value — pricing suggestions based on regional purchasing power

**Module 2 — Smart Financial Calculator & Scheme Router**
7. Financial Structuring — Project Cost (`Margin ÷ 10%`) and Max Loan (`90% of Project Cost`)
8. Scheme Auto-Selection — routes to Micro Finance or Term Loan based on the ₹1.40L threshold
9. EMI & Moratorium Generator — quarterly repayment schedule, operating costs, working capital

</details>

## 📱 What Neev Does

Every item in the problem statement's expected solution is implemented and demonstrable in the app, not described in a slide:

| PS requirement | Where it lives in Neev |
|---|---|
| Multilingual NLP intake of Location, Capital, Category | Brain Dump screen — free-text input across **10 languages** |
| Market Reach, Opportunity Analysis, SWOT, Threats | Full Business Report (`ReportsScreen`, `SwotScreen`, `MarketScreen`) |
| Competitor Mapping, Product Market Value | Market & Pricing report screens, with a visible **data-source tag** on every figure |
| Project Cost & Max Loan calculation | `financialCalculations.ts` — real formulas, not display copy |
| Scheme Auto-Selection (Micro Finance ↔ Term Loan) | `getApplicableScheme()` — deterministic routing at the ₹1.40L threshold |
| EMI & Moratorium Generator | `generateRepaymentSchedule()` — month-by-month amortization with interest capitalizing through the moratorium |

**Beyond the brief**, Neev also demonstrates: a "teaser score" that hooks the user before the full wizard, a scored Business Viability breakdown across seven weighted dimensions, and downloadable **Excel + PDF** outputs that serve two different jobs (see below) — shown to signal the product's life beyond a single session, not shipped as the hackathon deliverable itself.

### Why two downloads, not one

| | PDF Report | Excel Workbook |
|---|---|---|
| **Role** | The story | The engine |
| What it is | Formatted, presentation-ready | Live formulas, fully auditable |
| Who it's for | A bank officer, family, an NGO advisor | The entrepreneur, updating it as the business runs |
| Built with | `jsPDF` | `SheetJS (xlsx)` |

## 🎥 Live Demo

**[neev-xi.vercel.app](https://neev-xi.vercel.app)**

<!-- Screenshots / demo GIF can be added here once the UI is finalized. Recommended strip: Dashboard → Brain Dump → Scorecard → Financial Roadmap. -->

## 🧭 Demonstration Scope — What's Real

Built to prove the concept end-to-end rather than fake the parts that are easy to fake:

**Real, computed, not mocked:**
- The entire financial engine — EMI amortization, moratorium interest capitalization, scheme routing, break-even, 12-month cash flow — is formula-driven in `src/utils/financialCalculations.ts`. No number in Module 2 is hardcoded.
- Excel and PDF generation produce real files with real computed values via SheetJS and jsPDF, not static templates.
- All 10 languages are complete, structured translation dictionaries (`src/i18n/`) driving every screen, not a 3-language demo veneer.
- Every figure not directly entered by the user carries a visible source tag (`Self-reported` / `Model estimate` / `Local estimate` / `Govt. dataset`) — the honesty mechanism is implemented, not asserted.

**Demonstrated via a structured interaction model, wired for a live swap:**
- Voice input (`useVoiceAssistant.ts`) runs a scripted listen → transcribe → respond sequence today. It exists to demonstrate the *interaction model* the team will wire to Bhashini/Whisper next — the hook's return shape and state machine are already what a real STT integration would plug into.
- Hyperlocal market figures (competitor density, pricing benchmarks) currently use category-level seed data. The pipeline is built for three-tier sourcing exactly as designed for production — self-reported input as primary, Google Maps Places API as enrichment, Census/SECC as static baseline — which is why every figure is already source-tagged.
- **Agentic AI**, **Network**, and **Invoice** are intentionally scoped as placeholder modules (`PlaceholderScreen` type) — included in the navigation to demonstrate product breadth and roadmap direction, clearly not claimed as working in this build.

## 🏗 Architecture

```
34 screens · 21 shared components · TypeScript throughout
```

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + TypeScript + Vite | Fast iteration, type-safe financial logic |
| Styling | Tailwind CSS v4 + custom keyframe animations | Phone-frame mobile UI, count-up/reveal animations |
| Icons | Lucide React | Consistent icon system |
| Financial engine | Hand-written amortization formulas | Auditable math — see [Demonstration Scope](#-demonstration-scope--whats-real) |
| Excel export | SheetJS (`xlsx`) | Multi-sheet workbook: Business Info, Inputs, Outputs |
| PDF export | jsPDF | Presentation-ready business report |
| i18n | Custom context provider, 10 static dictionaries | `en · hi · mr · gu · ta · te · ml · kn · pa · tulu` |

### Project structure

```
src/
├── screens/          # onboarding · wizard · scorecard · reports · financial · schemes · settings
├── components/        # assistant · badges · cards · charts · layout · navigation · ui
├── data/               # mock business/financial/market/scheme seed data, per language
├── hooks/              # useFinancialEngine, useVoiceAssistant, useHighlight
├── i18n/               # 10 language dictionaries + context provider
├── utils/              # financialCalculations.ts, download.ts (xlsx/pdf), formatters.ts
└── types/              # shared TypeScript contracts
```

## 🚀 Running It Locally

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/GlitchMob6/neev.git
cd neev
git checkout stable-version   # the branch this README describes

npm install
npm run dev                   # starts the Vite dev server
```

```bash
npm run build                 # production build (tsc -b && vite build)
npm run preview                # preview the production build
npm run lint                    # oxlint
```

### Deploying

Structured for one-click deployment to Vercel, Netlify, or Cloudflare Pages:

- **Build command:** `npm run build`
- **Output directory:** `dist`

## 🌍 Genuinely Multilingual

Not a 3-language proof of concept — every screen, badge, and mock dataset switches live across **English, Hindi, Marathi, Gujarati, Tamil, Telugu, Malayalam, Kannada, Punjabi, and Tulu**, with Devanagari and regional-script typography handled per language.

## 🗺 Roadmap

Shown to demonstrate the product has a life beyond a single loan application — explicitly **not** part of this build:

| Feature | What it adds |
|---|---|
| Bank statement / open banking connection | Populates the "Actuals" column already reserved in the Excel workbook |
| Variance alerts | Flags when actual OpEx exceeds projected by a meaningful margin |
| Expansion scheme matching | Re-evaluates eligibility for Mudra / CGTMSE once the business is operating |
| Real voice input | Bhashini or Whisper replacing the scripted `useVoiceAssistant` hook |
| Live geodata | Google Maps Places API + government datasets replacing seed defaults where coverage exists |

## 📄 License

Released under the [MIT License](LICENSE).

<div align="center">
<sub>Neev · Built for Smart India Hackathon 2026</sub>
</div>
