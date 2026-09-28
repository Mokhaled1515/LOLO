const Contact = require("../models/contactModel");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    const { error } = await resend.emails.send({
      from: "LOLO <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Website Contact: ${subject}`,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 10px;
        ">
          <h2 style="color: #64031b;">
            New Contact Message
          </h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Subject:</strong> ${subject}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p style="
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
          ">
            ${message}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    }

    console.log("Email sent successfully!");

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

module.exports = { submitContactForm };
