import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import CardForm from '../components/CardForm';

describe('form tests', () => {
  it('rendering and submitting a form', async () => {
    const handleSubmit = jest.fn();

    render(<CardForm onSubmit={handleSubmit} />);

    fireEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    fireEvent.type(screen.getByLabelText(/cardnumber/i), '4916 9888 3131 2424');
    fireEvent.type(screen.getByLabelText(/expireMM/i), '04');
    fireEvent.type(screen.getByLabelText(/expireYY/i), '24');
    fireEvent.type(screen.getByLabelText(/securitycode/i), '232');

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

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

  it('validate input', async () => {
    // render(<CardForm/>)
    // fireEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    // await waitFor(() => {
    //   expect(screen.getByText('required')).toBeInTheDocument()
    // })
  });
});
