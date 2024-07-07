import './recentAnimeRecommendations.scss';

const RecentAnimeRecommendations = () => {
  return (
    <div className="recent-recommendations">
      <div className="title_fz25fw500">Recent Recommendations</div>
      <div className="recent-recommendations__list">
        <div className="recent-recommendations__card">
          <img src="https://m.media-amazon.com/images/M/MV5BM2YwYTkwNjItNGQzNy00MWE1LWE1M2ItOTMzOGI1OWQyYjA0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg" alt="" className="recent-recommendations__card-img" />
          <div className="recent-recommendations__card-container">
            <div className="title_fz16fw500">Arifureta: From Commonplace to World's Strongest Season 3</div>
            <div className="recent-recommendations__card-info">
              <div>TV</div>
              <div className="recent-recommendations__card-info-divider">---</div>
              <div>Currently Airing</div>
              <div className="recent-recommendations__card-info-divider">---</div>
              <div>12 Episodes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentAnimeRecommendations;