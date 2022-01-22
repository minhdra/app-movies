import Sidebar from '../shared/Sidebar';
import Player from './Player';


function Watch({ data, sources, subtitles, episodeIndex }) {
  return (
    <>
      <div className='flex md:flex-row pt-20 dark:bg-slate-900 dark:text-white min-h-screen px-4'>
        <Sidebar show={false} />
        <div className='p-4 w-full'>
          <div className='flex'>
            <div className='w-full'>
              <h1 className='text-xl font-bold'>Ban dang xem</h1>
              <div className='w-full'>
                {data && sources && subtitles ? (
                  <Player
                    data={data}
                    sources={sources}
                    subtitles={subtitles}
                  />
                ): (
                    <div>
                      Error 😥😥😥
                    </div>
                )}
              </div>
            </div>
            <div className='w-[250px] h-screen overflow-auto flex-shrink-0 pl-4 hidden md:block'>
              This is Sidebar
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;
