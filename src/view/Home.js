import SearchBoard from '../components/home/SearchBoard';
import { getHome } from '../services/home';
import Banner from '../components/home/Banner';
import Section from '../components/home/Section';
// import useSWR from 'swr';
import Skeleton from '../components/shared/Skeleton';
import SkeletonSlider from '../components/shared/SkeletonSlide';
import { Fragment, useEffect, useState } from 'react';
import Error from '../components/shared/Error';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

function Home() {
  // const { data, error } = useSWR('home-page', () => getHome());
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    setData(null);
    getHome().then(res => setData(res)).catch(error => setError(error));
  }, []);

  if (error) return <Error />;

  return (
    <>
      <Header/>
      <div className='flex dark:bg-slate-900 min-h-screen px-4'>
        <div className='pt-24 py-4 w-full overflow-hidden'>
          {/* Main content */}
          <div className='w-full overflow-hidden md:pr-4 md:border-r border-slate-400'>
            {data && !error ? (
              data.map((section, index) => {
                if (section.homeSectionType === 'BANNER')
                  return (
                    <div className='mb-4' key={section.homeSectionId}>
                      <Banner
                        data={section.recommendContentVOList.map((item) => {
                          const params = new URLSearchParams(
                            new URL(item.jumpAddress).search
                          );
                          const id = params.get('id');
                          const link =
                            params.get('type') === '0'
                              ? '/movie/' + id
                              : `/tv/${id}?episode=1`;
                          return {
                            image: item.imageUrl,
                            link: link,
                            id: params.get('id'),
                            title: item.title,
                          };
                        })}
                      />
                    </div>
                  );
                else if (section.homeSectionType === 'BLOCK_GROUP') return false;
                else
                  return (
                    <div className={`${index===data?.length-1 ? '' : 'mb-4'}`} key={section.homeSectionId}>
                      <h1 className='text-xl font-medium py-2'>
                        {section.homeSectionName?.replace('Loklok', 'Dra')}
                      </h1>
                      <Section
                        data={section?.recommendContentVOList.map((item) => {
                          const params = new URLSearchParams(
                            new URL(item.jumpAddress).search
                          );
                          const id = params.get('id');
                          const link =
                            params.get('type') === '0'
                              ? '/movie/' + id
                              : `/tv/${id}?episode=1`;
                          return {
                            image: item.imageUrl,
                            link: link,
                            id: params.get('id'),
                            title: item.title,
                          };
                        })}
                      />
                    </div>
                  );
              })
            ) : (
              <>
                <div className='flex mb-4'>
                  <div className='lg:w-1/2 w-full'>
                    <div className='relative h-0 pb-[42%]'>
                      <Skeleton className='absolute top-0 left-0 w-full h-full rounded-2xl' />
                    </div>
                  </div>
                  <div className='w-1/2 pl-3 hidden lg:block'>
                    <div className='relative h-0 pb-[42%]'>
                      <Skeleton className='absolute top-0 left-0 w-full h-full rounded-2xl' />
                    </div>
                  </div>
                </div>
                {[...new Array(2)].map((_, index) => (
                  <div key={index} className='mb-4'>
                    <Skeleton className='my-2 h-6 w-full max-w-[200px]' />

                    <div className='overflow-hidden'>
                      <SkeletonSlider />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* Top searches */}
        <SearchBoard />
      </div>
      <Footer/>
    </>
  );
}

export default Home;
