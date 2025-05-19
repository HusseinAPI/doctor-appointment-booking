'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, userStayLogged } from '@/app/redux/userSlice';
import { checkIsAdmin, deleteAppointment } from '@/app/redux/adminSlice';
import { useRouter } from 'next/navigation';
import { getDoctors } from '@/app/redux/doctorSlice';
import ConfirmMessage from '@/app/Components/ConfirmMessage/ConfirmMessage';

export default function AppointmentsMangement() {
  const theRole = useSelector((state) => state.adminSlice.theRole);
  const appointments = useSelector((state) => state.userSlice.appointments);
  const doctors = useSelector((state) => state.doctorSlice.doctors);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStayLogged());
    dispatch(checkIsAdmin());
    dispatch(getDoctors());
    dispatch(fetchAppointments('all'));
  }, []);

  // Search appointment

  const [search, setSearch] = useState('');

  const filtered = appointments.filter(
    (app) =>
      app.firstName.toLowerCase().includes(search.toLowerCase()) ||
      app.lastName.toLowerCase().includes(search.toLowerCase())
  );

  // Delete appointment

  const [deleteConfirm, setDeleteConfirm] = useState<boolean>();
  const [appointId, setAppointId] = useState();

  useEffect(() => {
    dispatch(fetchAppointments('all'));
  }, [deleteConfirm]);

  return (
    theRole && (
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
              <button
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition"
                onClick={() => router.push('/user/appointments')}
              >
                <Plus size={16} />
                Add Appointment
              </button>
            </div>

            <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((appointment, index) => {
                const doctor = doctors.find(
                  (doc) => doc.id === appointment.doctorId
                );

                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col"
                  >
                    <h3 className="font-semibold text-lg">
                      {appointment.firstName + ' ' + appointment.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Doctor: {doctor ? doctor.name : 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date & Time: {appointment.dateOfAppointment.slice(0, 10)}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                        onClick={() => {
                          setDeleteConfirm(true);
                          setAppointId(appointment.id);
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ConfirmMessage
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            itemToDelete={appointId}
            actionToDispatch={deleteAppointment}
          />
        </div>
      </div>
    )
  );
}
