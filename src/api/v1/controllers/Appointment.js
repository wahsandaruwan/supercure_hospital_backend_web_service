// -------------------- Thirdparty Libraries and modules --------------------
const { parse , isPast } = require('date-fns');

// -------------------- Custom Libraries and modules ------------------------
const { AppointmentModel , UserModel } = require("../models");

// -------------------- Function to save New Appoignment --------------------
const SaveNewAppointment = async(req , res) => {
    // Request body
    const {
        doctorId,
        patientId,
        appointmentDate,
        appointmentTime,
        dateCreated,
        timeCreated,
        dateUpdated,
        timeUpdated
    } = req.body;

    try {
        // Check doctorId and patientid exists or not
        const Doctor = await UserModel.findOne({_id:doctorId}).exec();
        const Patient = await UserModel.findOne({_id:patientId}).exec();
        if(!Doctor || !Patient){
            return res.status(404).json({
                status: false,
                error: {
                    message: "Invalid Doctor Id or Patient Id!"
                }
            });
        }

        // Check User Type of Doctor
        const UserTypeDoctor = Doctor.userType;

        if(UserTypeDoctor != "doctor"){
            return res.status(403).json({
                status: false,
                error: {
                    message: "Invalid Doctor Id!"
                }
            });
        }

        // Convert appointmentDate and appointmentTime to Date objects
        const AppointmentDateTime = parse(`${appointmentDate}T${appointmentTime}`, "yyyy-MM-dd'T'HH:mm", new Date());
        
        // Check if Date is Valid or not
        if (isPast(AppointmentDateTime)) {
            return res.status(400).json({
                status: false,
                error: {
                    message: "Invalid Appointment Date or Time!"
                }
            });
        }

        // Check if doctor alredy has an appointment at specified time and date
        const ExistingDoctorAppointment = await AppointmentModel.findOne({
            doctorId: doctorId,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime
        }).exec();

        if(ExistingDoctorAppointment){
            return res.status(400).json({
                status:false,
                error: {
                    message: "Doctor already has an appoinment!"
                }
            });
        }

        // Check if the patient already has a booked appointment at the specified time and date.
        const ExistingPatientAppointment = await AppointmentModel.findOne({
            patientId: patientId,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime 
        }).exec();

        if(ExistingPatientAppointment){
            return res.status(400).json({
                status:false,
                error: {
                    message: "Patient already has an appoinment!"
                }
            });
        }

        // New Appointment details
        const NewAppointment = new AppointmentModel({ 
            doctorId,
            patientId,
            appointmentDate,
            appointmentTime,
            dateCreated,
            timeCreated,
            dateUpdated,
            timeUpdated
        });

        const saveAppointment = await NewAppointment.save();

        return res.status(201).json({
            status: true,
            success: {
                message: "Appoinment Create Successfully!"
            }    
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to Create appointment due to server error!"
            }
        });
    }
}

// ------------------------- Get All Appointments Details by Id -------------------------
const GetAppoinmentsById = async(req , res) => {
    // Request params
    const { UserId } = req.params;

    // Global Variables
    let Appointments;

    try {
        // Get User details
        const User = await UserModel.findOne({_id:UserId}).exec();
        if(!User){
            return res.status(404).json({
                status: false,
                error: {
                    message: "Invalid User Id!"
                }
            }); 
        }

        // Get User Type
        const UserType = User.userType;
        if(UserType === "doctor"){
            Appointments = await AppointmentModel.find({doctorId:UserId}).exec();
        }else{
            Appointments = await AppointmentModel.find({patientId:UserId}).exec();
        }

        if(!Appointments || Appointments.length === 0){
            return res.status(400).json({
                status: false,
                error: {
                    message: "No any appoinmensts yet!"
                }
            }); 
        }

        return res.status(200).json({
            status: true,
            appointments: Appointments,
            success: {
                message: "Success!"
            }
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to Get appointments due to server error!"
            }
        });
    }
}

// -------------------- Get All Appoinments --------------------
const GetAllAppointments = async(req , res) => {
    try {
        const All = await AppointmentModel.find().exec();
        return res.status(200).json({
            status:true,
            appointments: All,
            success:{
                message: "Success!"
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: {
                message: "Failed to Get appointments due to server error!"
            }
        });
    }
}

// -------------------- Function to Update Appointment --------------------
const UpdateAppointment = async(req , res) => {
    // Request params
    const { AppointmentId } = req.params;

    // Request body
    const { dateUpdated , timeUpdated } = req.body;

    try {
        // Check Details Id exsits or not
        const Detail = await AppointmentModel.findOne({_id:AppointmentId}).exec();
        if(!Detail){
            return res.status(400).json({
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
        const UpdatedDetails = await AppointmentModel.findOneAndUpdate(
            { _id: AppointmentId },
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
                message: "Failed to update Appointment due to server error!"
            }
        });   
    }
}

// -------------------- Function to Delete Appointment --------------------
const DeleteAppointment = async(req , res) => {
     // Request params
     const { AppointmentId } = req.params;
    
    try {
        // Check Appointment Id already exist or not
        const Details = await AppointmentModel.findOne({_id:AppointmentId}).exec();
        if(!Details){
            return res.status(404).json({
                status: false,
                error: {
                    message: "Invalid Details Id!"
                }
            });
        }

        // Delete Appointment
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
                message: "Failed to Delete Appointment due to server error!"
            }
        }); 
    }   
}


module.exports = { 
    SaveNewAppointment,
    GetAllAppointments, 
    GetAppoinmentsById,
    UpdateAppointment,
    DeleteAppointment
};