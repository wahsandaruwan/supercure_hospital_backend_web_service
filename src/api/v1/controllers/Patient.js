// -------------------- Custom Libraries and modules --------------------
const { UserModel } = require("../models");
const { PatientModel } = require("../models");

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



module.exports = { SavePatientDetails };