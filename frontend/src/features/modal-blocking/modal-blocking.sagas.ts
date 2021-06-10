import { PutEffect, RaceEffect, TakeEffect } from 'redux-saga/effects';
import { put, race, take, SagaGenerator } from 'typed-redux-saga';
import {
  setModalBlockingInfo,
  modalBlockingConfirm,
} from './modal-blocking.slice';

import { Action } from 'redux';

export function* modalBlockingSaga({
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
  | RaceEffect<SagaGenerator<Action<typeof modalBlockingConfirm>, TakeEffect>>
  | TakeEffect,
  void | boolean,
  unknown
> {
  try {
    yield* put(setModalBlockingInfo({ modalType, modalTitle, modalText }));
    // const answer = yield* take(ModalConfirmActionTypes.MODAL_CONFIRM);
    const { yes } = yield* race({
      yes: take(modalBlockingConfirm.type),
    });
    // console.log('answer: ');
    // console.log(answer);
    yield* put(
      setModalBlockingInfo({ modalType: '', modalTitle: '', modalText: '' })
    );
    return Boolean(yes);
    // return answer['type'] === 'MODAL_CONFIRM';
    // return true;
  } catch (e) {
    console.error(e);
  }
}
