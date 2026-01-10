import { FaBolt, FaShieldAlt, FaPercent, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt />,
    title: "Fast Approval",
    desc: "Get your loan approved within 24 hours with our smart verification system.",
  },
  {
    icon: <FaPercent />,
    title: "Low Interest Rates",
    desc: "We partner with top lenders to give you the lowest possible interest rates.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure & Private",
    desc: "Your data is protected with bank-level security and encrypted systems.",
  },
  {
    icon: <FaUserCheck />,
    title: "Trusted by Thousands",
    desc: "Over 10,000+ satisfied borrowers trust LoanLink for their financial needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20">
      <div className="w-10/12 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Why Choose <span className="text-green-600">LoanLink</span>?
          </h2>
          <p className=" mt-4">
            We make borrowing simple, fast, and transparent so you can focus on
            what really matters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className=" hover:bg-green-500 rounded-xl p-6 shadow-md hover:shadow-xl transition border border-gray-100  text-center"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 text-2xl mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2  dark:text-white">
                {item.title}
              </h3>
              <p className=" dark:text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
