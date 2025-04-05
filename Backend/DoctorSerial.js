const { DoctorModel } = require("./AddDoctor");
const { AdminModel } = require("./AdminRegistration");

function DoctorSerial(app) {
  app.get("/admin/doctorList/:session", async (req, res) => {
    try {
      const session = req.params.session;
      const status = AdminModel.findOne({ session });
      if (status) {
        const Doctors = await DoctorModel.find();
        res.status(200).json(Doctors);
      }
    } catch (error) {
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });

  app.get("/patient/doctorList/", async (req, res) => {
    try {
      const Doctors = await DoctorModel.find();
      res.status(200).json(Doctors);
    } catch (error) {
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });

  app.delete("/doctorList/:session/:id", async (req, res) => {
    try {
      const session = req.params.session;
      const status = AdminModel.findOne({ session });
      if (status) {
        await DoctorModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Doctor Deleted Successfully." });
      }
    } catch (error) {
      console.error("Delete Patient Error:", error);
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });
}

module.exports = DoctorSerial;
