import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { closeModal } from '../../redux/modal/modal.actions';

type ModalProps = React.ComponentProps<typeof Modal>;

export interface ModalDialogStandardProps extends ModalProps {
  content: string;
}
const ModalDialogStandard = (props: ModalDialogStandardProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleOk = () => {
    // console.log(e);
    dispatch(closeModal());
  };

  const handleCancel = () => {
    // console.log(e);
    dispatch(closeModal());
  };

  const { content, ...rest } = props;
  return (
    <div>
      <Modal
        {...rest}
        closeIcon="close"
        title="Standard Modal title"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </div>
  );
};

export default ModalDialogStandard;
