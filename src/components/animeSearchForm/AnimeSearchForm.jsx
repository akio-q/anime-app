import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useGetAnimeSearchQuery } from '../../api/apiSlice';
import { 
  setData, 
  resetPage, 
  resetFilters,
  setLoading, 
  setLoadingFailed } from '../filters/filtersSlice';

import './animeSearchForm.scss';

const AnimeSearchForm = () => {
  const { filters } = useSelector(state => state.filters);
  const { data: anime = {}, isError, isFetching } = useGetAnimeSearchQuery({ value: filters.search }, { skip: !filters.search });
  const [prevSearch, setPrevSearch] = useState('');

  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading());
    } else if (isError) {
      dispatch(setLoadingFailed());
    } else if (anime && anime.data) {
      dispatch(setData(anime));
    } 
  }, [anime, isFetching, isError]);

  const onSubmit = ({animeName}) => {
    if (animeName.trim() === '' || animeName === prevSearch && isSearchPage) {
      return; 
    }

    dispatch(resetPage());
    dispatch(resetFilters());
    setPrevSearch(animeName);
    navigate(`/search/${animeName}`);  
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
            <button type="submit" className='search__submit'>
              <i className='icon-search'></i>
            </button>
        </Form>
      </Formik>
    </div>
  )
}

export default AnimeSearchForm;