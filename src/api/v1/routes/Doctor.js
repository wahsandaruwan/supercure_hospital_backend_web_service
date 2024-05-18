// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { 
        SaveDoctorDetails, 
        GetAllDoctorDetails, 
        GetDoctorDetailsById, 
        UpdateDoctorDetails, 
        DeleteDoctorDetails 
} = require("../controllers");
const { AuthenticateUser, AuthorizeUser } = require("../middleware");

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Doctor Details -----
router.post("/save" , AuthenticateUser , AuthorizeUser(["Doctor"]) , SaveDoctorDetails);

// ----- Get All Doctor Details -----
router.get("/details/all" , AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"]) , GetAllDoctorDetails);

// ----- Get Detais By Id -----
router.get("/details/:DoctorId" , AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"])  , GetDoctorDetailsById);

// ----- Update Doctor Details -----
router.put("/update/:DetailsId" , AuthenticateUser , AuthorizeUser(["Doctor"])  ,UpdateDoctorDetails);

// ----- Delete Doctor Details -----
router.delete("/delete/:DetailsId" , AuthenticateUser , AuthorizeUser(["Doctor"])  , DeleteDoctorDetails);


module.exports = router;