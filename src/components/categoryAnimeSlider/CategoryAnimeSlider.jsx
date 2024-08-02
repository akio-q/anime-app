import { Swiper, SwiperSlide } from "swiper/react";

import AnimeCard from '../animeCard/AnimeCard';
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import 'swiper/css';
import './categoryAnimeSlider.scss';

const CategoryAnimeSlider = ({title, data = [], isLoading, isError, error}) => {
  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <ErrorMessage errorStatus={error.status} />
  }

  const renderCategoryAnimeSlider = (arr) => {
    return arr.map((item, i) => {
      return (
        <SwiperSlide key={i} className="category-anime-slider__slide">
          <AnimeCard 
            id={item.mal_id}
            data={item} />
        </SwiperSlide>
      )
    })
  }

  const items = renderCategoryAnimeSlider(data)
  return (
    <>
      <div className="title_fz25fw500 anime__category-title">{title}</div>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          490: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 4,
          },
          1350: {
            slidesPerView: 6,
          }
        }}
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