// React
import React, { useEffect, useState } from 'react';

// antd
import { Layout, Button } from 'antd';

// Formatting
import './App.css';

// translation
import { useTranslation } from 'react-i18next';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Redux selectors
import {
  // selectCurrentTenant,
  selectIsAuthenticated,
  selectLanguage,
} from './redux/user/user.selectors';

// Redux actions
import { logout } from './redux/user/user.actions';
import { openModal } from './redux/modal/modal.actions';
import { checkTenantRequest } from './redux/tenant/tenant.slice';

// Idle timer (example from: https://github.com/SupremeTechnopriest/react-idle-timer/blob/master/examples/component-ts/src/App.tsx)
import IdleTimer from 'react-idle-timer';

// Components
import Navbar from './components/navbar/Navbar';
import ModalManager from './components/modal-dialog/modal-manager.components';
import ModalConfirmManager from './components/modal-confirm-dialog/modal-confirm-manager.components';
import ModalBlockingManager from './features/modal-blocking/modal-blocking-manager.components';
import { IdleTimeOutModal } from './components/idle-timeout-modal/IdelTimeoutModal';

// Routes
import AppRoutes from './routes';

const { Header, Content, Footer } = Layout;

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // const currentTenant = useSelector(selectCurrentTenant);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const language = useSelector(selectLanguage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setIsTimedOut] = useState(false);

  let _idleTimer: IdleTimer | null = null;
  console.log(_idleTimer);

  const remainingTime: number = 1000 * 30;

  const handleOnActive = () => {
    setIsTimedOut(false);
    console.log('timeout false');
  };

  const handleOnIdle = () => {
    if (isAuthenticated) {
      Promise.resolve()
        .then(() => setIsTimedOut(true))
        .then(() => setIsModalOpen(true))
        .then(() => setTimeout(handleLogout, remainingTime));
    }
    console.log('timeout true');
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = (): void => {
    dispatch(logout());
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('App componentDidMount');
    const host = window.location.host;
    const parts = host.split('.');
    let subdomain = '';
    // If we get more than 3 parts, then we have a subdomain
    // INFO: This could be 4, if you have a co.uk TLD or something like that.
    if (parts.length >= 3) {
      subdomain = parts[0];
      console.log('subdomain: ' + subdomain);
      if (subdomain === 'app') {
        console.log('skip subdomain checking');
      } else {
        console.log('App triggering action: checkTenantRequest');
        dispatch(checkTenantRequest({ tenant_id: subdomain }));
        console.log('App action triggered: checkTenantRequest');
      }
    } else {
      console.log('no subdomain' + subdomain);
    }

    // const { language, i18n } = props;
    // console.log('user language: ', language);
    // console.log('i18n languages: ', i18n.language);
    if (language !== i18n.language) {
      // console.log('language change required');
      // setLanguage(({ language: String(language) }))
      i18n.changeLanguage(String(language));
      // TODO, find a better solution...
      // forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenModal = () => {
    dispatch(
      openModal({
        modalProps: { title: 'Info' },
        modalType: 'ModalDialogInfo',
        modalContent: 'Info Modal',
      })
    );
  };

  const onOpenModal2 = () => {
    dispatch(
      openModal({
        modalProps: { title: 'Simple' },
        modalType: 'ModalDialogSimple',
        modalContent: 'Simple Modal',
      })
    );
  };

  return (
    <Layout className="layout">
      <Header className="site-layout-header">
        <Navbar />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div>
          <IdleTimer
            ref={(ref) => {
              _idleTimer = ref;
            }}
            onActive={handleOnActive}
            onIdle={handleOnIdle}
            timeout={1000 * 60 * 15}
          />
          {/* Idle Timer placeholder */}
          <IdleTimeOutModal
            showModal={isModalOpen}
            handleClose={handleClose}
            handleLogout={handleLogout}
            remainingTime={remainingTime}
          />
          <Button type="primary" onClick={onOpenModal}>
            {t('Open Modal')}
          </Button>
          <Button type="primary" onClick={onOpenModal2}>
            {t('Open Modal 2')}
          </Button>
          <ModalManager></ModalManager>
          <ModalConfirmManager></ModalConfirmManager>
          <ModalBlockingManager></ModalBlockingManager>
        </div>
        <AppRoutes />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {t('Copyright 2020 Société Sàrl')}{' '}
      </Footer>
    </Layout>
  );
  // );
};

export default App;
