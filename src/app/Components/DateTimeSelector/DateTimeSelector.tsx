export default function DateTimeSelector({
  dates,
  times,
}: {
  dates: string[];
  times: string[];
}) {
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
              {times.map((time, index) => (
                <div className="m-2" key={index}>
                  <div className="flex flex-wrap flex-col w-1/6">
                    <button className="w-35 py-1 text-base rounded-lg bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white  cursor-pointer">
                      {time}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
