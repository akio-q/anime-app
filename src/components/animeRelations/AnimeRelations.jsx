import { useGetAnimeRelationsQuery } from '../../api/apiSlice';
import { NavLink } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import './animeRelations.scss';

const AnimeRelationItem = ({ id, title, coverImage }) => {
  const displayTitle = title?.english || title?.romaji || 'Unknown Title';
  const img = coverImage?.extraLarge || coverImage?.large || '';

  return (
    <NavLink className="related-anime__item" end to={`/anime/${id}`}>
      {img ? (
        <img src={img} className='related-anime__item-img' alt={displayTitle} />
      ) : (
        <div className="related-anime__item-img_fallback">
          <span style={{ fontSize: '10px', color: '#ccc' }}>No image</span>
        </div>
      )}
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

  const edges = animeRelations?.data?.Media?.relations?.edges || [];
  const relationItems = [];

  for (const edge of edges) {
    const node = edge.node;
    
    if (node.type === 'ANIME') {
      if (relationItems.length >= 10) break;
      relationItems.push(node);
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
            <AnimeRelationItem 
              key={item.id} 
              id={item.id} 
              title={item.title} 
              coverImage={item.coverImage} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnimeRelations;