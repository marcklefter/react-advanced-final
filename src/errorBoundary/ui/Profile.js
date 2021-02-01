import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  AppError
} from '../AppError';

import {
  useErrorHandler
} from '../errorContext';

export function Profile() {
  const [profile, setProfile] = useState(null);

  const {
    capture,
    trace
  } = useErrorHandler();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const result = await axios('https://randomuser.me/api/');

        setProfile(result.data.results[0]);
      } catch (error) {
        capture(error);
      }
    }

    fetchProfile();
  }, [capture]);

  const onEditDetails = () => {
    try {
      throw new AppError('Could not edit user details');
    } catch (error) {
      trace(error);
    }
  };

  // ...

  if (!profile) {
    return null;
  }

  const {
    name,
    picture
  } = profile;

  return (
    <>
      <p>{name.first} {name.last}</p>
      <div style={{ marginBottom: 50 }}>
        <img src={picture.large} alt="" />
      </div>
      <button onClick={onEditDetails}>Edit Details</button>
    </>
  )
}