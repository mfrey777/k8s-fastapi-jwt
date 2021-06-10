import React, { useState } from 'react';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Drawer, Button } from 'antd';
import './Navbar.css';

import { ReactComponent as ReactLogo } from '../../assets/company-logo2.svg';

// Redux
import { useSelector } from 'react-redux';

// Selectors
import { selectTenantTenantId } from '../../redux/tenant/tenant.selectors';
import { selectIsAuthenticated } from '../../redux/user/user.selectors';

const Navbar = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const tenantId = useSelector(selectTenantTenantId);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const showDrawer = (): void => {
    setVisible(true);
  };

  const onClose = (): void => {
    setVisible(false);
  };

  // const { tenantId, isAuthenticated, path } = this.props;
  return (
    <nav className="menuBar">
      <div className="logo">
        <ReactLogo />
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu tenant={tenantId} isAuthenticated={isAuthenticated} />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu tenant={tenantId} isAuthenticated={isAuthenticated} />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};
export default Navbar;
