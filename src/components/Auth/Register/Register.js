import React, { useState } from 'react';
import { auth } from '../../../services/firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const registerWithEmailAndPassword = () => {
        auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // User registered and signed in
            const user = userCredential.user;
            console.log('User successfully registered:', user);
          })
          .catch((error) => {
            // Handle Errors here.
            console.error('Error registering:', error);
            setErrorMessage('Failed to create an account.');
          });
      };

    return (
        <div>
          <h2 data-testid="register-heading">Register</h2>
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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="button" onClick={registerWithEmailAndPassword}>
            Register
          </button>
        </div>
    );
};

export default Register;
