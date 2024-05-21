// -------------------- Imports --------------------
const { 
        RegisterNewUser, 
        LoginUser,
        GetAllUsers, 
        GetUserById,  
        UpdateUserById, 
        DeleteUser 
} = require("./User");

const { 
        SaveDoctorDetails, 
        GetAllDoctorDetails, 
        GetDoctorDetailsById, 
        UpdateDoctorDetails,  
        DeleteDoctorDetails,
        GetDoctorBySpecialiedField
} = require("./Doctor");

const { 
        SavePatientDetails, 
        GetAllPatientDetails, 
        GetPatientDetailsById, 
        UpdatePatientDetails, 
        DeletePatientDetails 
} = require("./Patient");

const {
        SaveNewAppointment,
        GetAllAppointments,
        GetAppoinmentsById,
        UpdateAppointment,
        DeleteAppointment
} = require("./Appointment");

// -------------------- Exports --------------------
module.exports = {
    RegisterNewUser,
    LoginUser,
    DeleteUser,
    GetAllUsers,
    GetUserById,
    UpdateUserById,
    SaveDoctorDetails,
    GetAllDoctorDetails,
    GetDoctorDetailsById,
    UpdateDoctorDetails,
    DeleteDoctorDetails,
    SavePatientDetails,
    GetAllPatientDetails,
    GetPatientDetailsById,
    UpdatePatientDetails,
    DeletePatientDetails,
    SaveNewAppointment,
    GetAllAppointments,
    GetAppoinmentsById,
    UpdateAppointment,
    DeleteAppointment,
    GetDoctorBySpecialiedField
};