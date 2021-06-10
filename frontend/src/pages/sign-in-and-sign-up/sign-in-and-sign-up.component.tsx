import { ReactElement } from 'react';
import * as React from 'react';

import SignIn from '../../components/sign-in/sign-in.components';
import SignUp from '../../components/sign-up/sign-up.component';
// import Dummy from '../../components/dummy/dummy.components';
import { RouteComponentProps } from 'react-router-dom';

// import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';
// import './sign-in-and-sign-up.styles.css';
// import { RouteProps, RouteComponentProps } from 'react-router-dom';

type RouteInfo = {
  tenant?: string;
};

const SignInandSignUpPage: React.FC<RouteComponentProps<RouteInfo>> = ({
  match,
}: RouteComponentProps<RouteInfo>): ReactElement => (
  <div className="sign-in-and-sign-up">
    <SignUp tenant={match.params.tenant as string} />
    <SignIn tenant={match.params.tenant as string} />
  </div>
);

export default SignInandSignUpPage;
