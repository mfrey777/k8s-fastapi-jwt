// React import
import React from 'react';

// antd
import { Form, Input, Button } from 'antd';
// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux actiond
import { createReportRequest } from '../../redux/report/report.slice';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { TextArea } = Input;
// Form interface
// interface FormInterface {
//   echo: string;
// }

// Stackblitz example
// https://stackblitz.com/edit/so-58128062-upload-progress

const CreateReport = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const onFinish = (values: FormInterface): void => {
  const onFinish = (values: any): void => {
    console.log('onFinish:', values);
    const formData = new FormData();
    formData.append('fields', JSON.stringify(values));

    dispatch(
      createReportRequest({
        formData,
      })
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Create Report</h1>
      <Form
        name="validate_other"
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          ['row_structure']: 'R | 1 | ACCOUNT | C | True',
          ['row_definition']:
            'ACCOUNT | LVL(ACCOUNT:H5:AC_FER0,0,99) | 1 | 1 | 1',
          ['col_structure']: 'C | 1 | FLOW | C | True',
          ['col_definition']: 'FLOW | LVL(FLOW:H1:FL_999,0,99) | 2 | 1 | 1',
          ['hdr_definition']:
            'AUDITID | H1 | AT_4_LE\nBOOKVALUE | H1 | BW_TOTAL\nCASHFLOW | H1 | CF_TOTAL\nCATEGORY | H1 | CAT_IST\nCONSOSCOPE | H1 | SC_NONE\nCOSTCENTER | H1 | CC_TOTAL\nCOSTELEMENT | H1 | CE_TOTAL\nENTITY | H1 | EN_1000\nINTERCO | H1 | IC_TOTAL\nNOTES | H1 | NT_TOTAL\nRPTCURRENCY | H1 | LC\nTIME | H1 | 2019.DEC',
        }}
      >
        <Form.Item label="Report Id" name="id">
          <Input />
        </Form.Item>
        <Form.Item label="Short description" name="short_desc">
          <Input />
        </Form.Item>
        <Form.Item label="Medium description" name="medium_desc">
          <Input />
        </Form.Item>
        <Form.Item label="Long description" name="long_desc">
          <Input />
        </Form.Item>
        <Form.Item label="Row structure" name="row_structure">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Row definition" name="row_definition">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Column structure" name="col_structure">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Column definition" name="col_definition">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Header definition" name="hdr_definition">
          <TextArea rows={10} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form>
    </div>
  );
};

export default CreateReport;
