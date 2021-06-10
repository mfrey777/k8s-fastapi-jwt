import { ReactElement } from 'react';
import * as React from 'react';

import SignIn from '../../components/sign-in/sign-in.components';
// import Dummy from '../../components/dummy/dummy.components';
import { RouteComponentProps } from 'react-router-dom';

// import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';
// import './sign-in-and-sign-up.styles.css';
// import { RouteProps, RouteComponentProps } from 'react-router-dom';

type RouteInfo = {
  tenant?: string;
};

const SignInPage: React.FC<RouteComponentProps<RouteInfo>> = ({
  match,
}: RouteComponentProps<RouteInfo>): ReactElement => (
  <div className="sign-in-and-sign-up">
    {/* <SignIn match={match} />
    <SignUp match={match} /> */}
    <SignIn tenant={match.params.tenant as string} />
    {/* <SignUp /> */}
    {/* {match.url.split('/')[1]}
    {match.params.tenant} */}
    {/* <div>match: {match.params.tenant}</div> */}
  </div>
);

// const SignInandSignUpPage: React.FC<RouteComponentProps<RouteInfo>> = ({
//   match,
// }: RouteComponentProps<RouteInfo>): ReactElement => (
//   <div className="sign-in-and-sign-up">
//     <p>Login Screen</p>
//     {match.params.tenant}
//     <Dummy />
//   </div>
// );

export default SignInPage;
