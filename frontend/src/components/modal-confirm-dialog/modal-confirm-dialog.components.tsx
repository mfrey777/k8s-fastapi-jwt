import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import {
  modalConfirm,
  modalCancel,
} from '../../redux/modal-confirm/modal-confirm.actions';

type ModalProps = React.ComponentProps<typeof Modal>;

export interface ModalConfirmDialogProps extends ModalProps {
  content: string;
}

const ModalConfirmDialog = (props: ModalConfirmDialogProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleOk = () => {
    // console.log(e);
    dispatch(modalConfirm());
  };

  const handleCancel = () => {
    // console.log(e);
    dispatch(modalCancel());
  };

  const { content, ...rest } = props;
  return (
    <Modal {...rest} onOk={handleOk} onCancel={handleCancel}>
      {content}
    </Modal>
  );
};

export default ModalConfirmDialog;
