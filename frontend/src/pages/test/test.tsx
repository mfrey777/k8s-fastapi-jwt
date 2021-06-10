import React from 'react';
import { NavLink } from 'react-router-dom';
import { Alert } from 'antd';
import TestForm from '../../components/test-form/test-form.components';
import TemplateClassConnectedProps from '../../templates/template-class-connected-props.components';

const Test = (): JSX.Element => (
  <div>
    <Alert
      type="success"
      message="This is a test page !"
      description="This is a test page !"
      showIcon
    />
    <br />
    <NavLink to="/" className="pf-c-nav__link">
      Take me home
    </NavLink>
    <TestForm></TestForm>
    <TemplateClassConnectedProps tenant="t1"></TemplateClassConnectedProps>
  </div>
);

export default Test;
