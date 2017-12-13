var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];
  
  // Object.keys takes an object, gets all
  // the keys and returns them as an array
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  })
}
