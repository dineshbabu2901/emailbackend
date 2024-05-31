import express from "express";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import mjml2html from "mjml";
import fs from "fs";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3009;

const mongodbConnection = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017");
    console.log("mongodb connected");
  } catch (error) {
    return console.log("error", error);
  }
};

// POST route to send an email
app.post("/sendemail", async (req, res) => {
  // Destructure email data from the request body
  const { from, to, subject, text, html } = req.body;

  // Compile MJML to HTML
  const mjmlContent = (
    await fs.promises.readFile(
      "C:/Users/Nafter 01/Desktop/vses/emi.mjml",
      "utf-8"
    )
  ).toString();
  const content = mjml2html(mjmlContent);

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587, // Change this to your SMTP port if different
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dineshbabu292001@gmail.com",
      pass: "0B8n49kRjrb2tCSF",
    },
  });

  // Prepare email options
  const mailOptions = {
    from: "dineshbabu292001@gmail.com",
    to: "justindineshbavu2901@gmail.com",
    subject: "DCfans club",
    text: "Reset password",
    html: content.html, // content.html
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongodbConnection();
});
