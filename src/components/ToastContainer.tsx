// src/components/ToastContainer.tsx
import React from 'react';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface Props {
  toasts: Toast[];
}

const ToastContainer: React.FC<Props> = ({ toasts }) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3 z-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast show text-white bg-${toast.type === 'error' ? 'danger' : toast.type} align-items-center border-0 mb-2`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={toast.onClose}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
