const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast toast-top toast-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`alert ${
            toast.type === 'success' ? 'alert-success' : 
            toast.type === 'error' ? 'alert-error' : 
            'alert-info'
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;