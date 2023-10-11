import React from 'react';
import { render, screen, within } from '@testing-library/react';
import CustomerList from './CustomerList';

const mockCustomers = [
  {
      "email": "david@gmail.com",
      "id": "73bae2af-4fa4-4023-8829-1034604e7590",
      "name": "David Miller",
      "role": "ADMIN"
  },
  {
      "email": "joe@gmail.com",
      "id": "edc033b9-ba6c-4857-9ff9-85c52ad39ef9",
      "name": "Joe Perera",
      "role": "ADMIN"
  },
  {
      "email": "cris@gmail.com",
      "id": "24d34832-7c10-4c91-a582-32a0222125c0",
      "name": "Chris Miller",
      "role": "ADMIN"
  }
]

describe('Customer List', () => {
  it("should render list of 3 users", () => {
    render(<CustomerList customers={mockCustomers} />)
    const list = screen.getByRole("list", {
      name: /users/i,
    })
    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem")
    expect(items.length).toBe(3)
  })
});


