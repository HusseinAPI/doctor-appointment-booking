import React from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import {
  FaRegCalendarCheck,
  FaUserDoctor,
  FaClipboardList,
} from 'react-icons/fa6';
import { ImProfile } from 'react-icons/im';

const SideBar = () => {
  return (
    <div className="fixed left-0 w-30 h-[740px] flex flex-wrap content-between bg-blue-600 rounded-tl-2xl rounded-bl-2xl">
      <div className="w-full h-1/12">
        <div className="w-full flex ml-5">
          <div className="flex justify-center items-center w-12 h-12 mt-2 hover:bg-blue-700 cursor-pointer rounded-2xl transition">
            <FaBriefcaseMedical className="w-6 h-6 text-amber-100" />
          </div>
        </div>
      </div>
      <div className="w-full h-4/12 flex flex-wrap content-between">
        <div className="w-full flex ml-5">
          <div className="flex justify-center items-center w-12 h-12 hover:bg-blue-700 cursor-pointer rounded-2xl transition">
            <MdDashboard className="w-7 h-7 text-amber-100" />
          </div>
        </div>
        <div className="w-full flex ml-5">
          <div className="flex justify-center items-center w-12 h-12 hover:bg-blue-700 cursor-pointer rounded-2xl transition">
            <FaRegCalendarCheck className="w-7 h-7 text-amber-100" />
          </div>
        </div>
        <div className="w-full flex ml-5">
          <div className="flex justify-center items-center w-12 h-12 hover:bg-blue-700 cursor-pointer rounded-2xl transition">
            <ImProfile className="w-7 h-7 text-amber-100" />
          </div>
        </div>
      </div>
      <div className="w-full h-2/12 mb-3 flex flex-wrap content-between">
        <div className="w-full flex ml-5">
          <div className="flex justify-center items-center w-12 h-12 hover:bg-blue-700 cursor-pointer rounded-2xl transition">
            <FaUserDoctor className="w-7 h-7 text-amber-100" />
          </div>
        </div>
        <div className="w-full flex ml-5">
          <div className="flex justify-center items-center w-12 h-12 hover:bg-blue-700 cursor-pointer rounded-2xl transition">
            <FaClipboardList className="w-7 h-7 text-amber-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
