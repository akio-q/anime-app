import './topAnimeSlider.scss';

const TopAnimeSlider = () => {
  return (
    <div className="top-anime-slider__slide">
      <img src="https://cdn.myanimelist.net/images/anime/1028/117777.jpg" alt="animeImg" className="top-anime-slider__img" />
      <div className="top-anime-slider__info">
        <div className="top-anime-slider__title">Mushoku Tensei: Isekai Ittara Honki Dasu Part 2</div>
        <div className="top-anime-slider__descr">Second half of Mushoku Tensei: Isekai Ittara Honki Dasu.</div>
        <div className="top-anime-slider__genre">
          <i className='icon-tag'></i>
          <div className="top-anime-slider__genre-text">Drama, Fantasy, Ecchi</div>
        </div>
      </div>
    </div>
  )
}

export default TopAnimeSlider;