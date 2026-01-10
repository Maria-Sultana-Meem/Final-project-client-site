
import { useParams, useNavigate } from "react-router";

const blogs = [
  { id: 1, title: "5 Tips to Get Loan Faster", date: "Jan 10, 2026", content: "Full content of 5 Tips to Get Loan Faster..." },
  { id: 2, title: "Understanding Interest Rates", date: "Dec 25, 2025", content: "Full content of Understanding Interest Rates..." },
  { id: 3, title: "Top 3 Loan Mistakes to Avoid", date: "Nov 15, 2025", content: "Full content of Top 3 Loan Mistakes to Avoid..." },
];

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) return <p className="text-center mt-10 text-red-500">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto pt-30 py-20 px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-300 dark:bg-slate-700 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-600 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{blog.title}</h1>
      <p className="text-gray-500 dark:text-gray-300 mb-8">{blog.date}</p>
      <div className="text-gray-700 dark:text-gray-200 leading-relaxed">{blog.content}</div>
    </div>
  );
};

export default BlogDetails;
