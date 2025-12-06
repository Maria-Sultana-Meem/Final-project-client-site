import React from 'react';
import { FaStar } from "react-icons/fa";

const FeedbackCard = ({ review }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 text-center border border-gray-200 dark:border-slate-700">
      <img
        src={review.image}
        alt={review.name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{review.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{review.position}</p>

      <div className="flex justify-center mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {review.feedback}
      </p>
    </div>
  );
};

export default FeedbackCard;
