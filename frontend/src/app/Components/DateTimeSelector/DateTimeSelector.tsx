import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function DateTimeSelector({
  dates,
  setOpen,
  setScheduleDate,
  notAvailable,
}: {
  dates: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setScheduleDate;
  notAvailable: string[];
}) {
  const times = ['10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:00'];

  // Set date that send to Appointments Form

  const handleSetDateandTime = (day: string, time: string) => {
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
              {times.map((time, index) => {
                checkAvailable(day, time, index);
                return (
                  <div className="m-2" key={index}>
                    <div className="flex flex-wrap flex-col w-1/6">
                      <button
                        className={`w-35 py-1 text-base rounded-lg ${
                          isOut.includes(index)
                            ? 'bg-red-600 border border-red-600 text-white opacity-80 cursor-not-allowed'
                            : 'bg-white border text-blue-600 border-blue-600  hover:bg-blue-600 hover:text-white  cursor-pointer'
                        }`}
                        onClick={() => {
                          handleSetDateandTime(day, time);
                          setOpen(true);
                        }}
                        disabled={isOut.includes(index) ? true : false}
                      >
                        {time}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
