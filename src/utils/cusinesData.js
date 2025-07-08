import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Fetch all cuisines from the 'cuisines' collection in Firestore
export async function fetchCuisinesData() {
  const querySnapshot = await getDocs(collection(db, 'cuisines'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
