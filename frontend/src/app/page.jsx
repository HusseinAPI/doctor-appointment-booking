'use client';
import doctorImg from '../../public/doctor.png';
import about from '../../public/about.png';
import { FaUserDoctor } from 'react-icons/fa6';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { FcIdea } from 'react-icons/fc';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDoctors } from './redux/doctorSlice';
import { userStayLogged } from './redux/userSlice';
import { useRouter } from 'next/navigation';

export default function Home() {
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const doctors = useSelector((state) => state.doctorSlice.doctors);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getDoctors());
    dispatch(userStayLogged());
  }, []);

  useEffect(() => {
    if (isLogged) {
      router.push('/user/dashboard');
    }
  }, [isLogged]);

  return (
    <>
      <div
        id="home"
        className="flex bg-gradient-to-r from-blue-900 to-blue-600 w-full h-[500px]"
      >
        <div className="flex justify-center w-1/2 mt-64 sm:mt-20 md:mt-40 lg:mt-48 xl:mt-14">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <path
              fill="#FFFFFF"
              d="M46.2,-79.8C60.2,-71.9,72.1,-60.2,79.1,-46.3C86.1,-32.3,88.2,-16.2,88.2,0C88.3,16.2,86.2,32.4,79.4,46.7C72.6,60.9,61,73.4,47,81.6C33,89.9,16.5,94,0.2,93.6C-16.1,93.3,-32.2,88.5,-45.8,80C-59.4,71.5,-70.4,59.3,-78,45.3C-85.6,31.4,-89.7,15.7,-89.9,-0.1C-90,-15.9,-86.2,-31.7,-78.7,-45.8C-71.2,-59.9,-60,-72.3,-46.3,-80.3C-32.6,-88.3,-16.3,-92,-0.1,-91.8C16.1,-91.7,32.2,-87.7,46.2,-79.8Z"
              transform="translate(100 100)"
            />
            <image
              href={doctorImg.src}
              x="-15"
              y="10"
              width="250"
              height="250"
            />
          </svg>
        </div>
        <div className="mt-24 w-1/2  text-teal-50">
          <h1 className=" text-4xl sm:text-5xl md:text-6xl font-bold">
            The Best Reliable <br />
            Medical Service
          </h1>
          <span className="text-base md:text-lg lg:text-lg mt-2 block">
            Stay on top of your health by connecting with
            <br /> your doctor and easily schelduling a check-up
          </span>
          <button className="bg-yellow-50 hover:bg-yellow-200 text-blue-700 mt-4 px-2 sm:px-5 py-2 rounded-md transition">
            Make an Appointment
          </button>
        </div>
      </div>
      <div className="text-center m-10">
        <h2 className="text-3xl font-bold">How it Works?</h2>
        <span className="text-gray-500 font-medium">
          4 steps to get your solution
        </span>
      </div>
      <div className="flex flex-wrap justify-around content-between m-5">
        <div className="w-55 h-30 mt-5 flex justify-center flex-wrap">
          <FaUserDoctor className="w-8 h-8 text-neutral-700" />
          <span className="w-full text-xl text-center font-medium">
            Search Doctor
          </span>
          <span className="w-full text-gray-500 text-center font-medium">
            Keeping you healthy is our high periority
          </span>
        </div>
        <div className="w-55 h-30 mt-5 flex justify-center flex-wrap">
          <FaUserDoctor className="w-8 h-8 text-neutral-700" />
          <span className="w-full text-xl text-center font-medium">
            Select Doctor
          </span>
          <span className="w-full text-gray-500 text-center font-medium">
            Choose doctor from our list of many doctors
          </span>
        </div>
        <div className="w-55 h-30 mt-5 flex justify-center flex-wrap">
          <RiCalendarScheduleLine className="w-8 h-8 text-neutral-700" />
          <span className="w-full text-xl text-center font-medium">
            Schedule Appointment
          </span>
          <span className="w-full text-gray-500 text-center font-medium">
            Schedule an appointment with variable dates
          </span>
        </div>
        <div className="w-55 h-30 mt-5 flex justify-center flex-wrap">
          <FcIdea className="w-8 h-8 text-neutral-700" />
          <span className="w-full text-xl text-center font-medium">
            Get Solution
          </span>
          <span className="w-full text-gray-500 text-center font-medium">
            Get best solution for your requirements
          </span>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between">
        <div className="flex justify-center w-full sm:w-1/2 mt-20 md:mt-40 lg:mt-48 xl:mt-14">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs></defs>
            <path
              fill="#E8DAFF"
              d="M45.2,-63.6C58,-53,67.3,-38.9,73,-23.3C78.7,-7.6,80.9,9.7,76.7,25.7C72.6,41.6,62.1,56.3,48.2,65C34.4,73.8,17.2,76.6,-0.4,77.2C-18.1,77.8,-36.1,76.2,-48.5,67C-60.8,57.8,-67.5,40.9,-73.4,23.6C-79.3,6.3,-84.4,-11.4,-81.8,-28.7C-79.1,-46.1,-68.7,-63.1,-53.7,-73C-38.8,-82.9,-19.4,-85.7,-1.6,-83.5C16.2,-81.3,32.5,-74.2,45.2,-63.6Z"
              transform="translate(100 100)"
            />
            <image href={about.src} x="15" y="9" width="180" height="180" />
          </svg>
        </div>
        <div
          id="aboutUs"
          className="flex justify-center items-center flex-wrap sm:mt-50 xl:mt-20 w-full sm:w-1/2"
        >
          <h1 className="px-20 sm:px-0 text-5xl w-full font-bold">About Us</h1>
          <span className="w-full px-20 sm:px-0 py-10 sm:py-0  text-2xl sm:text-base md:text-xl lg:text-2xl sm:mt-5 pb-20">
            At Medical Center, we make healthcare more accessible by connecting
            you with top doctors effortlessly. Our platform provides a simple
            and reliable way to book medical appointments, ensuring timely
            consultations with trusted professionals. We are committed to
            offering a seamless booking experience, a network of certified
            doctors, and complete privacy and security for your health data.
            Whether you need a consultation, a follow-up, or a specialist visit,
            Medical Center is here for you anytime, anywhere. Your health is our
            priority, and we are dedicated to making healthcare easier and more
            convenient for everyone.
          </span>
        </div>
      </div>
      <div className="flex justify-center sm:justify-between items-center flex-wrap w-full p-20">
        <h1 className="text-5xl w-full font-bold">Doctor</h1>
        {doctors.map((doctor, index) => {
          if (index < 5) {
            return (
              <div
                key={index}
                className="w-3/5 sm:w-max bg-white shadow-lg rounded-2xl mt-5 p-5 flex flex-col items-center"
              >
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${doctor.buttonColor}`}
                >
                  {doctor.specialization}
                </span>
                <h3 className="text-xl font-semibold mt-2">{doctor.name}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <span className="text-sm">⭐ ({doctor.rating})</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">{doctor.location}</p>
                <button className="mt-4 px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                  Book An Appointment
                </button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
