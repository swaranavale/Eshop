const shippingAddressController = require("../controllers/shippingAddress.controller");
const { verifyShippingAddressBody, authjwt } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/eshop/api/v1/user/shippingAddress",
    [
      verifyShippingAddressBody.validateShippingAddressBody,
      authjwt.verifyToken,
    ],
    shippingAddressController.addShippingAddress
  );
};
