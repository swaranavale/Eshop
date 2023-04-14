const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: () => Date.now(),
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Eshop_product",
    required: true,
  },
  shippingAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Eshop_shipping_address",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Eshop_user",
    required: true,
  },
});

const orderModel = mongoose.model("Eshop_order", orderSchema);

module.exports = orderModel;
