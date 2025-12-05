import React from 'react';
import Banner from './homeComponents/Banner';
import AvailableLoan from './homeComponents/AvailableLoan';

const Home = () => {
    return (
        <div className='py-30'>
           <Banner></Banner>
           <AvailableLoan></AvailableLoan>
        </div>
    );
};

export default Home;