import React from 'react';

// React Router
import { Route, Switch } from 'react-router-dom';

// Protected Route
import ProtectedRoute, {
  ProtectedRouteProps,
} from './components/private-route/PrivateRoute';

// Redux
import { useSelector } from 'react-redux';

// Redux selectors
import {
  selectCurrentTenant,
  selectIsAuthenticated,
} from './redux/user/user.selectors';

// Components
import Home from './pages/home/home';

// Lazy loading components
const Test = React.lazy(() => import('./pages/test/test'));
const SignInPage = React.lazy(
  () => import('./pages/sign-in/sign-in.component')
);
const CreateTenantPage = React.lazy(
  () => import('./pages/create-tenant-page/create-tenant-page')
);
const Logout = React.lazy(() => import('./pages/logout/logout'));
const Report = React.lazy(() => import('./pages/report/report.component'));
const ResetPasswordPage = React.lazy(
  () => import('./pages/reset-password/reset-password.component')
);
const SelectTenant = React.lazy(
  () => import('./components/select-tenant/select-tenant')
);
const InitializeSystem = React.lazy(
  () => import('./components/initialize-system/initialize-system')
);
const CurrencyConversionPage = React.lazy(
  () => import('./pages/currency-conversion/currency-conversion.components')
);
const CashFlowPage = React.lazy(
  () => import('./pages/cash-flow/cash-flow.components')
);
const CreateFromXmlPage = React.lazy(
  () => import('./pages/create-from-xml/create-from-xml.components')
);
const CreateFromExcelPage = React.lazy(
  () => import('./pages/create-from-excel/create-from-excel.components')
);
const importDataFromCSV = React.lazy(
  () => import('./pages/import-data-from-csv/import-data-from-csv.components')
);

const createReport = React.lazy(
  () => import('./pages/create-report/create-report.components')
);

const DragAndDropExample = React.lazy(
  () => import('./pages/drag-and-drop-example/drag-and-drop-example.components')
);

const DragAndDropExampleRbd = React.lazy(
  () =>
    import(
      './pages/drag-and-drop-example-rbd/drag-and-drop-example-rbd.components'
    )
);

const TabsExample = React.lazy(
  () => import('./pages/tabs-example/tabs-example.components')
);

const Chart = React.lazy(() => import('./pages/chart/chart.components'));

const defaultProtectedRouteProps: ProtectedRouteProps = {
  authenticated: false,
  authenticationPath: '/login',
};

const routes = (): JSX.Element => {
  const currentTenant = useSelector(selectCurrentTenant);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Switch>
      {currentTenant === 'global' && (
        <Route exact path="/create-tenant" component={CreateTenantPage} />
      )}
      <Route {...defaultProtectedRouteProps} exact path="/" component={Home} />
      <ProtectedRoute
        {...defaultProtectedRouteProps}
        authenticated={isAuthenticated}
        exact={true}
        path="/test"
        component={Test}
      />
      <ProtectedRoute
        {...defaultProtectedRouteProps}
        authenticated={isAuthenticated}
        exact={true}
        path="/report"
        component={Report}
      />
      <ProtectedRoute
        {...defaultProtectedRouteProps}
        authenticated={isAuthenticated}
        exact={true}
        path="/create-report"
        component={createReport}
      />
      <Route path="/currency-conversion" component={CurrencyConversionPage} />
      <Route path="/cash-flow" component={CashFlowPage} />
      <Route path="/create-from-xml" component={CreateFromXmlPage} />
      <Route path="/create-from-excel" component={CreateFromExcelPage} />
      <Route path="/import-data-from-csv" component={importDataFromCSV} />
      <Route path="/login" component={SignInPage} />
      <Route path="/logout" component={Logout} />
      <Route path="/select-tenant" component={SelectTenant} />
      <Route path="/initialize-system" component={InitializeSystem} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/drag-and-drop" component={DragAndDropExample} />
      <Route path="/drag-and-drop-rbd" component={DragAndDropExampleRbd} />
      <Route path="/chart" component={Chart} />
      <Route path="/tabs-example" component={TabsExample} />
    </Switch>
  );
};

export default routes;
