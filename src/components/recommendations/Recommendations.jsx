import AnimeCard from '../animeCard/AnimeCard';

import './recommendations.scss';

const Recommendations = () => {
  return (
    <>
      <div className="title_fz25fw500 recommendations__title">Recommendations</div>
      <div className="recommendations">
        <div className="recommendations__wrapper">
        {[...Array(8)].map((_, index) => (
            <AnimeCard key={index} />
        ))}
        </div>
      </div> 
    </>   
  )
}

export default Recommendations;