'use client';
import { ReactNode, useEffect } from 'react';
import Navbar from '../NavBar/Navbar';
import ContactUs from '../ContactsUs/ContactUs';
import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';

type HomeProps = {
  children: ReactNode;
};

export default function Home({ children }: HomeProps) {
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  return (
    <>
      {isLogged ? <SideBar /> : <Navbar />}
      {children}
      {isLogged ? null : <ContactUs />}
    </>
  );
}
