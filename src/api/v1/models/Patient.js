// -------------------- Thirdparty modules and libraries --------------------
const mongoose = require("mongoose");

// ---------- Patient schema -----------
const PatientModel = new mongoose.Schema({
    symptoms:{
        type:String,
        require: true
    },
    age: {
        type: String,
        require:true
    },
},{timestamps: true});

module.exports = mongoose.model("Patients" , PatientModel);