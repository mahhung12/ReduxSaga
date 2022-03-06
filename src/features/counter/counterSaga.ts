import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";
import { fetchCount } from "./counterAPI";

function* test() {
  yield fetchCount();
  // and
  yield call(fetchCount, 2);
}

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log("Waiting 1s");

  //Wait 1s
  yield delay(1000);

  console.log("Waiting dispatch action done after 1s");

  // Dispatch action success
  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log("Counter Saga");

  // yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
