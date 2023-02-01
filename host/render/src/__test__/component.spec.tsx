/** @jest-environment jsdom */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component1 from '../__fixtures__/Component1';

test('loads and displays greeting', async () => {
  const { getByText } = render(
    <div data-testid={'app'}>
      <Component1 />
    </div>,
  );
  await waitFor(() => expect(getByText('Lazy component 1')).toBeInTheDocument());
  console.log(screen.getByTestId('app').innerHTML);
  // ASSERT
  expect(1).toBe(1);
});
