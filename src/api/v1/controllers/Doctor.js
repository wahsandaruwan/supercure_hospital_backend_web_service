// -------------------- Custom Libraries and modules --------------------
const { UserModel , DoctorModel } = require("../models");

// -------------------- Function to save Doctor Details --------------------
const SaveDoctorDetails = async(req, res) => {
    // Request body
    const {
        doctorId,
        degree,
        specialty,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated, 
      } = req.body;

      try {
        // Check DoctorId already exsit or not
        const Doctor = await UserModel.findOne({_id:doctorId}).exec();

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
            doctorId,
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
        });
        
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

// ------------------- Get All Doctor details --------------------
const GetAllDoctorDetails = async(req , res) => {
    try {
        const All = await DoctorModel.find().exec();

        return res.status(200).json({
            status:true,
            users: All,
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


// ------------------- Function to get  doctor details by Id -------------------
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
      const Details =  await DoctorModel.find({doctorId:DoctorId}).exec();
      if(!Details){
        return res.status(400).json({
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

// ------------------- Function to Update Doctor Details -------------------
const UpdateDoctorDetails = async(req , res) => {
    // Request params
    const { DetailsId } = req.params;

    // Request body
    const { dateUpdated , timeUpdated } = req.body;

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

        // Check Updated date and time exist or not
        if(!dateUpdated || !timeUpdated){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Missing Updated Date or Updated Time!"
                }
            });
        }
        
        // Update Details
        const UpdatedDetails = await DoctorModel.findOneAndUpdate(
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
            details: UpdatedDetails,
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
const DeleteDoctorDetails = async(req, res) => {
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
                message: "SuccessFully Deleted!"
            }
        });

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

module.exports = { 
    SaveDoctorDetails, 
    GetAllDoctorDetails, 
    GetDoctorDetailsById, 
    UpdateDoctorDetails, 
    DeleteDoctorDetails 
};