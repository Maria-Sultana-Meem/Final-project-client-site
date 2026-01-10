import React from 'react';
import Banner from './homeComponents/Banner';
import AvailableLoan from './homeComponents/AvailableLoan';
import HowItWorks from './homeComponents/HowItWorks';
import Feedback from './homeComponents/Feedback';
import Faq from './homeComponents/Faq';
import Partners from './homeComponents/Partners';
import LoanCategories from './homeComponents/LoanCategories';
import WhyChooseUs from './homeComponents/WhyChooseUs';
import StatisticsSection from './homeComponents/StatisticsSection';
import LatestBlogs from './homeComponents/LatestBlogs';

const Home = () => {
    return (
        <div className='py-30'>
           <Banner></Banner>
           <AvailableLoan></AvailableLoan>
           <LoanCategories></LoanCategories>
           <HowItWorks></HowItWorks>
           <Feedback></Feedback>
           <LatestBlogs></LatestBlogs>
           <Faq></Faq>
           <Partners></Partners>
           <StatisticsSection></StatisticsSection>
           <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;