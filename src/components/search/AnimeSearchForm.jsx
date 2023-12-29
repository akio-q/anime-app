import { Formik, Form, Field } from 'formik';

import './animeSearchForm.scss';

const Search = () => {
  return (
    <div className="search">
      <Formik
        initialValues={{animeName: ''}}
        onSubmit = {values => console.log(JSON.stringify(values, null, 2))}>
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