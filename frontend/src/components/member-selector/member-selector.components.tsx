// React
import React, { useState, useEffect } from 'react';
// antd
import { TreeSelect } from 'antd';
import {
  DefaultValueType,
  ChangeEventExtra,
} from 'rc-tree-select/lib/interface';

interface MemberSelectorProps {
  dimension: string;
  hierarchy: string;
  onChange: (
    value: DefaultValueType,
    labelList: React.ReactNode[],
    extra: ChangeEventExtra
  ) => void;
}

const MemberSelector = (props: MemberSelectorProps): JSX.Element => {
  const [memberList, setMemberList] = useState([]);
  const [memberSelection, setMemberSelection] = useState<
    DefaultValueType | undefined
  >(undefined);

  useEffect(() => {
    const { dimension, hierarchy } = props;
    fetch('/api/report/dimension-json/' + dimension + '/' + hierarchy)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.msg);
        setMemberList(data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeAntdTreeSelect = (
    value: DefaultValueType,
    labelList: React.ReactNode[],
    extra: ChangeEventExtra
  ): void => {
    setMemberSelection(value);
    props.onChange(value, labelList, extra);
    // console.log(memberSelection);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={memberSelection}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll={false}
      onChange={onChangeAntdTreeSelect}
      treeData={memberList}
    ></TreeSelect>
  );
};

export default MemberSelector;
