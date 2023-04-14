// Importing the user model and validator functions
const UserModel = require("../models/user.model");
const {
  isValidEmail,
  isValidPhoneNumber,
} = require("../validators/validators");

// Function to validate the request body for user registration
validateUserRequestBody = async (req, res, next) => {
  // Checking if userId is provided in request body
  if (!req.body.userId) {
    res.status(400).send({
      message: "Failed! UserId is not provided !",
    });
    return;
  }

  // Checking if the userId already exists
  const user = await UserModel.findOne({ userId: req.body.userId });
  if (user != null) {
    res.status(400).send({
      message: "Failed! Userid  already exists!",
    });
    return;
  }

  // Checking if firstName is provided in request body
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Failed! FirstName is not provided !",
    });
    return;
  }

  // Checking if lastName is provided in request body
  if (!req.body.lastName) {
    res.status(400).send({
      message: "Failed! LastName is not provided !",
    });
    return;
  }

  // Checking if email is provided in request body
  if (!req.body.email) {
    res.status(400).send({
      message: "Failed! Email is not provided !",
    });
    return;
  }

  // Validating the email format
  if (!isValidEmail(req.body.email)) {
    res.status(400).send({
      message: "Invalid email-id format!",
    });
    return;
  }

  // Checking if the email is already registered
  const email = await UserModel.findOne({ email: req.body.email });
  if (email != null) {
    res.status(400).send({
      message: "Try any other email, this email is already registered!",
    });
    return;
  }

  // Validating the contactNumber
  if (!isValidPhoneNumber(req.body.contactNumber)) {
    res.status(400).send({
      message: "Invalid contact number!",
    });
    return;
  }

  // Checking if password is provided in request body
  if (!req.body.password) {
    res.status(400).send({
      message: "Failed! Password is not provided !",
    });
    return;
  }
  next();
};

// Function to validate the request body for user login
const validateUserSigninBody = function (req, res, next) {
  // Checking if email or password is missing in request body
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Email and password are required",
    });
  }

  // Validating the email format
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({
      message: "Invalid email-id format!",
    });
  }

  next();
};

module.exports = {
  validateUserRequestBody,
  validateUserSigninBody,
};
