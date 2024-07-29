import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import Spinner from '../Spinner/Spinner';

const Home = lazy(() => import('../pages/Home'));
const SingleAnime = lazy(() => import('../pages/singleAnimeLayout/SingleAnime'));
const SearchResults = lazy(() => import('../pages/searchResultsLayout/SearchResults'));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login")); 

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
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/anime/:animeId' element={<SingleAnime />} />
            <Route path='/search/:animeName' element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </main>
      {!isLoginOrRegister() && <AppFooter />}
    </>
  )
} 

export default App;
