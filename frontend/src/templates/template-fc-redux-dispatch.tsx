import React from 'react';
import { Layout, Button } from 'antd';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Actions
import { publicApiStart } from '../redux/general/general.slice';

const { Content } = Layout;

const FunctionalComponentRedux = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const callPublicApi = () => {
    dispatch(publicApiStart());
  };

  return (
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
        <Button onClick={callPublicApi}>{t('Call Public Api')}</Button>
      </div>
    </Content>
  );
};

export default FunctionalComponentRedux;
