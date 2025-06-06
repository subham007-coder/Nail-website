import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 5,
    review: "The quality of these press-on nails is exceptional! They're durable, look natural, and the designs are absolutely stunning.",
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Emily Williams',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 5,
    review: "I'm amazed by how long these nails last. The application process is super easy and they look just like salon nails!",
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Michelle Davis',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    review: "These nails are perfect for special occasions. I received so many compliments on my wedding day!",
    date: '3 weeks ago'
  },{
    id: 3,
    name: 'Michelle Davis',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 5,
    review: "These nails are perfect for special occasions. I received so many compliments on my wedding day!",
    date: '3 weeks ago'
  },
];

function Testimonial() {
  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
        //   pagination={{
        //     clickable: true,
        //     dynamicBullets: true,
        //   }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="testimonial-slider py-16"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </div>

                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <FiStar key={index} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {testimonial.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonial;