import {
  // put,
  // race,
  // take,
  PutEffect,
  RaceEffect,
  TakeEffect,
} from 'redux-saga/effects';
import { put, race, take, SagaGenerator } from 'typed-redux-saga';
import {
  setConfirmModalType,
  // modalConfirm,
  // modalCancel,
} from './modal-confirm.actions';

import {
  ModalConfirmActionTypes,
  ModalConfirmAction,
} from './modal-confirm.types';
import { Action } from 'redux';

export function* confirmSaga({
  modalType,
  modalTitle,
  modalText,
}: {
  modalType: string;
  modalTitle: string;
  modalText: string;
}): Generator<
  | void
  | PutEffect
  | RaceEffect<SagaGenerator<Action<ModalConfirmAction>, TakeEffect>>
  | TakeEffect,
  void | boolean,
  unknown
> {
  try {
    yield* put(setConfirmModalType({ modalType, modalTitle, modalText }));
    // const answer = yield* take(ModalConfirmActionTypes.MODAL_CONFIRM);
    const { yes } = yield* race({
      yes: take(ModalConfirmActionTypes.MODAL_CONFIRM),
      no: take(ModalConfirmActionTypes.MODAL_CANCEL),
    });
    // console.log('answer: ');
    // console.log(answer);
    yield* put(
      setConfirmModalType({ modalType: '', modalTitle: '', modalText: '' })
    );
    return Boolean(yes);
    // return answer['type'] === 'MODAL_CONFIRM';
    // return true;
  } catch (e) {
    console.error(e);
  }
}
