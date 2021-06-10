import React, { createRef } from 'react';

// Redux functionalities
import { useDispatch } from 'react-redux';
// Translation
import { useTranslation } from 'react-i18next';
// antd
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

import { registerUserRequest } from '../../redux/user/user.actions';

// Form interface
interface FormInterface {
  email: string;
  password: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface SignUpProps {
  tenant: string;
}

const SignUp = (props: SignUpProps): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formRef = createRef<FormInstance>();

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    const params = {
      tenant: props.tenant,
      email: values.email,
      password: values.password,
    };
    // console.log('params:');
    // console.log(params);
    dispatch(registerUserRequest(params));
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      ref={formRef}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>{t('I do not have an account')}</h1>
      <span>{t('Sign up with your email and password')}</span>
      <Form.Item
        label="name"
        name="signup-name"
        rules={[{ required: true, message: t('Please input your username!') }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="signup-password"
        rules={[{ required: true, message: t('Please input your password!') }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="signup-confirmedPassword"
        rules={[
          { required: true, message: t('Please confirm your password!') },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
