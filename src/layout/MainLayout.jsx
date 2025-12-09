import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {

 useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,     
    });
  }, []);

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;