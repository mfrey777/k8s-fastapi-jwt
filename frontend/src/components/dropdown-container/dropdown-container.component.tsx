import React, { Component } from 'react';
// import DropdownTreeSelect from '../react-tree-select/react-dropdown-tree-select.js';
import DropdownTreeSelect, {
  TreeNode,
  TreeData,
  TextProps,
} from 'react-dropdown-tree-select';
import isEqual from 'lodash/isEqual';
import './dropdown-container.styles.css';

export interface IProps {
  data: TreeData;
  id: string;
  onChange: (
    currentNode: TreeNode,
    selectedNodes: TreeNode[]
    // id: string
  ) => void;
  texts?: TextProps;
  mode?:
    | 'radioSelect'
    | 'multiSelect'
    | 'simpleSelect'
    | 'hierarchical'
    | undefined;
  inlineSearchInput?: boolean;
}

interface IState {
  data: TreeData;
}

export default class DropDownContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { data: props.data };
  }

  getDerivedStateFromProps = (nextProps: IProps): void => {
    if (!isEqual(nextProps.data, this.state.data)) {
      this.setState({ data: nextProps.data });
    }
  };

  shouldComponentUpdate = (nextProps: IProps): boolean => {
    return !isEqual(nextProps.data, this.state.data);
  };

  render(): JSX.Element {
    const { data, id, ...rest } = this.props;
    console.log('rendering DropDownContainer props:', this.props);
    // return <p>DropDown</p>;
    // return <DropdownTreeSelect data={data} />;
    return <DropdownTreeSelect data={data} id={id} {...rest} />;
  }
}
