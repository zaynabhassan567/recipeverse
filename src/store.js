import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './userSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store; 