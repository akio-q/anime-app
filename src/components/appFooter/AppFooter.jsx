import './appFooter.scss';

const AppFooter = () => {
  const date = new Date().getFullYear()>2024&&document.write("-"+new Date().getFullYear());
  return (
    <footer class="app__footer">
        <a href="#" class="app__footer-link">2024{date} Anime List, © All rights reserved </a>
    </footer>
  )
}

export default AppFooter;