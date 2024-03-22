// -------------------- Thirdparty Libraries and modules --------------------
const bcrypt = require("bcrypt");

// -------------------- Custom Libraries and modules ------------------------
const { UserModel } = require("../models");
const { DoctorModel } = require("../models");

// -------------------- Function to save Doctor Details --------------------
const SaveDoctorDetails = async(req, res) => {
    // Request body
    const {
        userId,
        degree,
        specialty,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated, 
      } = req.body;

      try {
        // Check UserId already exsit or not
        const Doctor = await UserModel.findOne({_id:userId}).exec();

        if(!Doctor){
            return res.status(404).json({
                status: false,
                error: {
                    message: "No doctor available for the provided user id!"
                }
            });
        }

        // Check User Type
        const UserType = Doctor.userType;

        if(UserType != "doctor"){
            return res.status(403).json({
                status: false,
                error: {
                    message: "User is not authorized to perform this action!"
                }
            });
        }

        // New Doctor Details
        const NewDoctorData =  new DoctorModel({
            userId,
            degree,
            specialty,
            dateCreated,
            timeCreated,
            dateUpdated,
            timeUpdated, 
        });

        const SaveDetais = await NewDoctorData.save();
        
        return res.status(201).json({
            status: true,
            success: {
                message: "Details Save Successfully!"
            }    
        })
        
      } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to save doctor details due to server error!"
            }
        });
      }
}

// -------------------- Function to get  doctor details by Id ------------------------
const GetDoctorDetailsById = async(req , res) => {
    // Request params
    const { DoctorId } = req.params;

    try {
      // Check Doctor exits or not in related Id
      const Doctor =  await UserModel.findOne({_id:DoctorId}).exec();
      if(!Doctor){
        return res.status(404).json({
            status: false,
            error: {
                message: "No doctor available for the provided user id!"
            }
        });
      }

      // Check User Type
      const UserType = Doctor.userType;

      if(UserType != "doctor"){
          return res.status(403).json({
              status: false,
              error: {
                  message: "User is not authorized to perform this action!"
              }
          });
      }

      // Check details exits or not
      const Details =  await DoctorModel.find({userId:DoctorId}).exec();
      if(!Details){
        return res.status(404).json({
            status: false,
            error: {
                message: "Not Data Found!"
            }
        });
      }  

      return res.status(200).json({
        status: true,
        details: Details,
        success: {
            message: "Detais Get Success!"
        }
      });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to Get details due to server error!"
            }
        });  
    }
}

// ------------------- Function to Update Doctor Details --------------------
const UpdateDoctorDetails = async(req , res) => {
    // Request params
    const { DetailsId } = req.params;

    try {
        // Check Details Id exsits or not
        const Detail = await DoctorModel.findOne({_id:DetailsId}).exec();
        if(!Detail){
            return res.status(404).json({
                status: false,
                error: {
                    message: "Invalid Id!"
                }
            });
        }
        
        // Update Details
        const UpdateDetails = await DoctorModel.findOneAndUpdate(
            { _id: DetailsId },
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            status: true,
            details: UpdateDetails,
            success: {
                message: "Update Successfully!"
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to update details due to server error!"
            }
        });   
    }
}

// -------------------- Function to delete doctor details --------------------
const DeleteDetails = async(req, res) => {
     // Request params
     const { DetailsId } = req.params;
    
    try {
        // Check Id already exist or not
        const Details = await DoctorModel.findOne({_id:DetailsId}).exec();
        if(!Details){
            return res.status(404).json({
                status: false,
                error: {
                    message: "Invalid Details Id!"
                }
            });
        }

        // Delete Details
        const DeleteData = await Details.deleteOne();

        return res.status(200).json({
            status: true,
            success: {
                message: "Delete SuccessFully!"
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to Delete details due to server error!"
            }
        }); 
    }
    
}

module.exports = { SaveDoctorDetails , GetDoctorDetailsById , UpdateDoctorDetails , DeleteDetails };