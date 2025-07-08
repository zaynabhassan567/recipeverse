import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRecipes, addRecipe, updateRecipe, deleteRecipe } from '../services/firestoreApi';
import { setRecipes, setLoading, setError, fetchRecipesSaga, addRecipeSaga, updateRecipeSaga, deleteRecipeSaga, addRecipe as addRecipeAction, updateRecipe as updateRecipeAction, deleteRecipe as deleteRecipeAction } from '../recipesSlice';

function* handleFetchRecipes() {
  try {
    yield put(setLoading(true));
    const recipes = yield call(fetchRecipes);
    yield put(setRecipes(recipes));
  } catch (error) {
    yield put(setError(error.message || 'Failed to fetch recipes'));
  }
}

function* handleAddRecipe(action) {
  try {
    const newRecipe = yield call(addRecipe, action.payload);
    yield put(addRecipeAction(newRecipe));
  } catch (error) {
    yield put(setError(error.message || 'Failed to add recipe'));
  }
}

function* handleUpdateRecipe(action) {
  try {
    const updatedRecipe = yield call(updateRecipe, action.payload.id, action.payload);
    yield put(updateRecipeAction(updatedRecipe));
  } catch (error) {
    yield put(setError(error.message || 'Failed to update recipe'));
  }
}

function* handleDeleteRecipe(action) {
  try {
    yield call(deleteRecipe, action.payload);
    yield put(deleteRecipeAction(action.payload));
  } catch (error) {
    yield put(setError(error.message || 'Failed to delete recipe'));
  }
}

export default function* recipesSaga() {
  yield takeLatest(fetchRecipesSaga.type, handleFetchRecipes);
  yield takeLatest(addRecipeSaga.type, handleAddRecipe);
  yield takeLatest(updateRecipeSaga.type, handleUpdateRecipe);
  yield takeLatest(deleteRecipeSaga.type, handleDeleteRecipe);
} 