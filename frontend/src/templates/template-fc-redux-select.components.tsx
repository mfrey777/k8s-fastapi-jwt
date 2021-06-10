import React from 'react';
import { Layout, Breadcrumb } from 'antd';

// Redux functionalities
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Selectors
import { selectTenantStatus } from '../redux/tenant/tenant.selectors';
import { selectCurrentUser } from '../redux/user/user.selectors';

// State (only for direct selections)
// import { RootState } from '../../redux/root.reducer';

const { Content } = Layout;

const FunctionalComponentRedux = (): JSX.Element => {
  const { t } = useTranslation();

  // Select state with reselect
  // const {
  //   tenant_id: stored_tenant_id,
  //   validated: tenant_validated,
  //   timestamp: tenant_timestamp,
  //   status,
  // } = useSelector((state: RootState) => state.tenant);

  const currentUser = useSelector(selectCurrentUser);
  const status = useSelector(selectTenantStatus);

  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{t('Home')}</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <p>
          {t('User')}: {currentUser}
        </p>
        <p>
          {t('Status')}: {status}
        </p>
      </div>
    </Content>
  );
};

export default FunctionalComponentRedux;
