function Doctors(app, mongoose) {
  const DoctorsSchema = new mongoose.Schema({
    Name: String,
    Type: String,
    Diagnosis: String,
    Room: String,
  });

  const DoctorsModel = mongoose.model("Doctor", DoctorsSchema);

  app.get("/doctors", async (req, res) => {
    try {
      const Doctors = await DoctorsModel.find();
      res.status(200).json(Doctors);
    } catch (error) {
      console.error("Doctors Error:", error);
      res.status(500).send({ error: "Something Went Wrong." });
    }
  });
}

module.exports = Doctors;
