import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AnimeSearchForm from "../animeSearchForm/AnimeSearchForm";

import './appHeader.scss';

const AppHeader = () => {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);

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

  const hamburgerClassName = `hamburger ${isHamburgerActive ? 'hamburger_active' : ''}`;

  return (
    <header className="app__header">
      <Link to='/' className="app__header-logo">Anime Surf</Link>
      {!isMobileScreen && <AnimeSearchForm />}
      <div className="app__header-wrapper">
        {isMobileScreen && (
          <button className="button button__search" onClick={onSearchButtonClick}>
            <i className="icon-search"></i>
          </button>
        )}
        <button className="button">
          <Link to='/login'>Sign in</Link>
        </button>
        {isSearchPage && isMobileScreen && (
          <div className={hamburgerClassName} onClick={onHamburgerClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </header>
  )
} 

export default AppHeader;