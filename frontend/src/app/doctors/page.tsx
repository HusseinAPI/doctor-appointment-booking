'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../redux/doctorSlice';

const Doctors = () => {
  const doctors = useSelector((state) => state.doctorSlice.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  const [filter, setFilter] = useState<string>('All');

  const specialties = [
    'All',
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors =
    filter === 'All'
      ? doctors
      : doctors.filter((doctor) => doctor.specialization === filter);

  return (
    <div className="w-full p-10">
      <div className="flex justify-center sm:justify-start mb-5 mt-10">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-blue-600 text-blue-600 rounded-lg focus:ring focus:ring-blue-300"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center sm:justify-between items-center flex-wrap w-full">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="w-3/5 sm:w-max bg-white shadow-lg rounded-2xl mt-5 p-5 flex flex-col items-center"
            >
              <Image
                src={`${doctor.image_url}`}
                alt={doctor.name}
                width={200}
                height={200}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${doctor.buttonColor}`}
              >
                {doctor.specialization}
              </span>
              <h3 className="text-xl font-semibold mt-2">{doctor.name}</h3>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <span className="text-sm">⭐ ({doctor.rating})</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">{doctor.location}</p>
              <button className="mt-4 px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Book An Appointment
              </button>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-600">
            No doctors found for this specialty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
