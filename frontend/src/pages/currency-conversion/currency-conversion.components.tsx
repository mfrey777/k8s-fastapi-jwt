// React import
import React, { useState } from 'react';
// import React, { useState, createRef } from 'react';

// antd
import { Form, Input, Radio, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// // Redux imports
// import { bindActionCreators, Dispatch } from 'redux';
// import { connect } from 'react-redux';

// Redux functionalities
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux Selector
// import { selectConvertedData } from '../../redux/currency-conversion/currency-conversion.selectors';
import { selectCurrentTenant } from '../../redux/user/user.selectors';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

// Redux Actions
// import {
//   currencyConversionRequest,
//   saveCurrencyConversionSettings,
// } from '../../redux/currency-conversion/currency-conversion.actions';

// State (only for direct selections)
// import { RootState } from '../../redux/root.reducer';

// // Patternfly
// import {
//   ActionGroup,
//   PageSection,
//   Button,
//   FileUpload,
//   Radio,
//   Form,
//   FormGroup,
//   Title,
//   TextInput
// } from '@patternfly/react-core';

// Other imports

// interface PropsFromState {
//   signInErrorMessage: string;
// }

// export interface IOwnProps {
//   onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export interface IProps
//   extends ReturnType<typeof mapStateToProps>,
//     ReturnType<typeof mapDispatchToProps> {
//   //   IOwnProps;
// }

// declare type EventArgs = any[];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// Form interface
// interface FormInterface {
//   echo: string;
// }

// Stackblitz example
// https://stackblitz.com/edit/so-58128062-upload-progress

const CurrencyConversionPage = (): JSX.Element => {
  // const dispatch = useDispatch();
  const { t } = useTranslation();

  // const convertedData = useSelector(selectConvertedData);
  const currentTenant = useSelector(selectCurrentTenant);

  const [dataFileList, setDataFileList] = useState([] as any);
  const [rulesFileList, setRulesFileList] = useState([] as any);
  const [ratesFileList, setRatesFileList] = useState([] as any);

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

  // handleChange = (_, event) => {
  //   const { name, value } = event.target;
  //   console.log('changed:', name, value);
  //   this.props.saveCurrencyConversionSettings({ name, value, filename: '' });
  // };

  // handleChangeFile = (value, filename, event) => {
  //   const { name } = event.target;
  //   console.log(value);
  //   console.log(filename);

  //   // Get file upload id from html element
  //   let key = event.nativeEvent.path[2].children[0].htmlFor;
  //   key = key.split('_selection').join('');
  //   console.log('key: ', key);
  //   dispatch(saveCurrencyConversionSettings({ name: key, filename, value }));
  // };

  // const uploadImage = async (options) => {
  //   const { onSuccess, onError, file, onProgress } = options;

  //   const fmData = new FormData();
  //   const config = {
  //     headers: { 'content-type': 'multipart/form-data' },
  //     onUploadProgress: (event) => {
  //       const percent = Math.floor((event.loaded / event.total) * 100);
  //       setProgress(percent);
  //       if (percent === 100) {
  //         setTimeout(() => setProgress(0), 1000);
  //       }
  //       onProgress({ percent: (event.loaded / event.total) * 100 });
  //     },
  //   };
  //   fmData.append('image', file);
  //   try {
  //     const res = await axios.post(
  //       'https://jsonplaceholder.typicode.com/posts',
  //       fmData,
  //       config
  //     );

  //     onSuccess('Ok');
  //     console.log('server res: ', res);
  //   } catch (err) {
  //     console.log('Eroor: ', err);
  //     const error = new Error('Some error');
  //     onError({ err });
  //   }
  // };

  const handleDataOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDataFileList(info.fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const handleRulesOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setRulesFileList(info.fileList);
  };

  const handleRatesOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setRatesFileList(info.fileList);
  };

  // const onFinish = (values: FormInterface): void => {
  const onFinish = (values: any): void => {
    console.log('onFinish:', values);
    // dispatch(
    //   echoApiStart({
    //     msg: values.echo,
    //   })
    // );
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
      <h1>Currency Conversion for tenant {currentTenant} </h1>

      <Form
        name="validate_other"
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          ['measure']: 'ytd',
          ['currency']: 'global',
          ['masterdata']: 'embedded',
          ['rules']: 'file',
          ['rates']: 'file',
          ['data']: 'file',
        }}
      >
        <Form.Item name="measure" label="YTD / Periodic">
          <Radio.Group>
            <Radio value="ytd">YTD</Radio>
            <Radio value="periodic">Periodic</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="currency" label="Currency Table">
          <Radio.Group>
            <Radio value="global">Global</Radio>
            <Radio value="per_currency">per Currency</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="masterdata" label="Master Data Table">
          <Radio.Group>
            <Radio value="embedded">Embdedded in data file</Radio>
            <Radio value="online">Online</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="masterdata_file"
          label="Upload"
          valuePropName="masterdata_file"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            beforeUpload={() => false}
            // customRequest={uploadImage}
            listType="picture"
            multiple={false}
            onChange={handleDataOnChange}
            defaultFileList={dataFileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        {/* <FormGroup
            label="Master Data File"
            fieldId="masterdata_file_selection"
            helperText="Master Data File"
            isRequired
          >
            <FileUpload
              id="masterdata_file_selection"
              name="masterdata_file"
              value={masterdata_file}
              filename={masterdata_filename}
              onChange={this.handleChangeFile}
              isRequired
            />
          </FormGroup>
        </FormGroup> */}

        <Form.Item name="rules" label="Rules">
          <Radio.Group>
            <Radio value="file">Rules File</Radio>
            <Radio value="online">Online</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="rules_file"
          label="Upload"
          valuePropName="rules_file"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            beforeUpload={() => false}
            // customRequest={uploadImage}
            listType="picture"
            multiple={false}
            onChange={handleRulesOnChange}
            defaultFileList={rulesFileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="rates" label="Rates">
          <Radio.Group>
            <Radio value="file">Rates File</Radio>
            <Radio value="online">Online</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="rates_file"
          label="Upload"
          valuePropName="rates_file"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            beforeUpload={() => false}
            // customRequest={uploadImage}
            listType="picture"
            multiple={false}
            onChange={handleRatesOnChange}
            defaultFileList={ratesFileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="data" label="Data">
          <Radio.Group>
            <Radio value="file">Data File</Radio>
            <Radio value="online">Online</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="data_file"
          label="Upload"
          valuePropName="data_file"
          getValueFromEvent={normFile}
        >
          <Upload
            name="logo"
            beforeUpload={() => false}
            // customRequest={uploadImage}
            listType="picture"
            multiple={false}
            onChange={handleDataOnChange}
            defaultFileList={dataFileList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Data Selection" name="data_selection">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form>
    </div>
  );
};

export default CurrencyConversionPage;
