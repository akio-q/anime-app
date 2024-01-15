import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import "swiper/css/autoplay";
import './topAnimeSlider.scss';

const TopAnimeSlider = () => {
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
      {[...Array(10)].map((_, index) => (
        <SwiperSlide className="top-anime-slider__slide" key={index}>
          <img src="https://cdn.myanimelist.net/images/anime/1028/117777.jpg" alt="animeImg" className="top-anime-slider__img" />
          <div className="top-anime-slider__info">
            <div className="title_fz30fw600">Mushoku Tensei: Isekai Ittara Honki Dasu Part 2</div>
            <div className="top-anime-slider__descr">Second half of Mushoku Tensei: Isekai Ittara Honki Dasu.</div>
            <div className="top-anime-slider__genre">
              <i className='icon-tag'></i>
              <div className="top-anime-slider__genre-text">Drama, Fantasy, Ecchi</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default TopAnimeSlider;