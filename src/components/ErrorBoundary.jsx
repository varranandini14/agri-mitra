import React from 'react';
import Button from './Button.jsx';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AgriMitra caught an unhandled error:', error, errorInfo);
  }

  handleReset() {
    window.localStorage.clear();
    window.location.href = '/';
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg, #f2eddf)',
            color: 'var(--text, #1c3120)',
            padding: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: 'var(--surface, #ffffff)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              border: '1px solid var(--border, #cfe0c8)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🌾</div>
            <h2 style={{ margin: '0 0 0.5rem', color: 'var(--primary, #1b5e32)' }}>
              AgriMitra · రైతు సహాయకుడు
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted, #4d5a50)', marginBottom: '1.25rem' }}>
              అప్లికేషన్ లోడ్ చేయడంలో చిన్న అంతరాయం ఏర్పడింది. దయచేసి పేజీని రీలోడ్ చేయండి.
              <br />
              <span style={{ fontSize: '0.9rem' }}>
                (A temporary issue occurred while loading. Please reload the page.)
              </span>
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  background: '#1b5e32',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                🔄 Reload Page (రీలోడ్ చేయండి)
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  background: 'transparent',
                  color: '#b55238',
                  border: '1px solid #b55238',
                  borderRadius: '10px',
                  padding: '0.75rem 1.25rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Reset Saved Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
