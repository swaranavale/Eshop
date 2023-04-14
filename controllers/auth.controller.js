const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

// Sign up
exports.signup = async (req, res) => {
  // Create a user object with data from the request body
  const userObj = {
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    contactNumber: req.body.contactNumber,
  };

  try {
    // Create a new user record in the database using the user object
    const userCreated = await User.create(userObj);

    // response
    const postResponse = {
      _id: userCreated.id,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      email: userCreated.email,
    };

    res.status(200).send(postResponse);
  } catch (err) {
    console.log("Some error while saving the user in db", err.message);
    res.status(500).send({
      message: "Some internal error while inserting the element",
    });
  }
};

exports.signin = async (req, res) => {
  /// Get user record based on the email
  const user = await User.findOne({ email: req.body.email });

  // check if the user exists
  if (user == null) {
    res.status(400).send({
      message: "This email has not been registered!",
    });
    return;
  }

  //validate password
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Invalid Credentials!",
    });
  }

  // create token
  const token = jwt.sign(
    {
      id: user.id,
      userId: user.userId,
      role: user.role,
    },
    authConfig.secret,
    {
      expiresIn: 86400, //24 hours
    }
  );

  // response object
  res.status(200).send({
    email: user.email,
    name: user.firstName + " " + user.lastName,
    isAuthenticated: true,
    "x-auth-token": token,
  });
};
