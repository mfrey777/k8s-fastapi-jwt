import React, { createRef } from 'react';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// antd
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux actions
import { createTenantRequest } from '../../redux/tenant/tenant.slice';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface FormInterface {
  tenant_id: string;
  tenant_desc: string;
  email: string;
}

const Tenant = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formRef = createRef<FormInstance>();

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    dispatch(
      createTenantRequest({
        tenant_id: values.tenant_id,
        tenant_desc: values.tenant_desc,
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
      <h1>{t('Create new tenant')} </h1>
      <Form.Item
        label="tenant_id"
        name="tenant_id"
        rules={[{ required: true, message: t('Tenant id') }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="tenant_desc"
        name="tenant_desc"
        rules={[{ required: true, message: t('Tenant description') }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: t('Default tenant user') }]}
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

export default Tenant;
