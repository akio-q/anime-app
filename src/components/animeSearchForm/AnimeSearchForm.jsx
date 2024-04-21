import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from 'formik';
import { useGetAnimeSearchQuery } from '../../api/apiSlice';
import { animeFetching, animeFetched, animeFetchingError } from '../animeList/animeSlice';

import './animeSearchForm.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const {
    data: anime = {},
    isLoading,
    isError
  } = useGetAnimeSearchQuery(searchValue, { skip: !searchValue });
  const dispatch = useDispatch();

  useEffect(() => {
    if (anime) {
      const { data } = anime;
      if (data && data.length > 0) {
        dispatch(animeFetched(data));
      }
    }
  }, [anime])

  if (isLoading) {
    dispatch(animeFetching());
  } else if (isError) {
    dispatch(animeFetchingError());
  }

  return (
    <div className="search">
      <Formik
        initialValues={{animeName: ''}}
        onSubmit = {value => setSearchValue(value.animeName)}>
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

export default Search;