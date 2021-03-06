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
      {data ? (
        <Swiper
          className='rounded-xl h-fit select-none'
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
            1024: {
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
          {data.map(
            (item) =>
              item.id && (
                <SwiperSlide key={item.id}>
                  <Link
                    to={item.link}
                    className='sm:bg-inherit relative rounded-xl overflow-hidden shadow-md block group transition'
                  >
                    <div className='w-full h-0 pb-[42%] relative'>
                      <h1
                        className='absolute text-white bg-black bg-opacity-60 px-2 rounded-md border border-slate-300 top-0 left-0 -translate-x-[101%] z-10 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:translate-x-0 transition duration-300 whitespace-nowrap text-ellipsis max-w-[90%] overflow-hidden'
                      >{item?.title}</h1>
                      <LazyLoadImage
                        className='w-full h-full object-cover rounded-2xl absolute top-0 left-0'
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              )
          )}
        </Swiper>
      ) : (
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
          navigation
          pagination={{ clickable: true }}
        >
          {[...new Array(5)].map((_, index) => (
            <SwiperSlide
              key={index}
              className='bg-slate-600 relative rounded-xl overflow-hidden shadow-md block w-full h-[300px]'
            ></SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default Banner;
