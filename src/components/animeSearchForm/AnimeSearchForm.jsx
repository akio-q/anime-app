import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useGetAnimeSearchQuery } from '../../api/apiSlice';
import { setData, setSearch, setLoading, setLoadingFailed } from '../filters/filtersSlice';

import './animeSearchForm.scss';

const AnimeSearchForm = () => {
  const { filters } = useSelector(state => state.filters);
  const { data: anime = {}, isError } = useGetAnimeSearchQuery(filters.search, { skip: !filters.search });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(setLoadingFailed());
    } else if (anime && anime.data) {
      dispatch(setData(anime));
    } 
  }, [anime, isError]);

  const onSubmit = ({animeName}) => {
    if (animeName.trim() === '') {
      return; 
    }

    dispatch(setLoading());
    dispatch(setSearch(animeName));
    navigate(`/filter?q=${animeName}`);
  }

  return (
    <div className="search">
      <Formik
        initialValues={{animeName: ''}}
        onSubmit={onSubmit}>
        <Form>
          <Field 
            name="animeName"
            type="text" 
            className="search__input"
            placeholder="Search anime" />
            <button type='submit' className='search__submit'>
              <i className='icon-search'></i>
            </button>
        </Form>
      </Formik>
    </div>
  )
}

export default AnimeSearchForm;