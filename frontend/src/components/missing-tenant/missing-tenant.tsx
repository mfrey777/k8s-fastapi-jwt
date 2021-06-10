import { createRef, useState } from 'react';

// Redux functionalities
import { useTranslation } from 'react-i18next';
// import { Redirect } from 'react-router';

// antd
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

interface FormInterface {
  tenant_id: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const MissingTenant = (): JSX.Element => {
  const [redirect, setRedirect] = useState(false);
  const [tenant, setTenant] = useState('');
  const { t } = useTranslation();
  const formRef = createRef<FormInstance>();

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    setRedirect(true);
    setTenant(values.tenant_id);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity): void => {
    console.log('Failed:', errorInfo);
  };

  if (redirect) {
    const host = window.location.host;
    const protocol = window.location.protocol;
    const parts = host.split('.');
    // let subdomain = '';
    // If we get more than 3 parts, then we have a subdomain
    // INFO: This could be 4, if you have a co.uk TLD or something like that.
    if (parts.length >= 3) {
      // subdomain = parts[0];
      parts[0] = tenant;
      const newUrl = protocol + '//' + parts.join('.');
      console.log(newUrl);
      window.location.assign(newUrl);
    }
    // return <Redirect push to={'/' + tenant + '/'} />;
  }

  return (
    <Form
      {...layout}
      name="basic"
      ref={formRef}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>{t('Enter Tenant ID')}</h1>
      <Form.Item
        label="tenant_id"
        name="tenant_id"
        rules={[{ required: true, message: t('Tenant id') }]}
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

export default MissingTenant;
