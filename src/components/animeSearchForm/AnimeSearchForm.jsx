import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useGetAnimeSearchQuery } from '../../api/apiSlice';
import { setSearch, setLoading, setLoadingFailed } from '../filters/filtersSlice';

import './animeSearchForm.scss';

const AnimeSearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: anime = {}, isError } = useGetAnimeSearchQuery(searchValue, { skip: !searchValue });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(setLoadingFailed());
    } else if (anime && anime.data) {
      dispatch(setSearch(anime.data));
    } 
  }, [anime, isError]);

  const onSubmit = ({animeName}) => {
    dispatch(setLoading());
    setSearchValue(animeName);
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