import React from 'react';
import Item from './item.components';
import { Droppable } from 'react-beautiful-dnd';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}
const Column: React.FC<ColumnProps> = ({ col: { list, id } }: ColumnProps) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2>{id}</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '120px',
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
