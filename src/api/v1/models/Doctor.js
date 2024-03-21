// -------------------- Third party libraries and modules --------------------
const mongoose = require("mongoose");

// ---------- Doctor schema -----------
const DoctorModel = new mongoose.Schema({
    degree:{
        type:String,
        require: true
    },
    specialty: {
        type: String
    },
},{timestamps: true});

module.exports = mongoose.model("Doctors" , DoctorModel);