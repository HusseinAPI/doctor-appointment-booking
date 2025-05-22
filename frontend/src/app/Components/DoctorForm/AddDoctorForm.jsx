import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addDoctor } from '@/app/redux/adminSlice';

export default function AddDoctorForm({ addFormOpen, setAddFormOpen }) {
  const nameRef = useRef(null);
  const specializationRef = useRef(null);
  const ratingRef = useRef(null);
  const locationRef = useRef(null);
  const imageUrlRef = useRef(null);
  const bioRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const doctorData = {
      name: nameRef.current.value,
      specialization: specializationRef.current.value,
      rating: parseInt(ratingRef.current.value, 10),
      location: locationRef.current.value,
      buttonColor: 'text-green-100',
      imageUrl: imageUrlRef.current.value,
      bio: bioRef.current.value,
    };

    if (
      doctorData.name.length > 0 &&
      doctorData.specialization &&
      doctorData.rating > 0 &&
      doctorData.location.length &&
      doctorData.imageUrl.length &&
      doctorData.bio.length
    ) {
      dispatch(addDoctor(doctorData));
      setAddFormOpen(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,160,255,0.8)] transition-opacity duration-300 ${
        addFormOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setAddFormOpen(false)}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
        <div className="space-y-4">
          <input
            ref={nameRef}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            ref={specializationRef}
            placeholder="Specialization"
            className="w-full p-2 border rounded"
          />
          <input
            ref={ratingRef}
            type="number"
            placeholder="Rating"
            className="w-full p-2 border rounded"
          />
          <input
            ref={locationRef}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            ref={imageUrlRef}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
          <textarea
            ref={bioRef}
            placeholder="Bio"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddFormOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
