'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '@/app/redux/doctorSlice';
import { userStayLogged } from '@/app/redux/userSlice';
import AddDoctorForm from '@/app/Components/DoctorForm/AddDoctorForm';
import EditDoctorForm from '@/app/Components/DoctorForm/EditDoctorForm';
import DeleteDocConfirm from '@/app/Components/DoctorForm/DeleteDocConfirm';
import { checkIsAdmin } from '@/app/redux/adminSlice';
import { usePathname, useRouter } from 'next/navigation';

export default function DoctorsMangement() {
  const doctors = useSelector((state) => state.doctorSlice.doctors);
  const theRole = useSelector((state) => state.adminSlice.theRole);

  const dispatch = useDispatch();
  const router = useRouter();

  const path = usePathname();

  useEffect(() => {
    dispatch(userStayLogged());
    dispatch(checkIsAdmin());
    if (!theRole) {
      router.push('/auth/signin');
    }
  }, []);

  // Search doctor

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add doctor

  const [addFormOpen, setAddFormOpen] = useState(false);

  useEffect(() => {
    dispatch(getDoctors());
  }, [addFormOpen]);

  // Edit doctor

  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editableData, setEditableData] = useState();

  useEffect(() => {
    dispatch(getDoctors());
  }, [editFormOpen]);

  // Delete Doctor

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(false);

  useEffect(() => {
    dispatch(getDoctors());
  }, [deleteConfirm]);

  return (
    theRole && (
      <div className="h-[738px] rounded-l-2xl">
        <div className="fixed overflow-auto left-20 rounded-4xl bg-blue-100 w-full h-[740px]">
          <div className="flex justify-between w-10/12 md:w-8/12 p-6">
            <div className="relative w-6/12">
              <Search
                className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search doctor..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex mb-4">
              <button
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition"
                onClick={() => setAddFormOpen(true)}
              >
                <Plus size={16} />
                Add Doctor
              </button>
            </div>
          </div>
          <div className="w-11/12 mx-auto md:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {filteredDoctors.map((doc, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col w-10/12 md:w-full items-center"
              >
                {doc.imageUrl && doc.imageUrl.trim() !== '' && (
                  <Image
                    src={doc.imageUrl}
                    alt={doc.name}
                    width={64}
                    height={64}
                    className="rounded-full mb-3"
                  />
                )}
                <h3 className="font-semibold text-center">{doc.name}</h3>
                <p className="text-sm text-gray-500 text-center">
                  {doc.location}
                </p>
                <div
                  className={`mt-3 px-3 py-1 text-sm font-medium rounded-full ${doc.buttonColor}`}
                >
                  {doc.specialization}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      setEditFormOpen(true);
                      setEditableData(doc);
                    }}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                    onClick={() => {
                      setDoctorToDelete(doc.id);
                      setDeleteConfirm(true);
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <AddDoctorForm
            addFormOpen={addFormOpen}
            setAddFormOpen={setAddFormOpen}
          />
          <EditDoctorForm
            editFormOpen={editFormOpen}
            setEditFormOpen={setEditFormOpen}
            editableData={editableData}
          />
          <DeleteDocConfirm
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            doctorToDelete={doctorToDelete}
          />
        </div>
      </div>
    )
  );
}
