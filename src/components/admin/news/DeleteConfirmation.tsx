export default function DeleteConfirm({ title, onCancel, onConfirm }: any) {
  return (
    <div className="text-center space-y-4">
      <p>
        Delete <strong>{title}</strong>?
      </p>
      <div className="flex justify-center gap-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
}
