'use client';
import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DoctorCard from '../../../Components/DoctorCard/DoctorCard';
import Calendar from '../../../Components/Calendar/Calendar';
import DateTimeSelector from '../../../Components/DateTimeSelector/DateTimeSelector';
import AppointmentForm from '../../../Components/AppointmentForm/AppointmentForm';
import { useDispatch } from 'react-redux';
import { userStayLogged } from '@/app/redux/userSlice';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStayLogged());
  }, []);

  // default and update dates function

  const defaultAndUpdateDates = (date: Dayjs) => {
    return Array.from({ length: 10 }, (_, i) => date.add(i, 'day'))
      .filter((d) => d.day() !== 0 && d.day() !== 6)
      .slice(0, 5)
      .map((d) => d.format('ddd D MMM'));
  };

  const [dates, setDates] = useState<string[]>(
    defaultAndUpdateDates(currentDate)
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    currentDate.format('D')
  );

  // default display dates of today

  useEffect(() => {
    setDates(defaultAndUpdateDates(currentDate));
  }, []);

  // select day in calendar

  const handleSelectDay = (day: number) => {
    const selectDay = dayjs(
      new Date(currentDate.year(), currentDate.month(), day)
    );
    setSelectedDate(selectDay.format('D'));
    setDates(defaultAndUpdateDates(selectDay));
  };

  // display form of book a appointment

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="rounded-l-2xl fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
      <div className="bg-white p-6 flex justify-around flex-col md:flex-row gap-8">
        <DoctorCard />
        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDay}
          onNextMonth={() => setCurrentDate(currentDate.add(1, 'month'))}
          onPrevMonth={() => setCurrentDate(currentDate.subtract(1, 'month'))}
        />
      </div>
      <DateTimeSelector dates={dates} setOpen={setOpen} />
      <AppointmentForm isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
}
