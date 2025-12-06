import React from 'react';
import Banner from './homeComponents/Banner';
import AvailableLoan from './homeComponents/AvailableLoan';
import HowItWorks from './homeComponents/HowItWorks';
import Feedback from './homeComponents/Feedback';
import Faq from './homeComponents/Faq';
import Partners from './homeComponents/Partners';

const Home = () => {
    return (
        <div className='py-30'>
           <Banner></Banner>
           <AvailableLoan></AvailableLoan>
           <HowItWorks></HowItWorks>
           <Feedback></Feedback>
           <Faq></Faq>
           <Partners></Partners>
        </div>
    );
};

export default Home;