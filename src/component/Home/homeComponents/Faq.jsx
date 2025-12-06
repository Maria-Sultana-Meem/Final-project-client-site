import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: "What is the eligibility criteria for a loan?",
    answer: "You must be 18+, have a valid ID, and meet the minimum income requirements."
  },
  {
    id: 2,
    question: "How long does loan approval take?",
    answer: "Most loans are approved within 24-48 hours after submitting all required documents."
  },
  {
    id: 3,
    question: "Can I repay the loan early?",
    answer: "Yes, early repayment is allowed without any penalty in most cases."
  },
  {
    id: 4,
    question: "What is the maximum loan amount I can apply for?",
    answer: "The maximum loan limit depends on your eligibility and type of loan. It ranges from $500 to $150,000."
  },
  {
    id: 5,
    question: "How do I track my EMI payments?",
    answer: "You can track your EMI schedule and payment history in your LoanLink dashboard after logging in."
  },
  {
    id: 6,
    question: "Are there any hidden fees or charges?",
    answer: "No, LoanLink ensures full transparency. All fees, interest rates, and charges are clearly mentioned before approval."
  },
  {
    id: 7,
    question: "Which documents do I need to submit?",
    answer: "Typically, you need a valid ID, proof of income, bank account details, and any other documents requested for verification."
  },
  {
    id: 8,
    question: "Is it safe to apply online?",
    answer: "Absolutely. LoanLink uses secure encryption and authentication to protect your personal and financial data."
  },
];

const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-16 ">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-green-700">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Find answers to the most common questions about LoanLink's microloan services.
        </p>
        <div className="space-y-4">
          {faqs.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-xl shadow-md p-5 cursor-pointer transition-all duration-300 border ${
                  isOpen ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => toggle(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`font-semibold text-gray-800 ${isOpen ? 'text-green-700' : ''}`}>
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <FaChevronUp className="text-green-700" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </div>
                <div
                  className={`mt-2 text-gray-700 transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
