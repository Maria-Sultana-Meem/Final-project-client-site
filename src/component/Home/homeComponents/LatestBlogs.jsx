
import { useNavigate } from "react-router";

const blogs = [
  { id: 1, title: "5 Tips to Get Loan Faster", date: "Jan 10, 2026", excerpt: "Learn the most effective ways to get your loan approved quickly.", content: "Full content of 5 Tips to Get Loan Faster..." },
  { id: 2, title: "Understanding Interest Rates", date: "Dec 25, 2025", excerpt: "A simple guide to interest rates for borrowers.", content: "Full content of Understanding Interest Rates..." },
  { id: 3, title: "Top 3 Loan Mistakes to Avoid", date: "Nov 15, 2025", excerpt: "Common mistakes people make while applying for loans.", content: "Full content of Top 3 Loan Mistakes to Avoid..." },
];

const LatestBlogs = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">
          Latest <span className="text-green-600">Blogs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{blog.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm">{blog.date}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-4">{blog.excerpt}</p>
              <button
                onClick={() => handleReadMore(blog.id)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
