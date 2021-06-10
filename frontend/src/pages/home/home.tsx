import * as React from 'react';
import { Layout, Breadcrumb } from 'antd';

// Redux functionalities
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, Link } from 'react-router-dom';

// Actions
import {
  publicApiStart,
  protectedApiStart,
  protectedApiCheckProfileStart,
} from '../../redux/general/general.slice';
import { checkTenantRequest } from '../../redux/tenant/tenant.slice';

// Selectors
import {
  selectPublicMessage,
  selectProtectedMessage,
} from '../../redux/general/general.selectors';
import {
  selectTenantTenantId,
  selectTenantValidated,
  selectTenantTimestamp,
  selectTenantStatus,
} from '../../redux/tenant/tenant.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// State (only for direct selections)
// import { RootState } from '../../redux/root.reducer';

const { Content } = Layout;

type RouteInfo = {
  tenant: string;
};

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const match = useRouteMatch<RouteInfo>('/:tenant/');

  // Select state with reselect
  // const {
  //   tenant_id: stored_tenant_id,
  //   validated: tenant_validated,
  //   timestamp: tenant_timestamp,
  //   status,
  // } = useSelector((state: RootState) => state.tenant);

  const public_message = useSelector(selectPublicMessage);
  const protected_message = useSelector(selectProtectedMessage);

  const currentUser = useSelector(selectCurrentUser);

  const stored_tenant_id = useSelector(selectTenantTenantId);
  const tenant_validated = useSelector(selectTenantValidated);
  const tenant_timestamp = useSelector(selectTenantTimestamp);
  const status = useSelector(selectTenantStatus);

  const callPublicApi = () => {
    dispatch(publicApiStart());
  };

  const callProtectedApi = (tenant: string) => {
    dispatch(
      protectedApiStart({ msg: 'none', user: currentUser, tenant: tenant })
    );
  };

  const callProtectedApiCheckProfile = (tenant: string) => {
    dispatch(
      protectedApiCheckProfileStart({
        msg: 'none',
        user: currentUser,
        tenant: tenant,
      })
    );
  };

  React.useEffect(() => {
    if (null !== match) {
      const tenant_id = match.params.tenant;
      if (
        tenant_id !== stored_tenant_id ||
        !tenant_validated ||
        Date.now() - tenant_timestamp > 3600 * 1000
      )
        dispatch(checkTenantRequest({ tenant_id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{t('Home')}</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <ul>
          <li>
            <Link to={'/create-from-xml'}>import structures from xml</Link>
          </li>
          <li>
            <Link to={'/create-from-excel'}>import structures from excel</Link>
          </li>
          <li>
            <Link to={'/import-data-from-csv'}>Import Data from csv</Link>
          </li>
          <li>
            <a
              href="http://global.mylocaldomain.com:32113"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mailhog (dev only)
            </a>
          </li>
          <li>
            <Link to={'/create-report'}>create report</Link>
          </li>
          <li>
            <Link to={'/drag-and-drop'}>Drag-and-drop example</Link>
          </li>
          <li>
            <Link to={'/drag-and-drop-rbd'}>
              Drag-and-drop example react-beautiful-dnd
            </Link>
          </li>
          <li>
            <Link to={'/chart'}>Chart</Link>
          </li>
          <li>
            <Link to={'/tabs-example'}>TabsExample</Link>
          </li>
        </ul>
        <p></p>
        <button type="button" onClick={callPublicApi}>
          Call Public Api
        </button>
        <p>{public_message}</p>
        <button
          type="button"
          onClick={() => callProtectedApi(stored_tenant_id)}
        >
          Call Protected Api
        </button>
        <button
          type="button"
          onClick={() => callProtectedApiCheckProfile(stored_tenant_id)}
        >
          Call Protected Api (check profile)
        </button>
        {/* <button type="button" onClick={() => callProtectedApi('tenant2')}>
          Call Protected Api (tenant2)
        </button> */}
        <p>{protected_message}</p>
        <p>tenant status: {status}</p>
      </div>
    </Content>
  );
};

export default Home;
