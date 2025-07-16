import './appFooter.scss';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  const yearText = currentYear > 2024 ? `2024–${currentYear}` : "2024";

  return (
    <footer className="app__footer">
      <a 
        href="https://valentyn-vovk.netlify.app/" 
        className="app__footer-link" 
        target="_blank" 
        rel="noopener noreferrer">
          Check out my portfolio
      </a>
      <a href="#" className="app__footer-copy">{yearText} AniSurf, © All rights reserved </a>
    </footer>
  )
}

export default AppFooter;