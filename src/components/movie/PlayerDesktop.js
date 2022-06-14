import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { srt2wtt } from '../../utils/utils';
import Controls from '../shared/Controls';

function PlayerDesktop({
  data,
  sources,
  subtitles,
  episodeIndex,
  light,
  autoPlay,
  nextRef,
}) {
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('history')) || [];
  })
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  
  const navigate = useNavigate(); 

  const playerRef = useRef();
  const containerRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    if (!playing) setShowControls(true);
  }, [playing]);

  return (
    <div
      className={`relative w-full h-0 pb-[56.25%] overflow-hidden ${
        !light ? 'z-[60]' : ''
      }`}
    >
      <div
        ref={containerRef}
        onMouseMove={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setShowControls(true);
          timeoutRef.current = setTimeout(() => {
            if (playing) setShowControls(false);
          }, 2000);
        }}
        onMouseLeave={() => {
          if (playing) setShowControls(false);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        className='absolute top-0 left-0 w-full h-full flex justify-center items-center group bg-black'
      >
        <ReactPlayer
          ref={playerRef}
          width={'100%'}
          height={'100%'}
          url={sources[0]?.url}
          volume={volume / 100}
          playing={playing}
          playbackRate={playbackRate}
          onReady={(e) => {
            const index = history.findIndex((item) => item.id === data?.id);
            if (index !== -1)
            {
              setCurrentTime(history[index].time??0);
              playerRef.current.seekTo(history[index].time??0, 'seconds');
            }
          }}
          onDuration={(duration) => setDuration(duration)}
          onStart={() => {
            
          }}
          onProgress={(item) => {
            if (playing)
            {
              setCurrentTime(item.playedSeconds);
              const currentMovie = {
                id: data?.id,
                name: data?.name,
                image: data?.coverVerticalUrl,
                category: data?.category,
                time: currentTime,
                episode: episodeIndex
              }
              const index = history.findIndex((item) => item.id === currentMovie.id);
              if (index===-1)
              {
                history.unshift(currentMovie);
                setHistory(history);
              }
              else 
                history[index] = currentMovie;
              localStorage.setItem('history', JSON.stringify(history));
            }
          }}
          onEnded={() => {
            if (autoPlay) {
              if (
                episodeIndex &&
                episodeIndex < data?.episodeVo?.length &&
                nextRef.current
              )
                nextRef.current.click();
            } else setPlaying(false);

            const index = history.findIndex((item) => item.id === data?.id);
            history[index].time = 0;
            localStorage.setItem('history', JSON.stringify(history));
          }}
          config={{
            file: {
              attributes: {
                crossOrigin: '',
                poster: data?.coverHorizontalUrl,
              },
              tracks: subtitles.map((item, index) => ({
                kind: 'subtitles',
                src: srt2wtt(item?.url),
                srcLang: item?.language,
                default: index === 0 ? true : false,
              })),
            },
          }}
          onError={(e) => {
            console.log('Sorry... 😢');
            navigate(0);
          }}
        />
        <Controls
          playerRef={playerRef}
          playing={playing}
          setPlaying={setPlaying}
          duration={duration}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          volume={volume}
          setVolume={setVolume}
          subtitles={subtitles}
          currentSubtitle={currentSubtitle}
          setCurrentSubtitle={setCurrentSubtitle}
          setPlaybackRate={setPlaybackRate}
          playbackRate={playbackRate}
          episodeIndex={episodeIndex}
          data={data}
          containerRef={containerRef}
          showControls={showControls}
        />
      </div>
    </div>
  );
}

export default PlayerDesktop;
