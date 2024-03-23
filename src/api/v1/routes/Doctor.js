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

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Doctor Details -----
router.post("/save", SaveDoctorDetails);

// ----- Get All Doctor Details -----
router.get("/details/all" , GetAllDoctorDetails);

// ----- Get Detais By Id -----
router.get("/details/:DoctorId" , GetDoctorDetailsById);

// ----- Update Doctor Details -----
router.put("/update/:DetailsId" ,UpdateDoctorDetails);

// ----- Delete Doctor Details -----
router.delete("/delete/:DetailsId" , DeleteDoctorDetails);


module.exports = router;