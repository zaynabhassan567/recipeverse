import { cuisinesData } from "../utils/cusinesData";

const BASE_URL = 'https://dummyjson.com/recipes';

/**
 * Fetch all recipes (paginated).
 * @param {number} limit - Number of recipes to fetch.
 * @param {number} skip - Number of recipes to skip.
 */
export const fetchAllRecipes = async (limit = 20, skip = 0) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data.recipes; // returns an array
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

/**
 * Fetch a single recipe by ID.
 * @param {number} id - The recipe ID.
 */
export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    return null;
  }
};

/**
 * Search recipes by name.
 * @param {string} query - Search keyword.
 */
export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error(`Error searching for recipes with query "${query}":`, error);
    return [];
  }
};

/**
 * Filter recipes by cuisine type.
 * @param {string} cuisine - Cuisine type (e.g., "Italian", "Indian")
 */
export const filterRecipesByCuisine = async (cuisine) => {
  try {
    const allRecipes = await fetchAllRecipes(100); // dummyjson doesn't support filtering directly
    return allRecipes.filter(recipe =>
      recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
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
export  const fetchRecipeCusineTypes = async () => {
 try {
    const allCuisines = [...cuisinesData]; // dummyjson doesn't support filtering directly
    return allCuisines;
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
    const allCuisines = await fetchRecipeCusineTypes();
    return allCuisines.find(c => c.name.toLowerCase() === cuisine.toLowerCase());
  } catch (error) {
    console.error(`Error fetching cuisine details for "${cuisine}":`, error);
    return null;
  }
}