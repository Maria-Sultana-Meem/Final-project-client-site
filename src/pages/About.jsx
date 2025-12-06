import React from "react";
import aboutImg from "../assets/about-us.jpg"; 
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-30 ">
      <div className="w-10/12 shadow-sm shadow-green-500 p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="About LoanLink"
            className="w-full rounded-2xl shadow-xl object-cover"
          />
          {/* Optional overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent rounded-2xl"></div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6">
            About LoanLink
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            LoanLink is a fast, secure, and transparent microloan platform that empowers individuals to access financial support effortlessly. 
            We simplify the entire process — from application to approval — making loans stress-free and understandable for everyone.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-none w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl">
                <FaRocket />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Quick and easy loan application process with instant verification.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-none w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl">
                <FaShieldAlt />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Secure platform with fully transparent approval, EMI tracking, and no hidden fees.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-none w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl">
                <FaUsers />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Trusted by thousands of individuals and organizations for hassle-free microloans.
              </p>
            </div>
          </div>

          {/* Call-to-Action */}
          <a
            href="/all-loans"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-md font-semibold text-lg shadow-lg hover:bg-green-600 transition"
          >
            Explore Loans
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
