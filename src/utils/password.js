const _ = require("lodash");
var generator = require("generate-password");
// const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

exports.generatePassword = (length) => {
  // return _.sampleSize(chars, length).join('');
  var password = generator.generate({
    length: length,
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
    strict: true,
  });
  console.log("generated password", password);
  return password;
};
