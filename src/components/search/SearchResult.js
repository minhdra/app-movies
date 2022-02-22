import { Link } from 'react-router-dom';
import Skeleton from '../shared/Skeleton';
import Filter from '../shared/Filter';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

function Result({ data, keyword }) {
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    setFiltered(data);
  }, [data]);
  console.log(data)
  return (
    <>
      <Header/>
      <div className='flex dark:bg-slate-900 min-h-screen'>
        {/* <div className='hidden lg:block'>
            <Sidebar show={false} />
          </div> */}
        {data ? (
          <div className='pt-24 pb-5 px-4 overflow-hidden w-full'>
            <h1 className='leading-none text-xl font-medium pb-4'>
              Founded: <span className='text-orange-600'>{data.length}</span>{' '}
              results with keyword:{' '}
              <span className='text-orange-600'>{keyword}</span>
            </h1>
            <Filter
              data={data}
              setFiltered={setFiltered}
              active={active}
              setActive={setActive}
            />
            {filtered?.length > 0 ? (
              <motion.div layout className='grid grid-cols-fit gap-x-4 gap-y-6'>
                {filtered.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className='relative group'
                  >
                    <Link
                      to={`${
                        item.domainType === 1
                          ? `/tv/${item.id}?episode=1`
                          : `/movie/${item.id}`
                      }`}
                      className='block'
                    >
                      <div
                        className='!absolute bottom-0 left-0 z-10 w-full'
                      >
                        <h1 className='whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-lg rounded-bl-lg group-hover:text-orange-500 overflow-hidden'>
                          {item?.name}
                        </h1>
                      </div>
                      <LazyLoadImage
                        className='w-full h-[30vh] object-cover rounded-lg transition group-hover:brightness-90 bg-slate-800'
                        src={item?.coverHorizontalUrl}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <img className='w-1/2 m-auto' src='/images/no-data.svg' alt='' />
            )}
          </div>
        ) : (
          <div className='pt-24 pb-5 px-4 overflow-hidden w-full'>
            <Skeleton className='w-[70%] h-7 mb-4' />
            <Skeleton className='w-[40%] h-7 mb-4' />
            <div className='grid grid-cols-fit gap-x-4 gap-y-6'>
              {[...new Array(50)].map((_, index) => (
                  <Skeleton key={index} className=' mb-4 px-2 rounded-lg h-[30vh]'></Skeleton>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Result;
