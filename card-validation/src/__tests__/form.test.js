import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import CardForm from '../components/CardForm';

describe('CardForm component', () => {
  it('should submit a form', async () => {
    const handleSubmit = jest.fn();
    render(<CardForm onSubmit={handleSubmit} />);

    await act(async() => {
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4916988831312424' }});
      fireEvent.change(screen.getByLabelText(/month/i), { target: { value: '04'}});
      fireEvent.change(screen.getByLabelText(/year/i), { target: { value: '24' }});
      fireEvent.change(screen.getByLabelText(/security code/i), { target: { value: '232' }});
    })

    await act(async () => {
      fireEvent.submit(screen.getByTestId('form'))
    });

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        cardnumber: '4916988831312424',
        expireMM: '04',
        expireYY: '24',
        securitycode: '232',
      }),
    )
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
    userEvent.click(screen.getByLabelText(/security code/i));
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
    userEvent.type(screen.getByLabelText(/card number/i), '1234567812345678');
    await waitFor(() => {
      expect(screen.getByText('1234567812345678')).toBeInTheDocument();
    });
  });

  it('should validate name', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/name/i), '235Fnskair');
    userEvent.click(screen.getByLabelText(/card number/i));
    await waitFor(() => {
      expect(screen.getByText('enter a valid name')).toBeInTheDocument();
    });
  });

  it('should validate number', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/card number/i), '235000');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('enter a valid card number')).toBeInTheDocument();
    });
  });

  it('should validate month of expiration', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/month/i), '');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('required')).toBeInTheDocument();
    });
  });

  it('should validate security code', async () => {
    render(<CardForm />);
    userEvent.type(screen.getByLabelText(/security code/i), '22');
    userEvent.click(screen.getByLabelText(/name/i));
    await waitFor(() => {
      expect(screen.getByText('too short')).toBeInTheDocument();
    });
  });
});
