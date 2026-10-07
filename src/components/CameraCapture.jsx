import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';

/**
 * CameraCapture — Real live camera interface using navigator.mediaDevices.getUserMedia()
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides:
 *  - Live camera stream in <video> element
 *  - Rear/environment camera preference on mobile with fallback to default video
 *  - Clean webcam access on desktop/laptop
 *  - Immediate stream shutdown (track.stop()) on capture, cancel, or unmount
 *  - Canvas snapshot conversion into a real File + Blob
 *  - Farmer-friendly error messages (NotAllowedError, NotFoundError, etc.)
 *  - Fully accessible with visible focus and keyboard navigation
 */
export default function CameraCapture({
  onCapture,
  onCancel,
  onOpenGallery,
  language = 'en',
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [cameraError, setCameraError] = useState('');
  const [canCapture, setCanCapture] = useState(false);

  // Stop all active media tracks cleanly
  function stopStream() {
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
      } catch (err) {
        console.warn('Error stopping stream tracks:', err);
      }
      streamRef.current = null;
    }
  }

  // Get localized error message
  function getErrorMessage(error) {
    const name = error?.name || '';
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
      return language === 'te'
        ? 'కెమెరా అనుమతి తిరస్కరించబడింది. దయచేసి మీ బ్రౌజర్ సెట్టింగ్స్‌లో కెమెరాను అనుమతించి మళ్లీ ప్రయత్నించండి.'
        : language === 'hi'
        ? 'कैमरा अनुमति अस्वीकार कर दी गई। कृपया ब्राउज़र सेटिंग्स में कैमरा चालू करें और पुनः प्रयास करें।'
        : 'Camera permission was denied. Please allow camera access in your browser and try again.';
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      return language === 'te'
        ? 'ఈ పరికరంలో కెమెరా కనుగొనబడలేదు.'
        : language === 'hi'
        ? 'इस डिवाइस पर कोई कैमरा नहीं मिला।'
        : 'No camera was found on this device.';
    }
    if (name === 'NotReadableError' || name === 'TrackStartError') {
      return language === 'te'
        ? 'కెమెరాను ఇప్పటికే మరొక యాప్ ఉపయోగిస్తోంది. దయచేసి ఇతర యాప్‌లను మూసివేయండి.'
        : language === 'hi'
        ? 'कैमरा वर्तमान में किसी अन्य ऐप द्वारा उपयोग में है। कृपया अन्य ऐप बंद करें।'
        : 'Camera is currently being used by another application.';
    }
    if (name === 'SecurityError') {
      return language === 'te'
        ? 'కెమెరా భద్రతా కారణాల వల్ల బ్లాక్ చేయబడింది (HTTPS లేదా localhost అవసరం).'
        : language === 'hi'
        ? 'सुरक्षा कारणों से कैमरा ब्लॉक किया गया है (HTTPS या localhost आवश्यक)।'
        : 'Camera requires a secure context (HTTPS or localhost).';
    }
    return language === 'te'
      ? 'కెమెరాను ప్రారంభించలేకపోయాము. దయచేసి మీ కెమెరాను తనిఖీ చేయండి లేదా గ్యాలరీని ఉపయోగించండి.'
      : language === 'hi'
      ? 'कैमरा शुरू करने में असमर्थ। कृपया कैमरा जांचें या गैलरी का उपयोग करें।'
      : 'Unable to start camera. Please verify device camera or upload from gallery.';
  }

  // Start camera on mount
  useEffect(() => {
    let active = true;

    async function initCamera() {
      setIsLoading(true);
      setCameraError('');

      if (!navigator?.mediaDevices?.getUserMedia) {
        setCameraError(
          language === 'te'
            ? 'ఈ బ్రౌజర్‌లో కెమెరా సదుపాయం అందుబాటులో లేదు.'
            : language === 'hi'
            ? 'इस ब्राउज़र में कैमरा समर्थित नहीं है।'
            : 'Camera is not supported in this browser.'
        );
        setIsLoading(false);
        return;
      }

      // First attempt: Prefer rear/environment camera on mobile
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (firstErr) {
        console.warn('Initial camera constraint failed, falling back to basic video:', firstErr);
        // Fallback attempt: Basic video: true (standard webcam or any camera)
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });

          if (!active) {
            fallbackStream.getTracks().forEach((t) => t.stop());
            return;
          }

          streamRef.current = fallbackStream;
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
          }
        } catch (fallbackErr) {
          if (!active) return;
          console.error('All camera attempts failed:', fallbackErr);
          setCameraError(getErrorMessage(fallbackErr));
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
    }

    initCamera();

    return () => {
      active = false;
      stopStream();
    };
  }, [language]);

  // Handle capture frame to canvas
  function handleCapture() {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

      // Convert to Blob and File
      canvas.toBlob(
        (blob) => {
          stopStream();
          if (blob) {
            const fileName = `crop-capture-${Date.now()}.jpg`;
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            onCapture(file, dataUrl);
          } else {
            // Fallback with dataUrl
            onCapture(null, dataUrl);
          }
        },
        'image/jpeg',
        0.92
      );
    } catch (err) {
      console.error('Failed to capture frame from video:', err);
      setCameraError(
        language === 'te'
          ? 'ఫోటో తీయడంలో లోపం జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.'
          : language === 'hi'
          ? 'फोटो खींचने में समस्या आई। कृपया पुनः प्रयास करें।'
          : 'Failed to capture photo frame. Please try again.'
      );
    }
  }

  // Handle user cancellation
  function handleCancel() {
    stopStream();
    onCancel?.();
  }

  return (
    <div
      className="camera-capture-card"
      style={{
        border: '2px solid var(--primary)',
        borderRadius: '16px',
        background: 'var(--surface)',
        padding: '1.25rem',
        boxShadow: '0 8px 24px rgba(27, 94, 59, 0.15)',
        marginBottom: '1rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📷 {language === 'te' ? 'లైవ్ కెమెరా ప్రివ్యూ' : language === 'hi' ? 'लाइव कैमरा प्रीव्यू' : 'Live Camera Viewfinder'}
        </h3>
        <Button size="sm" variant="ghost" onClick={handleCancel} aria-label="Close camera">
          ✕ {language === 'te' ? 'రద్దు చేయి' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
        </Button>
      </div>

      {/* Camera Live Viewfinder Box */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          margin: '0 auto',
          aspectRatio: '4 / 3',
          background: '#0c1a11',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border)',
        }}
      >
        {/* Loading Spinner */}
        {isLoading && !cameraError && (
          <div style={{ color: '#FAF8EF', textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⏳</div>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              {language === 'te' ? 'కెమెరాను ప్రారంభిస్తున్నాము...' : language === 'hi' ? 'कैमरा शुरू हो रहा है...' : 'Connecting to camera...'}
            </p>
          </div>
        )}

        {/* Error Notice */}
        {cameraError && (
          <div
            style={{
              padding: '1.25rem',
              textAlign: 'center',
              color: '#ffebee',
              maxWidth: '90%',
            }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>⚠️</div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.92rem', lineHeight: 1.5, color: '#ffcdd2' }}>
              {cameraError}
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setCameraError('');
                  setIsLoading(true);
                  // Retrigger
                  window.location.reload();
                }}
              >
                🔄 {language === 'te' ? 'మళ్లీ ప్రయత్నించు' : language === 'hi' ? 'पुनः प्रयास' : 'Retry'}
              </Button>
              {onOpenGallery && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    handleCancel();
                    onOpenGallery();
                  }}
                >
                  📁 {language === 'te' ? 'గ్యాలరీ నుండి ఎంచుకో' : language === 'hi' ? 'गैलरी से चुनें' : 'Upload from Gallery'}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Live Video Feed */}
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          onCanPlay={() => setCanCapture(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: !isLoading && !cameraError ? 'block' : 'none',
          }}
        />

        {/* Framing Crosshair Overlay (Leaf focus guide) */}
        {!isLoading && !cameraError && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '16px',
              border: '2px dashed rgba(244, 196, 48, 0.65)',
              borderRadius: '8px',
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                background: 'rgba(27, 94, 59, 0.85)',
                color: '#FAF8EF',
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
              }}
            >
              🌿 {language === 'te' ? 'ఆకు/తెగులును ఇక్కడ ఉంచండి' : language === 'hi' ? 'पत्ती को केंद्र में रखें' : 'Align leaf inside frame'}
            </span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Button
          type="button"
          variant="primary"
          onClick={handleCapture}
          disabled={!canCapture || isLoading || Boolean(cameraError)}
          style={{
            fontSize: '1.05rem',
            padding: '10px 24px',
            boxShadow: '0 4px 14px rgba(27, 94, 59, 0.3)',
          }}
        >
          📸 {language === 'te' ? 'ఫోటో తీయి' : language === 'hi' ? 'फोटो खींचें' : 'Capture Photo'}
        </Button>

        <Button type="button" variant="secondary" onClick={handleCancel}>
          {language === 'te' ? 'రద్దు' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
        </Button>

        {onOpenGallery && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              handleCancel();
              onOpenGallery();
            }}
          >
            📁 {language === 'te' ? 'గ్యాలరీ' : language === 'hi' ? 'गैलरी' : 'Switch to Gallery'}
          </Button>
        )}
      </div>
    </div>
  );
}
