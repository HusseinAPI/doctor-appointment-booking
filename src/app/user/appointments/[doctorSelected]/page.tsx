'use client';
import React, { useState } from 'react';
import doctor102 from '../../../../../public/doctor102.jpg';
import Image from 'next/image';
import dayjs from 'dayjs';

const page = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day();
  const endDay = endOfMonth.day();

  const blanksBefore = Array(startDay === 0 ? 6 : startDay - 1).fill('');

  const blanksAfter = Array(endDay === 0 ? 0 : -endDay + 7).fill('');

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const allCells = [...blanksBefore, ...days, ...blanksAfter];

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));

  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  return (
    <div className="h-[738px] rounded-l-2xl">
      <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="bg-gray-50 p-6 flex justify-around flex-col md:flex-row gap-8">
          {/* Doctor Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 w-1/2">
            <div className="flex items-center gap-4">
              <Image
                src={doctor102.src}
                alt="doctor"
                className="rounded-full w-20 h-20 object-cover"
                width={0}
                height={0}
              />
              <div>
                <h2 className="text-lg font-semibold">Dr. Alexander Kimon</h2>
                <p className="text-sm text-gray-500">General Dentist</p>
              </div>
            </div>
            <p className="mt-4 text-sm italic text-gray-600">
              Best dental appointment I have had in years, seriously. I would
              highly...
            </p>
          </div>

          {/* Calendar */}
          <div className="bg-amber-300 rounded-2xl shadow-md p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrevMonth} className="text-xl text-white">
                &lt;
              </button>
              <h3 className="text-lg font-semibold text-white">
                {currentDate.format('MMMM') + ' ' + currentDate.year()}
              </h3>
              <button onClick={handleNextMonth} className="text-xl text-white">
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-medium text-white">
              {weekdays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 mt-2 text-center">
              {allCells.map((val, i) => {
                const isWeekend =
                  val &&
                  [0, 6].includes(
                    dayjs(
                      new Date(currentDate.year(), currentDate.month(), val)
                    ).day()
                  );
                return (
                  <div
                    key={i}
                    className={`rounded-lg p-2 h-10 flex items-center justify-center ${
                      val
                        ? isWeekend
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 hover:bg-amber-600 hover:text-white'
                        : 'bg-amber-200 text-transparent'
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full h-72 bg-amber-300"></div>
      </div>
    </div>
  );
};

export default page;
