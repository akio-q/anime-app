import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

import AnimeSearchForm from "../animeSearchForm/AnimeSearchForm";
import Filters from "../filters/Filters";

import './appHeader.scss';

const AppHeader = () => {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const hamburgerClassName = `hamburger ${isHamburgerActive ? 'hamburger_active' : ''}`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]); 

  const onHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
  }

  const onSearchButtonClick = () => {
    setIsSearchFormVisible(!isSearchFormVisible);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <header className="app__header">
        <Link to='/' className="app__header-logo">Anime Surf</Link>
        {!isMobileScreen && <AnimeSearchForm />}
        <div className="app__header-wrapper">
          {isMobileScreen && (
            <button className="button button__search" onClick={onSearchButtonClick}>
              <i className="icon-search"></i>
            </button>
          )}
          {currentUser ? (
            <div className="app__header-user">
              <div className="title_fz16fw300">{currentUser.displayName}</div>
              <img 
                src={currentUser.photoURL} 
                alt={`${currentUser.displayName} avatar`} 
                className="app__header-user-photo" />
              <button onClick={logout}>Log Out</button>
            </div>
          ) : (
            <button className="button">
              <Link to='/login'>Sign in</Link>
            </button>
          )}
          {isSearchPage && isMobileScreen && (
            <div className={hamburgerClassName} onClick={onHamburgerClick}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </header>
      {isMobileScreen && isSearchFormVisible && (
        <AnimeSearchForm />
      )}
      {isMobileScreen && isHamburgerActive && (
        <div className="menu">
          <Filters />
        </div>
      )}
    </>
  )
} 

export default AppHeader;