import { Formik, Form, Field } from 'formik';

import addAvatar from '../resources/img/add_avatar.png';
import '../style/form.scss';

const Register = () => {
  return (
    <div className="form">
      <div className="form__wrapper">
        <span className="form__title">Register</span>
        <Formik>
          <Form className='form__form'>
            <Field
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Display name"
              className="form__form-input"
            />
            <Field 
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="form__form-input"
            />
            <Field 
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="form__form-input"
            />
            <Field 
              id="avatar"
              name="avatar"
              type="file"
              style={{display: 'none'}}
            />
            <label htmlFor="avatar" className='form__form-add-avatar'>
              <img 
                src={addAvatar} 
                className='form__form-add-avatar-img' 
                alt="avatar" />
              <span>Add a profile picture</span>
            </label>
            <button className='button button__auth'>Sign up</button>
          </Form>
        </Formik>
        <p className='form__redirect'>
          Already have an account? Login
        </p>
      </div>
    </div>
  )
}

export default Register;