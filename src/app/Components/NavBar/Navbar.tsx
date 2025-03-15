'use client';
import React, { useState } from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';

const Navbar = () => {
  const [openSidebar, setSideBar] = useState(false);
  return (
    <div className="sticky flex justify-between md:justify-around w-full h-16 bg-gradient-to-r from-blue-900 to-blue-600">
      <div className="flex justify-center items-center mx-5 text-yellow-100 hover:text-yellow-200 text-xl cursor-pointer">
        <FaBriefcaseMedical className="mr-2" />
        MedicalCenter
      </div>
      <div className="m-4 w-fit md:w-1/2 lg:w-5/12 h-max text-teal-50">
        {/*Desktop NavBar*/}
        <div className="hidden md:flex justify-between items-center">
          <span className="hover:text-teal-300">Home</span>
          <span className="hover:text-teal-300">About Us</span>
          <span className="hover:text-teal-300">Doctors</span>
          <span className="hover:text-teal-300">Contact Us</span>
          <span className="bg-yellow-50 hover:bg-yellow-200 text-blue-700 px-5 py-2 rounded-xl transition">
            login
          </span>
        </div>
        {/*Mobile NavBar*/}
        {openSidebar ? (
          <div className="h-80 flex justify-center md:hidden flex-wrap items-center rounded-lg bg-teal-900">
            <span className="w-full text-center hover:bg-teal-300 hover:text-blue-600">
              Home
            </span>
            <span className="w-full text-center hover:bg-teal-300 hover:text-blue-600">
              About Us
            </span>
            <span className="w-full text-center hover:bg-teal-300 hover:text-blue-600">
              Doctors
            </span>
            <span className="w-full text-center hover:bg-teal-300 hover:text-blue-600">
              Contact Us
            </span>
            <button className="w-2/3 bg-yellow-50 hover:bg-yellow-200 text-blue-700 mt-4 px-20 py-2 rounded-md transition">
              Login
            </button>
          </div>
        ) : (
          <TiThMenu
            className="flex md:hidden mt-1 cursor-pointer w-7 h-7"
            onClick={() => setSideBar(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
