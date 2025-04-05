const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const Registration = require("./Registration").Registration;
const Login = require("./Login");
const Doctors = require("./Doctors");
const Settings = require("./Settings");
const AdminLogin = require("./AdminLogin");
const { AdminRegistration } = require("./AdminRegistration");
const AdminSerial = require("./AdminSerial");
const AdminSettings = require("./AdminSettings");
const SupportChatBot = require("./SupportChatbot");
const { DoctorRegistration } = require("./AddDoctor");
const DoctorSerial = require("./DoctorSerial");
const Serial = require("./Serial");
const AdminDashboard = require("./AdminDashboard");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGOURI);

Doctors(app, mongoose);
Login(app);
Registration(app);
Settings(app);
AdminLogin(app);
AdminRegistration(app);
AdminSerial(app);
AdminSettings(app);
SupportChatBot(app);
DoctorRegistration(app);
DoctorSerial(app);
Serial(app);
AdminDashboard(app);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
