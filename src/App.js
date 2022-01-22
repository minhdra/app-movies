import './App.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/shared/Header';
import Home from './view/Home';
import MovieDetail from './view/Movie';
import Footer from './components/shared/Footer';
import TvDetail from './view/Tv';

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='movie' element={<Home />} />
          <Route path='movie/:id' element={<MovieDetail />} />
          <Route path='tv' element={<Home />} />
          <Route path='tv/:id' element={<TvDetail />} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
