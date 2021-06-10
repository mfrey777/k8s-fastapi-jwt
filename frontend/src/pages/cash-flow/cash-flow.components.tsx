// React import
import React, { useState } from 'react';

// antd
import { Form, Input, Radio, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux functionalities
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux actions and selectors
// import { formUploadStart } from '../../redux/general/general.slice';
import { cashFlowRequest } from '../../redux/cash-flow/cash-flow.slice';
import { selectCalculatedDataHtml } from '../../redux/cash-flow/cash-flow.selectors';

//Other
import './cash-flow.component.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// Form interface
// interface FormInterface {
//   echo: string;
// }

// Stackblitz example
// https://stackblitz.com/edit/so-58128062-upload-progress

const CashFlowPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cash_flow_html = useSelector(selectCalculatedDataHtml);

  // const [fileList, setFileList] = useState([] as any);
  // const [fileList, setFileList] = useState([] as UploadFile<any>[]);
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  // const [fileList, setFileList] = useState(
  //   ([] as unknown) as UploadFile<any>[]
  // );

  // const currencyConversions = RootState.currencyConversion;

  // const [value, setvalue] = useState('');
  // const [filename, setFilename] = useState('');
  // const [width, setWidth] = useState(1000);
  // const [height, setHeight] = useState(600);

  // class CurrencyConversionPage extends Component<IProps, IState> {
  //   private myRef = createRef<HTMLDivElement>();

  // hanbdleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log('Form submitted');
  //   const formData = new FormData();
  //   formData.append('fields', JSON.stringify(this.props.currencyConversions));
  //   formData.append('data_file', dataFileList);
  //   formData.append('rules_file', rulesFileList);
  //   formData.append('rates_file', ratesFileList);
  //   dispatch(
  //     currencyConversionRequest({
  //       tenant: this.props.currentTenant,
  //       formData,
  //     })
  //   );
  // };

  // Upload not working
  // Tutorial https://jsmanifest.com/uploading-files-in-react-while-keeping-ui-completely-in-sync/

  const handleFileOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    //Using Hooks to update the state to the current filelist
    console.log('handleFileOnChange');
    console.log('info: ', info);
    console.log('info.fileList: ', info.fileList);
    setFileList(info.fileList);
    // let reader = new FileReader();
    //     reader.readAsText(info.file.originFileObj);
  };

  // const onFinish = (values: FormInterface): void => {
  const onFinish = (values: any): void => {
    console.log('onFinish:', values);
    const formData = new FormData();
    formData.append('fields', JSON.stringify(values));

    console.log('length of fileList: %s', fileList.length);

    if (fileList.length > 0) {
      console.log('fileList[0]', fileList[0]);
      console.log('type fileList[0]', typeof fileList[0]);
      formData.append('file_config', fileList[0].originFileObj as Blob);
    }

    console.log('formData: ', Array.from(formData.values()));
    // console.log('tenant: ', this.props.currentTenant)

    // this.props.currencyConversionRequest({ tenant: this.props.currentTenant, formData });
    dispatch(
      cashFlowRequest({
        formData,
        output: 'html',
      })
    );
  };

  // Stackblitz example
  // https://stackblitz.com/edit/so-58128062-upload-progress

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <h1>Form</h1>
      <Form
        name="validate_other"
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          ['model']: 'consolidation',
          ['calc_rules']: 'online',
        }}
      >
        <Form.Item label="Model" name="model">
          <Input />
        </Form.Item>

        <Form.Item name="calc_rules" label="Calculation Rules">
          <Radio.Group>
            <Radio value="file">Data file</Radio>
            <Radio value="online">Online</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="file_config"
          label="Configuration File (zip)"
          valuePropName="file_config"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file_config"
            beforeUpload={() => false}
            // customRequest={uploadImage}
            listType="text"
            multiple={false}
            onChange={handleFileOnChange}
            defaultFileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form>
      <div dangerouslySetInnerHTML={{ __html: cash_flow_html }}></div>
    </div>
  );
};

export default CashFlowPage;
