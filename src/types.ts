export type Customer = {
  email: string;
  id: string;
  name: string;
  role: string;
}

export type UserTypes = {
  [key: string]: string;
}

export type ListZellerCustomersQuery = {
  listZellerCustomers: {
    items: Customer[];
  }
}