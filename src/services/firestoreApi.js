import { collection, getDocs, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchRecipes() {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchCuisines() {
  const querySnapshot = await getDocs(collection(db, 'cuisines'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchRecipe01() {
  const recipeDocRef = doc(db, 'recipes', '01');
  const docSnap = await getDoc(recipeDocRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

// Fetch the 'recipe1' subcollection under the 'Italian: Pizza' document
export async function fetchPizzaRecipe1Details() {
  const pizzaDocRef = doc(db, 'recipes', 'Italian: Pizza');
  const recipe1ColRef = collection(pizzaDocRef, 'recipe1');
  const querySnapshot = await getDocs(recipe1ColRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch the pizza document at recipes/all recipes/pizza/pizza
export async function fetchPizzaData() {
  const pizzaDocRef = doc(db, 'recipes', 'all recipes', 'pizza', 'pizza');
  const docSnap = await getDoc(pizzaDocRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

// Fetch the pizza document at recipes/allrecipes/pizza
export async function fetchPizzaDataV2() {
  const pizzaDocRef = doc(db, 'recipes', 'allrecipes', 'pizza');
  const docSnap = await getDoc(pizzaDocRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

// --- CRUD for Recipes ---
export async function addRecipe(recipe) {
  const docRef = await addDoc(collection(db, 'recipes'), recipe);
  return { id: docRef.id, ...recipe };
}

export async function updateRecipe(id, recipe) {
  const docRef = doc(db, 'recipes', id);
  await setDoc(docRef, recipe, { merge: true });
  return { id, ...recipe };
}

export async function deleteRecipe(id) {
  const docRef = doc(db, 'recipes', id);
  await deleteDoc(docRef);
  return id;
}

// --- CRUD for Cuisines ---
export async function addCuisine(cuisine) {
  const docRef = await addDoc(collection(db, 'cuisines'), cuisine);
  return { id: docRef.id, ...cuisine };
}

export async function updateCuisine(id, cuisine) {
  const docRef = doc(db, 'cuisines', id);
  await setDoc(docRef, cuisine, { merge: true });
  return { id, ...cuisine };
}

export async function deleteCuisine(id) {
  const docRef = doc(db, 'cuisines', id);
  await deleteDoc(docRef);
  return id;
} 