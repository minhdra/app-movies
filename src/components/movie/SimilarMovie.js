import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function SimilarMovie({ data }) {
  return (
    <div>
      {data?.likeList && (
        <div>
          <h1 className='text-xl font-bold pb-4'>Can you will like?</h1>
          <div className='my-4 flex md:block overflow-auto w-full'>
            {console.log(data)}
            {data &&
              data.likeList.map((item) => (
                <div key={item.id}>
                  <Link
                    to={`/${
                      item.category === 0
                        ? `movie/${item.id}`
                        : `tv/${item.id}?episode=1`
                    }`}
                    className='inline-flex justify-start items-start group w-full'
                    data-tooltip={item?.name}
                  >
                    <LazyLoadImage
                      className='w-[70px] h-[100px] object-cover flex-shrink-0 group-hover:brightness-75 transition'
                      src={item?.coverVerticalUrl}
                      alt=''
                    />
                    <div className='px-2 leading-none w-full overflow-hidden h-full flex flex-col justify-between group-hover:brightness-75'>
                      <h5 className='pb-3 whitespace-nowrap text-ellipsis w-full overflow-hidden'>
                        {item?.name}
                      </h5>
                      <span>{item?.year}</span>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SimilarMovie;
