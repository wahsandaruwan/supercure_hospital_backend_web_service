// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { SaveDoctorDetails , GetDoctorDetailsById , UpdateDoctorDetails , DeleteDetails } = require("../controllers");

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Doctor Details -----
router.post("/save", SaveDoctorDetails);

// ----- Get Detais By Id -----
router.get("/details/:DoctorId" , GetDoctorDetailsById);

// ----- Update Doctor Details -----
router.put("/update/:DetailsId" ,UpdateDoctorDetails);

// ----- Delete Doctor Details -----
router.delete("/delete/:DetailsId" , DeleteDetails);


module.exports = router;