import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface FunctionalComponentProps {
  info: string;
}

const FunctionalComponent = (props: FunctionalComponentProps): JSX.Element => {
  return <Content>{props.info}</Content>;
};

export default FunctionalComponent;
