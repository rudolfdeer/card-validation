import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';

const values = {
  name: 'John Doe',
  cardnumber: '1111222233334444',
  expireMM: '01',
  expireYY: '25',
  securitycode: '222',
};
const side = 'front';

describe('Card component', () => {
  it('should display values on card', async () => {
    render(<Card values={values} side={side} />);
    await waitFor(() => {
      expect(screen.getByText(values.cardnumber)).toBeInTheDocument();
    });
  });

  it('should display name in upper case', async () => {
    render(<Card values={values} side={side} />);
    await waitFor(() => {
      expect(screen.getByText(values.name.toUpperCase())).toBeInTheDocument();
    });
  });
});
