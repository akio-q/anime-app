import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth, db, storage } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import addAvatar from '../../resources/img/add_avatar.png';
import remSticker from '../../resources/img/rem_sticker.png';
import '../../style/form.scss';

const Register = () => {
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const signUp = async (values) => { 
    const { displayName, email, password, avatar } = values;

    if (!avatar) return;
    
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

          navigate('/');
        })
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="form">
      <div className="form__wrapper">
        <img src={remSticker} className='form__decoration' alt="Rem" />
        <span className="title_fz25fw600 form__title">Register</span>
        <Formik
          initialValues={{
            displayName: '',
            email: '',
            password: ''
          }}
          validationSchema = {Yup.object({
            displayName: Yup.string()
                            .min(2, 'Minimum two symbols')
                            .required('Required field'),
            email: Yup.string()
                      .email('Wrong email adress')
                      .required('Required field'),
            password: Yup.string()
                        .min(8, 'Password is too short, minimum 8 symbols')
                        .required('Required field')
          })}
          onSubmit = { values => signUp(values) }>
          {({setFieldValue}) => (
            <Form className='form__form'>
              <Field
                id="displayName"
                name="displayName"
                type="text"
                placeholder="Display name"
                className="form__form-input"
              />
              <ErrorMessage className='form__form-error' name="displayName" component="div" />
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
              <Field 
                id="avatar"
                name="avatar"
                type="file"
                value={undefined}
                onChange={e => {
                  const file = e.currentTarget.files[0];
                  setFieldValue('avatar', file);
                  setFileName(file.name);
                }}
                style={{display: 'none'}}
              />
              <label htmlFor="avatar" className='form__form-add-avatar'>
                <img 
                  src={addAvatar} 
                  className='form__form-add-avatar-img' 
                  alt="avatar" />
                <span>{fileName && fileName.length > 15 ? `${fileName.slice(0, 15)}...`
                        : fileName ? fileName
                        : 'Add a profile picture'}</span>
              </label>
              <button type='submit' className='button button__auth'>Sign up</button>
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
    </div>
  )
}

export default Register;