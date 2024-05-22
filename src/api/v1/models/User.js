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
        type: String,
        require:true,
      },
    imageUrl: {
      type:String
    },  
    userType: {
        type: String,
        required: true,
      },
    dateCreated: {
        type: String,
        required: true,
      },
    timeCreated: {
        type: String,
        required: true,
      },
    dateUpdated: {
        type: String,
        required: true,
      },
    timeUpdated: {
        type: String,
        required: true,
      }
}, {timestamps: true});

module.exports = mongoose.model("Users" , UserModel);