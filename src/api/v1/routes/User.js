// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { 
    RegisterNewUser,
    LoginUser,
    GetAllUsers, 
    GetUserById,
    UpdateUserById,
    DeleteUser, } = require("../controllers");


// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Register a new user -----
router.post("/register", RegisterNewUser);

// ----- Login User -----
router.post("/login" , LoginUser);

// ----- Get All users -----
router.get("/all" , GetAllUsers);

// ----- Get User by Id -----
router.get("/one/:UserId" , GetUserById);

// ----- Update User details -----
router.put("/update/:UserId" , UpdateUserById);

// ----- Delete User -----
router.delete("/delete/:UserId" , DeleteUser);


module.exports = router;

