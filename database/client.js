const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 3000
});

module.exports = pool.connect();

// const client = new Client({​​​​​​​
//   user: 'user',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'mysecretpassword',
//   port: 3000,
// }​​​​​​​);


// const selectedProperties = Object.keys(animals[0]).filter((property) =>  {​​​​​​​
//   return ["id", "animalname", "breedname", "speciesname", "animalage", "basecolour"].includes(property);
// }​​​​​​​);


// selectedProperties.push('owner_id');


// const insertPromise = (properties, values) => new Promise((resolve, reject) => {​​​​​​​
//   const query = {​​​​​​​
//     text: 'INSERT INTO animals (id, animalname, breedname, speciesname, animalage, basecolour, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
//     values: [...values, 1],
//   }​​​​​​​
//   client.query(query, (err, res) => {​​​​​​​
//     if (err) {​​​​​​​
//       console.error(err);
//       return reject(err);
//     }​​​​​​​
//     console.log(res);
//     resolve();
//   }​​​​​​​);
// }​​​​​​​)




// module.exports = client;
// .then(function() {​​​​​​​
//   const promises = animals.map(animal => {​​​​​​​
//     const keys = Object.keys(animal);
//     const values = keys.reduce(function(arr, keyValue) {​​​​​​​
//       if (selectedProperties.includes(keyValue)) {​​​​​​​
//         arr.push(animal[keyValue]);
//       }​​​​​​​
//       return arr;
//     }​​​​​​​, []);


//     return insertPromise(selectedProperties, values);
//   }​​​​​​​);


//   return Promise.all(promises);
// }​​​​​​​)
// .then(function(promises) {​​​​​​​
//   console.log(promises);
//   client.end();
// }​​​​​​​)
// .catch(function(err) {​​​​​​​
//   console.error(err);
// }​​​​​​​);
 









