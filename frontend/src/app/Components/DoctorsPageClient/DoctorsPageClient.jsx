'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { emptyAppointments, userStayLogged } from '@/app/redux/userSlice';
import { selectDoctor } from '@/app/redux/doctorSlice';
import { usePathname, useRouter } from 'next/navigation';

const DoctorPageClient = ({ doctors }) => {
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  const dispatch = useDispatch();
  const router = useRouter();

  const path = usePathname();

  useEffect(() => {
    dispatch(userStayLogged());
    dispatch(emptyAppointments());
    if (!isLogged) {
      localStorage.setItem('lastPath', path);
      router.push('/auth/signin');
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      router.push('/user/appointments');
    } else {
      router.push('/doctors');
    }
  }, [isLogged, router]);

  const [filter, setFilter] = useState('All');

  const specialties = [
    'All',
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors =
    filter === 'All'
      ? doctors
      : doctors.filter((doctor) => doctor.specialization === filter);

  const handleSelectDoctor = (doctor) => {
    dispatch(selectDoctor(doctor));
  };

  return (
    <div className={`${isLogged ? 'h-[738px]' : ''} rounded-l-2xl`}>
      <div
        className={`${
          isLogged ? 'fixed bg-blue-100' : ''
        } overflow-auto left-20 rounded-4xl  w-full h-[740px]`}
      >
        <div className="p-10 ml-10">
          <div className="flex justify-start mb-5 mt-10">
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

          <div className="flex justify-between items-center flex-wrap w-11/12">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <div
                  key={index}
                  className="w-max bg-white shadow-lg rounded-2xl mt-5 p-5 flex flex-col items-center"
                >
                  {doctor.imageUrl && doctor.imageUrl.trim() !== '' && (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      width={64}
                      height={64}
                      className="rounded-full mb-3"
                    />
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${doctor.buttonColor}`}
                  >
                    {doctor.specialization}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">{doctor.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <span className="text-sm">⭐ ({doctor.rating})</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {doctor.location}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition"
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    {isLogged ? (
                      <Link href={`/user/appointments/${doctor.name}`}>
                        Book An Appointment
                      </Link>
                    ) : (
                      <Link href={`/auth/signin`}>Book An Appointment</Link>
                    )}
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

export default DoctorPageClient;
