import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import addAvatar from '../resources/img/add_avatar.png';
import remSticker from '../resources/img/rem_sticker.png';
import '../style/form.scss';

const Register = () => {
  const [fileName, setFileName] = useState('');

  return (
    <div className="form">
      <div className="form__wrapper">
        <img src={remSticker} className='form__decoration' alt="Rem" />
        <span className="form__title">Register</span>
        <Formik
          initialValues={{
            displayName: '',
            email: '',
            password: ''
          }}
          onSubmit = {values => {
            console.log(JSON.stringify(values, null, 2))
            console.log(values.avatar.name);
          }}>
          {({setFieldValue}) => (
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
              <button className='button button__auth'>Sign up</button>
            </Form>
          )}
        </Formik>
        <p className='form__redirect'>
          Already have an account? Login
        </p>
      </div>
    </div>
  )
}

export default Register;