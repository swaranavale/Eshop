// Require the product model and the validator library
const Product = require("../models/product.model");
const validator = require("validator");

// Middleware function to validate product request body
const validateProductReqBody = async (req, res, next) => {
  // Check if the name is provided
  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Name is not provided!",
    });
    return;
  }

  // Check if the availableItems property is provided
  if (req.body.availableItems === undefined) {
    res.status(400).send({
      message: "Failed! AvailableItems is not provided",
    });
    return;
  }

  //  Check if the availableItems property is a valid number
  if (isNaN(req.body.availableItems)) {
    res.status(400).send({
      message: "Failed! AvailableItems is invalid",
    });
    return;
  }

  // Check if the price property is provided
  if (req.body.price === undefined) {
    res.status(400).send({
      message: "Failed! Price is not provided !",
    });
    return;
  }

  // Check if the price property is a valid number
  if (isNaN(+req.body.price)) {
    res.status(400).send({
      message: "Failed! Price is invalid",
    });
    return;
  }

  // Check if the category property is provided
  if (!req.body.category) {
    res.status(400).send({
      message: "Failed! Category is not provided !",
    });
    return;
  }

  // Check if the description property is provided
  if (!req.body.description) {
    res.status(400).send({
      message: "Failed! Description is not provided !",
    });
    return;
  }

  // Check if the imageUrl property is provided
  if (!req.body.imageUrl) {
    res.status(400).send({
      message: "Failed! ImageUrl is not provided",
    });
    return;
  }

  // Check if the imageUrl property is a valid URL
  if (!validator.isURL(req.body.imageUrl)) {
    res.status(400).send({
      message: "Failed! ImageUrl is invalid",
    });
    return;
  }

  // Check if the manufacturer property is provided
  if (!req.body.manufacturer) {
    res.status(400).send({
      message: "Failed! Manufacturer is not provided !",
    });
    return;
  }

  next();
};

// Middleware function to validate product update body
const validateProductUpdateBody = (req, res, next) => {
  // Check if the productId parameter is a valid MongoDB ObjectId
  if (!validator.isMongoId(req.params.productId)) {
    return res.status(400).send({
      message: "Failed! Invalid productId",
    });
  }

  // Check if the availableItems property is a valid number
  if (
    req.body.availableItems !== undefined &&
    isNaN(+req.body.availableItems)
  ) {
    res.status(400).send({
      message: "Failed! AvailableItems is invalid",
    });
    return;
  }

  // Check if the price property is a valid number
  if (req.body.price !== undefined && isNaN(+req.body.price)) {
    res.status(400).send({
      message: "Failed! Price is invalid",
    });
    return;
  }

  // Check if the imageUrl property is a valid URL
  if (req.body.imageUrl && !validator.isURL(req.body.imageUrl)) {
    res.status(400).send({
      message: "Failed! ImageUrl is invalid",
    });
    return;
  }

  next();
};

module.exports = {
  validateProductReqBody,
  validateProductUpdateBody,
};
