# AgriMitra — Voice Provider Research & Evaluation
**Research Date:** 2026-10-07  
**Status:** Browser TTS only (cloud TTS requires secure backend proxy)

---

## Overview

This document evaluates TTS providers for the AgriMitra Telugu voice experience.
Goal: Natural, conversational Indian Telugu that an ordinary farmer can understand.

---

## Provider 1: Sarvam AI — Bulbul V3

**Status: REQUIRES SECURE BACKEND PROXY — Not connected in frontend**

| Attribute | Detail |
|-----------|--------|
| Telugu support | Yes — Indian Telugu with good pronunciation |
| Voice quality | High — natural prosody, Indian accent |
| Indian languages | 10+ Indian languages including Telugu, Hindi, Tamil |
| API type | REST API |
| Authentication | Requires API key (secret) |
| Pricing | Check sarvam.ai for current pricing |
| Free tier | Limited free usage available |
| CORS | Not browser-callable without proxy |
| Terms | Commercial use permitted; check data retention policy |
| Security | **API key MUST NOT be in frontend code** |

**Integration path (future):**
```
Frontend → voiceService.js → Secure server proxy → Sarvam Bulbul V3 API
```

**Cannot be integrated in current frontend-only version.** A server-side proxy is required to keep the API key secret.

**What needs to be built:**
- Backend serverless function (e.g., Vercel Edge Function, AWS Lambda) that accepts text, calls Sarvam API with the secret key, and streams audio back
- Frontend voiceService.js calls this proxy endpoint
- Privacy consent UI before sending farmer's data (crop names, quantities etc.)

---

## Provider 2: Google Cloud Text-to-Speech

**Status: REQUIRES SECURE BACKEND PROXY — Not connected in frontend**

| Attribute | Detail |
|-----------|--------|
| Telugu support | Yes — WaveNet and Standard voices for te-IN |
| Voice quality | High (WaveNet), Medium (Standard) |
| Authentication | Google Cloud API key (secret) |
| Pricing | First 1 million chars/month free (Standard), 1M WaveNet is paid |
| CORS | Not browser-callable without proxy |
| Terms | Standard Google Cloud terms |
| Security | **API key MUST NOT be in frontend code** |

**Same backend proxy requirement as Sarvam.**

---

## Provider 3: Browser Speech Synthesis (Web Speech API)

**Status: ACTIVE — Current implementation in useVoiceAssistant.js**

| Attribute | Detail |
|-----------|--------|
| Telugu support | Depends on OS/browser voice installation |
| Voice quality | Low to medium — robotic on most systems |
| Authentication | None required |
| Offline | Works offline ✓ |
| CORS | N/A — browser native |
| Privacy | Text processed locally OR sent to OS vendor's servers (varies) |
| Cost | Free |
| Availability | Chrome: often has te-IN; Safari: limited; Firefox: limited |

**Current behavior:** useVoiceAssistant.js picks the best available voice per language. If no Telugu voice found, uses browser default with a warning toast.

**Limitation:** Browser TTS Telugu sounds robotic. NOT equivalent to Sarvam Bulbul V3 quality.

**Implementation:** ✓ Already implemented. Works as fallback.

---

## Provider 4: Pre-generated Static Audio (Bundled .mp3 files)

**Status: NOT IMPLEMENTED — Evaluated**

| Attribute | Detail |
|-----------|--------|
| Approach | Developer generates audio files offline using Sarvam/Google, bundles as assets |
| Coverage | Fixed instruction texts only (not dynamic values) |
| Offline | Works offline if files are cached ✓ |
| Key security | Keys stay with developer, not in app ✓ |
| Terms | Verify redistribution rights with provider |
| Quality | High if generated with Sarvam Bulbul V3 |

**Limitation:** Cannot cover dynamic values (crop names entered by user, ₹ amounts, dates).
**Suitable for:** Fixed onboarding instructions, step-by-step guidance, scheme explanations.

**Decision: Not implemented in this version** — requires developer to generate audio files outside the app. 
Documented as a future enhancement path.

---

## Current Architecture

```
Component
  └─ uses useVoiceAssistant(language)
       └─ useVoiceAssistant.js
            ├─ Browser speechSynthesis (ACTIVE)
            └─ [Future] voiceService.js → cloud provider proxy
```

---

## Future Architecture (Recommended)

```
Component
  └─ speaks via voiceService.js interface
       ├─ browserProvider.js (ACTIVE - fallback)
       └─ cloudProvider.js → /api/tts proxy → Sarvam Bulbul V3
```

---

## Limitations (Honest Statement)

1. **Cloud-quality Telugu TTS is NOT connected** in this version. A secure server-side proxy is required.
2. **Browser TTS Telugu is robotic** on most browsers. It serves as a functional fallback but does not meet the "natural farmer-friendly Telugu" standard.
3. **A native Telugu speaker must review** all voice text for naturalness, vocabulary, and pronunciation before claiming voice support is complete.
4. **Chrome on Android** typically has better Indian voice support than desktop browsers.
5. **No audio has been pre-generated** for this version.

---

## Voice QA Notes

The following sentences must be tested by a native Telugu speaker when a quality TTS provider is integrated:

1. "మీ పంటను ఎంచుకోండి." (Select your crop.)
2. "మీ పంట వివరాలు సేవ్ అయ్యాయి." (Your crop details are saved.)
3. "దయచేసి సరైన పరిమాణాన్ని నమోదు చేయండి." (Please enter the correct quantity.)
4. "మీరు నాటిన తేదీని ఎంచుకోండి." (Select your planting date.)
5. "మీ అంచనా లాభం రూపాయలు..." (Your estimated profit in rupees...)
6. "ఈ పథకానికి అవసరమైన పత్రాలను తనిఖీ చేయండి." (Check documents required for this scheme.)
7. "ఈ ఫోటో ఆధారంగా ఖచ్చితమైన వ్యాధి నిర్ధారణ చేయలేము." (We cannot confirm a disease from this photo alone.)
8. "వాయిస్ ప్రస్తుతం అందుబాటులో లేదు. క్రింది సూచనలను చదవవచ్చు." (Voice unavailable. You can read the instructions below.)
9. "ఇంటర్నెట్ కనెక్షన్ లేదు. మీ పరికరంలో సేవ్ చేసిన సమాచారం అందుబాటులో ఉంది." (No internet. Saved data available on device.)
10. "ఇంకా పంటలు జోడించలేదు. నా మొదటి పంటను జోడించండి." (No crops added yet. Add my first crop.)
