// Import libraries and components first
import { render, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

import Register from './Register';
import { auth } from '../../../services/firebase';

jest.mock('../../../services/firebase', () => {
    return {
      auth: {
        createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { email: 'test@gmail.com', uid: '1234' } }),
      },
    };
  });

  describe('Register Component', () => {
  
    it('renders correctly', () => {
      const { getByPlaceholderText, getByTestId } = render(<Register />);
  
      expect(getByPlaceholderText('Email')).toBeInTheDocument();
      expect(getByPlaceholderText('Password')).toBeInTheDocument();
      expect(getByTestId('register-heading')).toBeInTheDocument();
    });

  it('displays an error message when registration fails', async () => {
    const { getByPlaceholderText, getByRole, findByText } = render(<Register />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByRole('button', { name: 'Register' });

    auth.createUserWithEmailAndPassword.mockImplementationOnce(() => Promise.reject(new Error('Failed to create an account.')));

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    const errorMessage = await findByText('Failed to create an account.');

    expect(errorMessage).toBeInTheDocument();
  });
});
