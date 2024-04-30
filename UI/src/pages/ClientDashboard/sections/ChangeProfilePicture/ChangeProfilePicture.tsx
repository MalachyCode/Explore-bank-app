import { useEffect, useState } from 'react';
import usersService from '../../../../services/users';
import { User } from '../../../../types';
import './ChangeProfilePicture.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeProfilePicture = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<File | null>();
  const [user, setUser] = useState<User>();
  const [imageSrc, setImageSrc] = useState('');
  const MIN_DIMENSION = 150;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const uploadProfilePicture = () => {
    const formData = new FormData();
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);

      if (user) {
        usersService
          .updateProfilePicture(user?.id, formData)
          .then((response) => {
            // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
            const modifiedObjectForStorage = JSON.stringify(response);
            localStorage.setItem('loggedAppUser', modifiedObjectForStorage);
          })
          .catch((e) => console.log(e));

        navigate(-1);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || '';
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', function (this: HTMLImageElement) {
        const naturalHeight = this.height;
        const naturalWidth = this.width;

        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          toast.error('Image must 150 x 150 px', {
            position: 'top-center',
          });

          return setImageSrc('');
        } else {
          setImageSrc(imageUrl);
          setProfilePicture(e.target.files ? e.target.files[0] : null);
        }
      });
    });
    reader.readAsDataURL(file);
  };

  return (
    <div className='change-profile-picture'>
      <div className='container'>
        <div className='header-loader-container'>
          <h3>Upload Profile Picture</h3>
          <input type='file' className='uploader' onChange={handleChange} />
        </div>
        {imageSrc && (
          <div className='image-src-container'>
            <img src={imageSrc} alt='upload' className='image-src' />
          </div>
        )}
        <div className='btn-container'>
          <button className='btn' onClick={uploadProfilePicture}>
            Upload
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangeProfilePicture;
