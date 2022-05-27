import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
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
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);

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
          onDuration={(duration) => setDuration(duration)}
          onProgress={(item) => {
            setCurrentTime(item.playedSeconds);
          }}
          onStart={() => {
            const history =
              JSON.parse(localStorage.getItem('history')) || [];
            const currentMovie = {
              id: data?.id,
              name: data?.name,
              image: data?.coverVerticalUrl,
              category: data?.category
            }
            if (!history.find((item) => item.id === currentMovie.id))
            {
              history.push(currentMovie);
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
            alert('Have some error 😥');
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
