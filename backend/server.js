const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {
    // ssl: true, 
    // sslValidate: false,
    tlsCertificateKeyFile: `/home/edu/.ssh/X509-cert-7850560951636244844.pem`
    // sslCA: `/home/edu/.ssh/X509-cert-7850560951636244844.pem`,
    // tlsAllowInvalidHostnames: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log(`MongoDB database connection established successfully`);
})

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})