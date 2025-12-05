import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/loan1.jpeg';
import bannerImg2 from '../../../assets/loan2.jpeg';
import bannerImg3 from '../../../assets/loan3.jpeg';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    const slides = [
        {
            image: bannerImg1,
            title: "Your Dream Loan Awaits",
            subtitle: "Apply now and make your financial goals a reality",
            cta1: "Apply for Loan",
            cta2: "Explore Loans"
        },
        {
            image: bannerImg2,
            title: "Fast and Easy Loan Approval",
            subtitle: "Get your loan approved in no time",
            cta1: "Apply for Loan",
            cta2: "Explore Loans"
        },
        {
            image: bannerImg3,
            title: "Secure Your Financial Future",
            subtitle: "Flexible loan plans tailored for you",
            cta1: "Apply for Loan",
            cta2: "Explore Loans"
        },
    ];

  
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };


    const titleInfinite = {
        animate: { y: [0, -10, 0] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };

    return (
        <section className="relative w-full  overflow-hidden">
            <Carousel
                autoPlay
                infiniteLoop
                interval={5000}   
                showThumbs={false}
                showStatus={false}
                showIndicators={true} 
                swipeable={true} 
                emulateTouch={true} 
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="relative w-10/12 mx-auto bg-linear-to-tl px-10 py-16 from-green-500 to-green-200 rounded-lg  flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
                    >
                        {/* Left Text */}
                        <motion.div 
                            className="md:w-1/2 w-full text-center md:text-left flex flex-col justify-center space-y-4"
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                        >
                            <motion.h1
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 leading-tight"
                                {...titleInfinite}
                            >
                                {slide.title}
                            </motion.h1>
                            <p className="text-base md:text-lg  max-w-md">
                                {slide.subtitle}
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                <Link
                                    to="/loan-application"
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-all duration-300 shadow"
                                >
                                    {slide.cta1}
                                </Link>
                                <Link
                                    to="/all-loans"
                                    className="border-2 border-green-600 hover:bg-green-600 hover:text-white text-green-600 px-5 py-2 md:px-6 md:py-3 rounded-md font-semibold transition-all duration-300 shadow"
                                >
                                    {slide.cta2}
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Image */}
                        <div className="md:w-1/2 w-full flex justify-center items-center">
                            <img
                                src={slide.image}
                                alt={`banner-${index}`}
                                className="object-cover rounded-lg shadow-md w-full md:w-[75%] lg:w-[70%] h-52 md:h-[350px] lg:h-[350px]"
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Banner;
