import React, { useRef } from 'react';
import { Line, DualAxes, Waterfall } from '@ant-design/charts';

const Chart: React.FC = () => {
  const dataLine = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const configLine = {
    data: dataLine,
    width: 800,
    height: 400,
    autoFit: false,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const uvBillDataDualAxes = [
    { time: '2019-03', value: 350, type: 'uv' },
    { time: '2019-04', value: 900, type: 'uv' },
    { time: '2019-05', value: 300, type: 'uv' },
    { time: '2019-06', value: 450, type: 'uv' },
    { time: '2019-07', value: 470, type: 'uv' },
    { time: '2019-03', value: 220, type: 'bill' },
    { time: '2019-04', value: 300, type: 'bill' },
    { time: '2019-05', value: 250, type: 'bill' },
    { time: '2019-06', value: 220, type: 'bill' },
    { time: '2019-07', value: 362, type: 'bill' },
  ];

  const transformDataDualAxes = [
    { time: '2019-03', count: 800 },
    { time: '2019-04', count: 600 },
    { time: '2019-05', count: 400 },
    { time: '2019-06', count: 380 },
    { time: '2019-07', count: 220 },
  ];

  const configDualAxes = {
    data: [uvBillDataDualAxes, transformDataDualAxes],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        seriesField: 'type',
      },
      {
        geometry: 'line',
      },
    ],
  };

  const dataWaterfall = [
    { type: 'Sales', money: 50 },
    { type: 'CoGS', money: -15 },
    { type: 'Overhead', money: -10 },
    { type: 'Taxes', money: -10 },
    { type: 'Bonuses', money: -5 },
    { type: 'OtherIncome', money: 10 },
  ];

  const configWaterfall = {
    data: dataWaterfall,
    xField: 'type',
    yField: 'money',
    risingFill: 'green',
    fallingFill: 'red',
    total: {
      style: {
        fill: '#96a6a6',
      },
      label: 'Net Income',
    },
  };

  //   const ref = useRef<any>(null);
  const ref = useRef<any>(null);

  // Download image
  const downloadImage = () => {
    if (ref.current !== null) {
      ref.current.downloadImage();
    }
  };

  // to data Url
  const toDataURL = () => {
    console.log(ref.current?.toDataURL());
  };

  return (
    <div>
      <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        Download image
      </button>
      <button type="button" onClick={toDataURL}>
        to Data Url
      </button>
      <Line {...configLine} chartRef={ref} />
      <DualAxes {...configDualAxes} />
      <Waterfall {...configWaterfall} />
    </div>
  );
};
export default Chart;
