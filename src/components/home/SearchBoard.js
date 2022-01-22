import { Link } from 'react-router-dom';

function SearchBoard({ data }) {
  return (
    <div className='hidden md:block w-[30%] pt-24 pl-4 h-screen overflow-hidden overflow-y-auto sticky top-0'>
      {/* Head */}
      <div className='flex items-end pb-4 z-30 bg-white shadow dark:bg-slate-900'>
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
          {data.map((item) => (
            <li key={item.id}>
              <Link
                to={`${item.domainType ? '/tv' : '/movie'}/${item.id}`}
                className='flex justify-start items-start py-1 hover:text-orange-600 hover:bg-slate-200 dark:hover:opacity-80 dark:hover:text-white dark:hover:bg-transparent hover:font-medium'
              >
                <div className='w-[100px] h-[60px] overflow-hidden transition flex-shrink-0'>
                  <img
                    className='w-[100px] h-[60px] rounded-lg object-cover'
                    src={item.cover}
                    alt=''
                  />
                </div>
                <h2 className='text-md pl-4 pr-2 transition'>{item.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBoard;
