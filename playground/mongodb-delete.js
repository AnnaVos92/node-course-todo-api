const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

  // delete many
  // db.collection('Todos').deleteMany({text: 'todo'}).then((result) => {
  //   console.log(result);
  // });

  // delete one deletes only the first one that it finds with the criterium
  // db.collection('Todos').deleteOne({text: 'something'}).then((result) => {
  //   console.log(result);
  // });

  // find one and delete, return deleted item
  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result);
  // });

  // delete many Anna's
  db.collection('Users').deleteMany({name: 'Anna'}).then((result) => {
    console.log(result);
  });

  //delete one Mila
  db.collection('Users').findOneAndDelete({name: 'Mila'}).then((result) => {
    console.log(result);
  });

  // db.close();
});
