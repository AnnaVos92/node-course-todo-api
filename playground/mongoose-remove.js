const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// remove all
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// remove one
// Todo.findOneAndRemove({}).then((result) => {
//     console.log(result);
// });

// remove one by ID
Todo.findByIdAndRemove('5a2e7053cec1c02e44cbea7b').then((todo) => {
    console.log(todo);
});