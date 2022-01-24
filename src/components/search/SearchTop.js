import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchKeywords } from '../../services/search';
import { formatResultSearch } from '../../utils/utils';
import Overlay from '../shared/Overlay';

function SearchTop() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    searchKeywords(keyword).then((res) => setData(formatResultSearch(res)));
  }, [keyword]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setToggleSearch(false);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  function toggle() {
    setKeyword('');
    // setToggleSearch(false);
  }

  return (
    <>
      <div className='flex relative items-center justify-end z-50'>
        <div className='hidden md:flex dark:bg-slate-700 bg-slate-100 dark:border-transparent border border-slate-300 focus-within:border-orange-500 rounded-full px-3 py-2'>
          <input
            type='text'
            className='border border-transparent focus:border-transparent
                        focus:outline-none bg-transparent placeholder:italic h-full w-full dark:text-white'
            placeholder='Search name of movies...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <span className='cursor-pointer inline-block text-gray-800'>
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
          </span>
        </div>

        {data?.length > 0 && !toggleSearch && (
          <>
            <div className='absolute left-0 top-full max-h-40 w-full overflow-auto dark:bg-slate-900 bg-slate-100 border-slate-300 text-slate-800 dark:text-slate-200 py-4 border dark:border-slate-700 rounded-lg z-50'>
              {data.map((item, index) => (
                <div className='overflow-hidden' key={index}>
                  <Link
                    to={`/search?keyword=${item}`}
                    className='inline-block hover:text-orange-500 dark:hover:bg-slate-700 hover:bg-slate-200 w-full whitespace-nowrap px-4 text-ellipsis'
                    onClick={() => setKeyword('')}
                    title={item}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
            <Overlay onClick={toggle} />
          </>
        )}
      </div>

      <div
        className='rounded-full relative p-1 ml-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 md:hidden'
        onClick={() => setToggleSearch(true)}
      >
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
      </div>
      {toggleSearch && (
        <div className='focus-within:border-orange-500 md:hidden fixed inset-0 dark:bg-slate-900 bg-slate-200 z-10'>
          <span
            className='text-3xl font-medium dark:text-slate-200 p-4 absolute top-0 right-0 leading-none cursor-pointer'
            onClick={() => setToggleSearch(false)}
          >
            &times;
          </span>
          <div className='w-screen h-screen flex flex-col items-center justify-center'>
            {/* Brand */}
            <h1 className='py-4'>
              <div className='flex items-center'>
                <Link
                  className='toggleColour text-gray-800 no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex items-end'
                  to='/'
                >
                  {/* Icon from: http://www.potlabicons.com/ */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 inline'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z'
                    />
                  </svg>
                  DRA
                </Link>
              </div>
            </h1>
            <div className='dark:bg-slate-700 bg-slate-100 dark:border-transparent border border-slate-300 relative flex items-center rounded-full px-3 py-2 justify-end focus-within:border-orange-500 '>
              <input
                type='text'
                className='border border-transparent focus:border-transparent
                            focus:outline-none bg-transparent placeholder:italic h-full w-full dark:text-white'
                placeholder='Search name of movies...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <span className='cursor-pointer inline-block text-gray-800'>
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
              </span>

              {data?.length > 0 && toggleSearch && (
                <>
                  <div className='absolute left-0 top-full max-h-40 w-full overflow-auto dark:bg-slate-900 bg-slate-100 border-slate-300 text-slate-800 dark:text-slate-200 py-4 border dark:border-slate-700 rounded-lg z-50'>
                    {data.map((item, index) => (
                      <div className='overflow-hidden' key={index}>
                        <Link
                          to={`/search?keyword=${item}`}
                          className='inline-block hover:text-orange-500 dark:hover:bg-slate-700 hover:bg-slate-200 w-full whitespace-nowrap px-4 text-ellipsis'
                          onClick={() => { setKeyword(''); setToggleSearch(false); }}
                          title={item}
                        >
                          {item}
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchTop;
