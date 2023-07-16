import React, { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import './auth.css';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // add a realtime listener
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="container">
      <h1 className="title">Authentication Page</h1>
      {user ? (
        <button className="button" onClick={logOut}>
          Log Out
        </button>
      ) : (
        <>
          {isRegistering ? <Register /> : <SignIn />}
          <button onClick={toggleMode}>
            {isRegistering ? 'Switch to Sign In' : 'Switch to Register'}
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
