interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({ onConfirm, onClose }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px]">
        <h2 className="text-lg font-bold mb-4">Delete Product?</h2>
        <p className="text-sm mb-6">Are you sure? This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
