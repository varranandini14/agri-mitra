# AgriMitra — Project Inventory
**Inspection Date:** 2026-10-07  
**Inspector:** Antigravity AI — Senior React Engineer

---

## 1. Project Structure & Tech Stack

| Item | Detail |
|------|--------|
| Framework | React 19 (JSX, no TypeScript ✓) |
| Build Tool | Vite 8 |
| Routing | React Router DOM 7 |
| Languages | JavaScript only ✓ |
| CSS | Vanilla CSS (components.css, global.css, themes.css, responsive.css) |
| State | React Context (AppDataContext) + useLocalStorage hook |
| Linting | oxlint |
| No TypeScript | ✓ Confirmed |
| No backend | ✓ Confirmed |
| No secret keys | ✓ Confirmed |

---

## 2. Pages & Routes

| Route | File | Status |
|-------|------|--------|
| `/` | `src/pages/Home.jsx` (550 lines) | Working — has hero, stats, weather sample, activity, recommendations |
| `/crops` | `src/pages/CropGuide.jsx` (398 lines) | Working — search, filter, crop details modal |
| `/market` | `src/pages/MarketCalculator.jsx` (677 lines) | Working — price table, calculator, saved calcs |
| `/schemes` | `src/pages/SchemesInsurance.jsx` (365 lines) | Working — scheme cards, bookmark, checklist |
| `/planner` | `src/pages/FarmPlanner.jsx` (516 lines) | Working — tabbed: tasks, weather, soil, water |

---

## 3. Components Inventory

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Layout | Layout.jsx | Working | App shell with sidebar+header+bottom nav |
| Header | Header.jsx | Working | Language, theme, profile, easy mode |
| Sidebar | Sidebar.jsx | Working | Desktop nav, brand, footer note |
| BottomNavigation | BottomNavigation.jsx | Working | Mobile nav |
| VoiceAssistant | VoiceAssistant.jsx | Working | Modal with speak/listen/commands |
| CropCard | CropCard.jsx | Working | Real images with fallback, 3D tilt |
| FarmIllustration | FarmIllustration.jsx | Working | SVG animated farm scene |
| Modal | Modal.jsx | Working | Focus trap, Escape close |
| Toast | Toast.jsx | Working | Auto-dismiss notifications |
| Button | Button.jsx | Working | primary/secondary/danger/ghost/sm |
| Badge | Badge.jsx | Working | info/success/warning/error tones |
| FormField | FormField.jsx | Working | Label+input wrapper |
| EmptyState | EmptyState.jsx | Working | Icon+text empty state |
| ErrorBoundary | ErrorBoundary.jsx | Working | Catches render errors |
| ProfileModal | ProfileModal.jsx | Working | Farmer profile form |
| ConfirmDialog | ConfirmDialog.jsx | Working | Delete confirmations |
| EasyModeBanner | EasyModeBanner.jsx | Working | Farmer Easy Mode indicator |
| StatCard | StatCard.jsx | Working | Dashboard stat cards |
| ThemeToggle | ThemeToggle.jsx | Working | Light/dark toggle |
| Loader | Loader.jsx | Working | Simple spinner |
| SplitText | SplitText.jsx | Working | Character-by-character text reveal |
| CountUp | CountUp.jsx | Working | Animated number counter |
| SimpleBarChart | SimpleBarChart.jsx | Working | CSS bar chart |
| Icons | Icons.jsx | Working | SVG icon set |

---

## 4. Hooks & Utilities

| File | Status | Notes |
|------|--------|-------|
| useVoiceAssistant.js | Working | Full TTS+STT, voice queue, language picking |
| useLocalStorage.js | Working | Safe read/write with fallback |
| useTheme.js | Working | Light/dark with localStorage persist |
| AppDataContext.jsx | Working | All app state centralized |
| translations.js | Working | 3-language (en/te/hi) i18n dictionary |
| calculations.js | Working | Farm profit formulas, unit handling |
| format.js | Working | formatINR, formatDate, uid |
| validation.js | Working | Form validation helpers |
| season.js | Working | Season detection, localized names |
| recommendations.js | Working | Profile-based farm recommendations |

---

## 5. Data Files

| File | Status | Notes |
|------|--------|-------|
| crops.js (100KB) | Working | 13 crops, localized, with images |
| schemes.js (56KB) | Working | Central+state schemes, localized |
| marketPrices.js | Working | Sample mandi prices, clearly labelled |
| farmingTips.js | Working | Seasonal tips |
| weather.js | Working | Sample weather data |

---

## 6. Crop Images

| Crop | File | Status |
|------|------|--------|
| Rice | /images/crops/rice.jpg | ✓ Present |
| Cotton | /images/crops/cotton.jpg | ✓ Present |
| Sugarcane | /images/crops/sugarcane.jpg | ✓ Present |
| Groundnut | /images/crops/groundnut.jpg | ✓ Present |
| Soybean | /images/crops/soybean.jpg | ✓ Present |
| Wheat | /images/crops/wheat.jpg | ✓ Present |
| Maize | /images/crops/maize.jpg | ✓ Present |
| Chilli | /images/crops/chilli.jpg | ✓ Present |
| Tomato | /images/crops/tomato.jpg | ✓ Present |
| Onion | /images/crops/onion.jpg | ✓ Present |
| Chickpea | /images/crops/chickpea.jpg | ✓ Present |
| Turmeric | /images/crops/turmeric.jpg | ✓ Present |
| Redgram | /images/crops/redgram.jpg | ✓ Present |

