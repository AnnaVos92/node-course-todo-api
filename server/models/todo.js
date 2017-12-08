const mongoose = require('mongoose');

// model for a todo, mongoose automatically changes 'Todo' to 'todos'
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required:false,
    default: false
  },
  completedAt: {
    type: Number,
    required: false,
    default: null
  }
});

// ##### SAMPLE #####
// new Todo instance
// var sampleTodo = new Todo({
//   text: 'sample todo'
// });
//
// sampleTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }).catch((error) => {
//   console.log('Unable to save todo', error);
// });

module.exports = {Todo};
