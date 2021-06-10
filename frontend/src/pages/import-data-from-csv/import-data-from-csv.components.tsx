// React import
import React, { useState } from 'react';

// antd
import { Form, Button, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux actionds
import { dataImportFromCsvStart } from '../../redux/data/data.slice';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// Form interface
interface FormInterface {
  file: string;
  masterdata: string;
  name: File;
}

// Stackblitz example
// https://stackblitz.com/edit/so-58128062-upload-progress

const importDataFromCSV = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [fileDataList, setFileDataList] = useState<Array<UploadFile>>([]);

  const handleFileDataOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    //Using Hooks to update the state to the current filelist
    // console.log('handleFileOnChange');
    // console.log('info: ', info);
    // console.log('info.fileList: ', info.fileList);
    setFileDataList(info.fileList);
  };

  // const onFinish = (values: FormInterface): void => {
  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    const formData = new FormData();
    formData.append('fields', JSON.stringify(values));

    // console.log('fileList[0]', fileList[0]);
    // console.log('type fileList[0]', typeof fileList[0]);
    formData.append('file_data', fileDataList[0].originFileObj as Blob);
    // console.log('formData: ', Array.from(formData.values()));
    // console.log('tenant: ', this.props.currentTenant)

    // this.props.currencyConversionRequest({ tenant: this.props.currentTenant, formData });
    dispatch(
      dataImportFromCsvStart({
        formData,
      })
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Import csv file into model (testing only)</h1>
      <Form
        name="import_data_from_csv"
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="model_id" label="Model ID">
          <Input />
        </Form.Item>
        <Form.Item
          name="file_data"
          label="CSV data file (zip)"
          valuePropName="file_data"
        >
          <Upload
            name="file_data"
            beforeUpload={() => false}
            listType="text"
            multiple={false}
            onChange={handleFileDataOnChange}
            defaultFileList={fileDataList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {t('Submit')}
        </Button>
      </Form>
    </div>
  );
};

export default importDataFromCSV;
