import dayjs, { Dayjs } from 'dayjs';

export default function Calendar({
  currentDate,
  selectedDate,
  onSelectDate,
  onNextMonth,
  onPrevMonth,
}: {
  currentDate: Dayjs;
  selectedDate: string;
  onSelectDate: (day: number) => void;
  onNextMonth: () => void;
  onPrevMonth: () => void;
}) {
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

  return (
    <div className="bg-blue-600 rounded-2xl shadow-md p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrevMonth} className="text-xl text-white">
          ‹
        </button>
        <h3 className="text-lg font-semibold text-white">
          {currentDate.format('MMMM YYYY')}
        </h3>
        <button onClick={onNextMonth} className="text-xl text-white">
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-white">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2 text-center">
        {allCells.map((val, i) => {
          const isSelected = Number(selectedDate) === val;
          const isWeekend =
            val &&
            [0, 6].includes(
              dayjs(
                new Date(currentDate.year(), currentDate.month(), val)
              ).day()
            );

          const baseClass =
            'rounded-lg p-2 h-10 flex items-center justify-center';

          let styleClass = '';

          if (!val) {
            styleClass = 'bg-gray-400 text-transparent';
          } else if (isWeekend) {
            styleClass = 'bg-gray-400 text-gray-500 cursor-not-allowed';
          } else {
            styleClass =
              'bg-white text-gray-800 hover:bg-amber-600 hover:text-white';
          }

          if (isSelected) {
            styleClass = 'bg-amber-600 text-white';
          }

          return (
            <div
              key={i}
              className={`${baseClass} ${styleClass}`}
              onClick={() => val && !isWeekend && onSelectDate(val)}
            >
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
}
