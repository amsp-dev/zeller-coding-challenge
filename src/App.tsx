import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { API, graphqlOperation } from '@aws-amplify/api';
import { ListZellerCustomers } from './graphql/queries';
import './App.css';

import { Customer, ListZellerCustomersQuery, UserTypes } from './types';

import Loader from './components/Loader';
import CustomerList from './components/CustomerList';

const userTypes: UserTypes = { 
  'admin': "Admin", 
  'manager': "Manager" 
};

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentRole, setCurrentRole] = useState<string>('admin');
  const [apiError, setApiError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = (await API.graphql(graphqlOperation(ListZellerCustomers))) as {
        data: ListZellerCustomersQuery
      }
    
      const customers = result.data.listZellerCustomers.items;
      setCustomers(customers);
    
    } catch (error) {
      console.error(error);
      setApiError(error);
    } finally {
      setIsLoading(false)
    }
  }

  const showUser = useCallback((userType: string) => {
    setCurrentRole(userType)
  }, []);
  
  return (
    <div className="App">
      <Section>
        <SectionTitle>User Types</SectionTitle>
        <UserTypesList aria-label="filters">
          {Object.keys(userTypes).map(userType => (
            <UserType aria-label={`filter-by-${userType}`} onClick={() => showUser(userType)} key={userType} className={(currentRole === userType) ? 'active' : ''}>
              <UserTypeInput readOnly type="radio" name="userType" value={userType} checked={(currentRole === userType)} />
              <UserTypeLabel>
                {userTypes[userType]}
              </UserTypeLabel>
            </UserType>
          ))}
        </UserTypesList>
      </Section>
      {!apiError && (
        <Section className="users">
          {isLoading && (
            <Loader />
          )}
          <SectionTitle>Admin Users</SectionTitle>
          {customers && (
            <CustomerList customers={customers.filter(customer => customer.role.toLowerCase() === currentRole)} />
          )}
        </Section>
      )}
      {(!isLoading && apiError) && (
        <Section className="error">
          <h4>There was an error loading items from the API</h4>
        </Section>
      )}
    </div>
  );
}

export default App;

const UserTypeLabel = styled.label({
  paddingLeft: 16,
  cursor: 'pointer'
});

const UserTypeInput = styled.input({
  width: 20,
  height: 20,
  margin: 0,
  cursor: 'pointer'
});

const UserType = styled.li({
  display: 'flex',
  alignItems: 'center',
  justifyContent:'flex-start',
  listStyleType: 'none',
  margin: 0,
  padding: '16px 12px',
  cursor: 'pointer',
  transition: 'all linear 200ms',
  borderRadius: 5,
  '&:hover' : {
    backgroundColor: 'rgba(228,238,249,.5)'
  },
  '&.active, &:active' : {
    backgroundColor: 'rgba(228,238,249,1)'
  }
});

const UserTypesList = styled.ul({
  listStyleType: 'none',
  margin: 0,
  padding: '14px 0',
  '@media screen and (max-width: 682px)': {
    padding: '0',

  }
});

const SectionTitle = styled.h3({
  fontWeight: 500,
  fontSize: '1.5em',
  lineHeight: '1em'
});

const Section = styled.section({
  padding: '18px 56px',
  maxWidth: '682px',
  margin: '0 auto',
  textAlign: 'left',
  borderBottom: '1px solid rgb(215, 222, 232)',
  backgroundColor: 'rgba(255,255,255,.45)',
  boxSizing: 'border-box',
  position: 'relative',
  '@media screen and (max-width: 682px)': {
    padding: 16
  },
  '&.users': {
    minHeight: 200
  },
  '&.error': {
    marginTop: 16,
    borderBottom: 'unset',
    backgroundColor: 'rgba(255,0,0,.08)',
    textAlign: 'center',
    color: '#CC0000',
    borderRadius: 5,
  }
});
