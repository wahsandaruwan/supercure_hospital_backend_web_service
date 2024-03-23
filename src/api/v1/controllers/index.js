// -------------------- Imports --------------------
const { RegisterNewUser , LoginUser , GetAllUsers , GetUserById ,  UpdateUserById , DeleteUser } = require("./User");
const { SaveDoctorDetails , GetDoctorDetailsById , UpdateDoctorDetails ,  DeleteDetails } = require("./Doctor");
const { SavePatientDetails } = require("./Patient");

// -------------------- Exports --------------------
module.exports = {
    RegisterNewUser,
    LoginUser,
    DeleteUser,
    GetAllUsers,
    GetUserById,
    UpdateUserById,
    SaveDoctorDetails,
    GetDoctorDetailsById,
    UpdateDoctorDetails,
    DeleteDetails,
    SavePatientDetails,
};