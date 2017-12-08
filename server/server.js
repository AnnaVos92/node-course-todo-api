const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(3000, () => {
  console.log('Started server on port 3000.');
});

module.exports = {app};
