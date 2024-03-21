// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { RegisterNewUser ,LoginUser , GetAllUsers ,  DeleteUser } = require("../controllers");


// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Register a new user -----
router.post("/register", RegisterNewUser);

// ----- Login User -----
router.post("/login" , LoginUser);

// ----- Get All users
router.get("/all" , GetAllUsers)

// ----- Delete User -----
router.delete("/delete/:UserId" , DeleteUser);


module.exports = router;

