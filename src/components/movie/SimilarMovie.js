import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadImage from '../shared/LoadImage';
import Skeleton from '../shared/Skeleton';
import SkeletonSlider from '../shared/SkeletonSlide';

function SimilarMovie({ data }) {
  return (
    <div className='w-full'>
      {data ? (
        <>
          {data?.refList && data?.refList.length > 0 && (
            <div>
              <h1 className='text-xl font-bold'>Other seasons</h1>
              {data && (
                <>
                  <div className='my-4 hidden md:block overflow-y-auto overflow-x-hidden w-full'>
                    {data.refList.map((item) => {
                      return (
                        item.id !== data.id && (
                          <div key={item.id}>
                            <Link
                              to={`/${
                                item.category === 0
                                  ? `movie/${item.id}`
                                  : `tv/${item.id}?episode=1`
                              }`}
                              className='inline-flex justify-start items-start group w-full'
                              data-tooltip={item?.name}
                            >
                              <LoadImage
                                className={`w-[70px] h-[100px] object-cover flex-shrink-0 group-hover:brightness-75`}
                                src={item?.coverVerticalUrl}
                              />
                              <div className='px-2 leading-none w-full overflow-hidden h-full flex-col justify-between group-hover:brightness-75 md:flex hidden'>
                                <h5 className='pb-3 whitespace-nowrap text-ellipsis w-full overflow-hidden'>
                                  {item?.name}
                                </h5>
                                <span>{item?.year}</span>
                              </div>
                            </Link>
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className='md:hidden my-4'>
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      slidesPerView='auto'
                      slidesPerGroupAuto
                      spaceBetween={10}
                    >
                      {data &&
                        data.refList.map((item) => {
                          return (
                            item.id !== data.id && (
                              <SwiperSlide
                                key={item.id}
                                className='!w-[175px] !h-[270px] relative group'
                              >
                                <Link
                                  to={`/${
                                    item.category === 0
                                      ? `movie/${item.id}`
                                      : `tv/${item.id}?episode=1`
                                  }`}
                                >
                                  <div
                                    className='!absolute bottom-0 left-0  w-full'
                                    data-tooltip={item.name}
                                  >
                                    <h1 className=' whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-xl rounded-bl-xl group-hover:text-orange-500 overflow-hidden'>
                                      {item.name}
                                    </h1>
                                  </div>
                                  <LazyLoadImage
                                    className={`w-full h-full object-cover group-hover:brightness-75 rounded-xl`}
                                    src={item?.coverVerticalUrl}
                                  />
                                </Link>
                              </SwiperSlide>
                            )
                          );
                        })}
                    </Swiper>
                  </div>
                </>
              )}
            </div>
          )}
          {data?.likeList && data?.likeList.length > 0 && (
            <>
              <h1 className='text-xl font-bold'>Can you will like?</h1>
              {data && (
                <>
                  <div className='my-4 hidden md:block overflow-y-auto overflow-x-hidden w-full'>
                    {data.likeList.map((item) => (
                      <div key={item.id}>
                        <Link
                          to={`/${
                            item.category === 0
                              ? `movie/${item.id}`
                              : `tv/${item.id}?episode=1`
                          }`}
                          className='inline-flex justify-start items-start group w-full'
                          data-tooltip={item?.name}
                        >
                          <LoadImage
                            className={`w-[70px] h-[100px] object-cover flex-shrink-0 group-hover:brightness-75`}
                            src={item?.coverVerticalUrl}
                          />
                          <div className='px-2 leading-none w-full overflow-hidden h-full flex-col justify-between group-hover:brightness-75 md:flex hidden'>
                            <h5 className='pb-3 whitespace-nowrap text-ellipsis w-full overflow-hidden'>
                              {item?.name}
                            </h5>
                            <span>{item?.year}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className='md:invisible my-4'>
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      slidesPerView='auto'
                      slidesPerGroupAuto
                      spaceBetween={10}
                    >
                      {data &&
                        data.likeList.map((item) => (
                          <SwiperSlide
                            key={item.id}
                            className='!w-[175px] !h-[270px] relative group'
                          >
                            <Link
                              to={`/${
                                item.category === 0
                                  ? `movie/${item.id}`
                                  : `tv/${item.id}?episode=1`
                              }`}
                            >
                              <div
                                className='!absolute bottom-0 left-0  w-full'
                                data-tooltip={item.name}
                              >
                                <h1 className=' whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-xl rounded-bl-xl group-hover:text-orange-500 overflow-hidden'>
                                  {item.name}
                                </h1>
                              </div>
                              <LazyLoadImage
                                className={`w-full h-full object-cover group-hover:brightness-75 rounded-xl`}
                                src={item?.coverVerticalUrl}
                              />
                            </Link>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {[...new Array(2)].map((_, index) => (
            <div key={index}>
              <Skeleton className={'text-xl font-bold w-[60%] h-7 my-6'} />
              <div className='my-4 hidden md:block overflow-auto w-full'>
                {[...new Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className='inline-flex justify-start items-start group w-full'
                  >
                    <Skeleton className='w-[70px] h-[100px]' />
                    <div className='px-2 leading-none w-full overflow-hidden h-full flex-col justify-between group-hover:brightness-75 md:flex hidden'>
                      <Skeleton className='w-full h-7 mb-3' />
                      <Skeleton className='w-full h-7' />
                    </div>
                  </div>
                ))}
              </div>
              <div className='md:hidden my-4'>
                <SkeletonSlider />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SimilarMovie;
