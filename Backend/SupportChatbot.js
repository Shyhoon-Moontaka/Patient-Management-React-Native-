const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PatientModel } = require("./Registration");
const { DoctorModel } = require("./AddDoctor");
const { AdminModel } = require("./AdminRegistration");
require("dotenv").config();
async function SupportChatBot(app) {
  app.post("/admin/chat/:session", async (req, res) => {
    try {
      const patientDetails = await PatientModel.find();
      const doctorDetails = await DoctorModel.find();
      const adminDetails = await AdminModel.find();
      const session = req.params.session;
      const { prompt } = req.body;
      const Admin = await AdminModel.findOne({ session });
      if (Admin) {
        const genAI = new GoogleGenerativeAI(process.env.GENAIKEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
          history: [],
        });

        const reply = (
          await chat.sendMessage(
            `here is all about patient details ${patientDetails.toString()}, all doctors details ${doctorDetails.toString()} and admin details ${adminDetails.toString()}.according to these details give me exact short paragraph based on this prompt ${prompt}.`
          )
        ).response.text();

        res.status(200).json({
          prompt,
          reply,
        });
      }
    } catch (error) {
      console.error("Error handling chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/patient/chat/:session", async (req, res) => {
    try {
      const session = req.params.session;
      const Patient = await PatientModel.findOne({ session });
      const doctorDetails = await DoctorModel.find();

      const { prompt } = req.body;
      const genAI = new GoogleGenerativeAI(process.env.GENAIKEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chat = model.startChat({
        history: [],
      });

      const reply = (
        await chat.sendMessage(
          `Here is all about patient details ${Patient}, doctor details ${doctorDetails}.according to these details give me exact short paragraph based on this prompt ${prompt}.`
        )
      ).response.text();

      res.status(200).json({
        prompt,
        reply,
      });
    } catch (error) {
      console.error("Error handling chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

module.exports = SupportChatBot;
