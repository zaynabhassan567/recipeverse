import { put, takeLatest, call, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { setUser, clearUser, setLoading } from '../userSlice';

function createAuthChannel() {
  return eventChannel((emit) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      emit({ user });
    });
    return unsubscribe;
  });
}

function* watchAuthStateSaga() {
  const channel = yield call(createAuthChannel);
  while (true) {
    const { user } = yield take(channel);
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      yield put(setUser({ displayName, email, photoURL, uid }));
    } else {
      yield put(clearUser());
    }
  }
}

function* logoutSaga() {
  yield put(setLoading(true));
  yield call(signOut, auth);
  yield put(clearUser());
  yield put(setLoading(false));
}

export default function* userSaga() {
  yield fork(watchAuthStateSaga);
  yield takeLatest('user/logoutUser', logoutSaga);
} 