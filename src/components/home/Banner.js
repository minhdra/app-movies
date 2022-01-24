// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
      {data && (
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
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation
          pagination={{ clickable: true }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={item.link}
                className='sm:bg-inherit relative rounded-xl overflow-hidden shadow-md block'
              >
                <h1 className='absolute bottom-[2rem] left-[2rem] text-white bg-opacity-40 cursor-default bg-black py-1 px-2 rounded-md whitespace-nowrap text-ellipsis overflow-hidden max-w-[30%]'>
                  {item.title}
                </h1>
                <LazyLoadImage
                  className='w-full h-full md:max-h-[200px] max-h-[300px] object-cover rounded-2xl'
                  src={item.image}
                  alt={item.title}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default Banner;
