const { AdminModel } = require("./AdminRegistration");
const { PatientModel } = require("./Registration");

function AdminSerial(app) {
  app.get("/admin/patientList/:session", async (req, res) => {
    try {
      const session = req.params.session;
      const status = AdminModel.findOne({ session });
      if (status) {
        const Patient = await PatientModel.find();
        res.status(200).json(
          Patient.map((patient) => {
            return {
              id: patient._id,
              fullName: patient.fullName,
              age: patient.age,
              gender: patient.gender,
              serialNumber:
                patient.previousMedicalHistory[
                  patient.previousMedicalHistory.length - 1
                ].serialNumber,
              date: patient.previousMedicalHistory[
                patient.previousMedicalHistory.length - 1
              ].date,
            };
          })
        );
      }
    } catch (error) {
      console.error("Patients Error:", error);
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });

  app.post("/admin/profile", async (req, res) => {
    try {
      const { session } = req.body;

      if (!session) {
        return res.status(400).send({ error: "Session ID is required." });
      }

      const Admin = await AdminModel.findOne({ session });
      res.status(200).json(Admin);
    } catch (error) {
      console.error("Data Update Error:", error);

      if (error.code === 11000) {
        return res.status(400).send({ error: "Duplicate session detected." });
      }

      res.status(500).send({ error: "Session failed due to a server error." });
    }
  });

  app.delete("/admin/patientList/:id", async (req, res) => {
    try {
      const session = req.params.session;
      const status = AdminModel.findOne({ session });
      if (status) {
        await PatientModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Patient Delete Successfully." });
      }
    } catch (error) {
      console.error("Delete Patient Error:", error);
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });
}

module.exports = AdminSerial;
