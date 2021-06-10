import * as React from 'react';
import { Modal } from 'antd';
import Countdown from 'react-countdown';

interface IdleTimeOutModalProps {
  showModal: boolean;
  handleClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleLogout: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  remainingTime: number;
}

export const IdleTimeOutModal = (props: IdleTimeOutModalProps): JSX.Element => {
  return (
    <Modal
      visible={props.showModal}
      onOk={props.handleClose}
      onCancel={props.handleLogout}
      okText="Stay logged in"
      cancelText="Logout"
    >
      <p>
        You have been inactive for a while, please click the "Stay logged in"
        button
      </p>
      <p>
        <Countdown date={Date.now() + props.remainingTime} daysInHours={true} />
      </p>
    </Modal>
  );
};
