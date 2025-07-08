import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCuisinesData } from '../utils/cusinesData';
import { addCuisine, updateCuisine, deleteCuisine } from '../services/firestoreApi';
import { setCuisines, setLoading, setError, fetchCuisinesSaga, addCuisineSaga, updateCuisineSaga, deleteCuisineSaga, addCuisine as addCuisineAction, updateCuisine as updateCuisineAction, deleteCuisine as deleteCuisineAction } from '../cuisinesSlice';

function* handleFetchCuisines() {
  try {
    yield put(setLoading(true));
    const cuisines = yield call(fetchCuisinesData);
    yield put(setCuisines(cuisines));
  } catch (error) {
    yield put(setError(error.message || 'Failed to fetch cuisines'));
  }
}

function* handleAddCuisine(action) {
  try {
    const newCuisine = yield call(addCuisine, action.payload);
    yield put(addCuisineAction(newCuisine));
  } catch (error) {
    yield put(setError(error.message || 'Failed to add cuisine'));
  }
}

function* handleUpdateCuisine(action) {
  try {
    const updatedCuisine = yield call(updateCuisine, action.payload.id, action.payload);
    yield put(updateCuisineAction(updatedCuisine));
  } catch (error) {
    yield put(setError(error.message || 'Failed to update cuisine'));
  }
}

function* handleDeleteCuisine(action) {
  try {
    yield call(deleteCuisine, action.payload);
    yield put(deleteCuisineAction(action.payload));
  } catch (error) {
    yield put(setError(error.message || 'Failed to delete cuisine'));
  }
}

export default function* cuisinesSaga() {
  yield takeLatest(fetchCuisinesSaga.type, handleFetchCuisines);
  yield takeLatest(addCuisineSaga.type, handleAddCuisine);
  yield takeLatest(updateCuisineSaga.type, handleUpdateCuisine);
  yield takeLatest(deleteCuisineSaga.type, handleDeleteCuisine);
} 