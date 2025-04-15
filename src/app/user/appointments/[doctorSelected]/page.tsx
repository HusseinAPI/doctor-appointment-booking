'use client';
import React, { useState, useEffect } from 'react';
import doctor from '../../../../../public/doctor104.jpg';
import Image from 'next/image';
import dayjs, { Dayjs } from 'dayjs';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const Page = () => {
  // calendar setting

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

  // default days of the week

  useEffect(() => {
    const today = dayjs();

    defaultAndUpdateDates(today);
  }, []);

  // select day from calendar

  const handleSelectDay = (day: number) => {
    const selectDay = dayjs(
      new Date(currentDate.year(), currentDate.month(), day)
    );

    defaultAndUpdateDates(selectDay);
  };

  // default and update dates function

  const [dates, setDates] = useState<string[]>([]);

  const defaultAndUpdateDates = (date: Dayjs) => {
    const Date = date;

    const Dates = Array.from({ length: 10 }, (_, i) => Date.add(i, 'day'))
      .filter((date) => date.day() !== 0 && date.day() !== 6)
      .slice(0, 5)
      .map((date) => date.format('ddd D MMM'));

    setDates(Dates);
  };

  const times = ['10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:00'];

  return (
    <div className="rounded-l-2xl">
      <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="bg-white p-6 flex justify-around flex-col md:flex-row gap-8">
          {/* Doctor Card */}
          <div className="flex bg-white rounded-2xl shadow-md p-6 w-1/2">
            <div className="flex items-center w-9/12">
              <Image
                src={doctor.src}
                alt="doctor"
                className="rounded-xl w-96 h-80"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-wrap p-2">
              <div className="w-full">
                <h2 className="text-lg font-semibold">Dr. Alexander Kimon</h2>
                <span className="text-sm text-gray-500">General Dentist</span>
              </div>
              <span className="text-sm italic text-gray-600">
                Best dental appointment I have had in years, seriously. I would
                highly...
              </span>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-blue-600 rounded-2xl shadow-md p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrevMonth} className="text-xl text-white">
                <MdArrowBackIos />
              </button>
              <h3 className="text-lg font-semibold text-white">
                {currentDate.format('MMMM') + ' ' + currentDate.year()}
              </h3>
              <button onClick={handleNextMonth} className="text-xl text-white">
                <MdArrowForwardIos />
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
                          ? 'bg-gray-400 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-gray-800 hover:bg-amber-600 hover:text-white'
                        : 'bg-gray-400 text-transparent'
                    }`}
                    onClick={() =>
                      val ? (!isWeekend ? handleSelectDay(val) : null) : null
                    }
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*Date and Time*/}
        <div className="bg-white w-full flex flex-wrap p-10">
          <h2 className="text-xl font-medium w-full mb-4 ml-12">
            Choose Date and Time
          </h2>
          <div className="flex justify-center flex-wrap w-9/12 ml-12 rounded-xl bg-gray-200 border border-gray-200 shadow">
            <div className="w-full flex justify-between text-white font-medium bg-blue-600 rounded-t-xl p-2 px-4">
              <div className="w-12 h-9" />
              {dates.map((day, index) => (
                <span key={index} className="text-center w-15">
                  {day}
                </span>
              ))}
              <div className="w-12 h-9" />
            </div>
            <div className="w-3/4 flex justify-between text-white font-medium rounded-b-xl">
              {dates.map((day, index) => (
                <div key={index}>
                  {times.map((time, index) => (
                    <div className="m-2" key={index}>
                      <div className="flex flex-wrap flex-col w-1/6">
                        <button className="w-35 py-1 text-base rounded-lg bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white  cursor-pointer">
                          {time}
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 h-full border-r border-gray-200" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
