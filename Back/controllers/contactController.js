// const Contact = require("../models/contactModel");
// const nodemailer = require("nodemailer");

// // إعداد Nodemailer (تأكد إنك حاططهم في ملف الـ .env بتاع الباك إند)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // const submitContactForm = async (req, res) => {
// //   try {
// //     const { name, email, subject, message } = req.body;

// //     // 1. التحقق من البيانات
// //     if (!name || !email || !subject || !message) {
// //       return res.status(400).json({ success: false, message: "Please fill in all fields." });
// //     }

// //     // 2. حفظ الرسالة في قاعدة البيانات (MongoDB)
// //     const newContact = await Contact.create({
// //       name,
// //       email,
// //       subject,
// //       message
// //     });

// //     // 3. إرسال إيميل للأونر (اختياري لو مش مفعل إعدادات الإيميل ممكن تستغنى عنه مؤقتاً)
// //     try {
// //       const mailOptions = {
// //         from: email,
// //         to: process.env.EMAIL_USER,
// //         subject: `Website Contact: ${subject}`,
// //         html: `
// //           <h3>New Message from ${name}</h3>
// //           <p><strong>Email:</strong> ${email}</p>
// //           <p><strong>Subject:</strong> ${subject}</p>
// //           <p><strong>Message:</strong></p>
// //           <p>${message}</p>
// //         `
// //       };
// //       await transporter.sendMail(mailOptions);
// //     } catch (mailError) {
// //       console.error("Email sending failed, but message saved to DB:", mailError);
// //     }

// //     res.status(201).json({
// //       success: true,
// //       message: "Your message has been sent successfully!",
// //       data: newContact
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ success: false, message: "Server error. Please try again later." });
// //   }
// // };

// const submitContactForm = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     if (!name || !email || !subject || !message) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please fill in all fields." });
//     }

//     // حفظ الرسالة في الداتا فقط للتأكد إن الباك إند شغال وسريع
//     const newContact = await Contact.create({ name, email, subject, message });

//     return res.status(201).json({
//       success: true,
//       message: "Your message has been sent successfully!",
//       data: newContact,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// };

// module.exports = { submitContactForm };

const Contact = require("../models/contactModel");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_USER_PASS
  }
});

const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }

    // 1. حفظ الرسالة في قاعدة البيانات فوراً
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    // 2. الرد فوراً على المستخدم عشان مفيش حاجة تقف أو تعلّق
    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: newContact
    });

    // 3. إرسال الإيميل في "الخلفية" (Background) من غير انتظار
    setImmediate(async () => {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER, // يفضل يكون إيميلك الشخصي عشان جوجل ما يعملش بلوك
          replyTo: email, // عشان لما تعمل Reply يرجع للشخص اللي بعت الرسالة
          to: process.env.EMAIL_USER,
          subject: `Website Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #64031b;">New Contact Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
            </div>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully in background!");
      } catch (mailError) {
        console.error("Background email sending failed:", mailError);
      }
    });

  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
  }
};

module.exports = { submitContactForm };