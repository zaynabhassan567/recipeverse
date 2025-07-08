import { collection, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchCuisinesData } from "../utils/cusinesData";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Fetch all recipes from Firestore.
 */
export const fetchAllRecipes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

/**
 * Fetch a single recipe by Firestore ID.
 * @param {string} id - The Firestore document ID (e.g., '01').
 */
export const fetchRecipeById = async (id) => {
  try {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    return null;
  }
};

/**
 * Search recipes by name (client-side filter).
 * @param {string} query - Search keyword.
 */
export const searchRecipes = async (query) => {
  try {
    const allRecipes = await fetchAllRecipes();
    return allRecipes.filter(recipe =>
      (recipe.title && recipe.title.toLowerCase().includes(query.toLowerCase())) ||
      (recipe.name && recipe.name.toLowerCase().includes(query.toLowerCase()))
    );
  } catch (error) {
    console.error(`Error searching for recipes with query "${query}":`, error);
    return [];
  }
};

/**
 * Filter recipes by cuisine type (client-side filter).
 * @param {string} cuisine - Cuisine type (e.g., "Italian", "Indian")
 */
export const filterRecipesByCuisine = async (cuisine) => {
  try {
    const allRecipes = await fetchAllRecipes();
    return allRecipes.filter(recipe =>
      recipe.cuisine && recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  } catch (error) {
    console.error(`Error filtering recipes by cuisine "${cuisine}":`, error);
    return [];
  }
};

/**
 * Fetch all recipe cuisine types.
 * @returns {Promise<string[]>} - Array of unique cuisine types.
 */
export const fetchRecipeCusineTypes = async () => {
  try {
    const cuisines = await fetchCuisinesData();
    return cuisines;
  } catch (error) {
    console.error(`Error getting recipe cuisines:`, error);
    return [];
  }
}

/** * Fetch details of a specific cuisine.
 * @param {string} cuisine - Cuisine name (e.g., "Italian", "Indian")
 * @returns {Promise<Object|null>} - Cuisine details or null if not found.
 */
export const fetchCusineDetails = async (cuisine) => {
  try {
    const cuisines = await fetchCuisinesData();
    return cuisines.find(c => c.name.toLowerCase() === cuisine.toLowerCase());
  } catch (error) {
    console.error(`Error fetching cuisine details for "${cuisine}":`, error);
    return null;
  }
}

/**
 * Subscribe to real-time updates for all recipes.
 * @param {function} callback - Called with the array of recipes whenever they change.
 * @returns {function} - Unsubscribe function.
 */
export const subscribeToAllRecipes = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'recipes'), (querySnapshot) => {
    const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(recipes);
  });
  return unsubscribe;
};

/**
 * Upload a recipe image file to Firebase Storage and return the download URL.
 * @param {File} file - The image file to upload.
 * @param {string} recipeName - The recipe name (used for file naming).
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
export const uploadRecipeImage = async (file, recipeName) => {
  if (!file) throw new Error('No file provided');
  const storageRef = ref(storage, `recipe-images/${recipeName.replace(/\s+/g, '_')}_${Date.now()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};