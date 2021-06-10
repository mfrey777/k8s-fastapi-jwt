import React, { createRef } from 'react';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// antd
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux actions
import { createGlobalTenantRequest } from '../../redux/tenant/tenant.slice';

interface FormInterface {
  system_password: string;
  email: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const InitializeSystem = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = createRef<FormInstance>();

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    dispatch(
      createGlobalTenantRequest({
        password: values.system_password,
        email: values.email,
      })
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity): void => {
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
      <h1>{t('Initialize system')} </h1>
      <Form.Item
        label="system password"
        name="system_password"
        rules={[{ required: true, message: t('System password') }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: t('System Administrator Email') }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InitializeSystem;
