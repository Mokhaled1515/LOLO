const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId")
      .populate("userId", "-password");
    if (!bookings) {
      res.status(400);
      throw new Error("Cannot find bookings");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("roomId")
      .populate("userId", "-password");
      
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const { roomId, checkInDate, checkOutDate, paymentMethod } = req.body;

    if (!roomId || !checkInDate || !checkOutDate || !paymentMethod) {
      return res.status(400).json({
        message: "Please provide all booking details.",
      });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found.",
      });
    }

    const booking = await Booking.create({
      roomId: room._id,
      userId: req.user._id,

      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,

      roomName: room.name,
      price: room.price,

      checkInDate,
      checkOutDate,
      paymentMethod,

      confirmed: false,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("roomId")
      .populate("userId", "-password");

    return res.status(201).json(populatedBooking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const update = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );
    if (!update) {
      res.status(400);
      throw new Error("Cannot create booking");
    }
    // const bookings = await Booking.find();
    const bookings = await Booking.find()
      .populate("roomId")
      .populate("userId", "-password");

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const deletee = await Booking.findByIdAndDelete(req.params.id);
    if (!deletee) {
      res.status(400);
      throw new Error("Cannot delete room");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// إضافة جلب حجوزات المستخدم الحالي
const getUserBookings = async (req, res, next) => {
  try {
     console.log("AUTH USER:", req.user);
    console.log("AUTH USER ID:", req.user?._id);

    const bookings = await Booking.find({ userId: req.user._id })
      .populate("roomId")
      .sort({ createdAt: -1 });

      console.log("FOUND BOOKINGS:", bookings);
    
    return res.status(200).json(bookings);
  } catch (error) {
     console.log("GET USER BOOKINGS ERROR:", error);
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getUserBookings
  // getBooking,
};
