// -----------------------Third-party libraries and modules-----------------------
const express = require("express");
require("dotenv/config");

// -----------------------Global instances-----------------------
const app = express();
const PORT = Configs.PORT || 3308;

// -----------------------Common middlewares-----------------------

// -----------Accept json-----------
app.use(express.json());

// -----------Allow access uploads folder-----------
app.use("/uploads", express.static("./uploads/"));

// -----------Allow access downloads folder-----------
app.use("/downloads", express.static("./downloads/"));

// -----------Base route-----------
app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: `Welcome to the server!` });
});

// -----------Error route-----------
app.use((req, res) => {
  res.status(404).json({ status: false, message: `Not found!` });
});

// -----------------------Initialize the connection-----------------------
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
