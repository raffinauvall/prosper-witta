"use client";

interface ApprovedNotificationProps {
  show: boolean;
  onClose?: () => void;
}

export default function ApprovedNotification({ show, onClose }: ApprovedNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[200px]">
      <span>✅ Access approved by admin!</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 font-bold hover:text-gray-200 transition"
        >
          ×
        </button>
      )}
    </div>
  );
}
