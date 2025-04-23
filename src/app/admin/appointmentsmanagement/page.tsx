'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Calendar } from 'lucide-react';

const appointments = [
  {
    patient: 'John Doe',
    doctor: 'Dr. Nahidul Islam',
    datetime: '2025-04-28 10:00 AM',
    status: 'Upcoming',
    statusColor: 'bg-blue-100 text-blue-600',
  },
  {
    patient: 'Emily Clarke',
    doctor: 'Dr. Roksana Louwis',
    datetime: '2025-04-25 3:30 PM',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-600',
  },
  {
    patient: 'Michael Smith',
    doctor: 'Dr. Towkib Tanvir',
    datetime: '2025-04-20 2:00 PM',
    status: 'Cancelled',
    statusColor: 'bg-red-100 text-red-600',
  },
];

export default function AppointmentsMangement() {
  const [search, setSearch] = useState('');

  const filtered = appointments.filter(
    (a) =>
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[738px] rounded-l-2xl">
      <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between w-1/2 mb-4 gap-4">
            <div className="relative md:w-1/3">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search appointment..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition">
              <Plus size={16} />
              Add Appointment
            </button>
          </div>

          <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col"
              >
                <h3 className="font-semibold text-lg">{item.patient}</h3>
                <p className="text-sm text-gray-600">Doctor: {item.doctor}</p>
                <p className="text-sm text-gray-500">
                  Date & Time: {item.datetime}
                </p>

                <div
                  className={`mt-3 px-3 py-1 text-sm font-medium rounded-full w-fit ${item.statusColor}`}
                >
                  {item.status}
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
    </div>
  );
}
