import { Link, useNavigate } from 'react-router-dom';
import PlayerDesktop from './PlayerDesktop';
import Skeleton from '../shared/Skeleton';
import { isMobile } from '../../utils/utils';
import PlayerMobile from './PlayerMobile';
import SimilarMovie from './SimilarMovie';
import { useEffect, useRef, useState } from 'react';
import Overlay from '../shared/Overlay';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import React from 'react';

function Watch({ data, sources, subtitles, episodeIndex }) {
  const [light, setLight] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const nextRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    if (history.length > 0) {
      const item = history.find((item) => item.id === data?.id);
      if (item && item.episode && item.episode !== episodeIndex) {
        if (
          window.confirm(
            `Last episode is ${item.episode}. Do you wanna to go this episode?`
          )
        ) {
          navigate(`/tv/${item.id}?episode=${item.episode}`, { replace: true });
        } else {
          item.time = 0;
          setIsConfirmed(true);
        }
      } else setIsConfirmed(true);
    } else setIsConfirmed(true);
    localStorage.setItem('history', JSON.stringify(history));
  }, [data]);

  const handleChangeEpisode = (i) => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    if (history.length > 0) {
      const index = history.findIndex((item) => item.id === data?.id);
      if (index !== -1) {
        history[index].time = 0;
        history[index].episode = i;
        localStorage.setItem('history', JSON.stringify(history));
      }
    }
  };

  return (
    <>
      <Header />
      {!light && <Overlay opacity={100} zIndex={40} />}
      <div className='flex md:flex-row dark:bg-slate-900 min-h-screen px-4'>
        <div className='pt-24 lg:px-4 w-full'>
          <div className='md:flex'>
            <div className='w-full md:pr-4 md:border-r md:border-slate-400'>
              <div className={`w-full mb-4`}>
                {data && sources && subtitles && isConfirmed ? (
                  isMobile() ? (
                    <PlayerMobile
                      data={data}
                      sources={sources}
                      subtitles={subtitles}
                      episodeIndex={episodeIndex}
                      light={light}
                      autoPlay={autoPlay}
                      nextRef={nextRef}
                    />
                  ) : (
                    <PlayerDesktop
                      data={data}
                      sources={sources}
                      subtitles={subtitles}
                      episodeIndex={episodeIndex}
                      light={light}
                      autoPlay={autoPlay}
                      nextRef={nextRef}
                    />
                  )
                ) : (
                  <div className='w-full h-0 pb-[56.25%] relative'>
                    <Skeleton className='absolute top-0 left-0 w-full h-full' />
                  </div>
                )}
              </div>
              {/* Button suggestion */}
              <div className='flex flex-wrap items-center justify-center'>
                <button
                  className={`rounded-md border border-slate-600 px-3 mr-2 mb-2 hover:bg-orange-600 hover:border-orange-600 flex items-center ${
                    !light && 'z-[60]'
                  }`}
                  onClick={() => setLight(!light)}
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
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                  {light ? 'Turn off light' : 'Turn on light'}
                </button>
                {episodeIndex && (
                  <>
                    <Link
                      to={`/tv/${data?.id}?episode=${episodeIndex - 1}`}
                      className={`rounded-md border border-slate-600 px-3 mr-2 mb-2 hover:bg-orange-600 hover:border-orange-600 flex items-center ${
                        episodeIndex && episodeIndex > 1
                          ? ''
                          : 'pointer-events-none'
                      }`}
                      onClick={() => handleChangeEpisode(episodeIndex - 1)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Previous episode
                    </Link>
                    <Link
                      ref={nextRef}
                      to={`/tv/${data?.id}?episode=${episodeIndex + 1}`}
                      className={`rounded-md border border-slate-600 px-3 mr-2 mb-2 hover:bg-orange-600 hover:border-orange-600 flex items-center ${
                        episodeIndex && episodeIndex < data?.episodeVo?.length
                          ? ''
                          : 'pointer-events-none'
                      }`}
                      onClick={() => handleChangeEpisode(episodeIndex + 1)}
                    >
                      Next episode
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                          clipRule='evenodd'
                        />
                        <path
                          fillRule='evenodd'
                          d='M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </Link>
                    <button
                      className='rounded-md border border-slate-600 px-3 mr-2 mb-2 hover:bg-orange-600 hover:border-orange-600 flex items-center'
                      onClick={() => setAutoPlay(!autoPlay)}
                    >
                      Auto play: {autoPlay ? 'On' : 'Off'}
                    </button>
                  </>
                )}
                <button className='rounded-md border border-slate-600 px-3 mr-2 mb-2 hover:bg-orange-600 hover:border-orange-600 flex items-center'>
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
                      strokeWidth={2}
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Report
                </button>
                <button className='rounded-md border border-slate-600 px-3 mr-2 mb-2 hover:bg-orange-600 hover:border-orange-600 flex items-center'>
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
                      strokeWidth={2}
                      d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                    />
                  </svg>
                  Share
                </button>
              </div>
              <div>
                {/* Episodes */}
                {episodeIndex && (
                  <div>
                    <h2 className='text-lg font-medium py-1'>
                      You watching episode {episodeIndex}
                    </h2>
                    <div className='max-h-[200px] overflow-auto'>
                      {data &&
                        data.episodeVo.map((_, index) => (
                          <React.Fragment key={index}>
                            {index + 1 === episodeIndex ? (
                              <span className='bg-orange-500 text-white w-[35px] h-[35px] leading-none inline-flex items-center justify-center rounded-lg mr-1 my-1 border border-slate-300 hover:bg-orange-500 hover:text-white transition duration-75'>
                                {index + 1}
                              </span>
                            ) : (
                              <Link
                                to={`/tv/${data.id}?episode=${index + 1}`}
                                className={`w-[35px] h-[35px] leading-none inline-flex items-center justify-center rounded-lg mr-1 my-1 border border-slate-300 hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition duration-75 ${
                                  index + 1 < episodeIndex
                                    ? 'dark:bg-slate-600 dark:text-white bg-slate-300 '
                                    : ''
                                }`}
                                type='button'
                                onClick={() => handleChangeEpisode(index + 1)}
                              >
                                {index + 1}
                              </Link>
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                )}
                {/* Information */}
                <div className='py-4'>
                  <h3 className='text-xl font-bold'>
                    Information of {data?.name}
                  </h3>
                  <div className='py-2'>
                    <span className='inline-flex items-center mr-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 !text-yellow-400'
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
                        className='h-6 w-6 !text-red-600'
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
                  <div className='py-2 flex flex-wrap'>
                    {data &&
                      data.tagList.map((item) => (
                        <Link
                          key={item.id}
                          to={`/category/${item.name.toLowerCase()}?id=${
                            item.id
                          }`}
                          className='rounded-lg py-1 px-2 border-slate-500 border bg-slate-200 dark:bg-gray-700 mr-2 mb-2 dark:hover:bg-gray-800'
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                  <div className='py-2 leading-5 text-justify text-md'>
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
            <div
              className={`md:w-max-fit md:w-[300px] md:h-screen overflow-hidden hover:overflow-auto flex-shrink-0 md:pl-4 md:block`}
            >
              <SimilarMovie data={data} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Watch;
