// -------------------- Thirdparty Libraries and modules --------------------
const bcrypt = require("bcrypt");

// -------------------- Custom Libraries and modules ------------------------
const { UserModel } = require("../models");
const {GenerateTokens} = require("../libraries")


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
        dateOfBirth,
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
            dateOfBirth,
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

// -------------------- Function to Login user ------------------------
const LoginUser = async(req , res) => {
    // Request body
    const { emailAddress, password } = req.body;

    try {
       // Check emailAddress already exist or not
       const User = await UserModel.findOne({emailAddress}).exec(); 

       if(!User){
        return res.status(400).json({
            status:false,
            error: {
                message: "Wrong Email Address!"
            }
        });
       }

       // Check Password Match or not
       const PasswordMatch = await bcrypt.compare(password , User.password);

       if(!PasswordMatch){
        return res.status(401).json({
            status: false,
            error: {
                message: "Wrong Password!"
            }
        });
       }

       const {accessToken} = GenerateTokens(User);

       return res.status(200).json({
        status: true,
        accessToken,
        user:User,
        success: {
            message: "Login Success!"
        }
       });

    } catch (error) {
       console.log(error);
       res.status(500).json({
        status: false,
        error: {
            message: "Login failed due to server error!"
        }
       });
    }
};

// ------------------- Get All Users --------------------
const GetAllUsers = async(req , res) => {
    try {
        const AllUsers = await UserModel.find().exec();

        return res.status(200).json({
            status:true,
            users: AllUsers,
            success:{
                message: "Success!"
            }
        });

    } catch (error) {
      console.log(error);
      res.status(500).json({
       status: false,
       error: {
           message: "Failed get users due to server error!"
       }
      }); 
    }
}

// -------------------- Function to Get user by Id --------------------
const GetUserById = async(req , res) => {
    // Request params
    const { UserId } = req.params;

    try {
        // Check user already available
        const User = await UserModel.findOne({ _id: UserId }).exec();
        if (!User) {
          return res.status(404).json({
            status: false,
            error: { 
              message: "No user available for the provided user id!" 
            }
          });
        }
    
        return res.status(200).json({
          status: true,
          user: User,
          success: { message: "Successfully fetched the user!" },
        });

      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: false,
          error: { message: "Failed to fetch the user due to server error!" },
        });
      }
};

// --------------------  Function to Update User details --------------------
const UpdateUserById = async (req, res) => {
    // Request params
    const { UserId } = req.params;
  
    // Request body
    const { newPassword, currentPassword, dateUpdated, timeUpdated } = req.body;
  
    // Global variables
    let UpdatedUser, EncryptedPassword;
  
    try {
      // Check user already available
      const User = await UserModel.findOne({ _id: UserId }).exec();
      if (!User) {
        return res.status(404).json({
          status: false,
          error: { message: "No user available for the provided user id!" },
        });
      }
  
      // Properties validation
      if (!dateUpdated || !timeUpdated) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Not provided updated date or time information!",
          },
        });
      }
      if (currentPassword && newPassword) {
        // Check if the obejct has correct properties count
        const PropertiesCount = Object.keys(req.body).length;
        if (PropertiesCount != 4) {
          return res.status(400).json({
            status: false,
            error: {
              message: "Invalid number of properties for the password update!",
            },
          });
        }
  
        // Check if current password matches
        const PassMatch = await bcrypt.compare(currentPassword, User.password);
  
        if (!PassMatch) {
          return res.status(400).json({
            status: false,
            error: { message: "Wrong current password!" },
          });
        }
  
        // Encrypt password
        EncryptedPassword = await bcrypt.hash(newPassword, 8);
      } else if (!currentPassword && newPassword) {
        return res.status(400).json({
          status: false,
          error: { message: "Not provided the current password!" },
        });
      } else if (!newPassword && currentPassword) {
        return res.status(400).json({
          status: false,
          error: { message: "Not provided the new password!" },
        });
      }
  
      // Update user
      UpdatedUser = await UserModel.findOneAndUpdate(
        { _id: UserId },
        {
          $set:
            currentPassword && newPassword
              ? {
                  password: EncryptedPassword,
                  dateUpdated,
                  timeUpdated,
                }
              : req.body,
        },
        {
          new: true,
        }
      );
  
      return res.status(200).json({
        status: true,
        user: UpdatedUser,
        success: {
          message:
            currentPassword && newPassword
              ? "Successfully updated the password of the user!"
              : "Successfully updated the basic information of the user!",
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: { message: "Failed to update the user due to server error!" },
      });
    }
  };
  

// -------------------- Function to Delete User ------------------------
const DeleteUser = async(req , res) => {
    // Get userId from the url
    const { UserId } = req.params;
    
    try {

        // Check UserId already exsits or not
        const User = await UserModel.findOne({_id:UserId}).exec();

        if(!User){
            return res.status(404).json({
                status: false,
                error: {
                    message: "No user found for the provided user id!"
                }
            });
        }
        // Delete User
        const DeleteUser =  await User.deleteOne();

        if(DeleteUser){
            return res.status(200).json({
                status: true,
                success: {
                    message: "User delete successfully!"
                }
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:false,
            error:{
              message: "Failed to delete user due to server error!"
            }  
        })
    }
}

module.exports = { RegisterNewUser , LoginUser , GetAllUsers , GetUserById ,  UpdateUserById , DeleteUser };