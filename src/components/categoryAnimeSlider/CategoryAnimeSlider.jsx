import { Swiper, SwiperSlide } from "swiper/react";
import AnimeCard from '../animeCard/AnimeCard';

import 'swiper/css';
import './categoryAnimeSlider.scss';

const CategoryAnimeSlider = () => {
  return (
    <>
      <div className="anime__category-title">Top Airing</div>
      <Swiper
        spaceBetween={20} 
        slidesPerView={5}
        className="category-anime-slider"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index} className="category-anime-slider__slide">
            <AnimeCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default CategoryAnimeSlider;