import React from 'react';
import { Layout } from 'antd';
import Tenant from '../../components/create-tenant/create-tenant.component';

const { Content } = Layout;

const createTenant = (): JSX.Element => {
  return (
    <Content style={{ padding: '0 50px' }}>
      <Tenant />
    </Content>
  );
};

export default createTenant;
