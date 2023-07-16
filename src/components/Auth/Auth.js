import React, { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import './auth.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Auth = () => {
  const [user, setUser] = useState(null);

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

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    auth.signInWithPopup(provider)
      .then((result) => {
        // User signed in
        console.log('User successfully signed in with Google:', result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error('Error signing in with Google:', error);
      });
  };

  const logOut = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Authentication Page</h1>
      {user ? (
        <button className="button" onClick={logOut}>
          Log Out
        </button>
      ) : (
        <button className="button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Auth;

