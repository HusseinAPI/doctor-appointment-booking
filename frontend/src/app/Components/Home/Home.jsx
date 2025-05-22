'use client';
import Navbar from '../NavBar/Navbar';
import ContactUs from '../ContactsUs/ContactUs';
import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';

export default function Home({ children }) {
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  return (
    <>
      {isLogged ? <SideBar /> : <Navbar />}
      {children}
      {isLogged ? null : <ContactUs />}
    </>
  );
}
