import { useEffect, useRef, useState } from 'react';
import { searchAdvanced } from '../../services/searchAdvanced';
import Skeleton from '../shared/Skeleton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPaginate from 'react-paginate';

export default function ResultAdvanced({ config, name }) {
  const [data, setData] = useState();
  const [root, setRoot] = useState();
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    if (name) {
      const params = {
        params: name,
        area,
        category,
        year,
      };
      searchAdvanced(params).then((res) => {
        setData(res);
        setRoot(res);
        handleSearch();
      });
    }
  }, [area, category, year, name]);

  // Filter
  const handleOptionChange = (event, item) => {
    if (item.name.toLowerCase() === 'all regions') setArea(event.target.value);
    else if (item.name.toLowerCase() === 'all categories')
      setCategory(event.target.value);
    else if (item.name.toLowerCase() === 'all time periods')
      setYear(event.target.value);
  };

  // Search in page
  const handleSearch = () => {
    const list = root?.filter(
      (item) => item.name.indexOf(searchRef.current?.value) !== -1
    );
    setData(list);
  };

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
    if (data) {
      const endOffset = itemOffset + itemsPerPage;
      // console.log(itemOffset, endOffset)
      setCurrentData(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
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
    <div className='flex dark:bg-slate-900 min-h-screen'>
      <div className='pt-24 pb-5 px-4 overflow-hidden w-full'>
        <div className='flex justify-between'>
          {config ? (
            <>
              {config.length > 0 ? (
                <>
                  <div className='flex'>
                    {config.map((item) => (
                      <div key={item.id}>
                        <select
                          className='mt-1 block py-2 px-3 border border-gray-300 bg-white dark:bg-slate-600 dark:border-slate-600 font-medium rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-4'
                          onChange={(e) => handleOptionChange(e, item)}
                        >
                          {item &&
                            item.items.map((i) => (
                              <option
                                key={i.params}
                                value={i.params}
                                className='font-medium'
                              >
                                {i.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      className='border border-transparent focus:border-transparent
                                focus:outline-none bg-slate-200 dark:bg-slate-600 placeholder:italic h-full w-full dark:text-white px-4 rounded-tl rounded-bl'
                      placeholder='Quick search...'
                      onChange={handleSearch}
                      ref={searchRef}
                    />
                    <label className='inline-flex items-center justify-center bg-slate-200 text-gray-800 px-4 dark:bg-slate-600 h-full rounded-tr rounded-br'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                      </svg>
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className='flex'>
              <Skeleton className='w-[15%] rounded-md h-10 mr-4' />
              <Skeleton className='w-[15%] rounded-md h-10 mr-4' />
              <Skeleton className='w-[15%] rounded-md h-10 mr-4' />
            </div>
          )}
        </div>

        <div className='py-8'>
          {currentData ? (
            <>
              {currentData?.length > 0 ? (
                <>
                  <motion.div
                    layout
                    className={`${
                      currentData.length > 2 ? 'grid-cols-fit' : 'grid-cols-2'
                    } grid gap-x-4 gap-y-6`}
                  >
                    {currentData.map((item) => (
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
                          <div className='!absolute bottom-[10px] left-0 z-10 w-full'>
                            <h1 className='whitespace-nowrap text-ellipsis bg-black text-white text-md font-medium bg-opacity-60 p-2 text-center rounded-br-lg rounded-bl-lg group-hover:text-orange-500 overflow-hidden'>
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
                </>
              ) : (
                <img
                  className='w-1/2 m-auto'
                  src='/images/no-data.svg'
                  alt=''
                />
              )}
            </>
          ) : (
            <div className=''>
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
      </div>
    </div>
  );
}
