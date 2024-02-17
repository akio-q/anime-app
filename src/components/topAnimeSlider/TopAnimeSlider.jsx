import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useGetTopAnimeQuery } from '../../api/apiSlice';
import Spinner from '../Spinner/Spinner';

import 'swiper/css';
import "swiper/css/autoplay";
import './topAnimeSlider.scss';

const TopAnimeSlider = () => {
  const {
    data: anime = [],
    isLoading, 
    isError
  } = useGetTopAnimeQuery();

  const data = anime.data;
  const topAnime = useMemo(() => {
    if (!anime || !anime.data || !anime.data.length) {
      return [];
    }

    const topAnime = data.slice();
    return topAnime.slice(0, 10);
  }, [data])

  const items = topAnime.map((anime) => {
    const {mal_id, images, title_english, synopsis, genres} = anime;
    const img = images.jpg.large_image_url;
    const descr = synopsis.length > 510 ? synopsis.slice(0, 510) + '...' : synopsis;
    const genresString = genres.map(item => item.name).join(', ');

    return (
      <SwiperSlide className="top-anime-slider__slide" key={mal_id}>
        <img src={img} alt="animeImg" className="top-anime-slider__img" />
        <div className="top-anime-slider__info">
          <div className="title_fz30fw600 top-anime-slider__title">{title_english}</div>
          <div className="top-anime-slider__descr">{descr}</div>
          <div className="top-anime-slider__genre">
            <i className='icon-tag'></i>
            <div className="top-anime-slider__genre-text">{genresString}</div>
          </div>
        </div>
      </SwiperSlide>
    )
  })

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
      {isLoading ? <Spinner /> : items}
    </Swiper>
  )
}

export default TopAnimeSlider;