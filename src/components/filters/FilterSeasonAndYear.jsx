import { Formik, Form, Field } from 'formik';

const FilterSeasonAndYear = () => {
  return (
    <div className="anime__filters-section anime__filters-section_dd">
      <Formik
        initialValues={{
          season: '',
          year: ''
        }}
        onSubmit = {values => {
          console.log(JSON.stringify(values, null, 2))
          console.log(values.avatar.name);
        }}
      >
        <Form>
          <div className="anime__filters-wrapper-dd">
            <div className="anime__filters-item-dd">
              <div className="title_fz18fw600">Season</div>
              <Field 
                name="season" 
                id="season" 
                as="select"
                className="anime__filters-dropdown">
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
              </Field>
            </div>
            <div className="anime__filters-item-dd">
              <div className="title_fz18fw600">Year</div>
              <Field 
                name="year" 
                id="year" 
                as="select"
                className="anime__filters-dropdown">
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                  <option value={2021}>2021</option>
                  <option value={2020}>2020</option>
                  <option value={2019}>2019</option>
              </Field>
            </div>
          </div>
        </Form>
      </Formik>
      <button type="submit" className="button button__filter">Go</button>
    </div>
  )
}

export default FilterSeasonAndYear;