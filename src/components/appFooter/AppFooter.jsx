import './appFooter.scss';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  const yearText = currentYear > 2024 ? `2024–${currentYear}` : "2024";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="app__footer">
      <a 
        href="https://valentyn-vovk.netlify.app/" 
        className="app__footer-link" 
        target="_blank" 
        rel="noopener noreferrer">
          Check out my portfolio
      </a>
      <button onClick={scrollToTop} className="app__footer-copy">
        {yearText} AniSurf, © All rights reserved 
      </button>
    </footer>
  )
}

export default AppFooter;