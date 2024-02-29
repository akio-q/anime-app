import { Swiper, SwiperSlide } from "swiper/react";

import AnimeCard from '../animeCard/AnimeCard';
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import 'swiper/css';
import './categoryAnimeSlider.scss';

const CategoryAnimeSlider = ({title, data, isLoading, isError}) => {
  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage />
  }

  const renderCategoryAnimeSlider = (arr) => {
    return arr.map((item) => {
      const {mal_id, images, episodes, title_english, title} = item;
      const img = images.webp.large_image_url;
      const displayTitle = title_english && title_english.length > 37 
                            ? title_english.slice(0, 37) + '...' 
                            : title_english ?? title;

      return (
        <SwiperSlide key={mal_id} className="category-anime-slider__slide">
          <AnimeCard id={mal_id} img={img} episodes={episodes} title={displayTitle} data={item} />
        </SwiperSlide>
      )
    })
  }

  const items = renderCategoryAnimeSlider(data)
  return (
    <>
      <div className="title_fz25fw500 anime__category-title">{title}</div>
      <Swiper
        spaceBetween={20} 
        slidesPerView={6}
        className="category-anime-slider"
      >
        {items}
      </Swiper>
    </>
  )
}

export default CategoryAnimeSlider;