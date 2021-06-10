import React from 'react';
import { Menu, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { Link } from 'react-router-dom';

// Redux functionalities
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Selectors
import {
  selectLanguage,
  selectCurrentUser,
  // selectIsAuthenticated,
} from '../../redux/user/user.selectors';
import { selectTenantTenantId } from '../../redux/tenant/tenant.selectors';

// Actions
import { setLanguage } from '../../redux/user/user.actions';

// Settings for antd menu
const { Option } = Select;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentUser = useSelector(selectCurrentUser);
  const tenantId = useSelector(selectTenantTenantId);
  let language = useSelector(selectLanguage);
  // const isAuhtenticated = useSelector(selectIsAuthenticated);

  const handleChange = (value: SelectValue) => {
    console.log(`selected ${value}`);
    dispatch(setLanguage({ language: String(value) }));
  };

  if (language === '') {
    language = 'en';
  }
  return (
    <Menu mode="horizontal" theme="dark">
      <SubMenu title={<span>{t('Actions')}</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">{t('Option 1')}</Menu.Item>
          <Menu.Item key="setting:2">{t('Option 2')}</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">{t('Option 3')}</Menu.Item>
          <Menu.Item key="setting:4">{t('Option 4')}</Menu.Item>
        </MenuItemGroup>
      </SubMenu>

      <Menu.Item key="app">
        <Select
          defaultValue={language}
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="en">en</Option>
          <Option value="fr">fr</Option>
          <Option value="de">de</Option>
        </Select>
      </Menu.Item>
      <Menu.Item key="tenant">
        <Link to="/select-tenant">{tenantId}</Link>
      </Menu.Item>
      <Menu.Item key="user">
        <Link to="/">{currentUser}</Link>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
