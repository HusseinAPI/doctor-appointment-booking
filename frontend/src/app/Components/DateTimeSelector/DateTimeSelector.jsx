import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function DateTimeSelector({
  dates,
  setOpen,
  setScheduleDate,
  notAvailable,
}) {
  const times = ['10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:00'];

  // Set date that send to Appointments Form

  const handleSetDateandTime = (day, time) => {
    dayjs.extend(customParseFormat);
    const input = day.slice(4);
    const currentYear = dayjs().year();

    const parsed = dayjs(`${input} ${currentYear}`, 'D MMM YYYY');

    const date = parsed.format('YYYY-MM-DD');

    const result = date + ' ' + time;
    setScheduleDate(result);
  };

  // Check appointments not available

  let isOut;

  const checkAvailable = (day, time, index) => {
    dayjs.extend(customParseFormat);
    const input = day.slice(4);
    const currentYear = dayjs().year();

    const parsed = dayjs(`${input} ${currentYear}`, 'D MMM YYYY');

    const date = parsed.format('YYYY-MM-DD');

    const result = date + ' ' + time;

    isOut = notAvailable.map((appoint) => {
      if (appoint === result) {
        return index;
      }
      return false;
    });
  };

  return (
    <div className="bg-white w-full flex flex-wrap p-10">
      <h2 className="text-xl font-medium w-full mb-4 md:ml-12">
        Choose Date and Time
      </h2>
      <div className="flex justify-center flex-wrap w-9/12 sm:ml-12 rounded-xl bg-gray-200 border border-gray-200 shadow">
        <div className="w-full hidden lg:flex justify-between text-white font-medium bg-blue-600 rounded-t-xl p-2 px-4">
          <div className="w-12 h-9" />
          {dates.slice(0, 5).map((day, index) => (
            <span key={index} className="text-center w-15 hidden lg:inline">
              {day}
            </span>
          ))}
          <div className="w-12 h-9" />
        </div>
        <div className="w-full md:w-3/4 mx-auto text-white font-medium rounded-b-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row ;g:justify-between gap-4 py-5">
            {dates.map((day, dayIdx) => (
              <div key={dayIdx} className="w-full md:w-auto">
                <div className="text-center text-sm lg:hidden text-white mb-2 bg-blue-600 p-2 rounded-md">
                  {day}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {times.map((time, timeIdx) => {
                    checkAvailable(day, time, timeIdx);
                    const isDisabled = isOut.includes(timeIdx);

                    return (
                      <button
                        key={`${dayIdx}-${timeIdx}`}
                        className={`w-24 md:w-28 py-1 text-sm md:text-base rounded-lg transition 
                  ${
                    isDisabled
                      ? 'bg-red-600 border border-red-600 text-white opacity-70 cursor-not-allowed'
                      : 'bg-white border text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer'
                  }`}
                        onClick={() => {
                          handleSetDateandTime(day, time);
                          setOpen(true);
                        }}
                        disabled={isDisabled}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
