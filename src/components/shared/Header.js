/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import SearchTop from '../search/SearchTop';
import Sidebar from './Sidebar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth, signOut } from 'firebase/auth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
// console.log(config)
if (config.apiKey) firebase.initializeApp(config);

const auth = getAuth();

function Header() {
  const [user, setUser] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isChecked, setIsChecked] = useState(() => {
    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = 'dark';
      localStorage.setItem('theme', theme);
    }
    document.body.classList.add(theme);
    return theme === 'dark';
  });

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsLogin(!!user);
        if (user)
          setUser({
            id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
          });
      });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (showSidebar && window.innerWidth <= 768) setShowSidebar(true);
      if (window.innerWidth > 768) setShowSidebar(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showSidebar]);

  function handleToggleSidebar(state) {
    setShowSidebar(state);
  }

  function handleToggleNotify(state) {
    setShowNotify(state);
  }

  function handleToggleDarkMode() {
    setIsChecked(!isChecked);
    let theme = localStorage.getItem('theme');
    document.body.classList.remove(theme);
    theme = !theme || theme === 'dark' ? 'light' : 'dark';
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  return (
    <>
      <header
        className='w-full fixed z-40 text-gray-800
     border-b bg-slate-50 border-slate-400 shadow-md dark:bg-slate-900'
      >
        {/* Desktop and ipad */}
        <nav className='w-full mx-auto md:flex hidden flex-wrap items-center justify-between p-4'>
          {/* Brand */}
          <div className='flex-shrink-0 flex items-center flex-1 select-none'>
            <div className='flex items-end'>
              <Link
                className='toggleColour text-gray-800 no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex items-end leading-3'
                to='/'
              >
                {/* Icon from: http://www.potlabicons.com/ */}
                <img src='/logo.png' />
                <span className='leading-none'>DRA</span>
              </Link>
            </div>
          </div>
          {/* Search */}
          <SearchTop />
          {/* right nav */}
          <div className='flex flex-1 justify-end items-center'>
            {/* Button toggle dark mode */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='opacity-0 absolute'
                id='toggle-dark'
                checked={isChecked}
                onChange={handleToggleDarkMode}
              />
              <label
                htmlFor='toggle-dark'
                className='w-16 bg-slate-800 border border-slate-600 flex rounded-full p-1 justify-between items-center relative'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-yellow-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
                <div className='ball absolute h-[95%] w-1/2 rounded-full bg-white top-1/2 -translate-y-1/2 left-0 transition duration-200'></div>
              </label>
            </div>
            {/* User wrapper */}
            <div className='hidden md:flex text-gray-800 items-center md:flex-shrink-1'>
              {/* user? */}
              <div>
                {isLogin ? (
                  <div className='flex items-center'>
                    {/* Notification */}
                    <div
                      className='rounded-full relative p-1 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 mx-3'
                      onClick={() => setShowNotify(!showNotify)}
                    >
                      <div className='absolute inset-x-3/4 -inset-y-0 bg-red-600 p-1 rounded-full w-2 h-2 shadow-red-600 animate-pulse'></div>
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
                          d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                        />
                      </svg>
                    </div>
                    {/* User */}
                    <div
                      className='flex relative items-center hover:bg-slate-300 dark:hover:bg-slate-700 p-1 rounded-md cursor-pointer'
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className='w-9 h-9 rounded-full'
                      />
                      <div>
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
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </div>
                      {/* Dropdown */}
                      <div
                        className={classNames(
                          showOptions ? '' : 'hidden',
                          'first-letter:z-10 text-base list-none absolute inset-y-full -inset-x-full w-36'
                        )}
                      >
                        <ul className='py-1 border rounded shadow bg-slate-100 dark:bg-gray-800'>
                          <li>
                            <Link
                              to='/'
                              className='block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to='/'
                              className='block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                            >
                              Favorite
                            </Link>
                          </li>
                          <li>
                            <button
                              className='block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left'
                              onClick={() => signOut(auth)}
                            >
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    className='rounded font-medium bg-orange-500 text-white py-1 px-4 md:ml-2 hover:bg-orange-600 '
                    type='button'
                    to={'/sign-in'}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        {/* Mobile */}
        <nav className='w-full mx-auto md:hidden flex flex-wrap items-center justify-between p-4'>
          {/* Button toggle sidebar */}
          <div className='flex items-center'>
            <button
              className='md:hidden inline-flex dark:bg-gray-900 items-center justify-center p-2 rounded-md dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              onClick={() => handleToggleSidebar(!showSidebar)}
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {!showSidebar ? (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
            <Link to={'/'} className='font-bold'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#f97316'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </Link>
          </div>
          {/* Right navigation */}
          <div className='flex md:pr-4 justify-end items-center'>
            {/* Button toggle dark mode */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='opacity-0 absolute'
                id='toggle-dark'
                checked={isChecked}
                onChange={handleToggleDarkMode}
              />
              <label
                htmlFor='toggle-dark'
                className='w-16 bg-slate-800 border border-slate-600 flex rounded-full p-1 justify-between items-center relative'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-yellow-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
                <div className='ball absolute h-[95%] w-1/2 rounded-full bg-white top-1/2 -translate-y-1/2 left-0 transition duration-200'></div>
              </label>
            </div>
            {/* Button toggle form search */}
            <SearchTop />
            {/* Notification */}
            {isLogin ? (
              <div
                className='rounded-full relative p-1 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 md:mx-3 ml-3'
                onClick={() => setShowNotify(!showNotify)}
              >
                <div className='absolute inset-x-3/4 -inset-y-0 bg-red-600 p-1 rounded-full w-2 h-2 shadow-red-600 animate-pulse'></div>
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
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </div>
            ) : (
              <Link
                className='rounded font-medium bg-orange-500 text-white py-1 px-4 md:ml-2 hover:bg-orange-600 '
                type='button'
                to={'/sign-in'}
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </header>

      <Sidebar show={showSidebar} onClick={handleToggleSidebar} />
      {showNotify && <Notification onClick={handleToggleNotify} />}
    </>
  );
}

export default Header;
