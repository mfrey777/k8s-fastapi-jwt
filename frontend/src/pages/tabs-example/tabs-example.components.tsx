import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Tabs } from 'antd';
import Test from '../../pages/test/test';
import Dummy from '../../components/dummy/dummy.components';
import Report from '../../pages/report/report.component';

// Redux selectors and actions
import { selectPages } from '../../redux/pages/pages.selectors';
import { addPage, removePage } from '../../redux/pages/pages.slice';

const { TabPane } = Tabs;

function isObjKey<T>(key: string | number | symbol, obj: T): key is keyof T {
  return key in obj;
}

interface KeysToComponentMapType {
  test: typeof Test;
  dummy: typeof Dummy;
  report: typeof Report;
}

const KeysToComponentMap: KeysToComponentMapType = {
  test: Test,
  dummy: Dummy,
  report: Report,
};

function renderer(comp: string, props: any) {
  if (isObjKey(comp, KeysToComponentMap)) {
    if (typeof KeysToComponentMap[comp] !== 'undefined') {
      return React.createElement(KeysToComponentMap[comp], props);
    }
  }
}

const TabsExample = (): JSX.Element => {
  const pages = useSelector(selectPages);
  const dispatch = useDispatch();

  console.log('pages: ');
  console.log(pages);

  const [activeKey, setActiveKey] = useState(Object.keys(pages)[0]);

  const onChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const add = () => {
    const activeKey = `${Object.keys(pages).length + 1}`;
    dispatch(
      addPage({
        id: activeKey,
        page: {
          title: 'new tab ' + activeKey,
          key: activeKey,
          component: 'dummy',
          props: { text: 'dummy tab new ' + activeKey },
        },
      })
    );

    setActiveKey(activeKey);
  };

  const remove = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string
  ) => {
    if (typeof targetKey === 'string') {
      dispatch(removePage({ id: targetKey }));
    }
    setActiveKey(activeKey);
  };
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {Object.keys(pages).map((key) => (
        <TabPane tab={pages[key].title} key={pages[key].key}>
          {renderer(pages[key].component, pages[key].props)}
          <p>Refreshed on {new Date().toLocaleString()}</p>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default TabsExample;
