const { AdminModel } = require("./AdminRegistration");

function AdminSettings(app) {
  app.put("/admin/update/:session", async (req, res) => {
    const session = req.params.session;
    console.log(session);
    try {
      await AdminModel.findOneAndUpdate({ session }, req.body);

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

module.exports = AdminSettings;
