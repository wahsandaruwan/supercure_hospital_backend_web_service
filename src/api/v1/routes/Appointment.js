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

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Appointment Details -----
router.post("/save" , SaveNewAppointment);

// ----- Get All Appointments -----
router.get("/get/all" , GetAllAppointments);

// ----- Get Appointments By Id -----
router.get("/get/:UserId" , GetAppoinmentsById);

// ----- Update Appointment -----
router.put("/update/:AppointmentId" , UpdateAppointment);

// ----- Delete Appointment -----
router.delete("/delete/:AppointmentId" , DeleteAppointment);

module.exports = router;