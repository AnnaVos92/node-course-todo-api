const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  }, process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{access, token}]);

  // return the promise value, since the chained
  // promise will be added in server.js
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  // var user in instance, var User in model
  var user = this;

  return user.update({
    $pull: {     // $pull removes matching variable from array
      tokens: {token}
    }
  });
};

// statics is like methods, but everything inside it
// becomes a model method rather than instance method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
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
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    // since bcrypt doesn't support promises, we have
    // to return a new promise that wraps around bcrypt
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
}

// before 'save', run
UserSchema.pre('save', function(next) {
  var user = this;

  // check if password is already modified to prevent rehashing
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

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
