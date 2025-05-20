import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function ConfirmDeletePopup({
  deleteConfirm,
  setDeleteConfirm,
  itemToDelete,
  actionToDispatch,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const hanldeDeleteDoctor = () => {
    if (itemToDelete) {
      dispatch(actionToDispatch(itemToDelete));
      setDeleteConfirm(false);
    } else {
      dispatch(actionToDispatch());
      setDeleteConfirm(false);
      router.push('/auth/signin');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,160,255,0.8)] transition-opacity duration-300 ${
        deleteConfirm ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setDeleteConfirm(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Action Delete?
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want this action, cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteConfirm(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              hanldeDeleteDoctor();
              setDeleteConfirm(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
