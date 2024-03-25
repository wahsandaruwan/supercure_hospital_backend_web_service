// -------------------- thirdpary libaries and modules --------------------
const mongoose = require("mongoose");

// ---------- Doctor schema -----------
const AppointmentModel = new mongoose.Schema({
    doctorId:{
        type:String,
        require: true
    },
    patientId: {
        type: String,
        require:true
    },
    appointmentDate: {
        type: String,
        require:true
    },
    appointmentTime: {
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

module.exports = mongoose.model("Appointments" , AppointmentModel);