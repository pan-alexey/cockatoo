/** @jest-environment jsdom */
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
global.setImmediate = require('timers').setImmediate;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactDom = require('react-dom/server.node');
jest.mock('react-dom/server', () => ({
  renderToPipeableStream: reactDom.renderToPipeableStream,
}));

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { renderComponent } from '../server/render';
import Component1 from '../__fixtures__/Component1';

test('loads and displays greeting', async () => {
  const html = await renderComponent(<Component1 />);
  console.log('node html', html);

  const { getByText } = render(
    <div data-testid="root">
      <Component1 />
    </div>,
  );

  const text = screen.getByTestId('root');
  expect(text).toBeInTheDocument();
  await waitFor(() => expect(getByText('Lazy component 1')).toBeInTheDocument());

  console.log('client html', screen.getByTestId('root').innerHTML);
  expect(1).toBe(1);
});
