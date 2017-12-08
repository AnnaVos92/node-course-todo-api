const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

  // toArray returns all documents as array (returns Promise)
  // db.collection('Todos').find({
  //   _id: new ObjectID('5a295afc1afbee2d50856c6b')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }).catch((error) => {
  //   console.log('Couldn\'t find any', error);
  // });

  // count amount of results from find
  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos');
  //   console.log(`Count: ${count}`);
  // }).catch((error) => {
  //   console.log('Couldn\'t find any', error);
  // });

  // count amount of results from find
  db.collection('Users').find({name: 'Hannah'}).count().then((count) => {
    console.log('Users');
    console.log(`Count: ${count}`);
  }).catch((error) => {
    console.log('Couldn\'t find any', error);
  });

  // db.close();
});
