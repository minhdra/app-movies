import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import Skeleton from '../components/shared/Skeleton';
import ReactPaginate from 'react-paginate';

function History() {
  const [data, setData] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (window.innerWidth > 1280) return 8;
    else if (window.innerWidth > 768) return 9;
    else return 8;
  });
  const [currentData, setCurrentData] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    if (data)
    {
      const endOffset = itemOffset + itemsPerPage;
      // console.log(itemOffset, endOffset)
      setCurrentData(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  // console.log(currentData)

  useEffect(() => {
    const handleResize = (e) => {
      if (e.target.innerWidth > 1024) setItemsPerPage(8);
      else if (e.target.innerWidth > 918) setItemsPerPage(9);
      else setItemsPerPage(8);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('history')) || [];
    setData(data);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('history');
    setData([]);
  };

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Header />
      <div className='flex flex-col min-h-screen'>
        {currentData ? (
          <div className='pt-24 pb-5 px-4 overflow-hidden w-full'>
            <div className='flex justify-between pb-4'>
              <h1 className='text-2xl font-bold'>Your history recent</h1>
              <button
                className='text-md text-orange-600 font-medium hover:underline'
                onClick={handleClearHistory}
              >
                Clear history
              </button>
            </div>
            {currentData?.length > 0 ? (
              <motion.div
                layout
                className={`${
                  currentData.length > 4 ? 'grid-cols-fit' : 'grid-cols-4'
                } grid gap-x-4 gap-y-6`}
              >
                {currentData.map((item) => (
                  <motion.div layout key={item?.id} className='relative group'>
                    <Link
                      to={`${
                        item?.category === 1
                          ? `/tv/${item?.id}?episode=1`
                          : `/movie/${item?.id}`
                      }`}
                      className='block'
                    >
                      <div className='!absolute bottom-[10px] left-0 z-10 w-full'>
                        <h1 className='whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-lg rounded-bl-lg group-hover:text-orange-500 overflow-hidden'>
                          {item?.name}
                        </h1>
                      </div>
                      <LazyLoadImage
                        className='w-full object-cover rounded-lg transition group-hover:brightness-90 bg-slate-800'
                        src={item?.image}
                        effect='opacity'
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
              {[...new Array(10)].map((_, index) => (
                <Skeleton
                  key={index}
                  className=' mb-4 px-2 rounded-lg h-[80vh]'
                ></Skeleton>
              ))}
            </div>
          </div>
        )}
        <ReactPaginate
          className='flex px-4 mb-8 justify-center select-none'
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
      <Footer />
    </>
  );
}

export default History;
