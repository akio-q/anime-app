import { Formik, Form, Field } from 'formik';

import luffySticker from '../resources/img/luffy_sticker.png';
import '../style/form.scss';

const Login = () => {
  return (
    <div className="form">
      <div className="form__wrapper">
        <img src={luffySticker} className="form__decoration form__decoration_top-83px" alt="Rem" />
        <span className="form__title">Login</span>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit = {values => console.log(JSON.stringify(values, null, 2))}>
          <Form className="form__form">
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
            <button type="submit" className="button button__auth">Sign in</button>
          </Form>
        </Formik>
        <p className="form__redirect">
          Don't have an account? Register
        </p>
      </div>
    </div>
  )
}

export default Login;