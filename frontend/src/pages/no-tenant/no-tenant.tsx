import * as React from 'react';

// Redux functionalities
import { useSelector, useDispatch } from 'react-redux';

// React components
import MissingTenant from '../../components/missing-tenant/missing-tenant';
import InitializeSystem from '../../components/initialize-system/initialize-system';

// Redux actions
import { checkGlobalTenantRequest } from '../../redux/tenant/tenant.slice';

// Redux selector
import { selectTenantGlobalExists } from '../../redux/tenant/tenant.selectors';

const NoTenant = (): JSX.Element => {
  const dispatch = useDispatch();
  const tenantGlobalExists = useSelector(selectTenantGlobalExists);
  React.useEffect(() => {
    console.log('NoTenant triggering action: checkGlobalTenantRequest');
    dispatch(checkGlobalTenantRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {tenantGlobalExists ? (
        <MissingTenant></MissingTenant>
      ) : (
        <InitializeSystem></InitializeSystem>
      )}
    </div>
  );
};

export default NoTenant;
