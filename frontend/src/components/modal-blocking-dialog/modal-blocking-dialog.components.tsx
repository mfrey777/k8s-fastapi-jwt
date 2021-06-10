import * as React from 'react';
import { Modal } from 'antd';

import { useDispatch } from 'react-redux';

import { modalBlockingConfirm } from '../../features/modal-blocking/modal-blocking.slice';

type ModalProps = React.ComponentProps<typeof Modal>;

export interface ModalDialogInfoProps extends ModalProps {
  text: string;
}

const ModalBlockingDialog = (props: ModalDialogInfoProps): JSX.Element => {
  const dispatch = useDispatch();
  const { text, ...rest } = props;

  const handleOk = () => {
    // console.log(e);
    dispatch(modalBlockingConfirm());
  };

  return (
    <div>
      {/* <Button type="primary" onClick={this.onOpenModal}>
        Open Modal
      </Button> */}
      <Modal
        {...rest}
        closeIcon="close"
        // title="Simple Modal title"
        // visible={true}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {text}
      </Modal>
    </div>
  );
};

export default ModalBlockingDialog;
