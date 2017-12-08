var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  }
});

// ##### SAMPLE #####
// var user = new User({
//   email: 'hi@hi.hi'
// });
//
// user.save().then((doc) => {
//   console.log('Saved user', doc);
// }).catch((error) => {
//   console.log('Unable to save user', error);
// });

module.exports = {User};
