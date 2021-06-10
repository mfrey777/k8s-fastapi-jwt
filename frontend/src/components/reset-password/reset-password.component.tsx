import React, { createRef } from 'react';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// antd
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux actions
import { setNewPasswordRequest } from '../../redux/user/user.actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Form interface
interface FormInterface {
  password: string;
  confirmedPassword: string;
}

export interface ResetPasswordProps {
  // tenant: string;
  username: string;
  code: string;
}

const ResetPassword = (props: ResetPasswordProps): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formRef = createRef<FormInstance>();

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    dispatch(
      setNewPasswordRequest({
        // tenant: props.tenant,
        email: props.username,
        password: values.password,
        code: props.code,
      })
    );
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
        label="Password"
        name="password"
        rules={[
          { required: true, message: t('Please input your new password!') },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmedPassword"
        rules={[
          { required: true, message: t('Please confirm your new password!') },
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

export default ResetPassword;
