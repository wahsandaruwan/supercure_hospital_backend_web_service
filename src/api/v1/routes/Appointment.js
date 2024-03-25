// -------------------- Thirdpary libraries and modules --------------------
const express = require("express");

// -------------------- Custom libraries and modules --------------------
const { 
    SaveNewAppointment
} = require("../controllers");

// --------------- Initialize the Router ---------------
const router = express.Router();

// ---------- Routes ----------
// ----- Save Patient Details -----
router.post("/save" , SaveNewAppointment);


module.exports = router;