import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Home from '../pages/Home';
import SingleAnime from '../pages/singleAnimeLayout/SingleAnime';
import SearchResults from '../pages/searchResultsLayout/SearchResults';
import UserAnimeList from "../pages/userAnimeListLayout/userAnimeList";
import UserProfile from '../pages/userProfileLayout/UserProfile';
import Register from "../pages/Register";
import Login from "../pages/Login";
import AppFooter from '../appFooter/AppFooter';

const ProtectedRoute = ({ element: Component }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Component /> : <Navigate to="/login" />;
};

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
          <Route path='/user/anime-list' element={<ProtectedRoute element={UserAnimeList} />} />
          <Route path='/user/profile' element={<ProtectedRoute element={UserProfile} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!isLoginOrRegister() && <AppFooter />}
    </>
  )
} 

const App = () => {
  return (
    <Router>
      <div className="app">
        <Inner />
      </div>
    </Router>
  );
}

export default App;