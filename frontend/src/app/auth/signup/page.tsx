'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { FaHospital } from 'react-icons/fa6';
import { GiMicroscope } from 'react-icons/gi';
import { HiClipboardList } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { signUp } from '@/app/redux/userSlice';

const SignUp = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const dateOfBirth = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPass = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInfo = {
      name: name.current?.value,
      email: email.current?.value,
      phone: phone.current?.value,
      dateOfBirth: dateOfBirth.current?.value,
      password: password.current?.value,
      role: 'patient',
    };
    if (
      typeof userInfo.name === 'string' &&
      typeof userInfo.email === 'string' &&
      typeof userInfo.phone === 'string' &&
      typeof userInfo.dateOfBirth === 'string' &&
      typeof userInfo.password === 'string' &&
      userInfo.name.length > 0 &&
      userInfo.email.length > 0 &&
      userInfo.phone.length > 0 &&
      userInfo.dateOfBirth.length > 0 &&
      userInfo.password.length > 0 &&
      confirmPass.current?.value.length > 0
    ) {
      dispatch(signUp(userInfo));
      name.current.value = '';
      email.current.value = '';
      phone.current.value = '';
      dateOfBirth.current.value = '';
      password.current.value = '';
    }
  };

  return (
    <div className="flex justify-center w-full my-20 p-8">
      <div className="hidden lg:flex flex-col justify-center rounded-l-lg bg-gradient-to-r from-blue-900 to-blue-600 text-white p-10 space-y-6">
        <div className="flex">
          <div className="w-20 h-20 ">
            <FaHospital className="w-16 h-16" />
          </div>
          <div className="ml-1">
            <h2 className="text-xl font-semibold">Appointment booking</h2>
            <p className="text-sm opacity-80 mt-2">
              Book your medical appointment quickly and securely.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-20 h-20 ">
            <GiMicroscope className="w-16 h-16" />
          </div>
          <div className="ml-1">
            <h2 className="text-xl font-semibold">lab Test Scheduling</h2>
            <p className="text-sm opacity-80 mt-2">
              Schedule lab test appointments with ease.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-20 h-20 ">
            <HiClipboardList className="w-16 h-16" />
          </div>
          <div className="ml-1">
            <h2 className="text-xl font-semibold">Manage Appointment</h2>
            <p className="text-sm opacity-80 mt-2">
              Manage and track your upcoming medical appointments.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-10 rounded-r-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6">
          Sign up as <span className="text-blue-600">Medical Center</span>
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border rounded-lg"
            ref={name}
          />

          <input
            type="text"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg"
            ref={email}
          />
          <input
            type="text"
            placeholder="Enter your role phone"
            className="w-full p-3 border rounded-lg"
            ref={phone}
          />
          <input
            type="date"
            placeholder="Enter your date of bith"
            className="w-full p-3 border rounded-lg"
            ref={dateOfBirth}
          />

          <div className="flex space-x-4">
            <input
              type="password"
              placeholder="Enter password"
              className="w-1/2 p-3 border rounded-lg"
              ref={password}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-1/2 p-3 border rounded-lg"
              ref={confirmPass}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="w-4 h-4" />
            <label htmlFor="terms" className="text-sm">
              I agree with all
              <span className="text-blue-600">
                {' '}
                Terms and Conditions
              </span> and{' '}
              <span className="text-blue-600">Privacy Policies</span>.
            </label>
          </div>

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link
            href="/auth/signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            {' '}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
