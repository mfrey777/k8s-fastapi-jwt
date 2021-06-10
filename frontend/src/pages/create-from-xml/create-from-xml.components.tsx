// React import
import React, { useState } from 'react';

// antd
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

// Redux functionalities
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux actionds
import { adminProcessStart } from '../../redux/admin/admin.slice';
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

const CreateFromExcelPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [fileStructureList, setFileStructureList] = useState<Array<UploadFile>>(
    []
  );
  const [fileDimensionsList, setFileDimensionsList] = useState<
    Array<UploadFile>
  >([]);

  const handleFileStructureOnChange = (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    //Using Hooks to update the state to the current filelist
    // console.log('handleFileOnChange');
    // console.log('info: ', info);
    // console.log('info.fileList: ', info.fileList);
    setFileStructureList(info.fileList);
  };

  const handleFileDimensionsOnChange = (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    //Using Hooks to update the state to the current filelist
    // console.log('handleFileOnChange');
    // console.log('info: ', info);
    // console.log('info.fileList: ', info.fileList);
    setFileDimensionsList(info.fileList);
  };

  // const onFinish = (values: FormInterface): void => {
  const onFinish = (values: any): void => {
    console.log('onFinish:', values);
    const formData = new FormData();
    formData.append('fields', JSON.stringify(values));

    // console.log('fileList[0]', fileList[0]);
    // console.log('type fileList[0]', typeof fileList[0]);
    formData.append(
      'file_structure',
      fileStructureList[0].originFileObj as Blob
    );
    formData.append(
      'file_dimensions',
      fileDimensionsList[0].originFileObj as Blob
    );

    console.log('formData: ', Array.from(formData.values()));
    // console.log('tenant: ', this.props.currentTenant)

    // this.props.currencyConversionRequest({ tenant: this.props.currentTenant, formData });
    dispatch(
      adminProcessStart({
        formData,
      })
    );
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Create structures and load master data from XML file</h1>
      <Form
        name="create_from_xml"
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="file_structure"
          label="Structure XML File (zip)"
          valuePropName="file_structure"
        >
          <Upload
            name="file_structure"
            beforeUpload={() => false}
            listType="text"
            multiple={false}
            onChange={handleFileStructureOnChange}
            defaultFileList={fileStructureList}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="file_dimensions"
          label="Dimensions (zip)"
          valuePropName="file_dimensions"
        >
          <Upload
            name="file_dimensions"
            beforeUpload={() => false}
            listType="text"
            multiple={false}
            onChange={handleFileDimensionsOnChange}
            defaultFileList={fileDimensionsList}
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

export default CreateFromExcelPage;
