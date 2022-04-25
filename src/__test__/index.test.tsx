import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('renders app', () => {
  const { getByTestId } = render(<App />);
  const appWrapper = getByTestId('app-wrapper');
  expect(appWrapper).toBeInTheDocument();
});
