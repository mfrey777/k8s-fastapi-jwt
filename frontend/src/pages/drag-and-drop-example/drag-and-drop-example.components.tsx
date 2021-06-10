// Example from : https://medium.com/swlh/react-dnd-in-examples-ce509b25839d

import React, { useState, useRef } from 'react';
import './drag-and-drop-example.css';
import {
  DndProvider,
  DragSourceMonitor,
  useDrag,
  useDrop,
  DropTargetMonitor,
} from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { COLUMN_NAMES } from './constants';
import { tasks } from './tasks';

interface MovableItemProps {
  name: string;
  currentColumnName: string;
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        column: string;
      }[]
    >
  >;
  index: number;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface itemProps {
  index: number;
  name: string;
  currentColumnName: string;
  type: string;
}

const MovableItem = (props: MovableItemProps) => {
  const ChangeItemColumn = (currentItem: itemProps, columnName: string) => {
    console.log(
      'ChangeItemColumn called with ' + currentItem.name + ' - ' + columnName
    ),
      props.setItems((prevState) => {
        return prevState.map((e) => {
          return {
            ...e,
            column: e.name === currentItem.name ? columnName : e.column,
          };
        });
      });
  };

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      console.log(
        'calling moveCardHandler with ' + dragIndex + ' - ' + hoverIndex
      );
      props.moveCardHandler(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      index: props.index,
      name: props.name,
      currentColumnName: props.currentColumnName,
      type: 'Our first type',
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item) {
        if (dropResult) {
          const { name } = dropResult;
          const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
          switch (name) {
            case IN_PROGRESS:
              ChangeItemColumn(item, IN_PROGRESS);
              break;
            case AWAITING_REVIEW:
              ChangeItemColumn(item, AWAITING_REVIEW);
              break;
            case DONE:
              ChangeItemColumn(item, DONE);
              break;
            case DO_IT:
              ChangeItemColumn(item, DO_IT);
              break;
            default:
              break;
          }
        }
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {props.name}
    </div>
  );
};

interface ColumnProps {
  children: React.ReactNode;
  className: string;
  title: string;
}

const Column = ({ children, className, title }: ColumnProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor canDrop() function
    canDrop: (item: itemProps) => {
      const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === DO_IT && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS &&
          (title === DO_IT || title === AWAITING_REVIEW)) ||
        (currentColumnName === AWAITING_REVIEW &&
          (title === IN_PROGRESS || title === DONE)) ||
        (currentColumnName === DONE && title === AWAITING_REVIEW)
      );
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(188,251,255)';
      } else if (!canDrop) {
        return 'rgb(255,188,166)';
      }
    } else {
      return '';
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {title}
      {children}
    </div>
  );
};

const DragAndDropExample = (): JSX.Element => {
  // const [isFirstColumn, setIsFirstColumn] = useState(true);
  // const Item = <MovableItem setIsFirstColumn={setIsFirstColumn} />;
  const [items, setItems] = useState(tasks);

  const isMobile = window.innerWidth < 600;

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copiedStateArray = [...prevState];

        const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);

        copiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return copiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;

  return (
    <div className="container">
      {/* Wrap components that will be "draggable" and "droppable" */}
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Column title={DO_IT} className="column do-it-column">
          {returnItemsForColumn(DO_IT)}
        </Column>
        <Column title={IN_PROGRESS} className="column in-progress-column">
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>
        <Column
          title={AWAITING_REVIEW}
          className="column awaiting-review-column"
        >
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE} className="column done-column">
          {returnItemsForColumn(DONE)}
        </Column>
      </DndProvider>
    </div>
  );
};

export default DragAndDropExample;
