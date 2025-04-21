export default function AppointmentForm({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,160,255,0.8)] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`bg-white w-full max-w-5xl p-8 rounded-lg shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-blue-600 text-3xl">PATIENT</span> DETAILS
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex gap-4">
              <span className="font-medium">Your name:</span>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Last"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-4">
              <span className="font-medium">Date of birth:</span>
            </div>
            <input
              type="date"
              placeholder="Date of birth"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
            />

            <div className="flex gap-4">
              <span className="w-1/2 font-medium">Email address:</span>
              <span className="w-1/2 font-medium">Phone number:</span>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="youremail@"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="tel"
                placeholder="(+961) ________"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center gap-4">
              <span>Do you have insurance?</span>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="insurance"
                  className="accent-blue-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="insurance"
                  defaultChecked
                  className="accent-blue-600"
                />
                No
              </label>
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 accent-blue-600"
              />
              <span>
                I agree to the{' '}
                <span className="text-blue-600 font-semibold">
                  Medical Center Terms of Use
                </span>{' '}
                and to receive electronic communications from Dental Clinic
              </span>
            </label>

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-800 transition">
                CONFIRM
              </button>
              <button
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg mt-4 hover:bg-red-800 transition"
                onClick={() => setOpen(!isOpen)}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg text-center shadow">
              <p className="text-blue-600 font-semibold">Thursday</p>
              <p className="text-xl font-bold text-gray-800 mt-2">
                13 February
              </p>
              <p className="text-lg text-gray-600 mt-1">12:30 pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
