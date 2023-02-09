const mongoose = require('mongoose')

const NomineeSchema = new mongoose.Schema({
    nomineeName:String,
    nomineeGender:String,
    nomineeRelation:String,
    nomineeEmail:String,
    nomineePhone:String,
    nomineeAddress:String
})

const NomineeModel = mongoose.model("NomineeModel",NomineeSchema);
module.exports = NomineeModel;