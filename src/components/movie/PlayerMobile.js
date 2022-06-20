import { srt2wtt } from '../../utils/utils';
import HlsPlayer from 'react-hls-player';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const PlayerMobile = ({
  data,
  sources,
  subtitles,
  light,
  episodeIndex,
  autoPlay,
  nextRef,
}) => {
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('history')) || [];
  });
  const playerRef = useRef();
  const [loadedData, setLoadedData] = useState(false);
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`relative w-full h-0 pb-[56.25%] ${!light && 'z-[60]'}`}>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center group bg-black'>
        <HlsPlayer
          crossOrigin=''
          playsInline
          controls
          autoPlay={false}
          playerRef={playerRef}
          src={sources[0].url}
          className='w-full h-full'
          poster={data?.coverHorizontalUrl}
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
          onLoadedData={() => {
            setLoadedData(true);
            const index = history.findIndex((item) => item.id === data.id);
            const time = index === -1 ? 0 : history[index].time;
            playerRef.current && (playerRef.current.currentTime = time);
          }}
          onTimeUpdate={() => {
            if (play) {
              const currentTime = playerRef.current.currentTime;
              const currentMovie = {
                id: data?.id,
                name: data?.name,
                image: data?.coverVerticalUrl,
                category: data?.category,
                time: currentTime,
                episode: episodeIndex,
              };
              const index = history.findIndex(
                (item) => item.id === currentMovie.id
              );
              if (index === -1) {
                history.unshift(currentMovie);
                setHistory(history);
              } else history[index] = currentMovie;
              localStorage.setItem('history', JSON.stringify(history));
            }
          }}
          onEnded={() => {
            if (autoPlay) {
              if (
                episodeIndex &&
                episodeIndex < data?.episodeVo?.length &&
                nextRef.current
              ) {
                const index = history.findIndex((item) => item.id === data?.id);
                if (index !== -1) {
                  history[index].time = 0;
                  history[index].episode = episodeIndex + 1;
                  localStorage.setItem('history', JSON.stringify(history));
                  navigate(`/tv/${data?.id}?episode=${episodeIndex + 1}`, {
                    replace: true,
                  });
                }
              }
            } else {
              setPlay(false);

              const index = history.findIndex((item) => item.id === data?.id);
              history[index].time = 0;
              if (!episodeIndex) {
                const newData = history.filter((item) => item.id !== data.id);
                localStorage.setItem('history', JSON.stringify(newData));
              } else localStorage.setItem('history', JSON.stringify(history));
            }
          }}
          onError={(e) => {
            console.log(e);
            navigate(0);
          }}
        >
          {loadedData &&
            subtitles.map((subtitle, index) => (
              <track
                key={index}
                kind='subtitles'
                srcLang={subtitle.lang}
                label={subtitle.language}
                src={srt2wtt(subtitle?.url)}
                default={index === 0}
              />
            ))}
        </HlsPlayer>
      </div>
    </div>
  );
};

export default PlayerMobile;
