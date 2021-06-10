import React from 'react';
import { useSelector } from 'react-redux';

import ModalConfirmDialog from './modal-confirm-dialog.components';

import {
  selectModalType,
  selectModalTitle,
  selectModalText,
} from '../../redux/modal-confirm/modal-confirm.selectors';

const ModalConfirmManager = (): JSX.Element => {
  const modalType = useSelector(selectModalType);
  const modalTitle = useSelector(selectModalTitle);
  const modalText = useSelector(selectModalText);

  const renderedModal = (
    <ModalConfirmDialog
      visible={modalType !== ''}
      title={modalTitle}
      content={modalText}
    />
  );
  return <span>{renderedModal}</span>;
};

export default ModalConfirmManager;
