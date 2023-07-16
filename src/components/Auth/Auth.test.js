import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Auth from './Auth';
import { auth } from '../../services/firebase';

// Mock the auth module and its methods
jest.mock('../../services/firebase', () => ({
  auth: {
    signInWithPopup: jest.fn().mockResolvedValue({ user: { displayName: 'test user' } }),
    signOut: jest.fn().mockResolvedValue('Sign out successful'),
    onAuthStateChanged: jest.fn(),
  },
  }));
  

test('renders sign in button when no user is authenticated', () => {
  const { getByText } = render(<Auth />);
  const signInButton = getByText(/sign in with google/i);
  expect(signInButton).toBeInTheDocument();
});

test('renders sign out button when user is authenticated', async () => {
  auth.onAuthStateChanged.mockImplementationOnce((callback) => callback({ displayName: 'test user' }));

  const { getByText } = await waitFor(() => render(<Auth />));
  const signOutButton = getByText(/log out/i);
  expect(signOutButton).toBeInTheDocument();
});

test('signs out when sign out button is clicked', async () => {
    auth.onAuthStateChanged.mockImplementationOnce((callback) => callback({ displayName: 'test user' }));
  
    const { getByText } = await waitFor(() => render(<Auth />));
    const signOutButton = getByText(/log out/i);
  
    await act(async () => {
      fireEvent.click(signOutButton);
    });
  
    expect(auth.signOut).toHaveBeenCalled();
  });
  
  
