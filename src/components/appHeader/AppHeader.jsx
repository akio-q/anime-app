import { Link } from "react-router-dom";

import AnimeSearchForm from "../animeSearchForm/AnimeSearchForm";

import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="app__header">
      <Link to='/' className="app__header-logo">Anime List</Link>
      <AnimeSearchForm />
      <button className="button">
        <Link to='/login'>Sign in</Link>
      </button>
    </header>
  )
} 

export default AppHeader;