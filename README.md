# 🌙 Ramadan Stats — Card Generator

Generate a shareable **Ramadan Worship Card**.  
Track fasting, tarawih, tadarus, tahajjud & charity, then export a beautiful shareable image.

---

## ✨ Features

- **Worship Stats Input** — fasting, tarawih, tadarus, tahajjud, charity
- **Auto calculations** — % per activity, overall consistency score, grade (S+ → D)
- **5 built-in card templates** — Geometric, Crescent, Minimal, Lantern, Neon
- **Custom background upload** — with dark overlay toggle
- **6 accent color options**
- **Export as PNG** — high resolution (3× pixel ratio)
- **Share card** — native share sheet or clipboard copy
- **No login required**

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone / copy the project folder
cd ramadan-stats

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Build for Production

```bash
npm run build
npm start
```

---

## ▲ Deploy on Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Framework preset: **Next.js** (auto-detected)
5. Click **Deploy** — done!

No environment variables needed.

---

## 📁 Project Structure

```
ramadan-stats/
├── app/
│   ├── layout.tsx        # Root layout with fonts
│   ├── page.tsx          # Main page + state management
│   └── globals.css       # Global styles + CSS variables
├── components/
│   ├── PnlCard.tsx       # The shareable card component
│   └── InputForm.tsx     # Input form with all controls
├── public/               # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| React 18 | UI |
| TypeScript | Type safety |
| TailwindCSS | Utility styling |
| html-to-image | PNG export |

---

## 🎨 Card Grades

| Score | Grade |
|-------|-------|
| ≥ 90% | S+ 🏆 |
| ≥ 80% | A ⭐ |
| ≥ 65% | B+ ✨ |
| ≥ 50% | B 👍 |
| ≥ 35% | C 💪 |
| < 35%  | D 📈 |

---

*بارك الله فيك — May Allah bless you.*
"# ramadan-stats" 
