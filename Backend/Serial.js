const { PatientModel } = require("./Registration");
function Serial(app) {
  app.get("/patientList", async (req, res) => {
    try {
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
    } catch (error) {
      console.error("Patients Error:", error);
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });

  app.post("/profile", async (req, res) => {
    try {
      const { session } = req.body;

      if (!session) {
        return res.status(400).send({ error: "Session ID is required." });
      }

      const Patient = await PatientModel.findOne({ session });
      res.status(200).json(Patient);
    } catch (error) {
      console.error("Data Update Error:", error);

      if (error.code === 11000) {
        return res.status(400).send({ error: "Duplicate session detected." });
      }

      res.status(500).send({ error: "Session failed due to a server error." });
    }
  });
}

module.exports = Serial;
