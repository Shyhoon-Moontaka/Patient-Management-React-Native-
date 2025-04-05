const { PatientModel } = require("./Registration");

function Settings(app) {
  app.put("/update/:session", async (req, res) => {
    const session = req.params.session;
    try {
      await PatientModel.findOneAndUpdate({ session }, req.body);

      res.status(200).send({ message: "Data updated successfully." });
    } catch (error) {
      console.error("Update Error:", error);

      if (error.code === 11000) {
        return res
          .status(400)
          .send({ error: "Email already updated. Use a different email." });
      }

      res.status(500).send({ error: "Update failed due to a server error." });
    }
  });
}

module.exports = Settings;
