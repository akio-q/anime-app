import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useGetAnimeSearchQuery } from '../../api/apiSlice';
import { 
  setData, 
  setSearch, 
  resetPage, 
  resetFilters,
  setLoading, 
  setLoadingFailed } from '../filters/filtersSlice';

import './animeSearchForm.scss';

const AnimeSearchForm = () => {
  const { filters } = useSelector(state => state.filters);
  const { data: anime = {}, isError } = useGetAnimeSearchQuery({ value: filters.search }, { skip: !filters.search });
  const [prevSearch, setPrevSearch] = useState('');
  
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
    if (animeName.trim() === '' || animeName === prevSearch) {
      return; 
    }

    dispatch(setLoading());
    dispatch(resetPage());
    dispatch(resetFilters());
    dispatch(setSearch(animeName));
    setPrevSearch(animeName); 
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
            placeholder="Search anime"
            autoComplete="off" />
            <button type='submit' className='search__submit'>
              <i className='icon-search'></i>
            </button>
        </Form>
      </Formik>
    </div>
  )
}

export default AnimeSearchForm;