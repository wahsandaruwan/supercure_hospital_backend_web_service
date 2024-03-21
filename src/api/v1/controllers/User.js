// -------------------- Thirdparty Libraries and modules --------------------
const bcrypt = require("bcrypt");

// -------------------- Custom Libraries and modules ------------------------
const { UserModel } = require("../models");


// -------------------- Function to register new user ------------------------
const RegisterNewUser = async(req, res) =>{

    // Request body
    const {
        fullName,
        emailAddress,
        nicNumber,
        address,
        password,
        phoneNumber,
        gender,
        userType,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated,
      } = req.body;

      try {
        // Check if emailAddress or PhoneNumber already exist or not
        const User = await UserModel.findOne({
            $or:[{emailAddress} , {phoneNumber}]
        });

        if(User){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Email or Phone number already exist in the system!"
                }
            });
        }

        // Encrypted password
        const EncryptedPassword = await bcrypt.hash(password, 8);

        // New user 
        const NewUser = new UserModel({
            fullName,
            emailAddress,
            nicNumber,
            address,
            password:EncryptedPassword,
            phoneNumber,
            gender,
            userType,
            dateCreated,
            timeCreated,
            dateUpdated,
            timeUpdated, 
        });

        // Save new user to database 
        const SaveUser = await NewUser.save();

        res.status(201).json({
            status: true,
            success: {
                message: "Successfully Registerd!"
            }
        });

      } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to register new user due to server error!"
            }
        });
      }
};

module.exports = { RegisterNewUser };