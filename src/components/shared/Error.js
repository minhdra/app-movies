import { Link } from "react-router-dom";

function Error() {
  return (
    <div className='inline-flex items-center justify-center pt-20 pb-4 min-h-screen'>
      <div className='px-4 lg:py-12 w-[80vw]'>
        <div className='lg:gap-4 lg:flex'>
          <div className='mt-4'>
            <img
              src='/images/no-data.svg'
              alt=''
              className='object-cover w-full h-full'
            />
          </div>
          <div className='flex flex-col items-center justify-center md:py-24 lg:py-32'>
            <p className='mb-8 text-center text-gray-500 md:text-lg'>
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              to='/'
              className='px-6 py-2 text-sm font-bold bg-orange-600 text-white'
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
