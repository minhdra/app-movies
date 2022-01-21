import { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Link } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';

const API_HOME =
  'https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=';
const API_SEARCH_BOARD =
  'https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchLeaderboard';

const options = {
  headers: {
    lang: 'en',
    versioncode: 11,
    clienttype: 'ios_jike_default',
  },
};

function Home() {
  const [home, setHome] = useState();
  const [searchBoard, setSearchBoard] = useState([]);
  // const [page, setPage] = useState(0);

  // Suggest slides
  useEffect(() => {
    fetch(API_HOME + 0, options)
      .then((res) => res.json())
      .then((data) => setHome(data.data));
  }, []);
  SwiperCore.use([Autoplay]);
  // Search board
  useEffect(() => {
    fetch(API_SEARCH_BOARD, options)
      .then((res) => res.json())
      .then((data) => setSearchBoard(data.data.list));
  }, []);

  // console.log(home);

  return (
    <div className='flex pt-20 dark:bg-slate-900 dark:text-white min-h-screen'>
      <Sidebar show={false} />
      <div className='py-4 w-full flex overflow-hidden'>
        {/* Main content */}
        <div className='w-full overflow-hidden h-screen md:w-[70%] px-4 md:border-x border-slate-300 dark:border-slate-600'>
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
            onSlideChange={() => 1 + 1}
            onSwiper={() => 1 + 1}
          >
            {home &&
              home.recommendItems[0].recommendContentVOList.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link
                    to='/'
                    className='sm:bg-inherit relative rounded-xl overflow-hidden shadow-md block'
                    onClick={() => console.log(item)}
                  >
                    <h1
                      className='absolute lg:text-xl md:text-sm text-sm font-medium text-white bg-opacity-40 bottom-1/4 left-12 cursor-default bg-black py-1 px-2 rounded-md max-w-[30%] whitespace-nowrap text-ellipsis overflow-hidden'
                      title={item.title}
                    >
                      {item.title}
                    </h1>
                    <img
                      className='w-full h-full md:max-h-[200px] max-h-[300px] object-cover rounded-2xl'
                      src={item.imageUrl}
                      alt=''
                    />
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* Top searches */}
        <div className='hidden md:block w-[30%] pl-4 relative h-screen overflow-hidden overflow-y-auto'>
          {/* Head */}
          <div className='flex items-end pb-4 sticky top-0 bg-white shadow dark:bg-slate-900'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-red-600 animate-bounce'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
              />
            </svg>
            <h1 className='text-xl font-medium pl-1'>Top searches</h1>
          </div>
          {/* Content */}
          <div className='pt-2'>
            <ul className='list-none'>
              {searchBoard.map((item) => (
                <li key={item.id}>
                  <Link
                    onClick={() => console.log(item)}
                    to={`${item.domainType ? 'tv' : 'movie'}/${item.id}`}
                    className='flex py-1'
                  >
                    <div className='w-28 rounded-lg overflow-hidden'>
                      <img
                        className='w-full object-cover'
                        src={item.cover}
                        alt=''
                      />
                    </div>
                    <h2 className='text-md pl-4'>{item.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
