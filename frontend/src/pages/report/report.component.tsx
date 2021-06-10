// React
import { createRef, useState, useEffect } from 'react';
import * as React from 'react';

// antd
import { Form, Input, Button } from 'antd';
// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import {
  DefaultValueType,
  ChangeEventExtra,
} from 'rc-tree-select/lib/interface';

import memoize from 'memoize-one';

// Redux functionalities
import { useSelector, useDispatch } from 'react-redux';

// Translation
import { useTranslation } from 'react-i18next';

// Redux Actions
import {
  reportRequest,
  // saveReportSettings,
} from '../../redux/report/report.slice';
import { modelInfosStart } from '../../redux/info/info.slice';

// Redux Selectors
import { selectReport } from '../../redux/report/report.selectors';
import { selectModels } from '../../redux/info/info.selectors';

// Formatting
import './report.component.css';

// Other imports
import {
  VariableSizeGrid as Grid,
  GridChildComponentProps,
} from 'react-window';

// Components
import MemberSelector from '../../components/member-selector/member-selector.components';
import NumberField from '../../components/number-field/number-field.component';

// antd form layout configuration
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// antd Form interface
interface FormInterface {
  echo: string;
}

interface Dic {
  [key: string]: string[];
}

const ReportPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const report = useSelector(selectReport);
  const models = useSelector(selectModels);

  const models_dict = models || {};

  // Initialze delta
  const cols = report.report_data[0].length || 1;
  const rows = Object.keys(report.report_data).length || 1;
  const delta: number[][] = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(0));

  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(600);
  const [selection, setSelection] = useState<Dic | undefined>({});

  // private hasData: boolean;
  const myRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (myRef.current) {
      // console.log('ReportPage componentDidMount exexcuted');
      // console.log('myRef width: ', myRef.current?.clientWidth);
      // console.log('myRef height: ', myRef.current?.clientHeight);
      setWidth(myRef.current?.clientWidth);
      setHeight(Math.max(500, myRef.current?.clientHeight));
      // console.log(' initial width: ', width);
      // console.log(' initial height: ', height);
    }
    dispatch(modelInfosStart());
    console.log('models: ');
    console.log(models);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: FormInterface): void => {
    console.log('onFinish:', values);
    if (selection) {
      console.log('entity: H1', selection['entity_h1']);
      console.log('time H1:', selection['time_h1']);
    }
    const formData = new FormData();
    formData.append('selection', JSON.stringify(selection));
    formData.append('fields', JSON.stringify(values));

    dispatch(reportRequest({ formData }));
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: GridChildComponentProps): JSX.Element => {
    const { report_data } = report;
    // const [value, setValue] = useState(report_data[rowIndex][columnIndex]['va']+delta[rowIndex][columnIndex]);
    const [value, setValue] = useState(
      report_data[rowIndex][columnIndex]['va']
    );
    const onChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      rowIndex: number,
      columnIndex: number
    ): void => {
      console.log('Report Cell onChange called with param:');
      console.log(event.target.value, rowIndex, columnIndex);
      data.onChange(event, rowIndex, columnIndex);
    };

    const updateValue = (newValue: string) => {
      console.log('Report Cell updateValue called with params:');
      console.log(newValue);
      setValue(Number(newValue));
    };

    useEffect(() => {
      console.log(
        'Report Cell useEffect called for Cell: %s:%s',
        rowIndex,
        columnIndex
      );
      // TODO - get dimension / hierarchies for member_selctors, is currently hard-coded
    });

    return (
      <NumberField
        name={String(rowIndex) + ':' + String(columnIndex)}
        style={style}
        value={value}
        className={report_data[rowIndex][columnIndex]['fo']}
        contentEditable={report_data[rowIndex][columnIndex]['ed']}
        // TODO - Remove arrow function
        // https://www.freecodecamp.org/news/why-arrow-functions-and-bind-in-reacts-render-are-problematic-f1c08b060e36/
        onChange={(event) => {
          updateValue(event.target.value);
          onChange(event, rowIndex, columnIndex);
        }}
        // onChange={onChange}
      ></NumberField>
    );
  };

  const onSaveData = () => {
    console.log('Save data');
    const cols = delta[0].length;
    const rows = delta.length;
    console.log('rows: %s, columns: %s', rows, cols);
    const colIndexRow: number[] = [9];
    const rowIndexCol: number[] = [1];
    const updateRows = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (delta[i][j] !== 0) {
          const row = [];
          rowIndexCol.forEach((item) =>
            row.push(report.report_data[i][item]['ky'])
          );
          colIndexRow.forEach((item) =>
            row.push(report.report_data[item][j]['ky'])
          );
          row.push(delta[i][j]);
          updateRows.push(row);
        }
      }
    }
    console.log(updateRows);
  };

  const createItemData = memoize((onChange) => ({
    onChange,
  }));

  const DynamicReport = () => {
    // console.log('Report executed');
    // console.log('Report width:', width);
    // console.log('Report height:', height);
    const { report_data } = report;
    const columnWidths = new Array(report_data[0].length)
      .fill(true)
      .map(() => 75 + Math.round(Math.random() * 50));
    columnWidths[0] = 25;
    columnWidths[1] = 300;
    const rowHeights = new Array(Object.keys(report_data).length)
      .fill(true)
      .map(() => 25);
    rowHeights[12] = 50;

    const onChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      rowIndex: number,
      columnIndex: number
    ) => {
      console.log('Report DynamicReport onChange called with param:');
      console.log(event.target.value, rowIndex, columnIndex);
      console.log(
        'Report DynamicReport current value in report: %s',
        report_data[rowIndex][columnIndex]['va']
      );

      delta[rowIndex][columnIndex] =
        Number(event.target.value) - report_data[rowIndex][columnIndex]['va'];
      // dispatch(updatereport_data({report: newData}));
    };

    useEffect(() => {
      console.log('Report DynamicReport useEffect called');
    });

    const itemData = createItemData(onChange);

    return (
      <Grid
        className="Grid"
        columnCount={report_data[0].length}
        columnWidth={(index) => columnWidths[index]}
        // columnWidth={100}
        height={height}
        rowCount={Object.keys(report_data).length}
        // rowHeight={35}
        rowHeight={(index) => rowHeights[index]}
        // width={800}
        width={width}
        itemData={itemData}
      >
        {Cell}
      </Grid>
    );
  };

  const onChangeAntdTreeSelect = (
    value: DefaultValueType,
    labelList: React.ReactNode[],
    extra: ChangeEventExtra
  ): void => {
    // this.setState({ entity: 'TOT_GROUP' });
    console.log(
      'onChangeAntdTreeSelect - currentNode: ',
      value,
      labelList,
      extra
    );
    const valueString = value as string;
    const [dimension, hierarchy, member] = valueString.split(':');
    console.log('typeof value: ', typeof value);
    // setTreeSelectSelection(value);
    // console.log('id: ', id);
    // this.setState({ entity: currentNode['id'] });
    if (selection) {
      selection[dimension + ':' + hierarchy] = [member];
      // setSelection(selection);
      console.log('selection: ', selection);
    }
  };

  return (
    <div className="full-page">
      <p>{t('width is')} </p>
      <p>{t('Report')}</p>
      <Form
        {...layout}
        name="basic"
        // ref={formRef}
        initialValues={{ report_name: 'R001' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="report name"
          name="report_name"
          rules={[{ required: true, message: t('Report Name') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {t('Submit')}
          </Button>
        </Form.Item>
      </Form>
      <MemberSelector
        dimension="entity"
        hierarchy="h1"
        onChange={onChangeAntdTreeSelect}
      ></MemberSelector>
      <MemberSelector
        dimension="time"
        hierarchy="h1"
        onChange={onChangeAntdTreeSelect}
      ></MemberSelector>
      <MemberSelector
        dimension="rptcurrency"
        hierarchy="h1"
        onChange={onChangeAntdTreeSelect}
      ></MemberSelector>
      <div ref={myRef} className="full-page">
        <p>{t('report')}</p>
        {report.is_succesfull && !report.is_running && <DynamicReport />}
        {!report.is_succesfull && !report.is_running && (
          <div>{report.error_message}</div>
        )}
        <Button onClick={onSaveData}>Save Data</Button>
      </div>
    </div>
  );
};

export default ReportPage;
