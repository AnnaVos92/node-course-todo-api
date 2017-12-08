const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

  // find one and update
  // db.collection('Todos').findOneAndUpdate({
  //     _id: new ObjectID('5a2955430fb1cc153c740878')
  //   }, {
  //     $set: {completed: true}
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5a295e12f8edfd2df82c6f21')
    }, {
      $set: {name: 'Anna'},
      $inc: {age: -2}
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  // db.close();
});
