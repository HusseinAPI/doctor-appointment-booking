'use client';
import React, { useState } from 'react';
import doctor101 from '../../../../public/doctor101.jpg';
import doctor102 from '../../../..//public/doctor102.jpg';
import doctor103 from '../../../../public/doctor103.avif';
import doctor104 from '../../../../public/doctor104.jpg';
import doctor105 from '../../../../public/doctor105.avif';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const doctors = [
    {
      name: 'Dr. Nahidul Islam',
      specialty: 'Cardiology',
      rating: 124,
      location: 'Georgia, USA',
      buttonColor: 'bg-blue-100 text-blue-600',
      image: doctor101.src,
    },
    {
      name: 'Dr. Roksana Louwis',
      specialty: 'Hematology',
      rating: 124,
      location: 'Georgia, USA',
      buttonColor: 'bg-green-100 text-green-600',
      image: doctor102.src,
    },
    {
      name: 'Dr. Towkib Tanvir',
      specialty: 'Pulmonology',
      rating: 124,
      location: 'Georgia, USA',
      buttonColor: 'bg-teal-100 text-teal-600',
      image: doctor103.src,
    },
    {
      name: 'Dr. Nasai Eshal',
      specialty: 'Heart Diseases',
      rating: 124,
      location: 'Georgia, USA',
      buttonColor: 'bg-lime-100 text-lime-600',
      image: doctor104.src,
    },
    {
      name: 'Dr. Nasai Eshal',
      specialty: 'Heart Diseases',
      rating: 124,
      location: 'Georgia, USA',
      buttonColor: 'bg-lime-100 text-lime-600',
      image: doctor105.src,
    },
  ];

  const [filter, setFilter] = useState<string>('All');

  const specialties = [
    'All',
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

  const filteredDoctors =
    filter === 'All'
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === filter);

  return (
    <div className="h-[738px] rounded-l-2xl">
      <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="p-10 ml-30">
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

          <div className="flex justify-center sm:justify-between items-center flex-wrap w-5/6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <div
                  key={index}
                  className="w-4/5 sm:w-max bg-white shadow-lg rounded-2xl mt-5 p-5 flex flex-col items-center"
                >
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={200}
                    height={200}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${doctor.buttonColor}`}
                  >
                    {doctor.specialty}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">{doctor.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <span className="text-sm">⭐ ({doctor.rating})</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {doctor.location}
                  </p>
                  <button className="mt-4 px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition">
                    <Link href={`/user/appointments/${doctor.name}`}>
                      Book An Appointment
                    </Link>
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
      </div>
    </div>
  );
};

export default Page;
