import './assets/scss/App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './view/Home';
import MovieDetail from './view/Movie';
import TvDetail from './view/Tv';

import { useLocation } from 'react-router-dom';
import Search from './view/Search';
import SignIn from './view/SignIn';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <div className='app'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='movie/:id' element={<MovieDetail />} />
        <Route path='tv/:id' element={<TvDetail />} />
        <Route path='search' element={<Search />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
