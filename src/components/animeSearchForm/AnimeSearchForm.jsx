import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (anime) {
      const { data } = anime;
      if (data && data.length > 0) {
        dispatch(animeFetched(data));
      }
    }
  }, [anime])

  useEffect(() => {
    if (isLoading) {
      dispatch(animeFetching());
    } else if (isError) {
      dispatch(animeFetchingError());
    }
  }, [isLoading, isError]);

  const onSubmit = ({animeName}) => {
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

export default Search;