// -------------------- Third party libraries and modules --------------------
const mongoose = require("mongoose");

// ---------- Doctor schema -----------
const DoctorModel = new mongoose.Schema({
    doctorId:{
        type:String,
        require: true
    },
    degree:{
        type:[String],
        require: true
    },
    specialty: {
        type: [String],
        require: true
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

module.exports = mongoose.model("Doctors" , DoctorModel);