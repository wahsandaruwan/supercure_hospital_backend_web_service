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
            return res.status(400).json({
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


module.exports = { SaveNewAppointment };