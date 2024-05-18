// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { 
    SaveNewAppointment,
    GetAllAppointments,
    GetAppoinmentsById,
    UpdateAppointment,
    DeleteAppointment
} = require("../controllers");
const { AuthenticateUser, AuthorizeUser } = require("../middleware");

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Appointment Details -----
router.post("/save" , AuthenticateUser , AuthorizeUser(["Patient"])  , SaveNewAppointment);

// ----- Get All Appointments -----
router.get("/get/all" , AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"])  , GetAllAppointments);

// ----- Get Appointments By Id -----
router.get("/get/:UserId" , AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"])  , GetAppoinmentsById);

// ----- Update Appointment -----
router.put("/update/:AppointmentId", AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"]) , UpdateAppointment);

// ----- Delete Appointment -----
router.delete("/delete/:AppointmentId", AuthenticateUser , AuthorizeUser(["Admin","Doctor","Patient"])  , DeleteAppointment);

module.exports = router;