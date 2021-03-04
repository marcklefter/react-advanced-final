import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  AppError
} from '../AppError';

import {
  useError
} from '../errorContext';

// ...
// A Button component featuring built-in error handling. 
//
// Instead of handling errors _inside_ an event handler for the onClick event, simply pass the handler as a prop to
// this component:
//
// const onEditDetails = () => {
//  // simulate an application error.
//  throw new AppError('Cannot edit user details');
// }
// 
// <Button onClick={onEditDetails}>Edit Details</Button>

// function Button({ onClick, children }) {
//   const { capture } = useError();
// 
//   const handler = e => {
//     try {
//       onClick(e);
//     } catch (error) {
//       capture(error);
//     }
//   }
//    
//   return <button onClick={handler}>{children}</button>
// }

export function Profile() {
  const [profile, setProfile] = useState(null);

  const {
    capture,
    trace
  } = useError();

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

  // ...
  // Trace an error occurring in an event handler.
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