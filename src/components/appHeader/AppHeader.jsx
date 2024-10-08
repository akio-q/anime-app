import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

import { FaBookmark } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import AnimeSearchForm from "../animeSearchForm/AnimeSearchForm";
import Filters from "../filters/Filters";

import logo from '../../resources/img/logo.png'
import './appHeader.scss';

const AppHeader = () => {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const hamburgerMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  useClickOutside(hamburgerMenuRef, isHamburgerActive, setIsHamburgerActive);
  useClickOutside(userMenuRef, isUserMenuActive, setIsUserMenuActive);

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
  }, []); 

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
        <div className="app__header-wrapper">
          {isSearchPage && isMobileScreen && (
            <div className={hamburgerClassName} onClick={onHamburgerClick}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <Link to='/'>
            <img src={logo} className="app__header-logo" alt="logo" />
          </Link>
        </div>
        {!isMobileScreen && <AnimeSearchForm />}
        <div className="app__header-wrapper">
          {isMobileScreen && (
            <button className="button button__search" onClick={onSearchButtonClick}>
              <i className="icon-search"></i>
            </button>
          )}
          {currentUser ? (
            <div className="app__header-user">
              <div className="title_fz16fw300 app__header-user-name">{currentUser.displayName}</div>
              <img 
                src={currentUser.photoURL} 
                alt={`${currentUser.displayName} avatar`} 
                className="app__header-user-photo"
                onClick={() => setIsUserMenuActive(!isUserMenuActive)} />
              <nav className={`user-menu ${isUserMenuActive ? "active" : ""}`} ref={userMenuRef}>
                <ul className="user-menu__list">
                  <li>
                    <Link to='/user/profile' className="user-menu__list-item">
                      <FaUser />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to='/user/anime-list' className="user-menu__list-item">
                      <FaBookmark className="user-menu__icon" />
                      My list
                    </Link>
                  </li>
                  <li className="user-menu__list-item" onClick={logout}>
                    <IoIosLogOut className="user-menu__icon" /> 
                    <span>Log Out</span>
                  </li>
                </ul>
              </nav>
            </div>
          ) : !currentUser && isMobileScreen ? (
            <Link to='/login'>
              <button className="button button__round"><FaUser /></button>
            </Link>
          ) : (
            <Link to='/login'>
              <button className="button">Sign In</button>
            </Link>
          )}
        </div>
      </header>
      {isMobileScreen && isSearchFormVisible && (
        <AnimeSearchForm />
      )}
      {isMobileScreen && (
        <div className={`hamburger-menu ${isHamburgerActive ? "active" : ""}`} ref={hamburgerMenuRef}>
          <Filters isMobileScreen={isMobileScreen} setIsHamburgerActive={setIsHamburgerActive} />
        </div>
      )}
    </>
  )
} 

export default AppHeader;