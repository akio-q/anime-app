import { Formik, Form, Field } from 'formik';

import '../style/form.scss';

const Login = () => {
  return (
    <div className="form">
      <div className="form__wrapper">
        <span className="form__title">Login</span>
        <Formik>
          <Form className='form__form'>
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
            <button className='button button__auth'>Sign in</button>
          </Form>
        </Formik>
        <p className='form__redirect'>
          Don't have an account? Register
        </p>
      </div>
    </div>
  )
}

export default Login;