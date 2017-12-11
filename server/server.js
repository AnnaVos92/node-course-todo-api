const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

// configure middleware
app.use(bodyParser.json());

// '/' is for resource creation, '/todos' for new todo
app.post('/todos', (req, res) => {
  // req.body where body gets stored by bodyParser
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})   // pass as object instead of array for possibility to modify later
  }).catch((e) => res.status(400).send(e));
});

// get todo by passing id in link
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)) {
    return res.status(404).send();
  };

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    };

    res.send({todo})
  }).catch((e) => res.status(400).send());
});

app.listen(3000, () => {
  console.log('Started server on port 3000.');
});

module.exports = {app};
