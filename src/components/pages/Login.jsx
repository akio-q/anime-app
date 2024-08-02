import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import Helmet from 'react-helmet';

import luffySticker from '../../resources/img/luffy_sticker.png';
import '../../style/form.scss';

const Login = () => {
  const navigate = useNavigate();

  const signIn = async (values) => {
    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password); 

      toast.success("Success! Redirecting...", { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000,
        onClose: () => navigate('/')
      });
    } catch(err) {
      toast.error(err.message, { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | AniSurf</title>
        <meta 
          name="description" 
          content="Login to AniSurf to explore and enjoy your favorite anime. Join our community and dive into a world of anime." />
      </Helmet>
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
            onSubmit={signIn}>
            <Form className="form__form">
              <Field 
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="off"
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
        <ToastContainer />
      </div>
    </>
  )
}

export default Login;