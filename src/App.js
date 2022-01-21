import './App.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Home from './components/main/home/Home';
import MovieDetail from './components/main/movie/MovieDetail';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='movie' element={<MovieDetail />} />
          <Route path='movie/:id' element={<MovieDetail />} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
