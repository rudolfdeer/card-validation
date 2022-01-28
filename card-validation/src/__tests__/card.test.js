import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card';

const values = {
  name: 'John Doe',
  cardnumber: '1111222233334444',
  expireMM: '01',
  expireYY: '25',
  securitycode: '222',
};
const side = 'front';

describe('card tests', () => {
  it('displaying values on card', async () => {
    render(<Card values={values} side={side} />);
    await waitFor(() => {
      expect(screen.getByText(values.cardnumber)).toBeInTheDocument();
    });
  });

  it('displaying name in upper case', async () => {
    render(<Card values={values} side={side} />);
    await waitFor(() => {
      expect(screen.getByText(values.name.toUpperCase())).toBeInTheDocument();
    });
  });
});
