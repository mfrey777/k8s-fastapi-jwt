import React from 'react';
import { useSelector } from 'react-redux';

import ModalDialogSimple from './modal-dialog-simple.components';
import ModalDialogStandard from './modal-dialog-standard.components';
import ModalDialogInfo from './modal-dialog-info.components';

import {
  selectModalVisible,
  selectModalType,
  selectModalProps,
  selectModalContent,
} from '../../redux/modal/modal.selectors';

export const modalComponentLookupTable = {
  ModalDialogSimple,
  ModalDialogStandard,
  ModalDialogInfo,
};

const ModalManager = (): JSX.Element => {
  const modalType = useSelector(selectModalType);
  const modalProps = useSelector(selectModalProps);
  const modalVisible = useSelector(selectModalVisible);
  const modalContent = useSelector(selectModalContent);

  const ModalComponent = modalComponentLookupTable[modalType];
  const renderedModal = (
    <ModalComponent
      visible={modalVisible}
      content={modalContent}
      {...modalProps}
    />
  );
  return <span>{renderedModal}</span>;
};

export default ModalManager;
