import React, { createRef } from 'react';

// Redux functionalities
import { useDispatch } from 'react-redux';
// Translation
import { useTranslation } from 'react-i18next';
// antd
import { Form, Input, Button, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

import { loginUserRequest } from '../../redux/user/user.actions';

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

interface SignInProps {
  tenant: string;
}

const SignIn = (props: SignInProps): JSX.Element => {
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
    dispatch(loginUserRequest(params));
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
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: t('Please input your username!') }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: t('Please input your password!') }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>{t('Remember me')}</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
