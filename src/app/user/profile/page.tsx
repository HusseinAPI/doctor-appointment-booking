'use client';
import React, { useState } from 'react';
import { Download, File, Pencil } from 'lucide-react';
import Image from 'next/image';
import profile from '../../../../public/doctor103.avif';

export default function Profile() {
  const [isEdited, setEdited] = useState<boolean>(false);
  return (
    <div className="rounded-l-2xl">
      <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
          <div className="p-6 bg-white rounded-2xl shadow w-11/12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center space-x-4">
              <Image
                src={profile}
                alt="Maria Waston"
                width={100}
                height={100}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-600"
              />
              <div>
                {isEdited ? (
                  <div className="m-2">
                    <span>Name:</span>
                    <input className="px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm" />
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold text-blue-600">
                    Mrs. Maria Waston
                  </h2>
                )}
                <br />
                {isEdited ? (
                  <div className="m-2">
                    <span>Email:</span>
                    <input className="px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm" />
                  </div>
                ) : (
                  <p className="text-gray-600">mariawaston2022@gmail.com</p>
                )}
                {isEdited ? (
                  <button className="mt-5 m-2 px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-red-600 hover:text-white transition flex items-center gap-1">
                    <File className="w-4 h-4" /> Save Information
                  </button>
                ) : (
                  <button className="mt-2 px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition flex items-center gap-1">
                    <Pencil className="w-4 h-4" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
            {isEdited ? (
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Sex:</span>{' '}
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Age:</span>{' '}
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Blood:</span>{' '}
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Department:</span>{' '}
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Registered Date:</span>{' '}
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Appointment:</span>{' '}
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
                <p>
                  <span className="font-medium">Bed Number:</span>{' '}
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Sex:</span> Female
                </p>
                <p>
                  <span className="font-medium">Age:</span> 28
                </p>
                <p>
                  <span className="font-medium">Blood:</span> A+
                </p>
                <p>
                  <span className="font-medium">Status:</span>{' '}
                  <span className="text-green-600">Active</span>
                </p>
                <p>
                  <span className="font-medium">Department:</span> Cardiology
                </p>
                <p>
                  <span className="font-medium">Registered Date:</span> 20 Jan,
                  2023
                </p>
                <p>
                  <span className="font-medium">Appointment:</span> 35
                </p>
                <p>
                  <span className="font-medium">Bed Number:</span> #0365
                </p>
              </div>
            )}
          </div>

          {/* Vitals */}
          <div className="w-11/12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: 'BMI (Body Mass Index)',
                value: '22.5',
                status: 'Healthy',
              },
              {
                label: 'Heart rate',
                value: '7 hrs',
                status: 'Well Rested',
                highlight: 'text-red-600',
              },
              { label: 'Water Intake', value: '2.5 L', status: 'Adequate' },
              {
                label: 'Cholesterol',
                value: '85 mg/dl',
                status: 'In the norm',
              },
            ].map((vital) => (
              <div
                key={vital.label}
                className="bg-white text-center p-5 rounded-2xl shadow border-t-4 border-blue-600"
              >
                <p className="text-gray-500 text-sm uppercase font-semibold tracking-wide">
                  {vital.label}
                </p>
                <p
                  className={`text-2xl font-extrabold my-1 ${
                    vital.highlight || 'text-gray-800'
                  }`}
                >
                  {vital.value}
                </p>
                <p
                  className={`text-xs font-medium ${
                    vital.highlight || 'text-green-600'
                  }`}
                >
                  {vital.status}
                </p>
              </div>
            ))}
          </div>

          {/* History Table */}
          <div className="bg-white rounded-2xl shadow w-11/12 p-4 overflow-x-auto">
            <h3 className="text-lg font-bold text-blue-600 mb-4">
              Patient History
            </h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-xs">
                  <th className="p-2">Date Of Visit</th>
                  <th className="p-2">Diagnosis</th>
                  <th className="p-2">Severity</th>
                  <th className="p-2">Total Visits</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Documents</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: '20 Jan, 2023',
                    diagnosis: 'Malaria',
                    severity: 'High',
                    visits: 2,
                    status: 'Under Treatment',
                    statusColor: 'bg-red-600 text-white',
                  },
                  {
                    date: '12 Jan, 2022',
                    diagnosis: 'Viral Fever',
                    severity: 'Low',
                    visits: 1,
                    status: 'Cured',
                    statusColor: 'bg-blue-600 text-white',
                  },
                  {
                    date: '20 Jan, 2021',
                    diagnosis: 'Covid 19',
                    severity: 'High',
                    visits: 6,
                    status: 'Cured',
                    statusColor: 'bg-blue-600 text-white',
                  },
                ].map((record, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-5">{record.date}</td>
                    <td className="p-5">{record.diagnosis}</td>
                    <td className="p-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.severity === 'High'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-400 text-white'
                        }`}
                      >
                        {record.severity}
                      </span>
                    </td>
                    <td className="p-2">{record.visits}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${record.statusColor}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="flex items-center gap-1 text-blue-600 hover:underline">
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
