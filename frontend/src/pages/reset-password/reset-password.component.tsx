import { ReactElement } from 'react';
import * as React from 'react';

import ResetPassword from '../../components/reset-password/reset-password.component';

// import Dummy from '../../components/dummy/dummy.components';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

// import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';
// import './sign-in-and-sign-up.styles.css';
// import { RouteProps, RouteComponentProps } from 'react-router-dom';

type RouteInfo = {
  tenant?: string;
};

// const values = queryString.parse(this.props.location.search);
// const username = values.username;
// const code = values.code;

const ResetPasswordPage: React.FC<RouteComponentProps<RouteInfo>> = ({
  // match,
  location,
}: RouteComponentProps<RouteInfo>): ReactElement => {
  console.log(queryString.parse(location.search));
  return (
    <div className="sign-in-and-sign-up">
      {/* <SignIn match={match} />
    <SignUp match={match} /> */}
      <ResetPassword
        // tenant={match.params.tenant as string}
        username={queryString.parse(location.search).username as string}
        code={queryString.parse(location.search).code as string}
      />
      {/* <SignUp /> */}
      {/* {match.url.split('/')[1]}
    {match.params.tenant} */}
      {/* <div>match: {match.params.tenant}</div> */}
    </div>
  );
};

// const SignInandSignUpPage: React.FC<RouteComponentProps<RouteInfo>> = ({
//   match,
// }: RouteComponentProps<RouteInfo>): ReactElement => (
//   <div className="sign-in-and-sign-up">
//     <p>Login Screen</p>
//     {match.params.tenant}
//     <Dummy />
//   </div>
// );

export default ResetPasswordPage;
