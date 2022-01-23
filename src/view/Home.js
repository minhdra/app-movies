import Sidebar from '../components/shared/Sidebar';
import SearchBoard from '../components/home/SearchBoard';
import { getHome } from '../services/home';
import Banner from '../components/home/Banner';
import Section from '../components/home/Section';
import useSWR from 'swr';

function Home() {

  const { data, error } = useSWR('home-page', () => getHome());

  return (
    <div className='flex dark:bg-slate-900 min-h-screen'>
      <Sidebar show={false} />
      <div className='pt-24 py-4 w-full flex overflow-hidden'>
        {/* Main content */}
        <div className='w-full overflow-hidden px-4 md:border-x border-slate-300 dark:border-slate-600'>
          {data && !error  &&
            data.map((section) =>
              section.homeSectionType === 'BANNER' ? (
                <div className='mb-8' key={section.homeSectionId}>
                  <Banner
                    data={section.recommendContentVOList.map((item) => {
                      const params = new URLSearchParams(
                        new URL(item.jumpAddress).search
                      );
                      const id = params.get('id');
                      const link =
                        params.get('type') === '0' ? '/movie/' + id : `/tv/${id}?episode=1`;
                      return {
                        image: item.imageUrl,
                        link: link,
                        id: params.get('id'),
                        title: item.title,
                      };
                    })}
                  />
                </div>
              ) : (
                <div className='mb-8' key={section.homeSectionId}>
                  <h1 className='text-xl font-medium py-2'>
                    {section.homeSectionName}
                  </h1>
                  <Section
                    data={section.recommendContentVOList.map((item) => {
                      const params = new URLSearchParams(
                        new URL(item.jumpAddress).search
                      );
                      const id = params.get('id');
                      const link =
                        params.get('type') === '0' ? '/movie/' + id : `/tv/${id}?episode=1`;
                      return {
                        image: item.imageUrl,
                        link: link,
                        id: params.get('id'),
                        title: item.title,
                      };
                    })}
                  />
                </div>
              )
            )}
        </div>
      </div>
        {/* Top searches */}
        <SearchBoard />
    </div>
  );
}

export default Home;
