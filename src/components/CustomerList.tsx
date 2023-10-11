import React from 'react';
import styled from '@emotion/styled';
import { Customer } from '../types';

const CustomerList: React.FunctionComponent<{ customers: Customer[]}> = ({ customers }) => {

  const treatRoleLabel = ((role: string) => {
    return role[0].toUpperCase() + role.slice(1);
  });
   
  return (
    <div className="customer-list">
      <Customers aria-label="users">
        {customers.map(customer => (
          <CustomerItem key={customer.id}>
            <CustomerLink href={`mailto: ${customer.email}`}>
              <CustomerInitial className="initial">
                {customer.name.charAt(0)}
              </CustomerInitial>
              <CustomerDetails>
                <CustomerName>
                  {customer.name}
                </CustomerName>
                <CustomerRole>
                  {treatRoleLabel(customer.role.toLowerCase())}
                </CustomerRole>
              </CustomerDetails>
            </CustomerLink>
          </CustomerItem>
        ))}
      </Customers>
    </div>
  );
}

export default CustomerList;

const CustomerRole = styled.span({
  color: 'rgba(0,0,0,.6)',

});

const CustomerName = styled.h5({
  fontWeight: 500,
  fontSize: '1.2rem',
  margin: '5px 0',
});

const CustomerDetails = styled.div({});

const CustomerInitial = styled.div({
  width: 40,
  aspectRatio: '1/1',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 3,
  color: 'rgb(12,90,195)',
  fontWeight: 500,
  flexShrink: 0,
  marginRight: 16,
  transition: 'all linear 200ms',
});

const CustomerLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent:'flex-start',
  listStyleType: 'none',
  margin: 0,
  padding: '10px 12px',
  textDecoration: 'none',
  color: '#000000',
});

const CustomerItem = styled.li({
  cursor: 'pointer',
  transition: 'all linear 200ms',
  borderRadius: 5,
  '&:hover' : {
    backgroundColor: 'rgba(228,238,249,.5)'
  },
  '&.active, &:active' : {
    backgroundColor: 'rgba(228,238,249,1)',
  },
  '.initial': {
    backgroundColor: 'rgba(228,238,249,1)'
  },
  '&:hover, &:active, &.active' : {
    '.initial': {
      backgroundColor: 'rgba(255,255,255,1)'
    }
  }
});

const Customers = styled.ul({
  listStyleType: 'none',
  margin: '0 -12px',
  padding: 0
});
