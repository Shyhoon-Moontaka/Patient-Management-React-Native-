const { AdminModel } = require("./AdminRegistration");

function AdminLogin(app) {
  app.post("/admin/login", async (req, res) => {
    try {
      const Admin = await AdminModel.findOne(req.body);
      if (!Admin) {
        return res.status(401).send({ error: "Invalid credentials!" });
      }
      res.status(200).send({ session: Admin.session });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send({ error: "Login failed due to a server error." });
    }
  });
}

module.exports = AdminLogin;
