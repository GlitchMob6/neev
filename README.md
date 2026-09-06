# NEEV (नींव · नीव)

> **Mobile Entrepreneurship Guidance Application for First-Time and Small Entrepreneurs in India**

NEEV provides actionable business feasibility guidance, automated financial modeling, and local market intelligence tailored for tier-2/3 and rural Indian entrepreneurs.

---

## 🌟 Key Features

- **Iconic Root Symbol Voice Assistant**: Foundation-rooted emblem with real-time speech guidance and full-bleed voice interaction orb.
- **Multilingual Support with Baloo 2**:
  - English (`en`)
  - Hindi (`hi`) — Devanagari typography with Baloo 2 font
  - Marathi (`mr`) — Devanagari typography with Baloo 2 font
  - Dynamic live context translation across all screens, badges, and mock datasets.
- **Automated Financial Viability Engine**:
  - Standard loan amortization EMI calculations ($EMI = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$)
  - Daily break-even estimation & cash-flow projections
  - 1-click **Excel Workbook (.xlsx)** download via SheetJS
  - 1-click **Printable Project Report (.pdf)** download via jsPDF
- **Streamlined 3-Tab Architecture**:
  - **Dashboard**: Greeting, business hero card, economics estimations, 4 quick actions, and module shortcuts.
  - **Reports**: Business Health feasibility ring (79/100), financial snapshot, market reach, competitor density, SWOT matrix, and pricing benchmark.
  - **Settings**: Instant language switcher, voice interaction mode switcher, and profile management.
- **Data Source Attribution**:
  - Every estimation is transparently labeled: `Self-reported`, `Model estimate`, `Local estimate`, or `Govt. dataset`.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS tokens + Tailwind v4 + Custom Keyframe Animations
- **Typography**: Baloo 2 & Noto Sans Devanagari (Hindi/Marathi), Plus Jakarta Sans (English)
- **Icons**: Lucide React
- **Document Export**: SheetJS (`xlsx`) + jsPDF

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

---

## 🌐 Deploy to Vercel / Netlify / Cloudflare Pages

This repository is structured for one-click deployment:

1. Import this repository into **Vercel** or **Netlify**.
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. Deploy!
