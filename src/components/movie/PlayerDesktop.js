import ReactPlayer from 'react-player';
import { srt2wtt } from '../../utils/utils';

function PlayerDesktop({ sources, subtitles, light }) {
  return (
    <div className={`relative w-full h-0 pb-[56.25%] overflow-hidden ${!light && 'z-[60]'}`}>
      <div
        className='absolute top-0 left-0 w-full h-full flex justify-center items-center group bg-black'
      >
        <ReactPlayer
          width={'100%'}
          height={'100%'}
          url={sources[0]?.url}
          controls
          config={{
            file: {
              attributes: {
                crossOrigin: '',
              },
              tracks: subtitles.map((item, index) => ({
                kind: 'subtitles',
                src: srt2wtt(item?.url),
                srcLang: item.language,
                default: index === 0 && true,
              })),
            },
          }}
        />
      </div>
    </div>
  );
}

export default PlayerDesktop;
