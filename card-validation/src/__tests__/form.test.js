import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CardForm from '../components/CardForm';

describe('form tests', () => {
  it('submitting a form', async () => {
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

  it('changing input value', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i).value).toBe('John Doe');
    });
  });

  it('changing card side to back after clicking on cvv input', async () => {
    render(<CardForm />);
    userEvent.click(screen.getByLabelText(/securitycode/i));
    await waitFor(() => {
      expect(screen.getByTestId('card-back')).toBeInTheDocument();
    });
  });

  it('changing card side to front after clicking on name input', async () => {
    render(<CardForm />);
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByTestId('card-front')).toBeInTheDocument();
    });
  });

  it('displaying input values on card', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/cardnumber/i), '1234567812345678');
    await waitFor(() => {
      expect(screen.getByText('1234567812345678')).toBeInTheDocument();
    });
  });

  it('validating card name', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/name/i), '235Fnskair');
    userEvent.click(screen.getByLabelText(/cardnumber/i));
    await waitFor(() => {
      expect(screen.getByText('enter a valid name')).toBeInTheDocument();
    });
  });

  it('validating card number', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/cardnumber/i), '235000');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('enter a valid card number')).toBeInTheDocument();
    });
  });

  it('validating month of expiration', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/expireMM/i), '');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('required')).toBeInTheDocument();
    });
  });

  it('validating card security code', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/securitycode/i), '22');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('too short')).toBeInTheDocument();
    });
  });
});
