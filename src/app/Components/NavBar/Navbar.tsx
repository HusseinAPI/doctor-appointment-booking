import React from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="sticky flex justify-around w-full h-16 bg-gradient-to-r from-blue-900 to-blue-600">
      <div className="flex justify-center items-center text-yellow-100 hover:text-yellow-200 text-xl cursor-pointer">
        <FaBriefcaseMedical className="mr-2" />
        MedicalCenter
      </div>
      <div className="m-4 w-5/12 h-max text-teal-50">
        <div className="flex justify-between items-center">
          <span className="hover:text-teal-300">Home</span>
          <span className="hover:text-teal-300">About Us</span>
          <span className="hover:text-teal-300">Doctors</span>
          <span className="hover:text-teal-300">Contact Us</span>
          <span className="bg-yellow-50 hover:bg-yellow-200 text-blue-700 px-5 py-2 rounded-xl">
            login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
