'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, userStayLogged, logOut } from '@/app/redux/userSlice';
import ConfirmMessage from '@/app/Components/ConfirmMessage/ConfirmMessage';

export default function Profile() {
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const user = useSelector((state) => state.userSlice.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStayLogged());
    dispatch(getUserInfo());
  }, []);

  // LogOut

  const [isOpen, setOpen] = useState<boolean>(false);

  if (!isLogged || !user) {
    return (
      <div className="rounded-l-2xl">
        <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-full">
          {' '}
          <div className="text-center p-8 text-gray-500">loading data...</div>
        </div>
      </div>
    );
  }

  return (
    isLogged && (
      <div className="rounded-l-2xl">
        <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-[740px]">
          <div className="min-h-full bg-gray-100 flex items-center py-10">
            <div className="max-w-4xl w-7/12 sm:w-8/12 bg-white rounded-2xl shadow-lg p-8 ml-15 sm:ml-30">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* User Details */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    User Profile
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-lg font-medium">{user.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-lg font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="text-lg font-medium">{user.dateOfBirth}</p>
                    </div>
                  </div>

                  <button
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-xl transition duration-200"
                    onClick={() => setOpen(true)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ConfirmMessage
            deleteConfirm={isOpen}
            setDeleteConfirm={setOpen}
            itemToDelete={null}
            actionToDispatch={logOut}
          />
        </div>
      </div>
    )
  );
}
