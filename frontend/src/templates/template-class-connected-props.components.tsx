// React
import React, { createRef, Component } from 'react';

// antd
import { Form, Input, Button, Checkbox } from 'antd';
import { FormInstance } from 'antd/lib/form';
// import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import { echoApiStart } from '../redux/general/general.slice';
import { selectEchoMessage } from '../redux/general/general.selectors';
import { RootState } from '../redux/root.reducer';

// Redux Selectors
interface PropsFromState {
  echoMessage: string;
}

const mapStateToProps = createStructuredSelector<RootState, PropsFromState>({
  echoMessage: selectEchoMessage,
});

// Redux Actions
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ echoApiStart }, dispatch);
}

// Merge Selector and Actions properties and add additioal properties (if required)
export interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {
  tenant: string;
}

// Formatting for antd Form
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Form interface
interface FormInterface {
  email: string;
  password: string;
}

// class definition
class TemplateClassConnectedProps extends Component<IProps> {
  private tenant: string | undefined;
  formRef = createRef<FormInstance>();

  constructor(props: IProps) {
    super(props);

    const { tenant } = props;
    this.tenant = '';
    if (tenant) {
      this.tenant = tenant;
    }
  }

  onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    const { echoApiStart } = this.props;
    const params = {
      tenant: this.tenant as string,
      email: values.email,
      password: values.password,
    };
    console.log('params:');
    console.log(params);
    echoApiStart({ msg: JSON.stringify(params) });
  };

  onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  onReset = (): void => {
    if (this.formRef.current !== null) {
      this.formRef.current.resetFields();
    }
  };

  render() {
    return (
      <Form
        {...layout}
        name="basic"
        ref={this.formRef}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
        </Form.Item>
        <p>Last submit: {this.props.echoMessage}</p>
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateClassConnectedProps);
