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
const { AuthenticateUser, AuthorizeUser } = require("../middleware");

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Patient Details -----
router.post("/save", AuthenticateUser , AuthorizeUser(["Patient"])  ,SavePatientDetails);

// ----- Get All Patient Details -----
router.get("/details/all" , AuthenticateUser , AuthorizeUser(["Doctor","Patient"])  , GetAllPatientDetails);

// ----- Get Detais By Id -----
router.get("/details/:PatientId" , AuthenticateUser , AuthorizeUser(["Doctor","Patient"])  , GetPatientDetailsById); 

// ----- Update Patient Details -----
router.put("/update/:DetailsId" , AuthenticateUser , AuthorizeUser(["Patient"])  , UpdatePatientDetails);

// ----- Delete Patient Details By Details Id -----
router.delete("/delete/:DetailsId" , AuthenticateUser , AuthorizeUser(["Patient"])  , DeletePatientDetails);


module.exports = router;
