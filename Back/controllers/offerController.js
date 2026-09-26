const Offer = require("../models/offerModel");

const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true });
    res.status(200).json({ success: true, count: offers.length, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "The offer is not available.",
      });
    }

    res.status(200).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const createOffer = async (req, res) => {
  try {
    const { title, description, discountPercentage, validUntil } = req.body;

    const image = req.file ? req.file.path : null;
    if (
      !title ||
      !description ||
      !discountPercentage ||
      !image ||
      !validUntil
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all display details" });
    }

    const newOffer = await Offer.create({
      title,
      description,
      discountPercentage,
      image,
      validUntil,
    });

    res.status(201).json({
      success: true,
      message: "The presentation was successfully created",
      data: newOffer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "The offer is not available." });
    }

    await offer.deleteOne();
    res.status(200).json({
      success: true,
      message: "The offer has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateOffer = async (req, res) => {
  try {
    const { title, description, discountPercentage, validUntil } = req.body;

    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "The offer is not available.",
      });
    }

    // لو الأدمن رفع صورة جديدة استخدمها
    // لو مرفعش، احتفظ بالصورة القديمة
    const image = req.file ? req.file.path : offer.image;

    offer.title = title ?? offer.title;
    offer.description = description ?? offer.description;
    offer.discountPercentage = discountPercentage ?? offer.discountPercentage;
    offer.validUntil = validUntil ?? offer.validUntil;
    offer.image = image;

    const updatedOffer = await offer.save();

    res.status(200).json({
      success: true,
      message: "The offer was successfully updated",
      data: updatedOffer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllOffers,getOfferById, createOffer, updateOffer, deleteOffer };
