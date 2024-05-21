// -------------------- Custom Libraries and modules --------------------
const { UserModel , PatientModel } = require("../models");

// -------------------- Function to Save patient Details --------------------
const SavePatientDetails = async(req , res) => {
    // Request body
    const {
        patientId,
        symptoms,
        age,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated, 
    } = req.body;

    try {
        // Check PatientId already exsit or not
        const Patient = await UserModel.findOne({_id:patientId}).exec();

        if(!Patient){
            return res.status(404).json({
                status: false,
                error: {
                    message: "No patient available for the provided user id!"
                }
            });
        }

        // Check User Type
        const UserType = Patient.userType;

        if(UserType != "patient"){
            return res.status(403).json({
                status: false,
                error: {
                    message: "User is not authorized to perform this action!"
                }
            });
        }

        // New Patient Details
        const NewPatientData =  new PatientModel({
            patientId,
            symptoms,
            age,
            dateCreated,
            timeCreated,
            dateUpdated,
            timeUpdated, 
        });

        const SaveDetais = await NewPatientData.save();
        
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
                message: "Failed to save patient details due to server error!"
            }
        }); 
    }   
}

// ------------------- Get Patient Details --------------------
const GetAllPatientDetails = async(req , res) => {
    try {
        const All = await PatientModel.find().exec();

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

// ------------------- Function to get  Patient details by Id -------------------
const GetPatientDetailsById = async(req , res) => {
    // Request params
    const { PatientId } = req.params;

    try {
      // Check Patient exits or not in related Id
      const Patient =  await UserModel.findOne({_id:PatientId}).exec();
      if(!Patient){
        return res.status(404).json({
            status: false,
            error: {
                message: "No patient available for the provided user id!"
            }
        });
      }

      // Check User Type
      const UserType = Patient.userType;

      if(UserType != "Patient"){
          return res.status(403).json({
              status: false,
              error: {
                  message: "User is not authorized to perform this action!"
              }
          });
      }

      // Check details exits or not
      const Details =  await PatientModel.find({patientId:PatientId}).exec();
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

// ------------------- Function to Update Patient Details -------------------
const UpdatePatientDetails = async(req , res) => {
    // Request params
    const { DetailsId } = req.params;

    // Request body
    const { dateUpdated , timeUpdated } = req.body;

    try {
        // Check Details Id exsits or not
        const Detail = await PatientModel.findOne({_id:DetailsId}).exec();
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
        const UpdatedDetails = await PatientModel.findOneAndUpdate(
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

// -------------------- Function to delete patient details --------------------
const DeletePatientDetails = async(req, res) => {
    // Request params
    const { DetailsId } = req.params;
   
   try {
       // Check Id already exist or not
       const Details = await PatientModel.findOne({_id:DetailsId}).exec();
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
    SavePatientDetails, 
    GetAllPatientDetails, 
    GetPatientDetailsById, 
    UpdatePatientDetails, 
    DeletePatientDetails
};