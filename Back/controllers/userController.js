const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
const isStrongPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password)
  );
};

const passwordErrorMessage =
  "Password must be at least 8 characters and contain an uppercase letter, a lowercase letter, a number, and a special character";

const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    if (!user) {
      res.status(400);
      throw new Error("users not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;

    if (!rest.phone) {
      res.status(400);
      throw new Error("Please add a phone number");
    }

    if (!password) {
      res.status(400);
      throw new Error("Password is required");
    }

    if (!isStrongPassword(password)) {
      res.status(400);
      throw new Error(passwordErrorMessage);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...rest,
      password: hashedpassword,
    });

    if (!user) {
      res.status(400);
      throw new Error("user not created");
    }

    const { password: userPassword, ...otherDetails } = user._doc;

    return res.status(201).json(otherDetails);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      res.status(400);
      throw new Error("incorrect password please try again");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const { password: userPassword, ...rest } = user._doc;

    return res.status(200).json({
      ...rest,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.json({
    message: "you have been logged out",
  });
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.nationality = req.body.nationality || user.nationality;
    user.phone = req.body.phone || user.phone;
    user.profilePic = req.body.profilePic || user.profilePic;

    if (req.body.password) {
      if (!isStrongPassword(req.body.password)) {
        res.status(400);
        throw new Error(passwordErrorMessage);
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await user.save();

    const { password: userPassword, ...rest } = updateUser._doc;

    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateUserAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.address = {
      city: req.body.city || user.address?.city,
      street: req.body.street || user.address?.street,
      phone: req.body.phone || user.address?.phone,
      country: req.body.country || user.address?.country,
    };

    const updateUser = await user.save();

    return res.status(200).json(updateUser.address);
  } catch (error) {
    next(error);
  }
};

const updateProfilePic = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.profilePic = req.body.profilePic || user.profilePic;

    const updateprofilePic = await user.save();

    return res.status(200).json({
      profilePic: updateprofilePic.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      res.status(400);
      throw new Error("Please enter your email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User with this email does not exist");
    }

    // Generate a secure 6-digit verification code
    const resetCode = crypto.randomInt(100000, 1000000).toString();

    const resetExpire = new Date(Date.now() + 15 * 60 * 1000);

    user.resetPasswordToken = resetCode;
    user.resetPasswordExpire = resetExpire;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      // from: process.env.EMAIL_USER,
      from: {
        name: "mookhaleddd",
        address: process.env.EMAIL_USER,
      },
      to: user.email,
      subject: "Hotel Booking - Password Reset Code",
      html: `
    <div style="
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 30px 15px;
    ">

      <div style="
        max-width: 500px;
        margin: auto;
        background: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
      ">

        <!-- Hotel Logo -->
        <img
          src="cid:hotel-logo"
          alt="Hotel Logo"
          style="
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-bottom: 15px;
          "
        />

        <h2 style="
          color: #64031b;
          margin-bottom: 10px;
        ">
          Password Reset
        </h2>

        <p style="
          color: #555;
          font-size: 15px;
          line-height: 1.6;
        ">
          You requested to reset your password.
          Use the verification code below:
        </p>

        <div style="
          margin: 25px 0;
          padding: 18px;
          background-color: #f8f5f2;
          border-radius: 8px;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #64031b;
        ">
          ${resetCode}
        </div>

        <p style="
          color: #777;
          font-size: 13px;
        ">
          This verification code will expire in 15 minutes.
        </p>

        <p style="
          color: #999;
          font-size: 12px;
          margin-top: 25px;
        ">
          If you did not request a password reset,
          you can safely ignore this email.
        </p>

      </div>
    </div>
  `,
      attachments: [
        {
          filename: "hotel-logo.png",
          path: path.join(
            __dirname,
            "../assets/ChatGPT Image Sep 26, 2026, 10_54_15 PM.png",
          ),
          cid: "hotel-logo",
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      // If sending fails, invalidate the code
      user.resetPasswordToken = "";
      user.resetPasswordExpire = null;
      await user.save();

      throw emailError;
    }

    return res.status(200).json({
      message: "Verification code sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

const verifyResetCode = async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const code = req.body.code?.trim();

    const user = await User.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired verification code");
    }

    return res.status(200).json({
      message: "Code is valid",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const code = req.body.code?.trim();
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400);
      throw new Error("New password is required");
    }

    if (!isStrongPassword(newPassword)) {
      res.status(400);
      throw new Error(passwordErrorMessage);
    }

    const user = await User.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid or expired verification code");
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    // Invalidate the verification code after successful reset
    user.resetPasswordToken = "";
    user.resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserAddress,
  updateProfilePic,
  forgotPassword,
  verifyResetCode,
  resetPassword,
};
