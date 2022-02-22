import Overlay from './Overlay';

const notifies = [
  {
    id: 1,
    content: '🎉 Welcome you to Dra Film 🎉',
    avatar: 'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTtgjf6r5VLmSuFDNNMY3gwUms0iTGcYE2gG784v4LJkdmTN7xGjFTiBANRCf0KeXT4O0IgOs1vHmD_l2os4EH50bhtdD1gPhC_vxmPr5h2WIoQZPQ3bG0PEkOQX1g.jpg?r=b4a',
    time_created: '1 year ago',
    active: true,
  },
  {
    id: 2,
    content: '🚀 New film! Love and leashes',
    avatar: 'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTtgjf6r5VLmSuFDNNMY3gwUms0iTGcYE2gG784v4LJkdmTN7xGjFTiBANRCf0KeXT4O0IgOs1vHmD_l2os4EH50bhtdD1gPhC_vxmPr5h2WIoQZPQ3bG0PEkOQX1g.jpg?r=b4a',
    time_created: '1 week ago',
    active: false,
  },
];

function Notification({ onClick }) {
  return (
    <div className='fixed notify-wrapper z-50 p-4 pt-20 w-full'>
      <div className='bg-slate-50 dark:bg-slate-800 border shadow-md px-4 pb-4 rounded-md lg:w-[40%] md:w-[50%] w-full float-right dark:border-slate-300 overflow-auto max-h-[80vh]'>
        <div className='flex py-4 justify-between items-center border-b border-slate-300 dark:border-slate-600'>
          <h1 className='font-medium text-xl'>Notifications</h1>
          <div className='hover:text-slate-600'
            onClick={() => onClick(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
        <div className='list-none'>
          <ul>
            {notifies.map((item) => (
              <li
                key={item.id}
                className={`flex justify-start items-start py-2 cursor-pointer relative border-b border-slate-400 hover:brightness-75`}
              >
                <div className='min-w-max w-[30%] h-[75px] rounded-xl overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src={item.avatar}
                    alt=''
                  />
                </div>
                <div className='w-fit pl-4 text-left'>
                  <p className='leading-normal text-[0.9rem] text-slate-700 dark:text-slate-300'>
                    {item.content}
                  </p>
                  <span className='text-orange-500'>{item.time_created}</span>
                </div>
                {item.active && (
                  <span className='absolute top-2 right-2 rounded-full w-[5px] h-[5px] bg-orange-600'></span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Overlay onClick={onClick} />
    </div>
  );
}

export default Notification;
