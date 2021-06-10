import React, { useState, useEffect } from 'react';

interface NumberFieldProps {
  name: string;
  value: number | string;
  className: string;
  contentEditable: boolean;
  style: React.CSSProperties;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberField = (props: NumberFieldProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('NumberField onChange called with param:');
    console.log(event.target.value);
    props.onChange(event);
  };

  const toggleEditing = () => {
    console.log('NumberField toggleEditing called for name: %s', props.name);

    if (props.contentEditable) {
      setIsEditing(!isEditing);
    } else {
      setIsEditing(false);
    }
  };

  const toFormattedNumber = (number: number) => {
    const formatter = new Intl.NumberFormat('de-CH', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(number);
  };

  const generateField = (): JSX.Element => {
    console.log('NumberField generateField called for name: %s', props.name);
    // console.log(props.value);
    // console.log(isEditing);
    // console.log(props.contentEditable);
    switch (typeof props.value) {
      case 'number':
        if (isEditing && props.contentEditable) {
          return (
            <input
              type="number"
              name={props.name}
              value={props.value}
              onChange={onChange}
              onBlur={toggleEditing}
              className="inputStd"
            />
          );
        } else {
          return (
            <div tabIndex={1} onFocus={toggleEditing}>
              {toFormattedNumber(Number(props.value))}
            </div>
          );
        }
      case 'string':
        return <div>{props.value}</div>;

      default:
        return <div>Empty</div>;
    }
  };

  useEffect(() => {
    console.log('NumberField useEffect called for name: %s', props.name);
  });

  return (
    <div className={props.className} style={props.style}>
      {generateField()}
    </div>
  );
};

export default NumberField;
