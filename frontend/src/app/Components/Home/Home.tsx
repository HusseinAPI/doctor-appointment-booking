'use client';
import { ReactNode, useEffect } from 'react';
import Navbar from '../NavBar/Navbar';
import ContactUs from '../ContactsUs/ContactUs';
import SideBar from '../SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { userStayLogged } from '@/app/redux/userSlice';

type HomeProps = {
  children: ReactNode;
};

export default function Home({ children }: HomeProps) {
  const isLogged = useSelector((state) => state.userSlice.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStayLogged());
  }, []);

  return (
    <>
      {isLogged ? <SideBar /> : <Navbar />}
      {children}
      {isLogged ? null : <ContactUs />}
    </>
  );
}
