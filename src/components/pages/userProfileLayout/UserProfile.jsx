import { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../../../context/AuthContext";
import { db, storage } from '../../../config/firebase';
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';

import UserCard from '../../userCard/UserCard';

import './userProfile.scss';

const UserProfile = () => {
  const [fileName, setFileName] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    const { displayName, avatar } = values;

    try {
      if (displayName) {
        await updateProfile(currentUser, { displayName });
        await updateDoc(doc(db, 'users', currentUser.uid), { displayName });
      }
      if (avatar) {
        const userAvatarsFolderRef = ref(storage, `userAvatars/${avatar.name}`);
        await uploadBytes(userAvatarsFolderRef, avatar);

        const photoURL = await getDownloadURL(userAvatarsFolderRef);
        await updateProfile(currentUser, { photoURL });
        await updateDoc(doc(db, 'users', currentUser.uid), { photoURL });
      }

      toast.success("Profile updated successfully!", { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
    } catch (err) {
      toast.error("Failed to update profile", { 
        position: "bottom-center",
        className: "custom-toast",
        autoClose: 3000
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="user-profile">
      <UserCard />
      <div className="user-profile__content">
        <Formik
          initialValues={{
            displayName: '',
            avatar: null
          }}
          validationSchema={Yup.object({
            displayName: Yup.string()
                            .min(2, 'Minimum 2 symbols')
                            .max(15, 'Maximum 15 symbols'),
            avatar: Yup.mixed()
                      .test('fileSize', 'File size too large', value => {
                        return value ? value.size <= 5 * 1024 * 1024 : true; 
                      })
                      .test('fileType', 'Unsupported file format', value => {
                        return value ? ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) : true;
                      })
                      .nullable()
          })}
          onSubmit={handleProfileUpdate}>
          {({ setFieldValue, isSubmitting }) => (
            <Form className='user-profile__form'>
              <div className="user-profile__change">
                <div className="title_fz18fw500 user-profile__change-title">Change Display Name</div>
                <div>
                  <Field 
                    id="displayName"
                    name="displayName"
                    type="text" 
                    placeholder='Enter Display Name'
                    autoComplete="off"
                    className='user-profile__change-input' />
                  <ErrorMessage className='user-profile__error' name="displayName" component="div" />
                </div>
              </div>
              <div className="user-profile__change">
                <div className="title_fz18fw500 user-profile__change-title">Change Avatar</div>
                <div>
                  <input 
                    id="avatar"
                    name='avatar'
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.currentTarget.files[0];
                      setFieldValue('avatar', file);
                      setFileName(file ? file.name : '');
                    }}
                    style={{display: 'none'}}
                  />
                  <label htmlFor="avatar" className='user-profile__change-input_file'>
                    <i className='icon-user-circle'></i>
                    <span>
                      { fileName && fileName.length > 15 ? `${fileName.slice(0, 15)}...`
                      : fileName ? fileName
                      : 'Add a profile picture' }
                    </span>
                  </label>
                  <ErrorMessage className='user-profile__error' name="avatar" component="div" />
                </div>
              </div>
              <button 
                className='button user-profile__button'
                type='submit'
                disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit changes'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="title_fz14fw500 user-profile__message">Please refresh the page to see the updated changes.</div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProfile;