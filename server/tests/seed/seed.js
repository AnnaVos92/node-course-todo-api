const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'some text'
  }, {
    _id: new ObjectID(),
    text: 'some more text'
}];

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
    _id: userOneID,
    email: 'hi@email.com',
    password: 'user1pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID, access: 'auth'}, 'secretvalue').toString()
    }]
}, {
    _id: userTwoID,
    email: 'anna@banana.com',
    password: 'user2pass',
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {        // remove all todos before moving on
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        // Promise.all takes all promises and doesn't
        // move on until all promises are resolved
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {todos, users, populateTodos, populateUsers};