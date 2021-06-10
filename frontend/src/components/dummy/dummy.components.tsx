import React from 'react';

interface DummyProps {
  text: string;
}

const Dummy = (props: DummyProps): JSX.Element => {
  return (
    <div>
      <p> {props.text}</p>
    </div>
  );
};

export default Dummy;
