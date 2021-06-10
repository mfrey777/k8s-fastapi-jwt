import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { closeModal } from '../../redux/modal/modal.actions';

type ModalProps = React.ComponentProps<typeof Modal>;

export interface ModalDialogInfoProps extends ModalProps {
  content: string;
}
const ModalDialogInfo = (props: ModalDialogInfoProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleOk = () => {
    // console.log(e);
    dispatch(closeModal());
  };

  const { content, ...rest } = props;
  return (
    <div>
      <Modal
        {...rest}
        closeIcon="close"
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {content}
      </Modal>
    </div>
  );
};

export default ModalDialogInfo;
