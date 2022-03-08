import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { delay, fork, put, take } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);

    localStorage.setItem("access_token", "fake_token");
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: "mHung",
      })
    );

    // redirect to admin page
    yield put(push("/admin/dashboard"));
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem("access_token");
  // Redirect to login page
  yield put(push("/login"));
}

function* watchLoginFlow() {
  while (true) {
    const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
    yield fork(handleLogin, action.payload);

    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}

export function* authSaga() {
  console.log("Auth Saga");
  yield fork(watchLoginFlow);
}
