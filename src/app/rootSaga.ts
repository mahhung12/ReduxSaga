import { authSaga } from "features/auth/authSaga";
import counterSaga from "features/counter/counterSaga";
import dashboardSaga from "features/dashboard/dashboardSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  console.log("root saga");
  yield all([counterSaga(), authSaga(), dashboardSaga]);
}
