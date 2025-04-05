const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AdminSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: String, required: true },
  session: { type: String, required: true },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

function AdminRegistration(app) {
  app.post("/admin/registration", async (req, res) => {
    const session = uuidv4();
    try {
      const { fullName, email, password, age, gender, contact, date } =
        req.body;
      const adminCount = (await AdminModel.find()).length;

      if (adminCount < 1) {
        const Admin = new AdminModel({
          fullName,
          email,
          password,
          age,
          gender,
          contact,
          date,
          session,
        });
        await Admin.save();
        res.status(201).send({ message: "Registration Successful. Thanks!" });
      } else {
        res
          .status(404)
          .send({ message: "Not Allowed!! Admin Already Have Registered." });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      res
        .status(500)
        .send({ error: "Registration failed due to a server error." });
    }
  });
}

module.exports = { AdminRegistration, AdminModel };
