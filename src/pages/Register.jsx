import { Formik, Form, Field, ErrorMessage } from 'formik';

const Register = () => {
  return (
    <div className="from">
      <div className="form__wrapper">
        <span className="form__logo">Anime List</span>
        <span className="form__title">Register</span>
        <Formik>
          <Form className='form__form'>
            <span>How to call you?</span>
            <Field
              id="displayName"
              name="displayName"
              type="text"
            />
            <span>Your email adress</span>
            <Field 
              id="email"
              name="email"
              type="email"
            />
            <span>Your password</span>
            <Field 
              id="password"
              name="password"
              type="password"
            />
            <span>Your profile picture</span>
            <Field 
              id="avatar"
              name="avatar"
              type="file"
              style={{display: 'none'}}
            />
            <label htmlFor="avatar">
              <img src="" alt="avatar" />
              <span>Add an avatar</span>
            </label>
            <button className='button button__auth'>Sign up</button>
          </Form>
        </Formik>
        <p>
          Don't have an account? Login
        </p>
      </div>
    </div>
  )
}

export default Register;