const mongoose = require("mongoose");
const { AdminModel } = require("./AdminRegistration");

const DoctorSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Diagnosis: { type: String, required: true },
  Room: { type: String, required: true },
});

const DoctorModel = mongoose.model("Doctors", DoctorSchema);

function DoctorRegistration(app) {
  app.post("/admin/doctor/registration/:session", async (req, res) => {
    try {
      const session = req.params.session;
      const status = AdminModel.findOne({ session });
      if (status) {
        const Doctor = new DoctorModel(req.body);
        await Doctor.save();
        res.status(201).send({ message: "Doctor Added Successfully. Thanks!" });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      res
        .status(500)
        .send({ error: "Doctor Registration failed due to a server error." });
    }
  });
}

module.exports = { DoctorRegistration, DoctorModel };
