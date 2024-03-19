import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useGetTopSeasonalAnimeQuery } from '../../api/apiSlice';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import 'swiper/css';
import "swiper/css/autoplay";
import './topAnimeSlider.scss';

const TopAnimeSlider = () => {
  const {
    data: anime = [],
    isLoading, 
    isError
  } = useGetTopSeasonalAnimeQuery();

  const data = useMemo(() => {
    if (!anime || !anime.data|| !anime.data.length) {
      return [];
    }

    const data = anime.data.slice();
    return data.slice(0, 10);
  }, [anime])

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage />
  }

  const renderTopAnimeSlider = (arr) => {
    return arr.map(item => {
      const {mal_id, images, title_english, title, synopsis, genres} = item;
      const img = images.webp.large_image_url;
      const displayTitle = title_english ?? title;
      const descr = synopsis.length > 510 ? synopsis.slice(0, 510) + '...' : synopsis;
      const genresString = genres.map(item => item.name).join(', ');

      return (
        <SwiperSlide className="top-anime-slider__slide" key={mal_id}>
          <img src={img} alt="animeImg" className="top-anime-slider__img" />
          <div className="top-anime-slider__info">
            <div className="title_fz30fw600 top-anime-slider__title">{displayTitle}</div>
            <div className="top-anime-slider__descr">{descr}</div>
            <div className="top-anime-slider__genre">
              <i className='icon-tag'></i>
              <div className="top-anime-slider__genre-text">{genresString}</div>
            </div>
          </div>
        </SwiperSlide>
      )
    })
  }

  const items = renderTopAnimeSlider(data);
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0} 
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      className='top-anime-slider'
    >
      {items}
    </Swiper>
  )
}

export default TopAnimeSlider;