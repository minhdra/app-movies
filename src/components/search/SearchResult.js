import { Link } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';
import Skeleton from '../shared/Skeleton';
import LoadImage from '../shared/LoadImage';
import Filter from '../shared/Filter';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Result({ data, keyword }) {
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    setFiltered(data);
  }, [data]);
  return (
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
            <motion.div layout className='flex-wrap flex'>
              {filtered.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className='relative group w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 px-2'
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
                      data-tooltip={item?.name}
                    >
                      <h1 className='whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-lg rounded-bl-lg group-hover:text-orange-500 overflow-hidden mx-2'>
                        {item?.name}
                      </h1>
                    </div>
                    <LoadImage
                      className='w-full h-full object-cover rounded-lg transition group-hover:brightness-90'
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
          <Skeleton className='w-[60%] h-7 mb-4' />
          <div className='flex-wrap flex w-full'>
            {[...new Array(50)].map((_, index) => (
              <div
                key={index}
                className='px-1 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'
              >
                <Skeleton className=' mb-4 px-2 rounded-lg h-[200px]'></Skeleton>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
