# AgriMitra — Smart Farming Assistant

Frontend-only React app (Vite + JavaScript) for Indian small and medium farmers and agriculture students.

**Tagline:** Smarter Farming. Better Decisions. A Brighter Harvest.

## Live Demo

🌾 AgriMitra – Live Website:
https://agri-mitra.netlify.app

## How to run locally

```bash
cd agri-mitra
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

Production check:

```bash
npm run build
npm run preview
```

## Notes for demo

- All prices and weather cards are **sample demonstration data**.
- Records are saved in **this browser only** (`localStorage` keys starting with `agrimitra:`).
- Crop guidance cannot diagnose disease. Confirm schemes on official websites.

## Extra library

- `react-router-dom` — page navigation without reloading. No backend.
