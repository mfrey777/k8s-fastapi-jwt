import { Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { createRef } from 'react';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const TestForm = (): JSX.Element => {
  const formRef = createRef<FormInstance>();

  const onGenderChange = (value: string) => {
    if (formRef.current !== null) {
      switch (value) {
        case 'male':
          formRef.current.setFieldsValue({ note: 'Hi, man!' });
          return;
        case 'female':
          formRef.current.setFieldsValue({ note: 'Hi, lady!' });
          return;
        case 'other':
          formRef.current.setFieldsValue({ note: 'Hi there!' });
          return;
      }
    }
  };

  const onFinish = (values: unknown): void => {
    console.log(values);
  };

  const onReset = (): void => {
    if (formRef.current !== null) {
      formRef.current.resetFields();
    }
  };

  const onFill = (): void => {
    if (formRef.current !== null) {
      formRef.current.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
      });
    }
  };

  return (
    <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestForm;
