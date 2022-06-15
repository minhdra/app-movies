import { Link } from 'react-router-dom';
import Filter from '../shared/Filter';
import Skeleton from '../shared/Skeleton';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function Result({ data, keyword }) {
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (data) setFiltered(data);
  }, [data]);

  // Handle pagination
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (window.innerWidth > 1280) return 20;
    else if (window.innerWidth > 768) return 12;
    else return 8;
  });
  const [currentData, setCurrentData] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    if (filtered) {
      const endOffset = itemOffset + itemsPerPage;
      // console.log(itemOffset, endOffset)
      setCurrentData(filtered.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filtered.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, filtered]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filtered?.length || 0;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const handleResize = (e) => {
      if (e.target.innerWidth > 1280) setItemsPerPage(20);
      else if (e.target.innerWidth > 768) setItemsPerPage(12);
      else setItemsPerPage(8);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <Header />
      <div className='flex dark:bg-slate-900 min-h-screen'>
        {/* <div className='hidden lg:block'>
            <Sidebar show={false} />
          </div> */}
        {data ? (
          <div className='pt-24 pb-5 px-4 overflow-hidden w-full'>
            <h1 className='leading-none text-xl font-medium pb-4'>
              Founded:{' '}
              <span className='text-orange-600'>{filtered?.length}</span>{' '}
              results with keyword:{' '}
              <span className='text-orange-600'>{keyword}</span>
            </h1>
            <Filter
              data={data}
              setFiltered={setFiltered}
              active={active}
              setActive={setActive}
            />
            {currentData?.length > 0 ? (
              <motion.div
                layout
                className={`${
                  currentData.length > 2 ? 'grid-cols-fit' : 'grid-cols-2'
                } grid gap-x-4 gap-y-6`}
                style={{ alignItems: 'start' }}
              >
                {currentData.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className='relative group dark:bg-slate-600 bg-slate-300 leading-[0] rounded-lg'
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
                        data-tooltip={item.name}
                      >
                        <h1 className='whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-lg rounded-bl-lg group-hover:text-orange-500 overflow-hidden leading-[2]'>
                          {item?.name}
                        </h1>
                      </div>
                      <LazyLoadImage
                        className='w-full object-cover rounded-lg transition group-hover:brightness-90 bg-slate-800 min-h-[50vh]'
                        src={item?.coverVerticalUrl}
                        effect='opacity'
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <img className='w-1/2 m-auto' src='/images/no-data.svg' alt='' />
            )}
            <ReactPaginate
              className='flex py-4 px-4 mb-8 justify-center select-none'
              pageClassName='px-2 font-medium hover:bg-orange-600 hover:text-white rounded-md mx-1'
              activeClassName='bg-orange-600 text-white rounded-md'
              disabledClassName='opacity-40'
              disabledLinkClassName='text-slate-600'
              previousClassName='px-2 font-medium flex items-center'
              nextClassName='px-2 font-medium flex items-center'
              breakLabel='...'
              nextLabel={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              // onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              previousLabel={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              renderOnZeroPageCount={null}
            />
          </div>
        ) : (
          <div className='pt-24 pb-5 px-4 overflow-hidden w-full'>
            <Skeleton className='w-[70%] h-7 mb-4' />
            <Skeleton className='w-[40%] h-7 mb-4' />
            <div className='grid grid-cols-fit gap-x-4 gap-y-6'>
              {[...new Array(10)].map((_, index) => (
                <Skeleton
                  key={index}
                  className=' mb-4 px-2 rounded-lg h-[30vh]'
                ></Skeleton>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Result;
