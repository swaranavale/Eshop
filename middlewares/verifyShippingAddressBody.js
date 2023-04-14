// Importing the ShippingAddressModel from the address.model file and the isValidZipcode and isValidPhoneNumber
// functions from the validators file
const ShippingAddressModel = require("../models/address.model");
const {
  isValidZipcode,
  isValidPhoneNumber,
} = require("../validators/validators");

// Creating a middleware function to validate the request body for shipping address
const validateShippingAddressBody = async (req, res, next) => {
  // Checking if the zipcode is provided in the request body, if not, sending an error message
  if (!req.body.zipcode) {
    res.status(400).send({
      message: "Failed! Zipcode is not provided!",
    });
    return;
  }

  // Checking if the provided zipcode is valid, if not, sending an error message
  if (!isValidZipcode(req.body.zipcode)) {
    res.status(400).send({
      message: "Invalid zip code!",
    });
    return;
  }

  // Checking if the state is provided in the request body, if not, sending an error message
  if (!req.body.state) {
    res.status(400).send({
      message: "Failed! State is not provided !",
    });
    return;
  }

  // Checking if the street is provided in the request body, if not, sending an error message
  if (!req.body.street) {
    res.status(400).send({
      message: "Failed! Street is not provided !",
    });
    return;
  }

  // Checking if the city is provided in the request body, if not, sending an error message
  if (!req.body.city) {
    res.status(400).send({
      message: "Failed! City is not provided !",
    });
    return;
  }

  // Checking if the contact number is valid, if not, sending an error message
  if (!isValidPhoneNumber(req.body.contactNumber)) {
    res.status(400).send({
      message: "Invalid contact number!",
    });
    return;
  }

  // Checking if the name is provided in the request body, if not, sending an error message
  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Name is not provided !",
    });
    return;
  }

  next();
};

module.exports = {
  validateShippingAddressBody,
};
