const Dining = require("../models/diningModel");

const getAllDining = async (req, res) => {
  try {
    const diningOptions = await Dining.find({ isActive: true });
    res
      .status(200)
      .json({
        success: true,
        count: diningOptions.length,
        data: diningOptions,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDining = async (req, res) => {
  try {
    const { name, description, cuisineType, openingHours, location } = req.body;

    // الـ Cloudinary بيرفع الصورة ويحط الرابط هنا
    const image = req.file ? req.file.path : null;

    if (!name || !description || !cuisineType || !openingHours || !image) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields and upload an image.",
      });
    }

    const newDining = await Dining.create({
      name,
      description,
      cuisineType,
      openingHours,
      image, // تخزين الرابط الجاي من Cloudinary
      location,
    });

    res.status(201).json({
      success: true,
      message: "The restaurant has been successfully added",
      data: newDining,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDining = async (req, res) => {
  try {
    const dining = await Dining.findById(req.params.id);

    if (!dining) {
      return res
        .status(404)
        .json({ success: false, message: "The restaurant is not there" });
    }

    await dining.deleteOne();
    res
      .status(200)
      .json({
        success: true,
        message: "The restaurant has been successfully deleted",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllDining, createDining, deleteDining };
