const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$4cttHIdi.Ya2cXIvuFfglOAkL4bZ4EwbmvZsBj6Px8vj8rqTLfKeC';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});


// ##### creating token #####
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'secret salt');
// console.log(token);

// var decoded = jwt.verify(token, 'secret salt');
// console.log('decoded', decoded);



// ##### manually verifying tokens #####
// var message = 'I am user number 4';
// var hash = SHA256(message.toString);

// console.log(`Message: ${message}`);
// console.log(`Hashed: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret salt').toString()
// }

// // when user manually manuipulates data
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'secret salt').toString();
// if (resultHash === token.hash) {
//     console.log('data was not changed');
// } else {
//     console.log('data was changed!');
// }