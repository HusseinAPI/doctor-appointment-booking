'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import doctor101 from '../../../../public/doctor101.jpg';
import doctor102 from '../../../../public/doctor102.jpg';
import doctor103 from '../../../../public/doctor103.avif';
import doctor104 from '../../../../public/doctor104.jpg';
import doctor105 from '../../../../public/doctor105.avif';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';

export default function DoctorsMangement() {
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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[738px] rounded-l-2xl">
      <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="flex justify-between w-1/2 p-6">
          <div className="relative w-3/4 md:w-1/3">
            <Search
              className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search doctor..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex mb-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition">
              <Plus size={16} />
              Add Doctor
            </button>
          </div>
        </div>
        <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {filteredDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col items-center"
            >
              <Image
                src={doc.image}
                alt={doc.name}
                width={64}
                height={64}
                className="rounded-full mb-3"
              />
              <h3 className="font-semibold text-center">{doc.name}</h3>
              <p className="text-sm text-gray-600 text-center">
                {doc.specialty}
              </p>
              <p className="text-sm text-gray-500 text-center">
                {doc.location}
              </p>
              <div
                className={`mt-3 px-3 py-1 text-sm font-medium rounded-full ${doc.buttonColor}`}
              >
                {doc.specialty}
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                  <Pencil size={14} />
                  Edit
                </button>
                <button className="flex items-center gap-1 text-sm text-red-500 hover:underline">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
