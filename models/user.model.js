const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:String,
    phone:String,
    email:String,
    password:String


})
// const userSchemaDB = mongoose.connection.useDb('userSchemaDB');

const UserModel = mongoose.model("UserModel",UserSchema);
module.exports = UserModel;