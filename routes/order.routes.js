const { authjwt } = require("../middlewares");
const orderController = require("../controllers/order.controller");

module.exports = (app) => {
  app.post(
    "/eshop/api/v1/orders",
    [authjwt.verifyToken, authjwt.isUser],
    orderController.placeOrder
  );
};
