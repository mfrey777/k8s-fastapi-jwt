import React, { useState } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const FunctionalComponent = (): JSX.Element => {
  const [message, setMessage] = useState('');

  const onUpddateMessage = (): void => {
    setMessage('My Message');
  };

  return (
    <Content>
      <button onClick={onUpddateMessage}>Update message</button>
      <p>{message}</p>
    </Content>
  );
};

export default FunctionalComponent;
