import React from "react";
import {
  FaFacebookF,
  
  FaLinkedinIn,
  FaInstagram,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import logoImg from "../../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-16">
      <div className="w-10/12 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="" className="w-16 rounded-full" />
            <h3 className="text-4xl font-bold mb-4">LoanLink</h3>
          </div>

          <p className="text-gray-200">
            LoanLink is a secure, fast, and transparent microloan platform,
            helping individuals access financial support effortlessly. Join
            thousands who trust us for their financial needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-green-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/all-loans" className="hover:text-green-300 transition">
                Available Loans
              </a>
            </li>
            <li>
              <a
                href="/loan-application"
                className="hover:text-green-300 transition"
              >
                Apply Now
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-green-300 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-300 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-200">
            <li>Email: support@loanlink.com</li>
            <li>Phone: +880 1441 777 639</li>
            <li>Address: Kishoreganj, Bangladesh</li>
          </ul>

          
          <div className="flex mt-4 space-x-4">
            <a  href="https://x.com" className="hover:scale-110 bg-white w-7 h-6 object-contain transition">
             <img src="https://i.ibb.co.com/WC1HVbx/download.png" alt="" />
            </a>
            
             <a href="https://www.facebook.com" className="hover:scale-110">
              <FaFacebookSquare size={30} color="blue"/>
            </a>
            <a href="https://www.instagram.com" className="hover:scale-110">
              <FaInstagramSquare size={30} color="red" />
            </a>
            
            <a href="https://www.linkedin.com" className="hover:scale-110">
              {" "}
              <FaLinkedin size={30} color="blue" />
            </a>

          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Subscribe</h3>
          <p className="text-gray-200 mb-4">
            Get the latest updates and offers directly in your inbox.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border-none focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-white text-green-700 px-4 py-2 rounded-md font-semibold hover:bg-green-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-green-600 pt-6 text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
