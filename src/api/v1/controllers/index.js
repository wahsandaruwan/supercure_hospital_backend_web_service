// -------------------- Imports --------------------
const { RegisterNewUser , LoginUser , GetAllUsers , GetUserById ,  UpdateUserById , DeleteUser } = require("./User");

// -------------------- Exports --------------------
module.exports = {
    RegisterNewUser,
    LoginUser,
    DeleteUser,
    GetAllUsers,
    GetUserById,
    UpdateUserById,
};