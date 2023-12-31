import { Link } from "react-router-dom";

import AnimeSearchForm from "../animeSearchForm/AnimeSearchForm";

import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header__logo">Anime List</div>
      <AnimeSearchForm />
      <button className="button button__auth button__auth-small">
        <Link to='/login'>Sign in</Link>
      </button>
    </header>
  )
} 

export default AppHeader;