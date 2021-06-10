import * as React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../redux/user/user.actions';

const Logout = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to={'/login'} />;
};

export default Logout;
