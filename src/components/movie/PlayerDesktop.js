import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { srt2wtt } from '../../utils/utils';
import Controls from '../shared/Controls';

function PlayerDesktop({ data, sources, subtitles, episodeIndex, light }) {
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
            setShowControls(false);
          }, 2000);
        }}
        onMouseLeave={() => { setShowControls(false); if (timeoutRef.current) clearTimeout(timeoutRef.current);}}
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
          onEnded={() => setPlaying(false)}
          config={{
            file: {
              attributes: {
                crossOrigin: '',
              },
              tracks: subtitles.map((item, index) => ({
                kind: 'subtitles',
                src: srt2wtt(item?.url),
                srcLang: item?.language,
                default: index === 0 ? true : false,
              })),
            },
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
          showControls={showControls}
        />
      </div>
    </div>
  );
}

export default PlayerDesktop;
