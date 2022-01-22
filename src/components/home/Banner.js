// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';

function Banner({ data }) {
  SwiperCore.use([Autoplay]);
  return (
    <>
      {/* Head */}
      <Swiper
        className='rounded-xl h-fit select-none'
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        breakpoints={{
          640: {
            // width: 640,
            slidesPerView: 1,
          },
          768: {
            // width: 768,
            slidesPerView: 2,
          },
        }}
        loop={true}
        // autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={item.link}
                className='sm:bg-inherit relative rounded-xl overflow-hidden shadow-md block'
              >
                <h1
                  className='absolute lg:text-xl md:text-sm text-sm font-medium text-white bg-opacity-40 bottom-1/4 left-12 cursor-default bg-black py-1 px-2 rounded-md max-w-[30%] whitespace-nowrap text-ellipsis overflow-hidden'
                  title={item.title}
                >
                  {item.title}
                </h1>
                <img
                  className='w-full h-full md:max-h-[200px] max-h-[300px] object-cover rounded-2xl'
                  src={item.image}
                  alt=''
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default Banner;
