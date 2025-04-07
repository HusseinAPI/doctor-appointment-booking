import React from 'react';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import profImage from '../../../../public/about.png';

const Dashboard = () => {
  return (
    <div className="h-[738px] rounded-l-2xl">
      <div className="fixed left-20 rounded-4xl bg-blue-100 w-full h-full">
        <div className="flex justify-between items-center w-1/2 m-6">
          <input
            type="text"
            placeholder="Search appointments..."
            className="px-4 py-2 rounded-xl border bg-white border-gray-300 w-80"
          />
          <div className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            <button className="bg-primary text-white flex items-center gap-2">
              <UserPlus size={16} /> Add Patients
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl w-1/2 m-6">
          <div className="flex justify-between items-center p-6">
            <div>
              <h2 className="text-xl font-semibold">
                Good Morning, <span className="text-yellow-500">Mr. Smith</span>
              </h2>
              <p className="text-gray-500">Have a nice day at work</p>
            </div>
            <Image
              src={profImage}
              alt="Doctor"
              width={0}
              height={0}
              className="w-24 h-24"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mx-6 my-2">
          Previous Appointments
        </h2>
        <div className="bg-white p-5 rounded-xl shadow mx-6 mb-6 w-10/12">
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2 my-6">
              <div>
                <p className="font-medium">Dr. Omar Khaled</p>
                <p className="text-sm text-gray-600">Cardiologist</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>05 March 2025</p>
                <p>02:00 PM</p>
              </div>
            </li>
            <li className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Dr. Layla Fathy</p>
                <p className="text-sm text-gray-600">Pediatrician</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>22 Feb 2025</p>
                <p>11:00 AM</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="m-6">
          <h3 className="text-lg font-semibold mb-2">My appointments</h3>
          <div className="rounded-xl mb-2 w-11/12 bg-white hover:bg-indigo-600 hover:text-white transition">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  width={0}
                  height={0}
                  src={profImage}
                  alt="David"
                  className="rounded-full w-8 h-8"
                />
                <span>David Laid</span>
              </div>
              <p>New York</p>
              <p>25 Jun 2020</p>
              <p>01:00 PM</p>
              <AlertCircle className="text-red-500" />
            </div>
          </div>
          <div className=" rounded-xl w-11/12 bg-white hover:bg-indigo-600 hover:text-white transition">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={profImage}
                  alt="Shopie"
                  width={0}
                  height={0}
                  className="rounded-full w-8 h-8"
                />
                <span>Shopie Rose</span>
              </div>
              <p>Down Town</p>
              <p>24 Jun 2020</p>
              <p>05:00 PM</p>
              <CheckCircle className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
