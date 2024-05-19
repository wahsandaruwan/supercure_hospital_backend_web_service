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
const { AuthenticateUser, AuthorizeUser } = require("../middleware");


// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Register a new user -----
router.post("/register", RegisterNewUser);

// ----- Login User -----
router.post("/login" , LoginUser);

// ----- Get All users -----
router.get("/all" , AuthenticateUser , AuthorizeUser(["Admin"]) , GetAllUsers);

// ----- Get User by Id -----
router.get("/one/:UserId" , AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"]) ,  GetUserById);

// ----- Update User details -----
router.put("/update/:UserId", AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"]) , UpdateUserById);

// ----- Delete User -----
router.delete("/delete/:UserId", AuthenticateUser , AuthorizeUser(["Admin"]) , DeleteUser);


module.exports = router;

