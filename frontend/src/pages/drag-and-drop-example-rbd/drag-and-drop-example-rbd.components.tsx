import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Column from './column.components';
import { modelInfosStart } from '../../redux/info/info.slice';
import { selectModels } from '../../redux/info/info.selectors';

function isObjKey<T>(key: any, obj: T): key is keyof T {
  return key in obj;
}

function GetDictionaryKeysAsArray(dict: { [key: string]: string }): string[] {
  const result: string[] = [];
  Object.keys(dict).map((key) => result.push(key));
  return result;
}

const DragAndDropExampleRbd = (): JSX.Element => {
  const dispatch = useDispatch();

  // const modelsInfos = useSelector(selectModels);

  // const dimensionList = GetDictionaryKeysAsArray(
  //   modelsInfos['CONSOLIDATION']['dimension_list']
  // );

  interface Item {
    id: string;
    list: string[];
  }

  interface MyInterface {
    dim_global: Item;
    dim_header: Item;
    dim_row: Item;
    dim_col: Item;
  }

  //   const obj: MyInterface = {
  //     data: {
  //       '123': { id: '123', name: 'something' },
  //     },
  //   };
  const initialColumns: MyInterface = {
    dim_global: {
      id: 'dim_global',
      list: ['item 1', 'item 2', 'item 3'],
      // list: dimensionList,
    },
    dim_header: {
      id: 'dim_header',
      list: [],
    },
    dim_row: {
      id: 'dim_row',
      list: [],
    },
    dim_col: {
      id: 'dim_col',
      list: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    let start: Item = { id: 'global', list: [] };
    let end: Item = { id: 'global', list: [] };

    // Set start and end variables
    if (isObjKey(source.droppableId, columns)) {
      start = columns[source.droppableId];
    }
    if (isObjKey(destination.droppableId, columns)) {
      end = columns[destination.droppableId];
    }

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      console.log(columns);
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      console.log(columns);
      return null;
    }
  };

  const onUpdateModelInfos = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    console.log(event);
    // dispatch(modelInfosStart({ model: 'consolidation' }));
    dispatch(modelInfosStart());
  };

  return (
    <div>
      <Button type="primary" onClick={onUpdateModelInfos}>
        Update Model Infos
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            margin: '24px auto',
            width: '80%',
            gap: '8px',
          }}
        >
          {Object.values(columns).map((col) => (
            <Column col={col} key={col.id} />
          ))}
        </div>
      </DragDropContext>
      <div>
        State:
        {Object.keys(columns).map((key, index) => (
          <p key={index}>
            {' '}
            {key} {isObjKey(key, columns) ? columns[key]['list'] : ''}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DragAndDropExampleRbd;
