import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  FaRegFileAlt,
  FaUserCheck,
  FaSearch,
  FaCheckCircle,
  FaMoneyCheckAlt,

  FaSyncAlt,
} from 'react-icons/fa';

const steps = [
  {
    id: 1,
    icon: <FaRegFileAlt size={22} />,
    title: 'Apply Online',
    desc:
      'Fill out a simple online form with your basic details, requested loan amount, monthly income, and required documents.',
  },
  {
    id: 2,
    icon: <FaUserCheck size={22} />,
    title: 'Initial Review',
    desc:
      'Our team quickly reviews your submitted application and checks for basic eligibility and required documents.',
  },
  {
    id: 3,
    icon: <FaSearch size={22} />,
    title: 'Verification',
    desc:
      'Your identity and uploaded documents are verified. If needed, we may contact you for additional information.',
  },
  {
    id: 4,
    icon: <FaCheckCircle size={22} />,
    title: 'Approval',
    desc:
      'Once verification is complete, your loan request is approved, and you will be notified along with EMI details.',
  },
  {
    id: 5,
    icon: <FaMoneyCheckAlt size={22} />,
    title: 'Disbursement',
    desc:
      'After approval, the loan amount is transferred to your provided bank/mobile account as per the agreed terms.',
  },
  {
    id: 6,
   icon: <FaSyncAlt size={22} />,
    title: 'Repayment',
    desc:
      'Repay your loan in easy EMIs through online payment, auto-debit, or manual payment options.',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

const HowItWorks = () => {
  return (
    <section className="py-14 ">
      <div className="w-10/12 max-w-7xl mx-auto border-double border-2 border-green-500 p-6 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
            How It Works
          </h2>
          <p className="mt-3  max-w-2xl mx-auto">
            The LoanLink process is simple, transparent, and fast — from application to approval and disbursement.
          </p>
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          <div className="flex flex-col gap-6">
            {steps.slice(0, 2).map((s, idx) => (
              <motion.article
                key={s.id}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariant}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-5 shadow-sm flex gap-4 items-start"
              >
                <div className="flex-none w-12 h-12 rounded-md bg-green-50 text-green-700 flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                    {s.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

        
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-linear-to-br from-green-600 to-green-500 text-white rounded-2xl p-8 shadow-xl w-full">
              <h3 className="text-2xl font-bold">Apply in Minutes</h3>
              <p className="mt-2 text-sm opacity-90">
                Submit your loan request online — we will verify and update you quickly.
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <Link
                  to="/loan-application"
                  className="bg-white text-green-700 px-5 py-2 rounded-md font-semibold shadow hover:scale-105 transition"
                >
                  Apply Now
                </Link>
                <Link
                  to="/all-loans"
                  className="bg-transparent border border-white/50 text-white px-4 py-2 rounded-md hover:bg-white/10 transition"
                >
                  Explore Loans
                </Link>
              </div>
            </div>

          
            <div className="hidden md:flex flex-col items-center mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-green-300 rounded-full mb-3" />
              ))}
            </div>
          </div>

       
          <div className="flex flex-col gap-6">
            {steps.slice(2).map((s, idx) => (
              <motion.article
                key={s.id}
                custom={idx + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariant}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg p-5 shadow-sm flex gap-4 items-start"
              >
                <div className="flex-none w-12 h-12 rounded-md bg-green-50 text-green-700 flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                    {s.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          * Processing time may vary depending on verification requirements and applicant conditions.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
