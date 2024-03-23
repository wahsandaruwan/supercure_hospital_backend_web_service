// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { 
        SavePatientDetails, 
        GetAllPatientDetails, 
        GetPatientDetailsById, 
        UpdatePatientDetails,
        DeletePatientDetails
} = require("../controllers");

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Patient Details -----
router.post("/save" ,SavePatientDetails);

// ----- Get All Patient Details -----
router.get("/details/all" , GetAllPatientDetails);

// ----- Get Detais By Id -----
router.get("/details/:PatientId" , GetPatientDetailsById); 

// ----- Update Patient Details -----
router.put("/update/:DetailsId" , UpdatePatientDetails);

// ----- Delete Patient Details By Details Id -----
router.delete("/delete/:DetailsId" , DeletePatientDetails);


module.exports = router;
