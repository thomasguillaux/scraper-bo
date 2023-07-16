import React, { useState } from 'react';
import { auth } from '../../../services/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
  const signInWithEmailAndPassword = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in
        const user = userCredential.user;
        console.log('User successfully signed in:', user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error('Error signing in:', error);
        setErrorMessage('Invalid email or password.');
      });
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button className="button" onClick={signInWithEmailAndPassword}>
        Sign in
      </button>
      <button className="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="error">{errorMessage}</p>
    </div>
  );
};

export default SignIn;
