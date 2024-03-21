// -------------------- Third party libraries and modules --------------------
const mongoose = require("mongoose");

// ---------- User schema -----------
const UserModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
    emailAddress: {
        type: String,
        required: true,
      },
    nicNumber: {
        type: String,
        required: true,
      },
    address: {
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

module.exports = mongoose.model("Users" , UserModel);