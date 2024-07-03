import './appFooter.scss';

const AppFooter = () => {
  const date = new Date().getFullYear()>2024&&document.write("-"+new Date().getFullYear());
  return (
    <footer className="app__footer">
        <a href="#" className="app__footer-link">2024{date} Anime Surf, © All rights reserved </a>
    </footer>
  )
}

export default AppFooter;