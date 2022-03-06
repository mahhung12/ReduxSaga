import counterSaga from "features/counter/counterSaga";
import { all } from "redux-saga/effects";

function* helloSaga() {
  console.log("Hello Saga");
}

export default function* rootSaga() {
  console.log("root saga");
  yield all([helloSaga(), counterSaga()]);
}
