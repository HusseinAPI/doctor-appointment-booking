'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DoctorCard from '../../../Components/DoctorCard/DoctorCard';
import Calendar from '../../../Components/Calendar/Calendar';
import DateTimeSelector from '../../../Components/DateTimeSelector/DateTimeSelector';
import AppointmentForm from '../../../Components/AppointmentForm/AppointmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments, userStayLogged } from '@/app/redux/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import { getSelectedDoctor } from '@/app/redux/doctorSlice';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const doctorSelected = useSelector(
    (state) => state.doctorSlice.doctorSelected
  );
  const appointments = useSelector((state) => state.userSlice.appointments);

  const dispatch = useDispatch();
  const router = useRouter();

  const pathDoctor = decodeURIComponent(usePathname().split('/').pop());
  const path = usePathname();

  useEffect(() => {
    dispatch(userStayLogged());
    dispatch(getSelectedDoctor(pathDoctor));
    if (!isLogged) {
      localStorage.setItem('lastPath', path);
      router.push('/auth/signin');
    }
  }, []);

  useEffect(() => {
    if (doctorSelected?.id) {
      dispatch(fetchAppointments(doctorSelected.id));
    }
  }, []);

  // Check date in list of days and times if available

  const [notAvailable, setNotAvailable] = useState([]);

  useEffect(() => {
    const appointmentFormat = appointments.map((app) =>
      app.dateOfAppointment.slice(0, 16)
    );
    setNotAvailable(appointmentFormat);
  }, [appointments]);

  // default and update dates function

  const defaultAndUpdateDates = (date) => {
    return Array.from({ length: 10 }, (_, i) => date.add(i, 'day'))
      .filter((d) => d.day() !== 0 && d.day() !== 6)
      .slice(0, 5)
      .map((d) => d.format('ddd D MMM'));
  };

  const [dates, setDates] = useState(defaultAndUpdateDates(currentDate));
  const [selectedDate, setSelectedDate] = useState(currentDate.format('D'));

  // default display dates of today

  useEffect(() => {
    setDates(defaultAndUpdateDates(currentDate));
  }, [currentDate]);

  // select day in calendar

  const handleSelectDay = (day) => {
    const selectDay = dayjs(
      new Date(currentDate.year(), currentDate.month(), day)
    );
    if (!selectDay.isBefore(dayjs())) {
      setSelectedDate(selectDay.format('D'));
      setDates(defaultAndUpdateDates(selectDay));
    }
  };

  // display form of book a appointment

  const [isOpen, setOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');

  useEffect(() => {
    if (doctorSelected?.id) {
      dispatch(fetchAppointments(doctorSelected.id));
    }
  }, [isOpen, dispatch, doctorSelected]);

  return (
    isLogged && (
      <div className="rounded-l-2xl fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="bg-white p-6 flex flex-wrap justify-around gap-8">
          <DoctorCard doctorSelected={doctorSelected} />
          <Calendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDay}
            onNextMonth={() => setCurrentDate(currentDate.add(1, 'month'))}
            onPrevMonth={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          />
        </div>
        <DateTimeSelector
          dates={dates}
          setOpen={setOpen}
          setScheduleDate={setScheduleDate}
          notAvailable={notAvailable}
        />
        <AppointmentForm
          isOpen={isOpen}
          setOpen={setOpen}
          scheduleDate={scheduleDate}
        />
      </div>
    )
  );
}
