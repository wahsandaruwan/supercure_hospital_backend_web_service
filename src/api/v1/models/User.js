// -------------------- Third party libraries and modules --------------------
const mangoose = require("mongoose");

// ---------- User schema -----------
const UserSchema = new mangoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
    emailAddress: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
    phoneNumber: {
        type: Number,
      },
    gender: {
        type: String,
        required: true,
      },
    dateOfBirth:{
        type: Date,
        require:true,
      },  
    userType: {
        type: String,
        required: true,
      },
    dateCreated: {
        type: String,
      },
    timeCreated: {
        type: String,
      },
    dateUpdated: {
        type: String,
      },
    timeUpdated: {
        type: String,
      }
}, {timestamps: true});

module.exports = mangoose.model("User" , UserSchema);