# Neev SIH 2026 — Master Task Tracker

> **PURPOSE**: This file tracks all implementation tasks. If the current LLM session runs out of tokens, another model can read this file + the implementation_plan.md + the codebase to resume work from where it stopped.

> **PROJECT LOCATION**: `/home/wolf/NEEV/neev-app/` (Vite + React + TypeScript + TailwindCSS v4)
> **DEV SERVER**: `npm run dev` from `/home/wolf/NEEV/neev-app/`
> **KEY DECISION**: Demo uses Microfinance path (₹1.4L total, 6% interest, 3yr tenure, 3mo moratorium)

---

## Phase 1 — Audit Existing Application
- [x] Inspect project structure and dependencies
- [x] Read all screen components (10 onboarding + wizard + dashboard + reports + financial + schemes + agentic + network + settings + profile)
- [x] Read all data files (mockUser, mockBusiness, mockFinancial, mockSchemes, mockMarket)
- [x] Read i18n system (en, hi, mr translations + provider)
- [x] Read UI component library (Button, Card, SourceBadge, ProgressBar, AnswerCard, ScoreRing, InputField)
- [x] Read layout components (PhoneFrame, ScreenWrap, TopBar, BottomNav)
- [x] Read assistant/Bhashini components (FloatingAssistant, AssistantBanner, AssistantAvatar, VoiceOrb, Waveform)
- [x] Read hooks (useFinancialEngine, useHighlight, useVoiceAssistant)
- [x] Read utilities (download.ts, financialCalculations.ts, formatters.ts)
- [x] Understand navigation architecture (screen state + moduleReturnScreen)
- [x] Document what exists vs what's missing

## Phase 2 — Fix Navigation & State
- [ ] Update `types/index.ts` — add `processing` and `scorecard` screen types, expand Language type
- [ ] Update `App.tsx` — add navigation history stack, new screen routes, scorecard state
- [ ] Update `data/mockFinancial.ts` — change to ₹1.4L total, ₹14K margin, ₹1.26L loan, 6% interest, 36mo tenure, 3mo moratorium
- [ ] Wire wizard → processing → scorecard flow in App.tsx

## Phase 3 — Implement Scorecard Experience (HERO MOMENT)
- [ ] Create `screens/scorecard/ProcessingScreen.tsx` — animated step sequence
- [ ] Create `screens/scorecard/ScorecardScreen.tsx` — single scrollable experience with:
  - [ ] Your Understanding score (385/500) with count-up animation
  - [ ] Your USP section
  - [ ] Business Viability (74/100) with animated horizontal bars
  - [ ] Loan Intent (Yes/No)
  - [ ] Financing Reveal section (on YES):
    - [ ] Scheme Possibility (Microfinance)
    - [ ] Capital & Margin breakdown
    - [ ] EMI Calculator
    - [ ] Repayment Plan
    - [ ] Business Report Preview + View Report button
  - [ ] NO path → proceed to Report
- [ ] Create `data/mockScorecard.ts` — seeded scorecard data

## Phase 4 — Implement Financing Logic
- [ ] Add `getApplicableScheme()` function to financialCalculations.ts
- [ ] Add margin/loan calculation (10% / 90%)
- [ ] EMI calculation with correct Microfinance params
- [ ] Repayment plan generation with moratorium handling

## Phase 5 — Polish Business Report
- [ ] Restructure `ReportsScreen.tsx` as unified Business Report
  - [ ] Business snapshot section
  - [ ] Market understanding
  - [ ] Business viability
  - [ ] Financial picture
  - [ ] Financing recommendation (if loan selected)
  - [ ] Your USP
  - [ ] "Your Corner" with Download PDF + Download Excel
- [ ] Remove cross-module navigation cards from report
- [ ] Update report download to use new financial data

## Phase 6 — Restructure Dashboard
- [ ] Restructure to exactly 2 primary sections:
  - [ ] Column 1 — Quick Actions: Excel/Financial Analysis, Market Competition, Business Report
  - [ ] Column 2 — Tools: Networking, Agentic AI, Invoice System
- [ ] Business Report opens actual Report page
- [ ] Remove old modules grid and financial highlights

## Phase 7 — Floating Assistant / Bhashini
- [x] Create simple string explanations for main sections (Scorecard, Dashboard, Reports)
- [x] Update FloatingAssistant.tsx (if needed) to ensure it triggers correctly
- [x] Test voice flow UI

## Phase 8 — Genuine Localization
- [x] Expand Language type to 10 languages in types/index.ts
- [x] Create translation files: gu.ts, ta.ts, te.ts, ml.ts, kn.ts, tulu.ts, pa.ts
- [x] Update i18n/index.tsx to load all 10 language files
- [x] Update LanguageScreen to show all 10 languages with native script
- [x] Add search/filter for language discovery
- [x] Update mockBusiness data for new languages
- [x] Verify all UI strings change on language switch

## Phase 9 — Add Processing/Reveal Animations
- [x] Score count-up animation (CSS + JS)
- [x] Viability bar upward-fill animation with Intersection Observer
- [x] Financing section smooth expand animation
- [x] Card soft reveal on scroll
- [x] Scorecard section-by-section reveal
- [x] Processing screen step progression animation
- [x] Update index.css with new animation keyframes

## Phase 10 — Test & Polish
- [x] Full flow walkthrough (Login -> BrainDump -> Scorecard -> Financing -> Dashboard)
- [x] Check color contrast and spacing in 390x844 frame
- [x] Ensure no hard crashes on refresh
- [x] Clean up unused code/files

---

## Key Files Reference (for resuming LLM)

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main router, all state, screen switching |
| `src/types/index.ts` | TypeScript types for all data |
| `src/data/mockFinancial.ts` | Seeded financial data (UPDATED: ₹1.4L Microfinance) |
| `src/data/mockScorecard.ts` | NEW: Seeded scorecard data |
| `src/data/bhashiniExplanations.ts` | NEW: Page/section explanation content |
| `src/screens/scorecard/ProcessingScreen.tsx` | NEW: Processing transition |
| `src/screens/scorecard/ScorecardScreen.tsx` | NEW: Hero scorecard experience |
| `src/screens/dashboard/DashboardScreen.tsx` | MODIFIED: 2-column layout |
| `src/screens/reports/ReportsScreen.tsx` | MODIFIED: Unified business report |
| `src/components/assistant/FloatingAssistant.tsx` | MODIFIED: Section highlighting |
| `src/utils/financialCalculations.ts` | MODIFIED: Scheme determination |
| `src/i18n/*.ts` | Translation files |
| `src/index.css` | Animations and styling |

## Critical Decisions Made
1. **Microfinance demo path**: ₹1.4L total, 6% interest, 3yr, 3mo moratorium
2. **Existing 5 govt schemes REPLACED** with 2-scheme system (Microfinance + Term Loan) integrated into scorecard
3. **Schemes tab removed** from bottom nav — financing is now part of scorecard flow
4. **Navigation**: Using history stack array instead of single `moduleReturnScreen`
5. **Seeded scores**: Understanding 385/500, Viability 74/100
6. **USP**: "Direct farmer-to-consumer fresh milk with home delivery — no middleman"
