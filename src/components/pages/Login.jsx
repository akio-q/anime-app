import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

import luffySticker from '../../resources/img/luffy_sticker.png';
import '../../style/form.scss';

const Login = () => {
  return (
    <div className="form">
      <div className="form__wrapper">
        <img src={luffySticker} className="form__decoration form__decoration_top-83px" alt="Rem" />
        <span className="title_fz25fw600 form__title">Login</span>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema = {Yup.object({
            email: Yup.string()
                      .email('Wrong email adress')
                      .required('Required field'),
            password: Yup.string()
                        .min(8, 'Password is too short, minimum 8 symbols')
                        .required('Required field')
          })}
          onSubmit = {values => console.log(JSON.stringify(values, null, 2))}>
          <Form className="form__form">
            <Field 
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="form__form-input"
            />
            <ErrorMessage className='form__form-error' name="email" component="div" />
            <Field 
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="form__form-input"
            />
            <ErrorMessage className='form__form-error' name="password" component="div" />
            <button type="submit" className="button button__auth">Sign in</button>
          </Form>
        </Formik>
        <p className="form__redirect">
          Don't have an account?
          <NavLink 
            className="form__redirect-link" 
            end 
            to="/register">Register</NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login;