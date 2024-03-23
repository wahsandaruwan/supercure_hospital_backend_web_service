// -------------------- Thirdparty modules and libraries --------------------
const mongoose = require("mongoose");

// ---------- Patient schema -----------
const PatientModel = new mongoose.Schema({
    patientId:{
        type:String,
        require: true
    },
    symptoms:{
        type:[String],
        require: true
    },
    age: {
        type: String,
        require:true
    },
    dateCreated: {
        type: String,
        require: true
      },
    timeCreated: {
        type: String,
        require: true
      },
    dateUpdated: {
        type: String,
        require: true
      },
    timeUpdated: {
        type: String,
        required: true,
      }
},{timestamps: true});

module.exports = mongoose.model("Patients" , PatientModel);