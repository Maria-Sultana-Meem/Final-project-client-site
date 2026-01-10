import { FaHome, FaBriefcase, FaUser, FaGraduationCap, FaBolt } from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Personal Loan",
    desc: "Quick personal loans for emergency and lifestyle needs.",
    icon: <FaUser />,
  },
  {
    id: 2,
    title: "Business Loan",
    desc: "Grow or start your business with flexible business loans.",
    icon: <FaBriefcase />,
  },
  {
    id: 3,
    title: "Home Loan",
    desc: "Affordable loans to buy or build your dream home.",
    icon: <FaHome />,
  },
  {
    id: 4,
    title: "Student Loan",
    desc: "Education financing for students and professionals.",
    icon: <FaGraduationCap />,
  },
  {
    id: 5,
    title: "Emergency Loan",
    desc: "Instant loans for medical and urgent needs.",
    icon: <FaBolt />,
  },
];

const LoanCategories = () => {
  return (
    <section className=" py-16">
      <div className="w-10/12 mx-auto">
        
        <h2 className="text-4xl font-bold text-center mb-4">
          Loan Categories
        </h2>
        <p className="text-center  mb-12 max-w-xl mx-auto">
          Choose from a wide range of loan types designed to meet your financial needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {categories.map((item) => (
            <div
              key={item.id}
              className="hover:bg-green-500 rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className="text-4xl text-green-600 mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanCategories;
