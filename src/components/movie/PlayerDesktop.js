import { useEffect, useState, useRef } from 'react';
import HlsPlayer from 'react-hls-player';
import { formatTime, srt2wtt } from '../../utils/utils';
import screenfull from 'screenfull';

function PlayerDesktop({ sources, subtitles }) {
  const [quality, setQuality] = useState(0);
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showControl, setShowControl] = useState(true);
  const [loadedData, setLoadedData] = useState(false);

  const playerRef = useRef();
  const containerRef = useRef();
  const timeoutRef = useRef(null);

  useEffect(() => {
    paused ? playerRef.current.pause() : playerRef.current.play();
  }, [paused]);

  useEffect(() => {
    playerRef.current && (playerRef.current.volume = volume / 100);
  }, [volume]);

  useEffect(() => {
    playerRef.current && setDuration(playerRef.current.duration);
  }, [duration]);

  useEffect(() => {
    const element = containerRef.current;
    if (element) fullScreen ? screenfull.request(element) : screenfull.exit();
  }, [fullScreen]);

  useEffect(() => {
    playerRef.current && (playerRef.current.playbackRate = speed);
  }, [speed]);

  useEffect(() => {
    setPaused(true);
    setTime(0);
    playerRef.current && (playerRef.current.currentTime = 0);
  }, [sources]);

  const handleScreenClicked = (e) => {
    if (showAdvancedSetting) {
      setShowAdvancedSetting(false);
    } else {
      setPaused(!paused);
    }

    // if (e.detail === 2) {
    //   // setOnFullScreen((prev) => !prev);
    // }
  };

  const handleSeekTime = (e) => {
    let timeCurrent;
    if (typeof e === 'number') {
      timeCurrent = playerRef.current?.currentTime;
      timeCurrent += e;
    } else timeCurrent = +e.target.value;
    setTime(timeCurrent);
    playerRef.current && (playerRef.current.currentTime = timeCurrent);
  };

  const joinTime = (time) => {
    const result = formatTime(time);
    return result.hours + ':' + result.minutes + ':' + result.seconds;
  };

  return (
    <div className='relative w-full h-0 pb-[56.25%] overflow-hidden'>
      <div
        className='absolute top-0 left-0 w-full h-full flex justify-center items-center group bg-black'
        ref={containerRef}
        onMouseMove={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setShowControl(true);
          playerRef.current?.classList.remove('cursor-none');
          timeoutRef.current = setTimeout(() => {
            playerRef.current?.classList.add('cursor-none');
            setShowControl(false);
            setShowAdvancedSetting(false);
          }, 1000);
        }}
        onMouseLeave={() => {
          playerRef.current?.classList.remove('cursor-none');
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setShowControl(false);
          setShowAdvancedSetting(false);
        }}
      >
        <HlsPlayer
          // Access bad url
          crossOrigin=''
          src={sources[quality]?.url || ''}
          playerRef={playerRef}
          onClickCapture={handleScreenClicked}
          className='w-full h-full cursor-pointer'
          autoPlay={false}
          controls={false}
          playsInline
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          onLoadedData={() => {
            setLoadedData(true);
            setDuration(playerRef.current?.duration || 0);
            setTime(0);
            playerRef.current && (playerRef.current.currentTime = 0);
          }}
          onTimeUpdate={() => {
            setTime(playerRef.current?.currentTime || 0);
            setDuration(playerRef.current?.duration || 0);
          }}
        >
          {subtitleIndex >= 0 && loadedData && (
            <track
              kind='subtitles'
              srcLang='sub'
              label='Subtitle'
              src={subtitles ? srt2wtt(subtitles[subtitleIndex]?.url) : ''}
              default
            />
          )}
        </HlsPlayer>
        <>
          {loading && !paused && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
              <div className='border-white border-4 border-r-transparent w-12 h-12 rounded-full animate-spin'></div>
            </div>
          )}
        </>
        <>
          {paused && (
            <div
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'
              onClickCapture={handleScreenClicked}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-[50px] w-[50px] text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          )}
        </>
        {/* Control */}
        <div
          className={`h-12 w-full absolute translate-y-full opacity-0 bottom-0 left-0 bg-black bg-opacity-40 text-white px-4 transition ${
            showControl ? 'translate-y-0 opacity-100' : ''
          } duration-300`}
        >
          {/* seek */}
          <div className='w-full absolute top-0 left-0 -translate-y-1/2'>
            <div className='relative h-2'>
              <div className='overflow-hidden h-2 w-[99%] m-auto text-xs flex rounded bg-orange-200'>
                <div
                  style={{
                    width: `${Math.round((time / duration) * 1000) / 10}%`,
                  }}
                  className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500'
                ></div>
              </div>
              <input
                className='absolute -top-1 w-full cursor-pointer m-0 peer bg-transparent appearance-none'
                id='seek'
                value={time}
                min='0'
                max={duration || '0'}
                type='range'
                step='0.5'
                onInput={handleSeekTime}
              />
              <div
                className='peer-hover:block hidden absolute -top-12 p-1 rounded-lg bg-black bg-opacity-60 text-white ml-2'
                id='seek-tooltip'
              >
                {time ? <span>{joinTime(time)}</span> : '00:00:00'}
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center h-full select-none'>
            {/* Left */}
            <div className='flex items-center h-full'>
              {/* button pause, play */}
              {paused ? (
                <div>
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
                </div>
              ) : (
                <div>
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
                </div>
              )}
              {/* button prev 10s */}
              <div className='px-1' onClick={() => handleSeekTime(-10)}>
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
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
              </div>
              {/* button next 10s */}
              <div className='px-1' onClick={() => handleSeekTime(10)}>
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
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </div>
              {/* button volume */}
              <div className='px-1 flex h-full items-center'>
                <span
                  className='peer h-full flex items-center'
                  onClick={() => {
                    volume === 0 ? setVolume(100) : setVolume(0);
                  }}
                >
                  {volume === 0 ? (
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
                        d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                      />
                    </svg>
                  )}
                </span>
                <div className='w-0 peer-hover:w-full hover:w-full transition-all duration-300 overflow-hidden flex items-center justify-end volume h-full'>
                  <input
                    className='slider w-[100px]'
                    type='range'
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(+e.target.value)}
                  />
                </div>
              </div>
              {/* Time duration */}
              <div className='px-1'>
                {duration ? (
                  <span>
                    {joinTime(time)} - {joinTime(duration)}
                  </span>
                ) : (
                  <span>00:00:00 - 00:00:00</span>
                )}
              </div>
            </div>
            {/* Right */}
            <div className='flex items-center'>
              {/* Turn toggle subtitle */}
              <div
                className='px-1'
                onClick={() => {
                  subtitleIndex >= 0
                    ? setSubtitleIndex(-1)
                    : setSubtitleIndex(0);
                }}
              >
                {subtitleIndex >= 0 ? (
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                ) : (
                  <span>
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
                        d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                      />
                    </svg>
                  </span>
                )}
              </div>
              {/* Advanced setting */}
              <div className='px-1 relative'>
                <span
                  onClick={() => setShowAdvancedSetting(!showAdvancedSetting)}
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
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </span>
                {/* Dropdown */}
                <div
                  className={`${
                    showAdvancedSetting ? '' : 'hidden'
                  } absolute bottom-full right-0 w-max p-4 bg-black bg-opacity-60 text-white max-w-sm border border-slate-300 rounded-md min-w-[9rem] h-max`}
                >
                  <h1 className='text-md'>Quality</h1>
                  <div className='flex flex-wrap'>
                    {sources.map((item, index) => (
                      <div key={item.quality}>
                        <button
                          className={`rounded-md text-sm py-[0.1rem] px-[0.125rem] mr-1 border border-slate-300 ${
                            quality === index && 'bg-orange-500'
                          }`}
                          onClick={() => {
                            setQuality(index);
                            setPaused(true);
                          }}
                        >
                          {item.quality}p
                        </button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h1 className='text-md mt-2'>Subtitles</h1>
                    <span className='text-orange-500 flex justify-between items-center relative after:w-full after:h-full after:absolute after:top-0 after:-left-1/2 peer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-white flex-shrink-0'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='w-full text-center'>
                        {subtitleIndex >= 0
                          ? subtitles[subtitleIndex]?.language
                          : 'Off'}
                      </span>
                    </span>
                    <div className='absolute left-0 -translate-x-3/4 top-0 bg-black bg-opacity-60 p-4 border border-slate-300 rounded-md h-full overflow-auto invisible peer-hover:visible peer-hover:-translate-x-full hover:visible hover:-translate-x-full transition duration-300'>
                      <span
                        className={`block cursor-pointer hover:text-orange-500 ${
                          subtitleIndex === -1 && 'text-orange-500'
                        }`}
                        onClick={() => setSubtitleIndex(-1)}
                      >
                        Off
                      </span>
                      {subtitles.map((item, index) => (
                        <span
                          key={index}
                          className={`block cursor-pointer hover:text-orange-500 ${
                            index === subtitleIndex ? 'text-orange-500' : ''
                          }`}
                          onClick={() => setSubtitleIndex(index)}
                        >
                          {item.language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h1 className='text-md mt-2'>Speed</h1>
                    <span className='text-orange-500 flex justify-between relative items-center after:w-full after:h-full after:absolute after:top-0 after:-left-1/2 peer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-white flex-shrink-0'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='inline-block w-full text-center'>
                        {speed}x
                      </span>
                    </span>
                    <div className='absolute left-0 -translate-x-3/4 top-0 bg-black bg-opacity-60 p-4 border border-slate-300 rounded-md h-full overflow-auto invisible peer-hover:visible peer-hover:-translate-x-full hover:visible hover:-translate-x-full transition duration-300'>
                      {[...new Array(8)].map((_, index) => (
                        <span
                          key={index}
                          className={`block cursor-pointer hover:text-orange-500 ${
                            speed === (index + 1) / 4 ? 'text-orange-500' : ''
                          }`}
                          onClick={() => setSpeed((index + 1) / 4)}
                        >
                          {(index + 1) / 4}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Toggle expand screen */}
              <div className='px-1' onClick={() => setFullScreen(!fullScreen)}>
                {fullScreen ? (
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                ) : (
                  <span>
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
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDesktop;
