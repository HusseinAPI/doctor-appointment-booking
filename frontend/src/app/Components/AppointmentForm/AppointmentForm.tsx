import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { bookAppointment } from '@/app/redux/userSlice';

export default function AppointmentForm({
  isOpen,
  setOpen,
  scheduleDate,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleDate: string;
}) {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const dateOfBirth = useRef(null);
  const phone = useRef(null);
  const [haveInsurance, setInsurance] = useState<string>('no');

  const dispatch = useDispatch();

  const handleBookingAppointment = () => {
    const data = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      dateOfBirth: dateOfBirth.current.value,
      email: email.current.value,
      phone: phone.current.value,
      haveInsurance,
      date: scheduleDate,
    };

    if (
      data.firstName.length > 0 &&
      data.lastName.length > 0 &&
      data.dateOfBirth.length > 0 &&
      data.email.length > 0 &&
      data.phone.length > 0 &&
      data.haveInsurance.length > 0 &&
      data.date.length > 0
    ) {
      dispatch(bookAppointment(data));
      setOpen(false);
      firstName.current.value = '';
      lastName.current.value = '';
      dateOfBirth.current.value = '';
      email.current.value = '';
      phone.current.value = '';
    }
  };

  const dateSelected = dayjs(scheduleDate);

  const dayName = dateSelected.format('dddd');
  const dayNum = dateSelected.format('DD');
  const month = dateSelected.format('MMMM');
  const time =
    Number(scheduleDate.slice(11, 13)) < 11
      ? `${scheduleDate.slice(11)} am`
      : `${scheduleDate.slice(11)} pm`;

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
                ref={firstName}
              />
              <input
                type="text"
                placeholder="Last"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
                ref={lastName}
              />
            </div>

            <div className="flex gap-4">
              <span className="w-1/2 font-medium">Date of Birth:</span>
            </div>
            <div className="flex gap-4">
              <input
                type="date"
                placeholder="your birth date"
                className="w-full p-3 border border-gray-300 rounded-lg"
                ref={dateOfBirth}
              />
            </div>

            <div className="flex gap-4">
              <span className="w-1/2 font-medium">Email address:</span>
              <span className="w-1/2 font-medium">Phone number:</span>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="youremail@"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
                ref={email}
              />
              <input
                type="tel"
                placeholder="(+961) ________"
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
                ref={phone}
              />
            </div>

            <div className="flex items-center gap-4">
              <span>Do you have insurance?</span>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="insurance"
                  className="accent-blue-600"
                  onChange={() => setInsurance('yes')}
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="insurance"
                  defaultChecked
                  className="accent-blue-600"
                  onChange={() => setInsurance('no')}
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
              <button
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-800 transition"
                onClick={() => handleBookingAppointment()}
              >
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
              <p className="text-blue-600 font-semibold">{dayName}</p>
              <p className="text-xl font-bold text-gray-800 mt-2">
                {`${dayNum} ${month}`}
              </p>
              <p className="text-lg text-gray-600 mt-1">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
