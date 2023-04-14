const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema(
  {
    zipcode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    eshopUser: {
      type: String,
      ref: "Eshop_user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const shippingAddressModel = mongoose.model(
  "Eshop_shipping_address",
  shippingAddressSchema
);

module.exports = shippingAddressModel;
