const Amenity = require("../models/amenityModel");


const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({ isActive: true });
    res
      .status(200)
      .json({ success: true, count: amenities.length, data: amenities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const createAmenity = async (req, res) => {
  try {
    const { name, description, icon, image, availability, isFree } = req.body;

    if (!name || !description || !image || !availability) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please fill in the required service fields.",
        });
    }

    const newAmenity = await Amenity.create({
      name,
      description,
      icon,
      image,
      availability,
      isFree,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "The service has been successfully added.",
        data: newAmenity,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);

    if (!amenity) {
      return res
        .status(404)
        .json({ success: false, message: "Service unavailable" });
    }

    await amenity.deleteOne();
    res
      .status(200)
      .json({
        success: true,
        message: "The service has been successfully deleted.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllAmenities, createAmenity, deleteAmenity };
