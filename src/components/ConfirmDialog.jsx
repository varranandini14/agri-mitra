/* ============================================================
   ConfirmDialog — accessible confirmation modal.
   Used before destructive actions (delete, clear all).
   ============================================================ */
import Modal from './Modal.jsx';
import Button from './Button.jsx';

export default function ConfirmDialog({
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onClose,
  onCancel,
}) {
  const handleDismiss = onClose || onCancel || (() => {});

  return (
    <Modal title={title} onClose={handleDismiss}>
      <div className="confirm-dialog" style={{ padding: '0.5rem 0' }}>
        {message && <p style={{ fontSize: '1rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>{message}</p>}
        <div className="row" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
          <Button variant="secondary" onClick={handleDismiss}>
            {cancelLabel}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            onClick={() => {
              if (onConfirm) onConfirm();
              handleDismiss();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
