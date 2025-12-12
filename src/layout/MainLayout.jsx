import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from '../shared/ScrollToTop';

const MainLayout = () => {

 useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,     
    });
  }, []);

    return (
        <div>
          <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;