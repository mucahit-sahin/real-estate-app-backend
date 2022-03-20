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
    var minPrice = req.query.minPrice || 0;
    var maxPrice = req.query.maxPrice || 10000000;
    var minBedrooms = req.query.minBedrooms || 0;
    var maxBedrooms = req.query.maxBedrooms || 10;
    var propertyTypes = ["House", "Apartment", "Room", "Cabin"];
    var page = req.query.page || 1;
    var LIMIT = req.query.limit || 1;

    if (req.query.propertyType) {
      propertyTypes = req.query.propertyType.split(",");
    }
    // if there is no query, return all properties
    var properties = await Property.find({
      price: { $gte: minPrice, $lte: maxPrice },
      bedrooms: { $gte: minBedrooms, $lte: maxBedrooms },
      propertyType: { $in: propertyTypes },
    }).populate("user", ["_id", "fullname", "email"]);

    const startIndex = (Number(req.query.page) - 1) * LIMIT; // get the starting index of every page
    const total = properties.length; // get the total number of properties
    if (req.query.page) {
      properties = properties.slice(startIndex, startIndex + LIMIT);
    }

    return res.status(200).json({
      status: "success",
      data: {
        properties,
        numberofpages: Math.ceil(total / LIMIT),
        currentPage: Number(page),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getAllPropertiesByLocation = async (req, res) => {
  try {
    const LIMIT = req.query.limit || 10;
    const { latitude, longitude } = req.query;
    const page = req.query.page || 1;
    const properties = await Property.find({
      latitude,
      longitude,
    });

    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = properties.length; // get the total number of properties
    const propertiesByUser = properties.slice(startIndex, startIndex + LIMIT);

    return res.status(200).json({
      status: "success",
      data: {
        properties: propertiesByUser,
        numberofpages: Math.ceil(total / LIMIT),
        currentPage: Number(page),
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

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
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
