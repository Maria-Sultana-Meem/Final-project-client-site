import { FaUserGraduate, FaHandshake, FaDollarSign, FaClock } from "react-icons/fa";

const stats = [
  {
    icon: <FaUserGraduate className="w-8 h-8 text-green-600" />,
    number: "2,500+",
    title: "Happy Borrowers",
  },
  {
    icon: <FaHandshake className="w-8 h-8 text-green-600" />,
    number: "1,200+",
    title: "Approved Loans",
  },
  {
    icon: <FaDollarSign className="w-8 h-8 text-green-600" />,
    number: "15M+ BDT",
    title: "Total Loan Amount",
  },
  {
    icon: <FaClock className="w-8 h-8 text-green-600" />,
    number: "5+ Years",
    title: "Trusted Experience",
  },
];

const StatisticsSection = () => {
  return (
    <section className="py-20 w-10/12 mx-auto border-2 rounded-md border-green-500 mt-10">
      <div className="w-10/12 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          LoanLink <span className="text-green-600">Highlights</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className=" p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              {stat.icon}
              <h3 className="text-2xl font-bold mt-4  ">
                {stat.number}
              </h3>
              <p className=" mt-2">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
