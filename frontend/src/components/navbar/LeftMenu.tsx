import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LeftmenuProps {
  tenant: string;
  isAuthenticated: boolean;
}

const LeftMenu = (props: LeftmenuProps): JSX.Element => {
  const { t } = useTranslation();

  const href = window.location.href.split('/');
  let index = 3;
  if (href.length > 3) {
    index = 4;
  }
  const href2 = '/' + href[index];

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={[href2]}
      selectedKeys={[href2]}
    >
      <Menu.Item key={'/'}>
        <Link to={'/'}>{t('Home')}</Link>
      </Menu.Item>
      {/* )} */}
      {props.isAuthenticated && props.tenant === 'global' && (
        <Menu.Item key={'/create-tenant'}>
          <Link to={'/create-tenant'}>Create Tenant</Link>
        </Menu.Item>
      )}
      {props.isAuthenticated && (
        <Menu.Item key={'/report'}>
          <Link to={'/report'}>Report</Link>
        </Menu.Item>
      )}
      {props.isAuthenticated && (
        <Menu.Item key={'/cash-flow'}>
          <Link to={'/cash-flow'}>Cash Flow</Link>
        </Menu.Item>
      )}
      {props.isAuthenticated && (
        <Menu.Item key={'/test'}>
          <Link to={'/test'}>Test</Link>
        </Menu.Item>
      )}
      {props.isAuthenticated && (
        <Menu.Item key={'/currency-conversion'}>
          <Link to={'/currency-conversion'}>Currency Conversion</Link>
        </Menu.Item>
      )}

      <Menu.Item key={'/login'}>
        {!props.isAuthenticated ? (
          <Link to={'/login'}>Login</Link>
        ) : (
          <Link to={'/logout'}>Logout</Link>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
