import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth, db, storage } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import Helmet from 'react-helmet';

import remSticker from '../../resources/img/rem_sticker.png';
import '../../style/form.scss';

const Register = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (values) => { 
    const { displayName, email, password, avatar } = values;

    if (!avatar) return;

    setLoading(true);
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const userAvatarsFolderRef = ref(storage, `userAvatars/${avatar.name}`);

      await uploadBytes(userAvatarsFolderRef, avatar).then(snapshot => {
        getDownloadURL(snapshot.ref).then(async downloadURL => {
          await updateProfile(res.user, { 
            displayName, 
            photoURL: downloadURL 
          });

          await setDoc(doc(db, "users", res.user.uid), { 
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });

          toast.success("Success! Redirecting...", { 
            position: "bottom-center",
            className: "custom-toast",
            autoClose: 3000,
            onClose: () => navigate('/')
          });
        })
      });
    } catch (err) {
      toast.error(err.message, { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
    } finally {
      setLoading(false); 
    }
  }

  return (
    <>
      <Helmet>
        <title>Register | AniSurf</title>
        <meta 
          name="description" 
          content="Create an account on AniSurf to discover and enjoy your favorite anime. Join our community and personalize your experience by setting up your profile." />
      </Helmet>
      <div className="form">
        <div className="form__wrapper">
          <img src={remSticker} className='form__decoration' alt="Rem" />
          <span className="title_fz25fw600 form__title">Register</span>
          <Formik
            initialValues={{
              displayName: '',
              email: '',
              password: '',
              avatar: null
            }}
            validationSchema={Yup.object({
              displayName: Yup.string()
                              .min(2, 'Minimum 2 symbols')
                              .max(15, 'Maximum 15 symbols')
                              .required('Required field'),
              email: Yup.string()
                        .email('Wrong email adress')
                        .required('Required field'),
              password: Yup.string()
                          .min(8, 'Password is too short, minimum 8 symbols')
                          .required('Required field'),
              avatar: Yup.mixed()
                        .required('A profile picture is required')
                        .test('fileSize', 'File size too large', value => {
                          return value && value.size <= 5 * 1024 * 1024;
                        })
                        .test('fileType', 'Unsupported file format', value => {
                          return value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type);
                        })
            })}
            onSubmit={signUp}>
            {({setFieldValue}) => (
              <Form className='form__form'>
                <Field
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="Display name"
                  autoComplete="off"
                  className="form__form-input"
                />
                <ErrorMessage className='form__form-error' name="displayName" component="div" />
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
                <input 
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.currentTarget.files[0];
                    setFieldValue('avatar', file);
                    setFileName(file ? file.name : '');
                  }}
                  style={{display: 'none'}}
                />
                <label htmlFor="avatar" className='form__form-add-avatar'>
                  <i className='icon-user-circle'></i>
                  <span>
                    { fileName && fileName.length > 15 ? `${fileName.slice(0, 15)}...`
                    : fileName ? fileName
                    : 'Add a profile picture' }
                  </span>
                </label>
                <ErrorMessage className='form__form-error' name="avatar" component="div" />
                <button 
                  type='submit' 
                  className='button button__auth' 
                  disabled={loading}>
                    {loading ? 'Submitting...' : 'Sign up'}
                </button>
              </Form>
            )}
          </Formik>
          <p className='form__redirect'>
            Already have an account?
            <NavLink 
              className="form__redirect-link" 
              end 
              to="/login">Login</NavLink>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Register;