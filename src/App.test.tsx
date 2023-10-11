import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Amplify from '@aws-amplify/core'
import config from './aws-exports';
import { act } from 'react-dom/test-utils';
import App from './App';

Amplify.configure(config);

describe('App Component', () => {
  it('Should render the User Types heading and filters', async () => {
    await act( async () => render(<App/>));
    const heading = screen.getByText(/User Types/i);
    expect(heading).toBeInTheDocument();

    const filterList = screen.getByRole("list", {
      name: /filters/i,
    });

    const { getAllByRole } = within(filterList);
    const filters = getAllByRole("listitem");
    expect(filters.length).toBe(2);

  });
});
