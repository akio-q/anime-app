import { useGetAnimeRelationsQuery, useGetAnimeByIdQuery } from '../../api/apiSlice';
import { NavLink } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import './animeRelations.scss';

const AnimeRelationItem = ({ id, defaultTitle }) => {
  const { data: anime, isLoading, isError } = useGetAnimeByIdQuery(id);

  if (isLoading) {
    return (
      <div className="related-anime__item">
        <Spinner />
      </div>
    );
  }
  
  if (isError || !anime?.data) {
    return (
      <NavLink className="related-anime__item" end to={`/anime/${id}`}>
        <div className="related-anime__item-img_fallback">
          <span style={{ fontSize: '10px', color: '#ccc' }}>No image</span>
        </div>
        <div className="title_fz16fw500 related-anime__item-title">{defaultTitle}</div>
      </NavLink>
    );
  }

  const { images, title } = anime.data;
  const img = images?.webp?.large_image_url;
  const displayTitle = title || defaultTitle;

  return (
    <NavLink 
      className="related-anime__item"
      end 
      to={`/anime/${id}`}>
      <img src={img} className='related-anime__item-img' alt={displayTitle} />
      <div className="title_fz16fw500 related-anime__item-title">{displayTitle}</div>
    </NavLink>
  );
};


const AnimeRelations = ({ id }) => {
  const {
    data: animeRelations = {},
    isLoading,
    isError
  } = useGetAnimeRelationsQuery(id);

  if (isLoading) return <Spinner />;
  
  if (isError) return null; 

  const arr = animeRelations?.data || [];
  const relationItems = [];

  for (let i = 0; i < arr.length; i++) { 
    const animeArr = arr[i].entry;
    for (const animeObj of animeArr) {
      if (animeObj.type === 'anime') {
        if (relationItems.length >= 10) break;
        relationItems.push({ id: animeObj.mal_id, title: animeObj.name });
      }
    }
  }

  return (
    <div className="related-anime">
      {relationItems.length === 0 ? (
        <div className='title title_fz16fw300'>
          This anime has no relations
        </div>
      ) : (
        <div className="related-anime__wrapper">
          {relationItems.map(item => (
            <AnimeRelationItem key={item.id} id={item.id} defaultTitle={item.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnimeRelations;