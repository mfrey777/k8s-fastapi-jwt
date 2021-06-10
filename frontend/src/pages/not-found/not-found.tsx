import { NavLink } from 'react-router-dom';
import { Alert } from 'antd';

const NotFound = (): JSX.Element => (
  <div>
    <Alert
      type="error"
      message="404! This view hasn't been created yet."
      description="404! This view hasn't been created yet."
      showIcon
    />
    <br />
    <NavLink to="/" className="pf-c-nav__link">
      Take me home
    </NavLink>
  </div>
);

export { NotFound };
