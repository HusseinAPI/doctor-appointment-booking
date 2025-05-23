'use client';
import React, { useState } from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

const Navbar = () => {
  const [openSidebar, setSideBar] = useState(false);
  return (
    <div className="fixed top-0 flex justify-between md:justify-around w-full h-16 bg-gradient-to-r from-blue-900 to-blue-600">
      <div className="flex justify-center items-center mx-5 text-yellow-100 hover:text-yellow-200 text-xl cursor-pointer">
        <FaBriefcaseMedical className="mr-2" />
        MedicalCenter
      </div>
      <div className="m-4 w-fit md:w-1/2 lg:w-5/12 h-max text-teal-50">
        {/*Desktop NavBar*/}
        <div className="hidden md:flex justify-between items-center">
          <span className="hover:text-teal-300">
            <Link href="/">Home</Link>
          </span>
          <span className="hover:text-teal-300">
            <Link href="/#aboutUs">About Us</Link>
          </span>
          <span className="hover:text-teal-300">
            <Link href="/doctors">Doctors</Link>
          </span>
          <span className="hover:text-teal-300">
            <Link href="/#contactUs">Contact Us</Link>
          </span>
          <span className="bg-yellow-50 hover:bg-yellow-200 text-blue-700 px-5 py-2 rounded-xl transition">
            <Link href="/auth/signin">login</Link>
          </span>
        </div>
        {/*Mobile NavBar*/}
        {openSidebar ? (
          <div className="h-80 flex justify-center md:hidden flex-wrap items-center rounded-lg bg-teal-900 transition">
            <div className="w-full flex justify-end px-5">
              <IoClose
                className="hover:bg-yellow-200 mt-1 cursor-pointer w-7 h-7"
                onClick={() => setSideBar(false)}
              />
            </div>
            <span className="w-2/3 text-center p-2 rounded-lg hover:bg-teak-300 hover:text-blue-600">
              <Link href="/">Home</Link>
            </span>
            <span className="w-2/3 text-center hover:bg-teal-300 hover:text-blue-600">
              <Link href="/#aboutUs">About Us</Link>
            </span>
            <span className="w-2/3 text-center hover:bg-teal-300 hover:text-blue-600">
              <Link href="/doctors">Doctors</Link>
            </span>
            <span className="w-2/3 text-center hover:bg-teal-300 hover:text-blue-600">
              <Link href="/#contactUs">Contact Us</Link>
            </span>
            <button className="w-2/3 bg-yellow-50 hover:bg-yellow-200 text-blue-700 mt-4 px-20 py-2 rounded-md transition">
              <Link href="/auth/signin">Login</Link>
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
