import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import recipesSaga from './recipesSaga';
import cuisinesSaga from './cuisinesSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    recipesSaga(),
    cuisinesSaga(),
  ]);
} 