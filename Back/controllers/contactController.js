const Contact = require("../models/contactModel");
const nodemailer = require('nodemailer');

// إعداد Nodemailer (تأكد إنك حاططهم في ملف الـ .env بتاع الباك إند)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. التحقق من البيانات
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }

    // 2. حفظ الرسالة في قاعدة البيانات (MongoDB)
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // 3. إرسال إيميل للأونر (اختياري لو مش مفعل إعدادات الإيميل ممكن تستغنى عنه مؤقتاً)
    try {
      const mailOptions = {
        from: email,
        to: process.env.OWNER_EMAIL,
        subject: `Website Contact: ${subject}`,
        html: `
          <h3>New Message from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      };
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Email sending failed, but message saved to DB:", mailError);
    }

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: newContact
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

module.exports = { submitContactForm };