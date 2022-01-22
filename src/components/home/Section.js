// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';

function Section({ data }) {
  console.log('section render...')
  return (
    <>
      {/* Head */}
      <Swiper
        className='rounded-xl select-none'
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView='auto'
        slidesPerGroupAuto
        navigation
      >
        {data &&
          data.map((item) => (
            <SwiperSlide
              className='!w-[175px] !h-[270px] relative group'
              key={item.id}>
              <Link
                to={item.link}
              >
                <h1
                  className='absolute bottom-0 left-0 z-10 w-full whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-xl rounded-bl-xl group-hover:text-orange-500 overflow-hidden'
                  title={item.title}
                >
                  {item.title}
                </h1>
                <LazyLoadImage
                  className='w-full h-full object-cover rounded-xl transition group-hover:brightness-90'
                  src={item.image}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default Section;
