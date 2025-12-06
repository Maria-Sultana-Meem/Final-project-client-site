import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import FeedbackCard from './FeedbackCard';

const feedback = [
  {
    id: 1,
    name: "Maria Sultana Meem",
    position: "Small Business Owner",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    feedback:
      "LoanLink made my loan approval unbelievably fast. The verification and approval process was super smooth. Highly recommended!",
  },
  {
    id: 2,
    name: "Monirul Islam",
    position: "University Student",
    image: "https://i.pravatar.cc/150?img=58",
    rating: 5,
    feedback:
      "I applied for an education loan and got approved quickly. The platform was clean, easy, and user-friendly!",
  },

  {
    id: 3,
    name: "Sajib Hasan",
    position: "Freelancer",
    image: "https://i.pravatar.cc/150?img=14",
    rating: 4,
    feedback:
      "The EMI tracking feature helped me stay organized. Really loved how transparent the whole loan journey was.",
  },
  
  {
    id: 4,
    name: "Tanvira Alam",
    position: "Shop Owner",
    image: "https://i.pravatar.cc/150?img=21",
    rating: 5,
    feedback:
      "Excellent service! The loan disbursement was faster than traditional banks. Highly impressed!",
  },
  {
  id: 5,
  name: "Abdul Karim",
  position: "Delivery Rider",
  image: "https://i.pravatar.cc/150?img=56",
  rating: 4,
  feedback:
    "I needed a quick loan for my bike repair, and LoanLink helped me within hours. Very reliable and hassle-free service.",
},
{
  id: 6,
  name: "Nusrat Jahan",
  position: "Homemaker",
  image:  "https://i.pravatar.cc/150?img=47",
  rating: 5,
  feedback:
    "The easiest loan experience I’ve ever had. Clear instructions, instant verification, and no hidden charges. Loved it!",
},
];

const Feedback = () => {
  return (
    <div className="mt-20">
      {/* Header */}
      <div className="flex flex-col justify-center w-1/2 mx-auto mb-10 space-y-3 text-center">
        <h1 className="text-3xl font-bold text-green-700">What Our Customers Say</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Real feedback from real users who experienced fast, transparent and secure microloan services through LoanLink.
        </p>
      </div>

      {/* Carousel */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="w-full max-w-6xl mx-auto py-10"
      >
        {feedback.map(review => (
          <SwiperSlide key={review.id}>
            <FeedbackCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
