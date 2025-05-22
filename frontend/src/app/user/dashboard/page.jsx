'use client';
import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import profImage from '../../../../public/about.png';
import { useDispatch, useSelector } from 'react-redux';
import { userStayLogged, fetchUserAppointments } from '@/app/redux/userSlice';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';

const Dashboard = () => {
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const name = useSelector((state) => state.userSlice.name);
  const appointments = useSelector((state) => state.userSlice.appointments);

  const userAppointments = appointments.userAppointments || [];
  const doctors = appointments.doctors || [];

  const doctorMap = doctors.reduce((map, doctor) => {
    map[doctor.id] = {
      name: doctor.name,
      specialization: doctor.specialization,
    };
    return map;
  }, {});

  const dispatch = useDispatch();
  const router = useRouter();

  const path = usePathname();

  useEffect(() => {
    dispatch(userStayLogged());
    dispatch(fetchUserAppointments());
    if (!isLogged) {
      localStorage.setItem('lastPath', path);
      router.push('/auth/signin');
    }
  }, []);

  const previousAppointments = userAppointments.filter((app) =>
    dayjs(app.dateOfAppointment).isBefore(dayjs())
  );

  return (
    isLogged && (
      <div className="h-[738px] rounded-l-2xl ">
        <div className="fixed left-20 rounded-4xl bg-blue-100 w-full h-[740px] overflow-y-scroll">
          <div className="flex justify-between items-center w-1/2 m-6">
            <input
              type="text"
              placeholder="Search appointments..."
              className="px-4 py-2 rounded-xl border bg-white border-gray-300 w-80"
            />
          </div>

          <div className="bg-white rounded-2xl w-8/12 sm:w-1/2 m-6">
            <div className="flex justify-between items-center p-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Good Morning, <span className="text-yellow-500">{name}</span>
                </h2>
                <p className="text-gray-500">Have a nice day</p>
              </div>
              <Image
                src={profImage}
                alt="Doctor"
                width={0}
                height={0}
                className="w-24 h-24"
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold mx-6 my-2">
            Previous Appointments
          </h2>
          <div className="bg-white p-5 rounded-xl shadow mx-6 w-8/12 sm:w-9/12 md:w-10/12">
            <ul>
              {previousAppointments.length === 0 ? (
                <li className="text-gray-500">No Previous Appointments</li>
              ) : (
                previousAppointments.map((previousApp, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">
                        {doctorMap[previousApp.doctorId]?.name || 'Not found'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctorMap[previousApp.doctorId]?.specialization ||
                          'Not found'}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{previousApp.dateOfAppointment.slice(0, 10)}</p>
                      <p>{previousApp.dateOfAppointment.slice(11, 16)}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="m-6">
            <h3 className="text-lg font-semibold mb-2">My appointments</h3>
            {userAppointments.map((appointments, index) => {
              const date = dayjs(appointments.dateOfAppointment);
              const today = dayjs();

              if (!date.isBefore(today))
                return (
                  <div
                    key={index}
                    className="rounded-xl mb-2 w-10/12 md:w-11/12 bg-white hover:bg-indigo-600 hover:text-white transition"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base">
                          {appointments.firstName + ' ' + appointments.lastName}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base">
                        Doctor:
                        {' ' + doctorMap[appointments.doctorId].name ||
                          'Not found'}
                      </p>
                      <p className="text-sm sm:text-base">
                        {appointments.dateOfAppointment.slice(0, 10)}
                      </p>
                      <p className="text-sm sm:text-base">
                        {appointments.dateOfAppointment.slice(11, 16)}
                      </p>
                      <CheckCircle className="text-white" />
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
