import Property from "../models/property.js";
export const createProperty = async (req, res) => {
  try {
    const {
      user,
      title,
      description,
      price,
      propertyType,
      phoneNumber,
      email,
      latitude,
      longitude,
      address,
      area,
      city,
      state,
      country,
      zipCode,
      bedrooms,
      bathrooms,
      squareMeters,
      isDogfriendly,
      isCatfriendly,
      isSmokingfriendly,
    } = req.body;
    const property = await Property.create({
      user,
      title,
      description,
      phoneNumber,
      email,
      price,
      propertyType,
      latitude,
      longitude,
      address,
      area,
      city,
      state,
      zipCode,
      bedrooms,
      bathrooms,
      squareMeters,
      isDogfriendly,
      isCatfriendly,
      isSmokingfriendly,
      country,
      user: req.user.userId,
    });

    return res.status(201).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("user", [
      "_id",
      "fullname",
      "email",
    ]);
    return res.status(200).json({
      status: "success",
      data: {
        properties,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getAllPropertiesByLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const properties = await Property.find({
      latitude,
      longitude,
    });
    return res.status(200).json({
      status: "success",
      data: {
        properties,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("user", [
      "_id",
      "fullname",
      "email",
    ]);
    return res.status(200).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
