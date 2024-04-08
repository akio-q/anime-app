import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useGetTopSeasonalAnimeQuery } from '../../api/apiSlice';
import TopAnimeSliderSlide from './TopAnimeSliderSlide';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import 'swiper/css';
import "swiper/css/autoplay";
import './topAnimeSlider.scss';

const TopAnimeSlider = () => {
  const {
    data: anime = {},
    isLoading, 
    isError,
    error
  } = useGetTopSeasonalAnimeQuery();

  const data = useMemo(() => {
    if (!anime || !anime.data || !anime.data.length) {
      return [];
    }

    const data = anime.data.slice();
    return data.slice(0, 10);
  }, [anime])

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
  }

  const renderTopAnimeSlider = (arr) => {
    return arr.map(item => (
      <SwiperSlide className="top-anime-slider__slide" key={item.mal_id}>
        <TopAnimeSliderSlide id={item.mal_id} data={item} />
      </SwiperSlide>
    ))
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