import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CardForm from '../components/CardForm';

describe('CardForm component', () => {
  it('should submit a form', async () => {
    const handleSubmit = jest.fn();

    render(<CardForm onSubmit={handleSubmit} />);

    userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    userEvent.type(screen.getByLabelText(/cardnumber/i), '4916 9888 3131 2424');
    userEvent.type(screen.getByLabelText(/expireMM/i), '04');
    userEvent.type(screen.getByLabelText(/expireYY/i), '24');
    userEvent.type(screen.getByLabelText(/securitycode/i), '232');

    //fireEvent.submit(screen.getByTestId('form'));
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        cardnumber: '4916 9888 3131 2424',
        expireMM: '04',
        expireYY: '24',
        securitycode: '232',
      });
    });
  });

  it('should change input value', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i).value).toBe('John Doe');
    });
  });

  it('should change card side to back when cvv input is clicked', async () => {
    render(<CardForm />);
    userEvent.click(screen.getByLabelText(/securitycode/i));
    await waitFor(() => {
      expect(screen.getByTestId('card-back')).toBeInTheDocument();
    });
  });

  it('should change card side to front when name input is clicked', async () => {
    render(<CardForm />);
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByTestId('card-front')).toBeInTheDocument();
    });
  });

  it('should display input values on card', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/cardnumber/i), '1234567812345678');
    await waitFor(() => {
      expect(screen.getByText('1234567812345678')).toBeInTheDocument();
    });
  });

  it('should validate name', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/name/i), '235Fnskair');
    userEvent.click(screen.getByLabelText(/cardnumber/i));
    await waitFor(() => {
      expect(screen.getByText('enter a valid name')).toBeInTheDocument();
    });
  });

  it('should validate number', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/cardnumber/i), '235000');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('enter a valid card number')).toBeInTheDocument();
    });
  });

  it('should validate month of expiration', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/expireMM/i), '');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('required')).toBeInTheDocument();
    });
  });

  it('should validate security code', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/securitycode/i), '22');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('too short')).toBeInTheDocument();
    });
  });
});
