// -------------------- Third party libraries and modules --------------------
const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");

// ---------- Doctor schema -----------
const DoctorModel = new mangoose.Schema({
    degree:{
        type:String,
        require: true
    },
    specialty: {
        type: String
    },
});

module.exports = mongoose.model("Doctor" , DoctorModel)