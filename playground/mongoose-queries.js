const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5a2aa91230d5f0e8287162c8';

// if (!ObjectId.isValid(id)) {
//     console.log('ID not valid');
// };

// Todo.find({
//     _id: id     // mongoose automatically converts string to id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// // when expecting one item
// Todo.findOne({
//     _id: id     // mongoose automatically converts string to id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// when looking for item by id
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('ID not found');
//     };
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

const userId = '5a2a7a61a2d5fb9426678382';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('User not found');
    };

    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
