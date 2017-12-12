const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Schema constructor function
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email address'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// use regular function because
// arrow functions do not bind a this keyword
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'secretvalue').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  // return the promise value, since the chained
  // promise will be added in server.js
  return user.save().then(() => {
    return token;
  });
};

// statics is like methods, but everything inside it
// becomes a model method rather than instance method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'secretvalue');
  } catch(e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    // simplified version of above code:
    return Promise.reject();
  }

  // query nested object properties, use value in quotes ('tokens.token')
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var User = mongoose.model('User', UserSchema);

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
