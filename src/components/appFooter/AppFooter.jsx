import './appFooter.scss';

const AppFooter = () => {
  const date = new Date().getFullYear()>2024&&document.write("-"+new Date().getFullYear());
  return (
    <footer className="app__footer">
      <a href="https://valentynvowk.netlify.app/" className="app__footer-link" target="_blank" rel="noopener noreferrer">
        Check out my portfolio
      </a>
      <a href="#" className="app__footer-copy">2024{date} AniSurf, © All rights reserved </a>
    </footer>
  )
}

export default AppFooter;