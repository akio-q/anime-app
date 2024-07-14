import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AnimeSearchForm from "../animeSearchForm/AnimeSearchForm";

import './appHeader.scss';

const AppHeader = () => {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 768);
  }, []); 

  const onHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
  }

  const hamburgerClassName = `hamburger ${isHamburgerActive ? 'hamburger_active' : ''}`;

  return (
    <header className="app__header">
      <Link to='/' className="app__header-logo">Anime Surf</Link>
      <AnimeSearchForm />
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
    </header>
  )
} 

export default AppHeader;