Note: Images referenced in crops.js use `/images/crops/*.jpg` paths. 13 crops in data, 13 images present. ✓

---

## 7. CSS / Design System

| Item | Status | Notes |
|------|--------|-------|
| Color palette | Partially aligned | Uses `#1b5e32` (Forest Green) but requirement is `#1B5E3B`. Need to verify exact hex. |
| Dark theme | Working | Soft dark green backgrounds, not pure black ✓ |
| Light theme | Working | Cream backgrounds ✓ |
| Typography | Working | Nunito (display) + Source Sans 3 (body) ✓ |
| Responsive | Working | Mobile-first, breakpoints at 900/640/400px |
| Focus rings | Working | Visible via `--focus` var |
| Reduced motion | Working | CSS @media rule disables all animations |
| No purple/violet | ✓ Confirmed — uses greens, gold, teal, clay |

**Color discrepancy:** themes.css uses `#1b5e32` for Forest Green, requirement is `#1B5E3B`. Also `#3d8c4a` vs required `#6AA84F` for Leaf Green, and `#c79212` vs required `#F4C430` for Golden Yellow. These need updating to exact brand palette.

---

## 8. Features Assessment

### WORKING ✓
- 5 main pages with all core functionality
- Light/dark theme with persistence
- Language switching (EN/TE/HI) with full translations
- localStorage data persistence (profile, tasks, crops, calculations, soil, irrigation, schemes)
- Voice TTS with language detection and queue system
- Speech recognition (browser-native)
- Farm profit calculator with correct arithmetic
- Mandi price comparison table
- Government schemes with document checklist
- Farm planner with tasks, soil logs, water logs
- Export (JSON + CSV) from Home dashboard
- Profile modal
- Easy Mode / Farmer Mode toggle
- Crop cards with real images + fallback
- Animated farm SVG illustration
- Accessible modal with focus trap
- Toast notifications
- Empty states

### PARTIALLY WORKING ⚠️
- Telugu TTS: Browser voice present only; no cloud TTS (expected)
- Weather: Sample data only (expected, no live API)
- Market prices: Sample data only (expected)
- VoiceAssistant component: shows in modal but some speech-command routing may have issues
- Missing: Welcome/onboarding page (no `/welcome` route)
- Missing: Crop Journey page with guided steps
- Missing: Check My Crop (photo upload + layer checks)
- Missing: Farm Photo Journal
- Missing: Image manifest with verified flags
- Missing: Formal voiceService abstraction module
- Missing: Separate voice-text dictionaries (voice text mixed in components)
- Missing: Speech formatting utility for numbers/currency
- Missing: PWA manifest + service worker
- Missing: Connection status badge (real events)
- Missing: DataStatusBadge component
- Missing: Import/restore backup (only export exists)

### MISSING ✗
- Welcome page
- Crop Journey guided workflow
- Check My Crop (Layer 1/2/3)
- Farm Photo Journal  
- Image manifest (src/data/imageManifest.js)
- checkImages.js script
- voiceService.js abstraction
- Voice text dictionaries (separate from UI text)
- Speech formatting utility
- PWA service worker + manifest
- Scheme Readiness Checklist (partial — exists but needs improvement)
- CREDITS.md
- VOICE_PROVIDERS.md

---

## 9. Known Issues

1. **Brand palette mismatch**: Colors in themes.css don't exactly match the mandatory palette (#1B5E3B, #6AA84F, #F4C430, #FAF8EF, #2E2E2E)
2. **No Welcome page**: First-time user goes directly to the dashboard with no onboarding
3. **No Crop Journey**: No guided multi-step crop recording workflow
4. **No photo upload**: Check My Crop section does not exist
5. **No image manifest**: No central manifest with verified flags for all crop images
6. **Voice text not separated**: Voice script is inline in components, not a separate layer
7. **No backup import**: Users can export but not restore from JSON backup
8. **No PWA offline support**: No service worker or manifest
9. **Missing translations**: `easyModeView.badge` key used in EasyModeBanner but may be missing from some language dictionaries
10. **No DataStatusBadge**: Sample data not distinctly badged vs live data
11. **Header palette token issue**: `--green-forest: #1b5e32` vs required `#1B5E3B`

---

## 10. What To Preserve

- All 5 existing page implementations (preserve working logic, improve only)
- useLocalStorage, useTheme hooks (correct and safe)
- AppDataContext (well-structured)
- useVoiceAssistant hook (excellent implementation)
- All crops data (100KB, comprehensive)
- All schemes data (56KB, comprehensive)
- All market price data
- All existing CSS components and design system (improve palette alignment)
- Button, Modal, Toast, EmptyState, Badge, FormField, ErrorBoundary (reuse, don't duplicate)
- CropCard 3D tilt + image fallback (good pattern to extend)
- FarmIllustration SVG (works well)
- Responsive layout (900px breakpoint, bottom nav mobile)
- Multilingual system structure (translations.js + t() helper)

---

## 11. Technical Risks

1. **Color palette token changes** — CSS custom property renames affect many components; must change carefully
2. **Adding Welcome route** — Need to wrap BrowserRouter and handle `seen:welcome` localStorage without breaking existing routes
3. **Crop Journey** — Requires new data (stage durations per crop) and state management (growthStage already exists)
4. **Photo upload** — Need careful privacy handling; photos stay local; no external upload
5. **Import backup** — JSON validation needed; schema versioning; confirm-before-overwrite
6. **Voice text separation** — Extracting to separate dictionaries must not break existing speaks
7. **PWA** — Service worker caching must not break existing HMR in dev; only in prod build
