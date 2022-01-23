import { useEffect, useState } from "react";
import { searchKeywords, searchWithKeyword } from "../../services/search";

function Search() {
  const [data, setData] = useState();

  useEffect(() => {
    searchKeywords('spider').then(res => setData(res));
  }, [])
  console.log(data)

  // setTimeout(async () => {
  //   searchWithKeyword('spider').then(res => console.log(res));
  // }, 2000)
  
  return (
    <>
      <div className='dark:bg-slate-700 bg-slate-100 dark:border-transparent border border-slate-300 relative flex items-center rounded-full px-3 py-2 justify-end flex-1 focus-within:border-orange-500'>
        <input
          type='text'
          className='border border-transparent focus:border-transparent
                      focus:outline-none bg-transparent placeholder:italic h-full w-full dark:text-white'
          placeholder='Search name of movies...'
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
    </>
  );
}

export default Search;
