// const MongoClient = require('mongodb').MongoClient;
// below is ES6 destructured equivalent of code (except added ObjectID part)
const {MongoClient, ObjectID} = require('mongodb');

// ES6 destructuring of objects
// var user = {name: 'Anna', age: 25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

  // do things
  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo item', err);
  //   };
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // make users
  // db.collection('Users').insertOne({
  //   name: "Anna",
  //   age: 25,
  //   location: "Amsterdam"
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   };
  //
  //
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  // close database
  db.close();
});
