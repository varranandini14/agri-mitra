import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useVoiceAssistant — AgriMitra Voice Engine
 *
 * Key improvements over the previous version:
 *  1. Waits for browser voices to load asynchronously (onvoiceschanged).
 *  2. Picks the best available voice per language using a priority-ranked list.
 *  3. Falls back gracefully when a preferred voice is absent.
 *  4. Splits long text into short, sentence-sized utterances so farmers can follow.
 *  5. Rate = 0.82 (comfortable for Indian farmers), pitch = 1.0, volume = 1.0.
 *  6. Cancels ongoing speech when the language changes.
 *  7. Exposes `currentVoiceName` and `lastSpokenText` for the UI to display.
 *  8. Cleans up properly on component unmount.
 */
export function useVoiceAssistant({ language = 'en', onCommand, toast }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [currentVoiceName, setCurrentVoiceName] = useState('');
  const [lastSpokenText, setLastSpokenText] = useState('');
  const [speechRate, setSpeechRate] = useState(0.82);

  const rateRef = useRef(0.82);
  const recognitionRef = useRef(null);
  const utteranceQueueRef = useRef([]); // queue of sentence strings
  const speakingRef = useRef(false);    // avoid React stale-closure isSpeaking
  const prevLangRef = useRef(language);

  // ─── Browser support flags ────────────────────────────────────────────────
  const supported = {
    tts: typeof window !== 'undefined' && 'speechSynthesis' in window,
    stt:
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
  };

  // ─── BCP-47 locale map ────────────────────────────────────────────────────
  const getLangCode = useCallback((lang) => {
    if (lang === 'te') return 'te-IN';
    if (lang === 'hi') return 'hi-IN';
    return 'en-IN';
  }, []);

  // ─── Load voices (async-safe) ─────────────────────────────────────────────
  useEffect(() => {
    if (!supported.tts) return;

    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoices(v);
      }
    }

    // First synchronous attempt (works in Firefox, Safari)
    loadVoices();

    // Async event for Chrome / Edge (voices arrive after page load)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Cancel speech when language changes ──────────────────────────────────
  useEffect(() => {
    if (prevLangRef.current !== language) {
      prevLangRef.current = language;
      if (supported.tts) {
        window.speechSynthesis.cancel();
        utteranceQueueRef.current = [];
        speakingRef.current = false;
        setIsSpeaking(false);
        setLastSpokenText('');
      }
    }
  }, [language, supported.tts]);

  // ─── Voice selection logic ─────────────────────────────────────────────────
  /**
   * Returns the best available SpeechSynthesisVoice for the given BCP-47 locale.
   * Prioritizes high quality / natural / Google / neural voices matching the locale.
   */
  const pickVoice = useCallback(
    (targetLang) => {
      if (!voices || voices.length === 0) return null;

      if (targetLang === 'te-IN') {
        const teVoices = voices.filter(
          (v) =>
            v.lang.toLowerCase().replace('_', '-') === 'te-in' ||
            v.lang.toLowerCase().startsWith('te') ||
            v.name.toLowerCase().includes('telugu')
        );
        if (teVoices.length > 0) {
          return (
            teVoices.find((v) => /natural|neural|online|google/i.test(v.name)) ||
            teVoices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'te-in') ||
            teVoices[0]
          );
        }
        return null;
      }

      if (targetLang === 'hi-IN') {
        const hiVoices = voices.filter(
          (v) =>
            v.lang.toLowerCase().replace('_', '-') === 'hi-in' ||
            v.lang.toLowerCase().startsWith('hi') ||
            v.name.toLowerCase().includes('hindi')
        );
        if (hiVoices.length > 0) {
          return (
            hiVoices.find((v) => /natural|neural|online|google/i.test(v.name)) ||
            hiVoices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'hi-in') ||
            hiVoices[0]
          );
        }
        return null;
      }

      // English — prefer Indian English, then British, then US
      const enInVoices = voices.filter(
        (v) =>
          v.lang.toLowerCase().replace('_', '-') === 'en-in' ||
          v.name.toLowerCase().includes('india')
      );
      if (enInVoices.length > 0) {
        return (
          enInVoices.find((v) => /natural|neural|online|google/i.test(v.name)) ||
          enInVoices[0]
        );
      }

      return (
        voices.find((v) => /natural|neural|online|google/i.test(v.name) && v.lang.toLowerCase().startsWith('en')) ||
        voices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'en-gb') ||
        voices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'en-us') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
        null
      );
    },
    [voices]
  );

  // ─── Text cleaning (strip emojis, URLs, parenthetical annotations) ─────────
  function cleanTextForSpeech(text, targetLang) {
    if (!text) return '';
    let cleaned = text
      // 1. Remove URLs
      .replace(/https?:\/\/\S+/g, '')
      // 2. Remove all emoji characters so TTS doesn't read emoji names in English
      .replace(/\p{Extended_Pictographic}/gu, ' ')
      // 3. Handle currency and units according to language
      .replace(/₹\s*(\d+)/g, (_, num) => {
        if (targetLang === 'te-IN') return `${num} రూపాయలు `;
        if (targetLang === 'hi-IN') return `${num} रुपये `;
        return `${num} rupees `;
      })
      .replace(/రూ\.\s*(\d+)/g, (_, num) => `${num} రూపాయలు `)
      .replace(/రూ\./g, targetLang === 'te-IN' ? ' రూపాయలు ' : ' rupees ')
      .replace(/[₹$€£]/g, targetLang === 'te-IN' ? ' రూపాయలు ' : targetLang === 'hi-IN' ? ' रुपये ' : ' rupees ')
      // 4. Expand percentage symbols
      .replace(/(\d+)%/g, (_, num) => {
        if (targetLang === 'te-IN') return `${num} శాతం `;
        if (targetLang === 'hi-IN') return `${num} प्रतिशत `;
        return `${num} percent `;
      })
      .replace(/%/g, targetLang === 'te-IN' ? ' శాతం ' : targetLang === 'hi-IN' ? ' प्रतिशत ' : ' percent ')
      // 5. Expand rate slashes like "రూ./క్వింటాల్" or "₹/q"
      .replace(/\/(క్వింటాల్|క్వింటాలు)/gi, ' ప్రతి క్వింటాలుకు ')
      .replace(/\/q/gi, ' per quintal ')
      .replace(/&amp;/g, ' and ')
      .replace(/&/g, ' and ')
      // 6. Remove English parenthetical annotations from Telugu/Hindi text (e.g. "(Save)", "(Done)")
      .replace(/\s*\([a-zA-Z\s,./-]{1,25}\)\s*/g, ' ')
      .replace(/\s*\(en\)\s*/gi, '')
      // 7. Replace decorative chars with pauses
      .replace(/[→←↑↓•●◆★|/\\~^]/g, ', ')
      .replace(/[#@*_`]/g, '')
      // 8. Normalize spacing
      .replace(/\s{2,}/g, ' ')
      .trim();

    return cleaned;
  }

  // ─── Split long text into sentence-sized chunks ───────────────────────────
  function splitIntoSentences(text) {
    // Split on: . ! ? ; or newlines or Telugu/Hindi danda (।)
    const raw = text
      .split(/(?<=[.!?;\n])\s+|(?<=।)\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const chunks = [];
    for (const sentence of raw) {
      if (sentence.length <= 180) {
        chunks.push(sentence);
      } else {
        // Further split long sentences on commas or conjunction pauses
        const parts = sentence.split(/,\s+/);
        let current = '';
        for (const part of parts) {
          if ((current + ', ' + part).length > 160) {
            if (current) chunks.push(current.trim());
            current = part;
          } else {
            current = current ? current + ', ' + part : part;
          }
        }
        if (current) chunks.push(current.trim());
      }
    }
    return chunks.length > 0 ? chunks : [text];
  }

  // ─── Speak a single utterance from the queue ─────────────────────────────
  const speakNextInQueue = useCallback(
    (targetLang, voice) => {
      if (utteranceQueueRef.current.length === 0) {
        speakingRef.current = false;
        setIsSpeaking(false);
        return;
      }

      const sentence = utteranceQueueRef.current.shift();
      const utt = new SpeechSynthesisUtterance(sentence);
      utt.lang = targetLang;
      // Rate is configurable (default ~0.82 for clear Indian speech)
      utt.rate = rateRef.current || 0.82;
      utt.pitch = 1.0;
      utt.volume = 1.0;

      if (voice) utt.voice = voice;

      utt.onstart = () => {
        speakingRef.current = true;
        setIsSpeaking(true);
      };

      utt.onend = () => {
        // Speak next sentence in queue
        speakNextInQueue(targetLang, voice);
      };

      utt.onerror = (e) => {
        // 'interrupted' fires when we cancel intentionally — ignore it
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        console.warn('SpeechSynthesis error:', e.error);
        speakingRef.current = false;
        setIsSpeaking(false);
      };

      try {
        window.speechSynthesis.speak(utt);
      } catch (err) {
        console.warn('speechSynthesis.speak() threw:', err);
        speakingRef.current = false;
        setIsSpeaking(false);
      }
    },
    [] // stable; refs are used for state
  );

  // ─── Public speak() function ──────────────────────────────────────────────
  const speak = useCallback(
    (text, overrideLang) => {
      if (!supported.tts) {
        if (toast) {
          const msg =
            language === 'te'
              ? 'ఈ బ్రౌజర్‌లో స్పీకర్ సౌకర్యం లేదు.'
              : language === 'hi'
              ? 'इस ब्राउज़र में ऑडियो उपलब्ध नहीं है।'
              : 'Audio is not supported in this browser.';
          toast(msg, 'info');
        }
        return;
      }
      if (!text || text.trim() === '') return;

      // Stop any ongoing speech first
      window.speechSynthesis.cancel();
      utteranceQueueRef.current = [];

      const targetLang = getLangCode(overrideLang || language);
      const voice = pickVoice(targetLang);

      // Update voice name for display
      setCurrentVoiceName(voice ? voice.name : '');

      // Telugu Fallback Requirement: If no genuine Telugu voice on device,
      // notify farmer clearly instead of reading Telugu text with English voice
      if (targetLang === 'te-IN' && !voice) {
        if (toast) {
          const msg =
            language === 'te'
              ? 'ఈ పరికరంలో తెలుగు వాయిస్ అందుబాటులో లేదు. మీరు స్క్రీన్‌పై ఉన్న సూచనలను చదువుకోవచ్చు.'
              : 'Telugu voice is not available on this device. You can continue reading the Telugu instructions on screen.';
          toast(msg, 'info');
        }
        return;
      }

      // Warn if no matching voice found for other languages
      if (!voice && toast) {
        const langLabel = targetLang === 'hi-IN' ? 'Hindi' : 'English (India)';
        const msg =
          language === 'hi'
            ? `${langLabel} आवाज उपलब्ध नहीं है। डिफ़ॉल्ट आवाज उपयोग हो रही है।`
            : `No ${langLabel} voice found. Using browser default.`;
        toast(msg, 'info');
      }

      const cleaned = cleanTextForSpeech(text, targetLang);
      const sentences = splitIntoSentences(cleaned);

      setLastSpokenText(cleaned);
      utteranceQueueRef.current = sentences;
      speakingRef.current = true;
      setIsSpeaking(true);

      speakNextInQueue(targetLang, voice);
    },
    [supported.tts, language, getLangCode, pickVoice, speakNextInQueue, toast]
  );

  // ─── Stop speaking ────────────────────────────────────────────────────────
  const stopSpeaking = useCallback(() => {
    if (supported.tts) {
      window.speechSynthesis.cancel();
      utteranceQueueRef.current = [];
      speakingRef.current = false;
      setIsSpeaking(false);
    }
  }, [supported.tts]);

  // ─── Speech Recognition (voice input) ────────────────────────────────────
  const startListening = useCallback(() => {
    if (!supported.stt) {
      const msg =
        language === 'te'
          ? 'ఈ బ్రౌజర్‌లో మైక్రోఫోన్ వాయిస్ రికగ్నిషన్ లేదు. బటన్లు వాడండి.'
          : language === 'hi'
          ? 'इस ब्राउज़र में माइक्रोफोन पहचान उपलब्ध नहीं। बटन उपयोग करें।'
          : 'Speech recognition not supported. Please use buttons.';
      if (toast) toast(msg, 'info');
      return;
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = getLangCode(language);
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        const msg =
          language === 'te'
            ? 'వింటున్నాము... మాట్లాడండి.'
            : language === 'hi'
            ? 'सुन रहे हैं... बोलिए।'
            : 'Listening... Speak now.';
        if (toast) toast(msg, 'info');
      };

      recognition.onresult = (event) => {
        const transcript =
          event.results[0]?.[0]?.transcript?.trim() || '';
        setIsListening(false);
        if (transcript && onCommand) {
          onCommand(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('SpeechRecognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          const msg =
            language === 'te'
              ? 'మైక్రోఫోన్ అనుమతి రాలేదు. బ్రౌజర్‌లో పర్మిషన్ ఆన్ చేయండి.'
              : language === 'hi'
              ? 'माइक्रोफोन की अनुमति नहीं मिली। ब्राउज़र सेटिंग जांचें।'
              : 'Microphone access denied. Allow mic permissions in browser.';
          if (toast) toast(msg, 'error');
        } else if (event.error !== 'no-speech') {
          if (toast)
            toast(
              language === 'te'
                ? `వాయిస్ లోపం: ${event.error}`
                : language === 'hi'
                ? `आवाज़ त्रुटि: ${event.error}`
                : `Voice error: ${event.error}`,
              'info'
            );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      setIsListening(false);
      if (toast) {
        const msg =
          language === 'te'
            ? 'మైక్రోఫోన్ మొదలు కాలేదు.'
            : language === 'hi'
            ? 'माइक्रोफोन शुरू नहीं हो सका।'
            : 'Could not start microphone.';
        toast(msg, 'error');
      }
    }
  }, [supported.stt, language, getLangCode, onCommand, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (supported.tts) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const replay = useCallback(() => {
    if (lastSpokenText) {
      speak(lastSpokenText);
    }
  }, [lastSpokenText, speak]);

  const setRate = useCallback((newRate) => {
    rateRef.current = newRate;
    setSpeechRate(newRate);
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    stopListening,
    isListening,
    supported,
    voices,          // expose for debug / display
    currentVoiceName,
    lastSpokenText,
    speechRate,
    setRate,
    replay,
  };
}
