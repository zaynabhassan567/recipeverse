const admin = require('firebase-admin');
const path = require('path');

// Path to your Firebase service account key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const cuisinesData = [
  {
    name: "Italian",
    description: "Famous for pasta, pizza, and rich tomato‑based dishes.",
    image: "https://images.pexels.com/photos/32655072/pexels-photo-32655072.jpeg?_gl=1*1a3cfls*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA3MTMkajE2JGwwJGgw"
  },
  {
    name: "Asian",
    description: "A broad cuisine including flavors from East to Southeast Asia.",
    image: "https://images.pexels.com/photos/32689490/pexels-photo-32689490.jpeg?_gl=1*1fbnbep*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA3NTQkajUyJGwwJGgw"
  },
  {
    name: "American",
    description: "Known for burgers, BBQ, and comfort food classics.",
    image: "https://images.pexels.com/photos/29250659/pexels-photo-29250659.jpeg?_gl=1*hnjzue*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA3OTUkajExJGwwJGgw"
  },
  {
    name: "Mexican",
    description: "Spicy and vibrant dishes like tacos, enchiladas, and guacamole.",
    image: "https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?_gl=1*670taq*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA4NDYkajI0JGwwJGgw"
  },
  {
    name: "Mediterranean",
    description: "Healthy dishes with olive oil, fresh herbs, and grilled meats.",
    image: "https://images.pexels.com/photos/1435893/pexels-photo-1435893.jpeg"
  },
  {
    name: "Pakistani",
    description: "Rich, spicy curries and grilled meats with aromatic spices.",
    image: "https://images.pexels.com/photos/6113813/pexels-photo-6113813.jpeg?_gl=1*12w7vrl*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA4ODkkajQzJGwwJGgw"
  },
  {
    name: "Japanese",
    description: "Delicate and artistic dishes like sushi, ramen, and tempura.",
    image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg"
  },
  {
    name: "Moroccan",
    description: "Flavorful tagines, couscous, and spice blends.",
    image: "https://images.pexels.com/photos/32639757/pexels-photo-32639757.jpeg?_gl=1*5i36k4*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA5MzkkajU5JGwwJGgw"
  },
  {
    name: "Korean",
    description: "Known for BBQ, kimchi, and bold fermented flavors.",
    image: "https://images.pexels.com/photos/832182/pexels-photo-832182.jpeg"
  },
  {
    name: "Greek",
    description: "Fresh dishes with olive oil, cheese, and herbs.",
    image: "https://images.pexels.com/photos/1435894/pexels-photo-1435894.jpeg"
  },
  {
    name: "Thai",
    description: "A balance of sweet, sour, spicy, and salty in every dish.",
    image: "https://images.pexels.com/photos/10398943/pexels-photo-10398943.jpeg?_gl=1*m62py4*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTA5NzIkajI2JGwwJGgw"
  },
  {
    name: "Indian",
    description: "Diverse cuisine with curries, flatbreads, and rich spices.",
    image: "https://images.pexels.com/photos/9609860/pexels-photo-9609860.jpeg?_gl=1*1uchrbl*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTEwMjckajU5JGwwJGgw"
  },
  {
    name: "Turkish",
    description: "Grilled meats, flatbreads, and sweet treats like baklava.",
    image: "https://images.pexels.com/photos/5639357/pexels-photo-5639357.jpeg?_gl=1*ho8rwi*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTEwNjQkajIyJGwwJGgw"
  },
  {
    name: "Smoothie",
    description: "Healthy blended drinks made with fruits and yogurt.",
    image: "https://images.pexels.com/photos/775031/pexels-photo-775031.jpeg"
  },
  {
    name: "Russian",
    description: "Hearty dishes like borscht and dumplings.",
    image: "https://images.pexels.com/photos/8601388/pexels-photo-8601388.jpeg?_gl=1*1amaqho*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTExMTEkajM4JGwwJGgw"
  },
  {
    name: "Lebanese",
    description: "Fresh mezze, grilled meats, and creamy hummus.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
  },
  {
    name: "Brazilian",
    description: "BBQ meats, feijoada, and tropical flavors.",
    image: "https://images.pexels.com/photos/15200487/pexels-photo-15200487.jpeg?_gl=1*1hla6ev*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTExODUkajI2JGwwJGgw"
  },
  {
    name: "Spanish",
    description: "Tapas, paella, and rich Mediterranean flavors.",
    image: "https://images.pexels.com/photos/11867550/pexels-photo-11867550.jpeg?_gl=1*15anmiu*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTEyMDgkajMkbDAkaDA."
  },
  {
    name: "Vietnamese",
    description: "Fresh herbs, rice noodles, and light broths.",
    image: "https://images.pexels.com/photos/8467669/pexels-photo-8467669.jpeg?_gl=1*1q2hiqi*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTEzNDkkajU1JGwwJGgw"
  },
  {
    name: "Cocktail",
    description: "Refreshing mixed drinks for every occasion.",
    image: "https://images.pexels.com/photos/9393931/pexels-photo-9393931.jpeg?_gl=1*65zb3t*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTEzODEkajIzJGwwJGgw"
  },
  {
    name: "Hawaiian",
    description: "Tropical flavors with seafood, fruits, and fusion dishes.",
    image: "https://images.pexels.com/photos/4828142/pexels-photo-4828142.jpeg?_gl=1*1al7v5j*_ga*MTQ5MTkxNDg2Ni4xNzUwOTEwNjY5*_ga_8JE65Q40S6*czE3NTA5MTA2NjkkbzEkZzEkdDE3NTA5MTE0MDIkajIkbDAkaDA."
  }
];

async function importCuisines() {
  let count = 0;
  for (const cuisine of cuisinesData) {
    await db.collection('cuisines').add(cuisine);
    count++;
    console.log(`Imported cuisine: ${cuisine.name}`);
  }
  console.log(`\nImported ${count} cuisines to Firestore.`);
}

importCuisines().then(() => process.exit()).catch(err => {
  console.error(err);
  process.exit(1);
}); 