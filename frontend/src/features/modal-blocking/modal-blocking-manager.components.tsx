import React from 'react';
import { useSelector } from 'react-redux';

import ModalBlockingDialog from './modal-blocking-dialog.components';

import {
  selectModalBlockingType,
  selectModalBlockingTitle,
  selectModalBlockingText,
} from './modal-blocking.selectors';

// export type IProps = ReturnType<typeof mapStateToProps>;
const ModalBlockingManager = (): JSX.Element => {
  const modalType = useSelector(selectModalBlockingType);
  const modalTitle = useSelector(selectModalBlockingTitle);
  const modalText = useSelector(selectModalBlockingText);
  const renderedModal = (
    <ModalBlockingDialog
      visible={modalType !== ''}
      title={modalTitle}
      text={modalText}
    />
  );
  return <span>{renderedModal}</span>;
};

export default ModalBlockingManager;
