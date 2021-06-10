import * as React from 'react';

// antd
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux functionalities
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Actions
import { echoApiStart } from '../redux/general/general.slice';

// Selectors
import { selectEchoMessage } from '../redux/general/general.selectors';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Form interface
interface FormInterface {
  echo: string;
}

const FunctionalComponentRedux = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const echo = useSelector(selectEchoMessage);

  const formRef = React.createRef<FormInstance>();

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    dispatch(
      echoApiStart({
        msg: values.echo,
      })
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        {...layout}
        name="basic"
        ref={formRef}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1>{t('Echo message')}</h1>

        <Form.Item
          label="echo"
          name="echo"
          rules={[{ required: true, message: t('Please enter your message') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {t('Submit')}
          </Button>
        </Form.Item>
      </Form>
      <p>Message is {echo} </p>
    </div>
  );
};

export default FunctionalComponentRedux;
