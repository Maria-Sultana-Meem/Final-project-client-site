import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookSquare, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import { toast } from "react-hot-toast";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-30 ">
      <div className="w-10/12 shadow-sm shadow-green-500 p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-4xl font-extrabold text-green-700">Get in Touch</h2>
          <p className="">
            Have any questions or need assistance? Our team is ready to help you.
            Fill out the form or reach out directly using the contact details below.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 ">
              <FaMapMarkerAlt className="text-green-700" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 ">
              <FaPhone className="text-green-700" />
              <span>+880 1421 777 639</span>
            </div>
            <div className="flex items-center gap-3 ">
              <FaEnvelope className="text-green-700" />
              <span>support@loanlink.com</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
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
                         <FaLinkedinIn size={30} color="blue" />
                       </a>
           
          </div>
        </div>

    
        <div className=" shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold  mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
