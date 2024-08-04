import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Home from '../pages/Home';
import SingleAnime from '../pages/singleAnimeLayout/SingleAnime';
import SearchResults from '../pages/searchResultsLayout/SearchResults';
import UserAnimeList from "../pages/userAnimeListLayout/userAnimeList";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AppFooter from '../appFooter/AppFooter';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Inner />
      </div>
    </Router>
  );
}

const Inner = () => {
  const { pathname } = useLocation();

  const isLoginOrRegister = () => {
    return pathname === '/login' || pathname === '/register';
  }

  return (
    <>
      {!isLoginOrRegister() && <AppHeader />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/anime/:animeId' element={<SingleAnime />} />
          <Route path='/search/:animeName' element={<SearchResults />} />
          <Route path='/user/anime-list' element={<UserAnimeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!isLoginOrRegister() && <AppFooter />}
    </>
  )
} 

export default App;