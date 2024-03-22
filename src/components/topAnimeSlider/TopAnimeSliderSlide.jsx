const TopAnimeSliderSlide = ({data}) => {
  const { images, title_english, title, synopsis, genres} = data;
  const img = images.webp.large_image_url;
  const displayTitle = title_english && title_english.length > 37 
                    ? title_english.slice(0, 50) + '...' 
                    : title_english ?? title;
  const descr = synopsis.length > 510 ? synopsis.slice(0, 510) + '...' : synopsis;
  const genresString = genres.map(item => item.name).join(', ');

  return (
    <>
      <img src={img} alt="animeImg" className="top-anime-slider__img" />
      <div className="top-anime-slider__info">
        <div className="title_fz30fw600 top-anime-slider__title">{displayTitle}</div>
        <div className="top-anime-slider__descr">{descr}</div>
        <div className="top-anime-slider__footer">
          <div className="top-anime-slider__genre">
            <i className='icon-tag'></i>
            <div className="top-anime-slider__genre-text">{genresString}</div>
          </div>
          <button className='button top-anime-slider__button'>Visit the page</button>
        </div>
      </div>
    </>
  )
}

export default TopAnimeSliderSlide;