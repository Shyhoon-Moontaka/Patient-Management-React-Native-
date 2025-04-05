const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const HistorySchema = new mongoose.Schema({
  addMedicalHistory: { type: String, required: true },
  currentDiagnosis: { type: String, required: true },
  doctorType: { type: String, required: true },
  assignedDoctor: { type: String, required: true },
  roomNumber: { type: String, required: true },
  date: { type: String, required: true },
});
const PatientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  previousMedicalHistory: [HistorySchema],
  session: { type: String, required: true },
});

const PatientModel = mongoose.model("Patient", PatientSchema);

function Registration(app) {
  app.post("/registration", async (req, res) => {
    const session = uuidv4();
    try {
      const {
        fullName: fullName,
        email,
        age,
        gender,
        contact,
        addMedicalHistory,
        currentDiagnosis,
        doctorType,
        assignedDoctor,
        roomNumber,
        date,
      } = req.body;
      const existingPatient = await PatientModel.findOne({
        email,
        contact,
      });

      if (!existingPatient) {
        const Patient = new PatientModel({
          fullName,
          email,
          age,
          gender,
          contact,
          previousMedicalHistory: [
            {
              addMedicalHistory,
              currentDiagnosis,
              doctorType,
              assignedDoctor,
              roomNumber,
              date,
            },
          ],
          session,
        });
        await Patient.save();
        res.status(201).send({ message: "Registration Successful. Thanks!" });
      } else {
        existingPatient.previousMedicalHistory.push({
          addMedicalHistory,
          currentDiagnosis,
          doctorType,
          assignedDoctor,
          roomNumber,
          date,
        });
        await existingPatient.save();
        res.status(201).send({ message: "Registration Successful." });
      }
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.code === 11000) {
        return res
          .status(400)
          .send({ error: "Email already registered. Use a different email." });
      }

      res
        .status(500)
        .send({ error: "Registration failed due to a server error." });
    }
  });
}

module.exports = { Registration, PatientModel };
