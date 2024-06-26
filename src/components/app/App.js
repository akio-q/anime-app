import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Home from '../pages/Home';
import SingleAnimeLayout from '../pages/singleAnimeLayout/SingleAnimeLayout';
import SearchResults from '../pages/searchResultsLayout/SearchResults';
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
  const currentUser = true;
  const { pathname } = useLocation();

  const isLoginOrRegister = () => {
    return pathname === '/login' || pathname === '/register';
  }

  const ProtectedRoute = ({children}) => {
    if (!currentUser && !isLoginOrRegister()) {
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <>
      {!isLoginOrRegister() && <AppHeader />}
      <main>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/anime/:animeId' element={<SingleAnimeLayout />} />
            <Route path='/filter' element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </main>
      {!isLoginOrRegister() && <AppFooter />}
    </>
  )
} 

export default App;
