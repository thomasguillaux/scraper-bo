import { render, fireEvent } from '@testing-library/react';
import Auth from './Auth';
import { auth } from '../../services/firebase';

jest.mock('../../services/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  },
}));

describe('Auth Component', () => {
  it('renders without crashing', () => {
    render(<Auth />);
  });

  it('toggles between sign in and register', () => {
    const { getByText } = render(<Auth />);
    const toggleButton = getByText("Don't have an account ? Please register");

    fireEvent.click(toggleButton);
    expect(getByText('Go back to Sign In')).toBeTruthy();
  });

  it('handles sign out when user is logged in', async () => {
    auth.onAuthStateChanged.mockImplementationOnce((callback) => callback({ uid: 'testUser' }));
    const { getByText } = render(<Auth />);
    const signOutButton = getByText('Log Out');
    
    auth.signOut.mockResolvedValue();
    fireEvent.click(signOutButton);

    expect(auth.signOut).toHaveBeenCalled();
  });
});
