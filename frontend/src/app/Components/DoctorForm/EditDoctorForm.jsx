import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editDoctor } from '@/app/redux/adminSlice';
import { toast } from 'react-toastify';

export default function EditDoctorForm({
  editFormOpen,
  setEditFormOpen,
  editableData,
}) {
  const nameRef = useRef(null);
  const specializationRef = useRef(null);
  const ratingRef = useRef(null);
  const locationRef = useRef(null);
  const imageUrlRef = useRef(null);
  const bioRef = useRef(null);

  const dispatch = useDispatch();

  const handleEditDoctor = async () => {
    const doctorData = {
      id: editableData.id,
      name: nameRef.current.value,
      specialization: specializationRef.current.value,
      rating: parseInt(ratingRef.current.value, 10),
      location: locationRef.current.value,
      buttonColor: 'text-green-100',
      imageUrl: imageUrlRef.current.value,
      bio: bioRef.current.value,
    };

    if (
      doctorData.id &&
      doctorData.name.length > 0 &&
      doctorData.specialization &&
      doctorData.rating > 0 &&
      doctorData.location.length &&
      doctorData.imageUrl.length &&
      doctorData.bio.length
    ) {
      try {
        await dispatch(editDoctor(doctorData)).unwrap();
        toast.success('Edit Doctor Successfully');

        setEditFormOpen(false);
      } catch (error) {
        toast.error('Edit Doctor Failed');
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,160,255,0.8)] transition-opacity duration-300 ${
        editFormOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setEditFormOpen(false)}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Doctor</h2>
        <div className="space-y-4">
          <input
            ref={nameRef}
            defaultValue={editableData?.name}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            ref={specializationRef}
            defaultValue={editableData?.specialization}
            placeholder="Specialization"
            className="w-full p-2 border rounded"
          />
          <input
            ref={ratingRef}
            type="number"
            defaultValue={editableData?.rating}
            placeholder="Rating"
            className="w-full p-2 border rounded"
          />
          <input
            ref={locationRef}
            defaultValue={editableData?.location}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            ref={imageUrlRef}
            defaultValue={editableData?.imageUrl}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
          <textarea
            ref={bioRef}
            defaultValue={editableData?.bio}
            placeholder="Bio"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditFormOpen(false)}
              className="px-4 py-2 bg-red-500 text-amber-200 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleEditDoctor}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
