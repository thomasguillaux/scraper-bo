import { render, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';
import { auth } from '../../../services/firebase';
import firebase from 'firebase/compat/app';

jest.mock('../../../services/firebase', () => ({
  auth: {
    signInWithPopup: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  },
}));

jest.mock('firebase/compat/app', () => ({
    ...jest.requireActual('firebase/compat/app'),
    auth: () => ({
      signInWithEmailAndPassword: jest.fn(),
      signInWithPopup: jest.fn(),
      GoogleAuthProvider: () => ({
        setCustomParameters: jest.fn()
      })
    }),
  }));
  

describe('SignIn Component', () => {
  it('renders without crashing', () => {
    render(<SignIn />);
  });

  it('attempts to sign in with Google when the corresponding button is clicked', () => {
    const { getByText } = render(<SignIn />);
    const signInButton = getByText('Sign in with Google');
  
    auth.signInWithPopup.mockImplementationOnce(() =>
      Promise.resolve({ user: {} })
    );
  
    fireEvent.click(signInButton);
  
    expect(auth.signInWithPopup).toHaveBeenCalled();
  });

  it('attempts to sign in with email and password when the corresponding button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<SignIn />);
    const signInButton = getByText('Sign in');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
  
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    auth.signInWithEmailAndPassword.mockImplementationOnce(() =>
      Promise.resolve({ user: {} })
    );
  
    fireEvent.click(signInButton);
  
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@gmail.com', 'password123');
  });

  it('displays an error message when signing in with email and password fails', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<SignIn />);
    const signInButton = getByText('Sign in');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
  
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    auth.signInWithEmailAndPassword.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to sign in'))
    );
  
    fireEvent.click(signInButton);
  
    const errorMessage = await findByText('Invalid email or password.');
    expect(errorMessage).toBeTruthy();
  });
  
});
