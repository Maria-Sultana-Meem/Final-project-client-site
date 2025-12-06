import React from 'react';
import Banner from './homeComponents/Banner';
import AvailableLoan from './homeComponents/AvailableLoan';
import HowItWorks from './homeComponents/HowItWorks';
import Feedback from './homeComponents/Feedback';

const Home = () => {
    return (
        <div className='py-30'>
           <Banner></Banner>
           <AvailableLoan></AvailableLoan>
           <HowItWorks></HowItWorks>
           <Feedback></Feedback>
        </div>
    );
};

export default Home;