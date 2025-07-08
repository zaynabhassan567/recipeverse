const admin = require('firebase-admin');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importRecipes() {
  const res = await fetch('https://dummyjson.com/recipes?limit=100');
  const data = await res.json();
  const recipes = data.recipes || [];
  let count = 0;
  for (const recipe of recipes) {
    const { id, ...rest } = recipe;
    await db.collection('recipes').add(rest);
    count++;
    console.log(`Imported recipe: ${recipe.name}`);
  }
  console.log(`\nImported ${count} recipes to Firestore.`);
}

importRecipes().then(() => process.exit()).catch(err => {
  console.error(err);
  process.exit(1);
}); 