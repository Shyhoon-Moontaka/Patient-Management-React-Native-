const { PatientModel } = require("./Registration");

function Login(app) {
  app.post("/login", async (req, res) => {
    const { email, contact } = req.body;

    try {
      const Patient = await PatientModel.findOne({ email, contact });
      if (!Patient) {
        return res.status(401).send({ error: "Invalid credentials!" });
      }

      res.status(200).send({ session: Patient.session });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send({ error: "Login failed due to a server error." });
    }
  });
}

module.exports = Login;
