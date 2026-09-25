# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
lifts, lock them into today's plan, track saved-for-later workouts, and
watch your minutes and calories add up — all in a fast, fully responsive
UI.

## 🔗 Live Demo

- **Live Site**: [https://https://myfitlogs.vercel.app/]
- **GitHub Repo**: [https://github.com/julkar929/fitLog.git]

## 🛠️ Technologies Used

- **Next.js 14 (App Router)** — routing, layouts, client components
- **React 18** — UI and state management
- **TypeScript** — type safety across API data and components
- **Tailwind CSS v4** — styling and full responsiveness
- **lucide-react** — icon set
- **Fetch API** — live data from the FitLog workout API
- **localStorage** — persists Today's Plan and Saved lists across reloads

## ✨ Key Features

1. **Dynamic workout library** — all 12 lifts are fetched live from the API
   and rendered as a responsive 3×4 grid on desktop, collapsing gracefully
   on tablet and mobile.
2. **Sort dropdown** — reorder the library instantly by Duration, Calories,
   or Rating.
3. **Today's Plan & Saved system** — add any workout to a 5-lift daily plan
   or save it for later, with live badge counters in the navbar and toast
   notifications on every action.
4. **My Plan dashboard** — tabbed view of your plan and saved lists, a live
   Exercises / Minutes / Calories summary, mark-as-done and remove actions,
   and a friendly empty state.
5. **Persistent state** — your plan and saved items survive a page reload
   via localStorage, so nothing is lost between sessions.
6. **Polished detail pages, 404, and error handling** — every workout has a
   full two-column detail page with specs and instructions, plus a custom
   404 page and error boundary so navigation never breaks.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/julkar929/fitLog.git
cd fitlog

# Install dependencies
npm install

# Run development server
npm run dev