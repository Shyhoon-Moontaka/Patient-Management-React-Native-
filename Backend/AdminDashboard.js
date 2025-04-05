const { DoctorModel } = require("./AddDoctor");
const { AdminModel } = require("./AdminRegistration");
const { PatientModel } = require("./Registration");

function AdminDashboard(app) {
  app.post("/admin/dashboard", async (req, res) => {
    try {
      const { session } = req.body;

      if (!session) {
        return res.status(400).send({ error: "Session ID is required." });
      }

      const Admin = await AdminModel.findOne({ session });
      const PatientCount = (await PatientModel.find()).length;
      const DoctorCount = (await DoctorModel.find()).length;
      const UserCount = PatientCount + DoctorCount;
      if (Admin) {
        res.status(200).json({
          users: UserCount,
          patients: PatientCount,
          doctors: DoctorCount,
        });
      }
    } catch (error) {
      console.error("Data Update Error:", error);

      if (error.code === 11000) {
        return res.status(400).send({ error: "Duplicate session detected." });
      }

      res.status(500).send({ error: "Session failed due to a server error." });
    }
  });
}

module.exports = AdminDashboard;
