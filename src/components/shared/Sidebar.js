import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Overlay from './Overlay';

const navigation = [
  {
    id: 1,
    name: 'Home',
    href: '/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>`,
  },
  {
    id: 2,
    name: 'Movies',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
  </svg>`,
  },
  {
    id: 3,
    name: 'TV Shows',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
</svg>`,
  },
  {
    id: 4,
    name: 'Discovery',
    href: '#',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
  },
  {
    id: 5,
    name: 'History',
    href: '/history',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>`,
  },
];
const options = [
  {
    id: 1,
    title: 'Favorites',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>`,
    link: '/favorite',
  },
  {
    id: 2,
    title: 'Settings',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>`,
    link: '/settings',
  },
  {
    id: 3,
    title: 'Sign out',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>`,
    link: '/sign-out',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const sidebar = {
  open: {
    x: '0%',
    transition: { type: 'spring', bounce: 0, duration: 0.4 },
  },
  closed: {
    x: '-100%',
  },
};

function Sidebar({ onClick, show }) {
  const [user, setUser] = useState();

  const url = window.location.pathname;

  useEffect(() => {
    setUser({
      id: 1,
      name: 'Selena',
      avatar:
        'https://img5.thuthuatphanmem.vn/uploads/2021/11/22/anh-chung-toi-don-gian-la-gau_092900900.png',
    });
  }, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={show ? 'open' : 'closed'}
        variants={sidebar}
        className={`fixed inset-0 z-50 h-screen md:hidden`}
      >
        <Overlay onClick={onClick} />
        <nav className='w-full sm:w-10/12 h-screen bg-white p-4 overflow-auto relative pt-6'>
          <div
            className='absolute top-4 right-4 hover:rotate-180 rounded-sm cursor-pointer transition select-none duration-300'
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
          {/* Avatar */}
          {user && (
            <div className='border-b border-slate-300 dark:border-slate-600'>
              <picture className='rounded-full w-24 h-24 sm:w-1/4 sm:h-1/4 overflow-hidden inline-block border border-orange-500'>
                <img
                  className='w-full h-full object-cover'
                  src={user.avatar}
                  alt={user.name}
                />
              </picture>
            </div>
          )}
          {/* item nav */}
          <div className='py-2'>
            <div className='flex-col flex'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item?.href === url
                      ? 'text-orange-500 dark:text-orange-500'
                      : 'dark:text-gray-300 text-gray-600 dark:hover:bg-gray-500 dark:hover:text-white',
                    'px-3 py-2 rounded-md text-md font-medium transition duration-100 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center'
                  )}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                    className='mr-2'
                  ></span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Options of user */}
          {user && (
            <div className='border-t border-slate-300 dark:border-slate-600 py-4'>
              <div>
                {options.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    className='flex items-center py-2 px-3 mb-2 text-slate-800 hover:bg-slate-300 rounded-md dark:hover:bg-slate-800'
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></span>
                    <span className='pl-2 hover:underline text-md font-medium'>
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </motion.div>

      {!show && (
        <aside className='sticky pt-24 mb-4 top-0 w-fit md:inline-block float-left hidden min-w-max h-screen bg-white dark:bg-slate-900'>
          <div className='px-4 border-r border-slate-400 h-full'>
            <ul className='list-none flex flex-col items-center'>
              {navigation.map((item) => (
                <li key={item.id} className='first:mt-0 my-1'>
                  <Link
                    to={item.href}
                    className={`
                      ${
                        url === item?.href
                          ? 'bg-slate-200 text-slate-900 dark:bg-slate-600'
                          : ''
                      }
                      ' w-16 h-16 text-xs rounded-xl flex flex-col items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition duration-100'
                    `}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
