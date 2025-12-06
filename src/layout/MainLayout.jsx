import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;