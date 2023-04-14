const ShippingAddressModel = require("../models/address.model");

// add a shipping address to the database
exports.addShippingAddress = async (req, res) => {
  // Create a new address object
  const addressObj = {
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    street: req.body.street,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    eshopUser: req.id, // Add the user ID to the address object
  };

  try {
    // Add the address object to the database
    const shippingAddressAdded = await ShippingAddressModel.create(addressObj);

    // Find the added address by ID
    const postResponse = await ShippingAddressModel.findById(
      shippingAddressAdded.id
    )
      .populate("eshopUser")
      .exec();

    res.status(200).send(postResponse);
  } catch (err) {
    console.log(
      "Some error while adding the Shipping Address in db",
      err.message
    );
    res.status(500).send({
      message: "Some internal error while inserting the Shipping Address",
    });
  }
};
