import { Link } from "react-router-dom";

import AnimeSearchForm from "../search/AnimeSearchForm";

import './appHeader.scss';

const AppHeader = () => {
  return (
    <div className="app-header">
      <div className="app-header__logo">Anime List</div>
      <AnimeSearchForm />
      <button className="button button__auth button__auth-small">
        <Link to='/login'>Sign in</Link>
      </button>
    </div>
  )
} 

export default AppHeader;