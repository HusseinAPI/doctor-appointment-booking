'use client';
import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DoctorCard from '../../../Components/DoctorCard/DoctorCard';
import Calendar from '../../../Components/Calendar/Calendar';
import DateTimeSelector from '../../../Components/DateTimeSelector/DateTimeSelector';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string>(
    currentDate.format('D')
  );

  const times = ['10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:00'];

  const defaultAndUpdateDates = (date: Dayjs) => {
    return Array.from({ length: 10 }, (_, i) => date.add(i, 'day'))
      .filter((d) => d.day() !== 0 && d.day() !== 6)
      .slice(0, 5)
      .map((d) => d.format('ddd D MMM'));
  };

  const [dates, setDates] = useState<string[]>(
    defaultAndUpdateDates(currentDate)
  );

  useEffect(() => {
    setDates(defaultAndUpdateDates(currentDate));
  }, []);

  const handleSelectDay = (day: number) => {
    const selectDay = dayjs(
      new Date(currentDate.year(), currentDate.month(), day)
    );
    setSelectedDate(selectDay.format('D'));
    setDates(defaultAndUpdateDates(selectDay));
  };

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
      <DateTimeSelector dates={dates} times={times} />
    </div>
  );
}
