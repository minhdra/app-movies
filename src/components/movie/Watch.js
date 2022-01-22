import { Link } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';
import Player from './Player';

function Watch({ data, sources, subtitles, episodeIndex }) {
  console.log(data);
  return (
    <>
      <div className='flex md:flex-row dark:bg-slate-900 min-h-screen px-4'>
        <Sidebar show={false} />
        <div className='pt-24 p-4 w-full'>
          <div className='flex'>
            <div className='w-full'>
              <h1 className='text-xl font-bold pb-4'>
                <span className=''>{data?.name}</span>
              </h1>
              <div className='w-full my-4'>
                {data && sources && subtitles ? (
                  <Player data={data} sources={sources} subtitles={subtitles} />
                ) : (
                  <div>Error 😥😥😥</div>
                )}
              </div>
              <div>
                {/* Episodes */}
                <div>
                  <h2 className='text-lg font-medium py-1'>
                    You watching episode {episodeIndex}
                  </h2>
                  <div className='max-h-[90px] overflow-auto'>
                    {data &&
                      data.episodeVo.map((_, index) => (
                        <Link
                          key={index}
                          to={`/tv/${data.id}?episode=${index + 1}`}
                          className={`w-[35px] h-[35px] leading-none inline-flex items-center justify-center rounded-lg mr-1 my-1 border border-slate-300 hover:bg-orange-500 hover:text-white transition duration-75 ${
                            index + 1 === episodeIndex
                              ? 'bg-orange-500 text-white'
                              : ''
                          }`}
                          type='button'
                        >
                          {index + 1}
                        </Link>
                      ))}
                  </div>
                </div>
                {/* Information */}
                <div className='py-4'>
                  <h3 className='text-2xl font-bold'>
                    Information of {data?.name}
                  </h3>
                  <div className='py-2'>
                    <span className='inline-flex items-center mr-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-yellow-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                      {data?.score}
                    </span>
                    <span className='inline-flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-red-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      {data?.year}
                    </span>
                  </div>
                  <div className='py-2'>
                    {data &&
                      data.tagList.map((item) => (
                        <Link
                          key={item.id}
                          to={`/category/${item.name.toLowerCase()}?id=${
                            item.id
                          }`}
                          className='rounded-full py-2 px-4 border-slate-500 border bg-slate-200 dark:bg-gray-700 mr-2 dark:hover:bg-gray-800'
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                  <div className='py-2 leading-5 text-justify text-md text-slate-200'>
                    {data?.introduction}
                  </div>
                </div>
                {/* Comment */}
                <div>
                  <h2 className='text-lg font-medium py-1'>Comments</h2>
                  Functions are under construction
                </div>
              </div>
            </div>
            <div className='w-[250px] h-screen overflow-auto flex-shrink-0 pl-4 hidden md:block'>
              <h1 className='text-xl font-bold pb-4'>Can you will like?</h1>
              <div className='my-4'>
                {data && data.likeList.map(item => (
                  <div key={item.id}>
                    <Link
                      to={`/${item.category === 0 ? `movie/${item.id}` : `tv/${item.id}?episode=1`}`}
                      className='inline-flex justify-start items-start overflow-hidden hover:brightness-75'
                    >
                      <img className='w-[70px] h-[100px] object-cover flex-shrink-0' src={item?.coverVerticalUrl} alt='' />
                      <div className='px-2 leading-none w-full text-ellipsis break-words h-full flex flex-col justify-between'>
                        <h5 className='pb-3 break-words text-ellipsis w-full'>{ item?.name }</h5>
                        <span>{ item?.year }</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;
