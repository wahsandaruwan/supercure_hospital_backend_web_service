// -------------------- Third-party libraries and modules --------------------
const express = require("express");
require("dotenv/config");

// -------------------- Third-party components and modules --------------------
const Configs = require("./configurations");
const { ConnectDatabase } = require("./api/v1/libraries") ;

// -------------------- Global Instance --------------------
const app = express();
const PORT = Configs.PORT || 3308;

// -------------------- Common middleware --------------------


// -------------------- Base route --------------------
app.get("/" , (req,res) => {
    res.status(200).json({ status: true , message: `Welcome to the Server!` });
});

// -------------------- Error route --------------------
app.use((req , res) => {
    res.status(404).json({ status:false , message: `Not Found!`});
});

// -------------------- Initialize Connection --------------------
app.listen(PORT , () => {
    console.log(`Server is running at ${PORT} port`);
    ConnectDatabase().then(() => console.log("Connected to Database!")).catch((err) => console.log(err));
})