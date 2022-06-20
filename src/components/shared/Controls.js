import { motion } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/controls.scss';
import screenfull from 'screenfull';
import { formatTime } from '../../utils/utils';

const listPlaybackRate = [0.25, 0.5, 1, 1.5, 2];

function Controls({
  playerRef,
  playing,
  setPlaying,
  duration,
  currentTime,
  setCurrentTime,
  volume,
  setVolume,
  subtitles,
  currentSubtitle,
  setCurrentSubtitle,
  setPlaybackRate,
  playbackRate,
  episodeIndex,
  data,
  containerRef,
  showControls
}) {
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    fullscreen
    ? screenfull.request(playerRef.current?.wrapper?.parentElement, {
      navigationUI: 'hide',
    })
    : screenfull.exit();
  }, [fullscreen, playerRef]);
  
  const fullScreenRef = useRef();
  const progress = useRef(null);
  const nextRef = useRef();
  const prevRef = useRef();
  const spaceRef = useRef();

  const handleChangeSubtitle = (index) => {
    if (playerRef.current) {
      const video = playerRef.current.wrapper.children[0];
      video.textTracks[currentSubtitle].mode = 'disabled';
      video.textTracks[index].mode = 'showing';
      setCurrentSubtitle(index);
    }
  };
  
  useEffect(() => {
    function handleKeyPress(e) {
      if (document.contains(document.activeElement))
      {
        document.activeElement?.blur();
      }
      switch (e.keyCode) {
        case 32:
          e.preventDefault();
          spaceRef.current?.click();
          break;
        case 39:
          nextRef.current?.click();
          break;
        case 37:
          prevRef.current?.click();
          break;
        case 70:
          fullScreenRef.current?.click();
          break;
        default:
          console.log();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () =>
      window.removeEventListener("keydown", handleKeyPress);
  }, [containerRef]);

  return (
    <div className={`absolute top-0 left-0 bg-black bg-opacity-40 w-full px-2 h-full flex flex-col justify-between text-white ${showControls ? '' : 'hidden'}`}>
      {/* Top controls */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ bounce: 0 }}
        className='flex justify-between items-center py-2'
      >
        <h1 className='text-lg font-medium'>{data.name} { episodeIndex ? ` - Episode ${episodeIndex}`:'' }</h1>
      </motion.div>
      {/* Middle controls */}
      <div className='flex justify-center'>
        <button
          className='px-3'
          data-tooltip='Previous 10s'
          ref={prevRef}
          onClick={() => {
            if (currentTime >= 10) {
              setCurrentTime(currentTime - 10);
              playerRef.current?.seekTo(currentTime - 10, 'seconds');
            }
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
            />
          </svg>
        </button>
        <button
          className='px-3'
          ref={spaceRef}
          data-tooltip={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          )}
        </button>
        <button
          className='px-3'
          ref={nextRef}
          data-tooltip='Next 10s'
          onClick={() => {
            if (currentTime + 10 > duration) {
              setCurrentTime(duration);
              playerRef.current?.seekTo(duration, 'seconds');
            } else {
              setCurrentTime(currentTime + 10);
              playerRef.current?.seekTo(currentTime + 10, 'seconds');
            }
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 5l7 7-7 7M5 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
      {/* Bottom controls */}
      <div className='flex flex-col justify-between items-center p-4 select-none'>
        <div className='range w-full mb-2'>
          <Slider
            ref={progress}
            max={Math.ceil(duration)}
            defaultValue={0}
            value={currentTime}
            onChange={(v) => {
              setCurrentTime(v);
              playerRef.current?.seekTo(parseFloat(v), 'seconds');
            }}
          />
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-x-3'>
            <button onClick={() => setPlaying(!playing)}>
              {playing ? (
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
                    d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              ) : (
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
                    d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              )}
            </button>
            {episodeIndex && (
              <Link
                to={`/tv/${data?.id}?episode=${episodeIndex + 1}`}
                className={
                  episodeIndex && episodeIndex < data?.episodeVo?.length
                    ? ''
                    : 'pointer-events-none'
                }
              >
                Next
              </Link>
            )}
            <div className='flex'>
              <span className='font-bold'>
                {formatTime(currentTime).timeResult}
              </span>
              <span className='hidden md:block'>
                /{formatTime(duration).timeResult}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-x-3'>
            <div className='relative volume flex justify-center items-center'>
              <button
                onClick={() => setVolume((prev) => (prev === 0 ? 100 : 0))}
              >
                {volume > 0 ? (
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
                      d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                    />
                  </svg>
                ) : (
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
                      d='M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                      clipRule='evenodd'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2'
                    />
                  </svg>
                )}
              </button>
              <div className='!absolute top-[-150%] -translate-y-1/2 volume-slider px-2 py-3 bg-black bg-opacity-60 rounded-md hidden'>
                <Slider
                  className='!h-[50px]'
                  max={100}
                  defaultValue={100}
                  value={volume}
                  vertical={true}
                  onChange={(v) => {
                    setVolume(v);
                  }}
                />
              </div>
            </div>
            <div className='relative speed cursor-pointer'>
              <span className='font-bold'>x{playbackRate}</span>
              <div className='speed-list !absolute top-[-280%] left-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-3 bg-black bg-opacity-60 rounded-md hidden min-w-[50px] max-h-[200px] overflow-y-auto'>
                <div className='flex flex-col justify-center items-center'>
                  {listPlaybackRate.map((item) => (
                    <span
                      key={item}
                      className={`hover:font-bold hover:text-orange-600 ${
                        playbackRate === item ? 'font-bold text-orange-600' : ''
                      }`}
                      onClick={() => setPlaybackRate(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className='relative subtitle cursor-pointer flex justify-center items-center'>
              <button>
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
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                  />
                </svg>
              </button>
              <div className='subtitle-list !absolute top-[-420%] left-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-3 bg-black bg-opacity-60 rounded-md hidden overflow-auto h-[200px] max-w-[125px]'>
                <div className='flex flex-col overflow-hidden'>
                  {subtitles?.map((sub, index) => (
                    <span
                      key={index}
                      className={`hover:font-bold overflow-hidden whitespace-nowrap text-ellipsis ${
                        currentSubtitle === index
                          ? 'font-bold text-orange-600'
                          : ''
                      }`}
                      onClick={() => handleChangeSubtitle(index)}
                    >
                      {sub?.language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button ref={fullScreenRef} onClick={() => setFullscreen(!fullscreen)}>
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
                  d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
