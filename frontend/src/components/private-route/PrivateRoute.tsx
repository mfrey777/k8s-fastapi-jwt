import React from 'react';
// Private Route React Router 5
import { Redirect, Route, RouteProps } from 'react-router';

// Redux functionalities
// import { useSelector } from 'react-redux';

// import { selectTenantTenantId } from '../../redux/tenant/tenant.selectors';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
  authenticated: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  // const tenantId = useSelector(selectTenantTenantId);

  // console.log('protected route props: ');
  // console.log(props);
  // let tenant = '';

  // if (props.location?.pathname !== undefined) {
  //   // console.log(props.path as string);
  //   tenant = (props.location?.pathname as string).split('/')[1];
  // }
  // console.log('ProtectedRoute tenant: ' + tenant);
  // console.log('ProtectedRoute authenticated: ' + props.authenticated);
  // let validTenant = false;
  // // TODO - add valid tenant check
  // if (tenant === tenantId) {
  //   validTenant = true;
  // }
  // console.log('ProtectedRoute validTenant: ' + validTenant);
  let redirectPath = '';

  if (!props.authenticated) {
    redirectPath = '/login';
  }

  if (redirectPath !== '') {
    console.log('ProtectedRoute redirectPath: ' + redirectPath);
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
